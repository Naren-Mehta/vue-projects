<template>
    <div>
        Welcome to prism
        <prism language="bash" :plugins="['command-line']" :code="code"></prism>
    </div>
</template>

<script>

import Prism from 'vue-prismjs';
import 'prismjs/themes/prism.css';

export default {
    components: {
        Prism,
    },
    data () {
        return {
            code: 'npm install vue-prismjs --save'
        }
    }
}
</script>