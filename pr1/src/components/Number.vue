<template>
    <div class="number-btn">
        <button type="button" @click="getNum(1)">1</button>
        <button type="button" @click="getNum(2)">2</button>
        <button type="button" @click="getNum(3)">3</button>
        <button type="button" @click="getNum(4)">4</button>
        <button type="button" @click="getNum(5)">5</button>
        <button type="button" @click="getNum(6)">6</button>
        <button type="button" @click="getNum(7)">7</button>
        <button type="button" @click="getNum(8)">8</button>
        <button type="button" @click="getNum(9)">9</button>
        <button type="button" @click="getNum(0)">0</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NumberBtn',
    
    data() {
        return{ 
            num: 0,
        }
    },
    
    methods: {
        getNum: function(num: number){
            this.$emit('number-initialize', num);
            console.log(num);
        }
    }
})
</script>