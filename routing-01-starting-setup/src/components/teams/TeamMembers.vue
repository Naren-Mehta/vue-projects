<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role"></user-item>
    </ul>

    <router-link to="/teams/t2">Goto Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props:['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: 'Test',
      members: [],
    };
  },
  created() {
    this.loadTeamMembers(this.teamId);

    console.log("==1=",this.$route.query.sort)
  },
  beforeRouteEnter(to, from, next){
    console.log("Team beforeRouteEnter ", to, from);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Team beforeRouteUpdate ", to, from);
    next();
  },
  watch: {
    teamId(newId) {
    console.log("==2=",this.$route.query.sort)

      this.loadTeamMembers(newId);
    }
  },
  methods: {
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find(team => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];

      for (const member of members) {
        const selectedUser = this.users.find(user => user.id === member);
        selectedMembers.push(selectedUser);
      }

      this.teamName = selectedTeam.name;
      this.members = selectedMembers;
    }
  }
}
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>