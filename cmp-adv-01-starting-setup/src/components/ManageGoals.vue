<template>
    <div>
        <h2>
            This is Manage Goals
        </h2>
        <input type="text" ref="goal"/>
        <button @click="saveGoals()">Add Goals</button>
        <Teleport to="body">
            <error-alert v-if="inputIsInvalid">
            <h2>Input is invalid!</h2>
            <p>Please enter at least a few character!</p>
            <button @click="confirmError">Ok</button>
        </error-alert>
        </Teleport>
    </div>
</template>

<script>

import ErrorAlert from './ErrorAlert';

export default {
    components: {
        ErrorAlert
    },
    data() {
        return {
            inputIsInvalid: false
        }
    },
    methods: {
        saveGoals(){
            const goal = this.$refs.goal.value;
            if(goal === ''){
                this.inputIsInvalid = true;
            }
        },
        confirmError() {
            this.inputIsInvalid = false;
        }
    }
}
</script>