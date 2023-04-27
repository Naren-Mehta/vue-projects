import { createStore } from 'vuex';

import rootMutations from './mutations.js';
import rootGetters from './getters.js';

import counterModule from './modules/counter/index.js';

const store = createStore({
  modules: {
    numbers: counterModule,
  },
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: rootMutations,
  actions: {},
  getters: rootGetters,
});

console.log('=====', rootGetters, rootMutations);

export default store;
