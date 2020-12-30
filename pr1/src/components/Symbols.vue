<template>
    <div class="symbol-btn">
        <button type="button" @click="getSymbol('+')">+</button>
        <button type="button" @click="getSymbol('-')">-</button>
        <button type="button" @click="getSymbol('*')">*</button>
        <button type="button" @click="getSymbol('/')">/</button>
        <button type="button" @click="getSymbol('=')">=</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Symbols',

    methods: {
        getSymbol: function(data: string){
            this.$emit("symbol-initialize", data);
        //    console.log(data);
        }
    }
})
</script>