<template>
  <div class="dashboard-module trend-content">
    <div class="content">
      <div :id="tid" :ref="tid"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Vue from 'vue';
import { mapGetters } from 'vuex';

import moment from 'moment';
import Highcharts from 'highcharts';
import { cloneDeep } from 'lodash';
import COMPONENTS from '@router/components';
import { CHART_SYNC_EXTREMES, CHART_MOUSE_OUT, CHART_MOUSE_OVER } from '@src/constants';

function createOptions(vm) {
  return {
    chart: {
      type: 'line',
      animation: true,
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      height: 45,
      width: 100,
      margin: [10, 10, 10, 10],
      padding: [5, 5, 5, 5],
      reflow: true,
    },
    xAxis: {
      type: 'datetime',
      tickLength: 0,
      lineWidth: 0,
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      events: {
        setExtremes: CHART_SYNC_EXTREMES,
      },
    },
    yAxis: {
      tickLength: 0,
      lineWidth: 0,
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    subtitle: {
      text: '',
    },
    plotOptions: {
      series: {
        animation: true,
        turboThreshold: 0,
        color: '#D0D0D0',
        lineWidth: 2,
        connectNulls: false,
        states: {
          hover: {
            halo: {
              size: 5,
            },
          },
        },
        marker: {
          radius: 3,
          symbol: 'circle',
          enabled: false,
        },
        events: {
          click(event) {
            vm.openPoint(event.point);
            event.preventDefault();
          },
        },
        point: {
          events: {
            mouseOut: CHART_MOUSE_OUT,
            mouseOver: CHART_MOUSE_OVER,
          },
        },
      },
    },
    tooltip: {
      shared: true,
      outside: true,
      useHtml: true,
      borderRadius: 10,
      borderColor: '#333333',
      hideDelay: 1,
      backgroundColor: '#333333',
      style: {
        color: 'white',
        width: '200px',
      },
      formatter() {
        const point = this.points[0].point.options;
        const colName = this.points[0].series.name;
        let value;

        if (colName === 'duration' || colName === 'vcoreSeconds' || colName === 'memorySeconds') {
          value = Vue.filter('format_time')(point.y, 'duration');
        } else if (colName === 'read') {
          value = Vue.filter('formatInBytes')(point.y, 2);
        } else if (colName === 'write' || colName === 'io') {
          value = Vue.filter('formatInBytes')(point.y, 2);
        } else if (colName === 'cost') {
          value = Vue.filter('currencyBill')(point.y, this.currency);
        }

        const content =
          `<span class="date-text">${moment(point.date).format('MM/DD/YY HH:mm:ss')}</span>` +
          `<br><b>${colName}:</b> ${value}`;

        return content;
      },
    },
  };
}

function changeColor(status) {
  switch (status) {
    case 'S':
      return '#2CC717';
    case 'F':
      return '#F98D06';
    case 'K':
      return '#D54451';
    case 'P':
      return '#50ABEA';
    case 'R':
      return '#6E78C5';
    case 'U':
      return '#333333';
    case 'W':
      return '#187BAC';
    default:
      return '#333333';
  }
}

export default {
  name: 'TrendChart',
  props: {
    trendData: {
      type: [Object, Array],
      default() {
        return false;
      },
    },
    metaData: {
      type: Object,
      default() {
        return {};
      },
    },
    trendMode: {
      type: String,
      default: "",
    },
    nick: {
      type: String,
      default: null,
    },
    chartRowIndex: {
      type: Number,
      default: 0,
    },
    trendchartPerRow: {
      type: Number,
      default: 3,
    },
    dataSource: {
      type: String,
      default: 'listPage',
    },
    sharedTooltip: {
      type: Boolean,
      default: true,
    },
    tid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      chartOptions: createOptions(this),
    };
  },
  computed: {
    ...mapGetters('auth', ['currency']),
  },
  mounted() {
    if (this.trendData) {
      this.drawChart();
    }
  },
  destroyed() {
    this.beforeDestroy();
  },
  methods: {
    openPoint(point) {
      const { id } = point;
      const { clusterUid } = point;

      if (id != this.id) {
        const appType = point.kind.toLowerCase();
        const parameter = appType === 'session' ? id.split(':')[0] : id;
        this.$router.push({
          name:
            appType !== 'session'
              ? COMPONENTS.PIPELINE_INSTANCE_DETAILS_VIEW.name
              : COMPONENTS.SESSION_DETAILS_VIEW.name,
          params: { appType },
          query: { execId: parameter, clusterUid },
        });
      }
    },
    getYChartData(cleanRuns, trendMode) {
      const instances = cloneDeep(cleanRuns);
      const chartData = instances.map(instance => {
        // Max Y axis value for better display
        let yValue = null;

        switch (trendMode) {
          case 'duration':
            yValue = instance.duration;
            break;
          case 'io':
            yValue = instance.totalDfsBytesRead + instance.totalDfsBytesWritten;
            break;
          case 'read':
            yValue = instance.totalDfsBytesRead;
            break;
          case 'write':
            yValue = instance.totalDfsBytesWritten;
            break;
          case 'memorySeconds':
            yValue =
              instance.appInfo && instance.appInfo.memorySeconds
                ? instance.appInfo.memorySeconds
                : instance.memorySeconds;
            break;
          case 'vcoreSeconds':
            yValue =
              instance.appInfo && instance.appInfo.vcoreSeconds
                ? instance.appInfo.vcoreSeconds
                : instance.vcoreSeconds;
            break;
          case 'cost':
            yValue = instance.totalCost;
            break;
          default:
            break;
        }
        const yData = {
          date: instance.startTime,
          y: yValue,
          id: instance.id,
          status: instance.status,
          kind: instance.kind,
          color: changeColor(instance.status),
          clusterUid: instance.clusterUid,
          marker: instance.marker,
        };
        return yData;
      });
      return chartData;
    },
    getXChartData(cleanRuns) {
      const instances = cloneDeep(cleanRuns);
      const chartData = instances.map(instance => {
        return moment(instance.startTime).valueOf();
      });
      return chartData;
    },
    drawChart() {
      const vm = this;
      let cleanRuns;

      if (this.dataSource === 'summary' || this.dataSource === 'pipelines') {
        cleanRuns = this.cleanData(cloneDeep(this.trendData));
      } else {
        cleanRuns = this.cleanData(cloneDeep(this.trendData.allHits));
      }

      const runs = this.getYChartData(cleanRuns, this.trendMode);
      const categories = this.getXChartData(cleanRuns);
      const options = $.extend({}, this.chartOptions);
      options.series = [
        {
          name: this.trendMode,
          data: [...runs],
          categories,
          maxPointWidth: 10,
        },
      ];

      if (this.dataSource !== 'summary') {
        options.series[0].syncChartStart = vm.chartRowIndex * Number(this.trendchartPerRow);
        options.series[0].syncChartEnd =
          vm.chartRowIndex * Number(this.trendchartPerRow) + Number(this.trendchartPerRow);
      }

      if (!vm.sharedTooltip) {
        options.plotOptions.series.point.events = {};
      }

      function getCleanDataMax(metric) {
        const data = cleanRuns.map(run => run[metric]);
        data.sort((a, b) => {
          return b - a;
        });
        return data[0];
      }

      // Max Y axis value for better display
      switch (this.trendMode) {
        case 'duration':
          if (this.dataSource === 'summary') {
            options.yAxis.max = getCleanDataMax('duration')
            options.yAxis.min = 0;
          }
          break;
        case 'io':
          options.yAxis.max =
            this.dataSource === 'summary'
              ? getCleanDataMax('totalDfsBytesRead') + getCleanDataMax('totalDfsBytesWritten')
              : this.metaData.read.max + this.metaData.write.max + 1000;
          options.yAxis.min = 0;
          break;
        case 'memorySeconds':
          options.yAxis.max =
            this.dataSource === 'summary'
              ? getCleanDataMax('memorySeconds')
              : this.metaData.memory.max + 1000;
          options.yAxis.min = 0;
          break;
        case 'vcoreSeconds':
          options.yAxis.max =
            this.dataSource === 'summary'
              ? getCleanDataMax('vcoreSeconds')
              : this.metaData.vcore.max + 1000;
          options.yAxis.min = 0;
          break;
        default:
          break;
      }
      this.chart = Highcharts.chart(this.$refs[this.tid], options);
    },
    sortData(data) {
      if (data && data.length > 1) {
        data.sort((a, b) => {
          if (a.startTime > b.startTime) {
            return 1;
          }

          if (b.startTime > a.startTime) {
            return -1;
          }

          return 0;
        });
      }
    },
    cleanData(data) {
      const maxRuns = 20;

      if (data.length === 1) {
        data[0].marker = { enabled: true };
      }

      if (data.length > maxRuns) {
        // Find current WF id position and calculate range
        const index = data.map(item => item.id).indexOf(this.id);

        if (index === 0) {
          data = data.slice(0, maxRuns - 1);
        } else if (index == data.length - 1) {
          data = data.slice(data.length - maxRuns, data.length);
        } else if (index - maxRuns / 2 >= 0 && index + maxRuns / 2 <= data.length) {
          data = data.slice(Math.floor(index - maxRuns / 2), Math.floor(index + maxRuns / 2));
        } else if (index - maxRuns / 2 < 0) {
          data = data.slice(0, index + Math.floor(maxRuns / 2) + Math.floor(maxRuns / 2 - index));
        } else {
          data = data.slice(data.length - maxRuns, data.length);
        }
      }

      this.sortData(data);

      return data;
    },
    beforeDestroy() {
      this.chart.destroy();
    },
  },
};
</script>

<style lang="scss" scoped>
.trend-content {
  height: 45px;
  .content > div,
  ::v-deep .highcharts-container,
  ::v-deep svg.highcharts-root {
    overflow: visible !important;
  }
  .highcharts-container * {
    overflow: visible !important;
  }
  .highcharts-tooltip {
    z-index: 2147483647;
  }
}
</style>
