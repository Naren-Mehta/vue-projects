const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      confirmName: ''
    };
  },
  methods: {
    add(num){
      this.counter += num;
    },
    remove(num){
      this.counter -= num;
    },
    setName(event, lastName){
      this.name = event.target.value+ ' '+ lastName;
    },
    confirmInput(){
      this.confirmName = this.name;
    },
    submitForm(event){
      // event.preventDefault();
    }
  }
});

app.mount('#events');
