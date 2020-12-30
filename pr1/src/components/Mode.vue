<template>
<div class="mode-btn">
    <button type="button" @click="getMode('C')">C</button>
    <button type="button" @click="getMode('AC')">AC</button>
    <button type="button" @click="getMode('GT')">GT</button>
</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModeBtn',

    methods: {
        getMode: function(mode: string) {
            this.$emit("modes-initialize", mode);
            console.log(mode);
        }
    }

})
</script>