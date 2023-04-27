<template>
    {{ isLoggedIn }}====
    <button @click="login" v-if="!isLoggedIn">Login</button>
    <button @click="logout" v-else>Logout</button>
    <p> {{ testAuth }}</p>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapGetters('numbers', ['testAuth']),
    },
    methods: {
        ...mapMutations(['login', 'logout'])
    }
}
</script>