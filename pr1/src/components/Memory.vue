<template>
<div class="mode-btn">
    <button type="button" @click="getMemMode('MC')">MC</button>
    <button type="button" @click="getMemMode('MR')">MR</button>
    <button type="button" @click="getMemMode('M+')">M+</button>
    <button type="button" @click="getMemMode('M-')">M-</button>
</div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MemoryBtn',

    methods: {
        getMemMode: function(mode: string) {
            this.$emit("memory-initialize", mode);
        }
    }

})
</script>