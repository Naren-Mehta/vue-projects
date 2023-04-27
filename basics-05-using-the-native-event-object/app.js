const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      lastName: '',
      // fullName: '',
    };
  },
  watch: {
    // name(value){
    //   if(value === '') {
    //     this.fullName ='';
    //   } else {
    //     this.fullName = value + ' ' + this.lastName;
    //   }
    // },
    // lastName(value){
    //   if(value === '') {
    //     this.fullName ='';
    //   } else {
    //     this.fullName = this.name + ' ' + value;
    //   }
    // }
  },
  computed:{
    fullName(){
      console.log("==fullName==");
      if(this.name === '' || this.lastName === ''){
        return '';
      }
      return this.name + ' ' + this.lastName;
    },
  },
  methods: {
    outputFullName(){
      console.log("==outputFullName==");
      if(this.name === ''){
        return '';
      }
      return this.name + ' Mehta';
    },
    setName(event, lastName) {
      this.name = event.target.value + ' ' + lastName;
    },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
    resetInput(){
      this.name="";
    }
  }
});

app.mount('#events');
