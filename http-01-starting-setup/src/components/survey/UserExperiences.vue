<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences">Load Submitted Experiences</base-button>
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="error">{{ error }}</p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">No stored experiences found!</p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data(){
    return {
      results:[],
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    console.log('Mounted=====')
    this.loadExperiences();
  }, 
  created() {
    console.log('Created=====')
  },
  methods: {
    loadExperiences() {
      this.isLoading = true;
      this.error = null;

      fetch('https://vue-http-demo-4fada-default-rtdb.firebaseio.com/surveys.json')
      .then(response => {
        return response.json();
      }).then(data => {
        const results = [];

        for(const id in data){
          results.push({
            id: id,
            name: data[id].name,
            rating: data[id].rating,
          });
        }

        this.results = results;
        console.log(results);
      }).catch(error => {
        console.log(error);
        this.error = "Failed to fetch data - please try again";
      }).finally(() =>{
        this.isLoading = false;
      })
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>