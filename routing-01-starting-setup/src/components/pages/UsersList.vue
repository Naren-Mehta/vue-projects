<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../users/UserItem.vue'

export default {
  inject: ['users'],
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false,
    }
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
    }
  },
  beforeRouteEnter(to, from, next){
    console.log("users beforeRouteEnter ", to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("Users beforeRouteLeave: ", to, from, next);

    if(this.changesSaved){
      next();
    } else {
      const userWantsToLeave = confirm('Are you sure? You got unsaved changes!');
      next(userWantsToLeave);
    }

  },
  unmounted(){
    console.log("User unmounted ");
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>