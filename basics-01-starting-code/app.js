const app = Vue.createApp({
    data(){
        return {
            courseGoal: 'Finish the course and learn Vue!',
            vueLink: 'https://vuejs.org/',
            courseGoalA: 'Vue JS',
            courseGoalB: 'React JS'
        }
    },
    methods: {
        outputGoal(){
            const randomNumber = Math.random();
            return randomNumber > 0.5 ? this.courseGoalA : this.courseGoalB;
        }
    }
});

app.mount('#user-goal');