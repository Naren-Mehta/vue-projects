export default {
    increment(state) {
      state.counter += 2;
    },
    increase(state, payload) {
      console.log('===mutation increase=state==', state);
      state.counter = state.counter + payload.value;
    },
  }