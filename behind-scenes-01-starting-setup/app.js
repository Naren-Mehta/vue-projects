const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      console.log(event);
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;
      console.dir(this.$refs.userText)
      this.message = this.$refs.userText.value;
    },
  },
  beforeCreate(){
    console.log("======before create====");
  },
  created() {
    console.log("=====created======")
  },
  beforeMount() {
    console.log("=====beforeMount======")
  },
  mounted(){
    console.log("=====mounted======")
  },
  beforeUpdate(){
    console.log("=====beforeUpdate======")
  },
  updated(){
    console.log("=====updated======")
  },
  beforeUnmount(){
    console.log("=====beforeUnmount======")
  },
  unmounted(){
    console.log("=====unmounted======")
  }
});

app.mount('#app');

setTimeout(()=>{
  app.unmount ();
}, 3000);


//

const data = {
  message: "hello",
  longMessage: "hello world!"
};

const handler = {
  set(target, key, value){
    console.log(target, key, value);
    if(key === 'message'){
      target.longMessage = value;
    }

    target.message = value;
  }
}

const proxy = new Proxy(data, handler);
proxy.message = "hello000";


// console.log(proxy.message);
// console.log(proxy.longMessage);

