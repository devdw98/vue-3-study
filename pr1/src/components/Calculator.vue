<template>
<div class="main">
    <h1>Calculator</h1>
    <number @number-initialize="setNum"></number>
    <button type="button" @click="setFloat">.</button>
    <symbols @symbol-initialize="setSymbol"></symbols>
    <modes @modes-initialize="setMode"></modes>
    <memory @memory-initialize="setMode"></memory>
    <h3>{{ objStr }}</h3>
    <!-- <h5 v-for="(obj, id) in objList" :key="id">{{obj}} </h5> -->

    <h1>{{resNum}}</h1>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Number from './Number.vue';
import Symbols from './Symbols.vue';
import Modes from './Mode.vue';
import Memory from './Memory.vue';

type Operator = '+' | '-' | '*' | '/';
type Mode = 'C' | 'AC' | 'GT' | 'MC' | 'MR' | 'M+' | 'M-';

const calculateFunc: Record<Operator, (num1: number, num2: number)=> number> = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2
};

export default defineComponent({
    name: 'Calculator',
    components: {
        Number,
        Symbols,
        Modes,
        Memory
    },

    data(){
        return {
            isDot: false,
            decimalCnt: 0,
            num: 0,
            resNum: 0,
            memNum: 0,
            preSym:'' as Operator,
            numList: [] as number[],
            resList: [] as number[],
            objList: [] as any[],
            objStr: '' as string
        }
    },
    
    methods: {
        setNum(inputNum: number){
            if(this.isDot){
                this.decimalCnt++;
                let i = 0;
                while(i < this.decimalCnt){
                    inputNum /= 10;
                    i++;
                }
                this.num = this.num + inputNum
            } else{
                this.num = this.num * 10 + inputNum;
            }
        },
        
        setFloat(){
            this.isDot = true;
        },

        setSymbol(symbol: Operator){
            if(this.num != 0){
                this.numList.push(this.num);
                this.objStr = this.objStr.concat(' ', this.num.toString());
                this.num = 0;
                this.isDot = false;
            }
            const len = this.numList.length;
            if(symbol.localeCompare('=')){ //=이 아니면
                this.objStr = this.objStr.concat(' ', symbol);
                this.resNum = this.resNum != 0? calculateFunc[this.preSym](this.resNum, this.numList[len-1]) : this.numList[len-1];
                this.preSym = symbol;
            }else{
                this.objStr = this.objStr.concat(' ',this.preSym);
                this.objStr = this.objStr.concat(' ',)
                this.resNum = this.resNum != 0? calculateFunc[this.preSym](this.resNum, this.numList[len-1]) : this.numList[len-1];
                this.resList.push(this.resNum);
            }
        },
        setMode(mode: Mode){
            switch(mode){
                case 'C':
                    this.modeC();
                    break;
                case 'AC':
                    this.modeAC();
                    break;
                case 'GT':
                    this.modeGT();
                    break;
                case 'MC':
                    this.modeMC();
                    break;
                case 'MR':
                    this.modeMR();
                    break;
                case 'M+':  
                    this.modeMP(this.num != 0? this.num : this.resNum);
                    break;
                case 'M-':
                    this.modeMM(this.num != 0? this.num : this.resNum);
                    break;
            }
        },

        modeC(){
            this.num = 0;
            this.resNum = 0;
            this.isDot = false;
            this.objStr = '';
        },
        modeAC(){
            this.numList = [];
            this.resList = [];
            this.modeC();
        },
        modeGT(){
            this.resNum = 0;
            for(let n of this.resList){
                this.resNum += n;
            }
        },
        modeMC(){
            this.memNum = 0;
        },
        modeMR(){
            this.resNum = this.memNum;
        },
        modeMP(curNum: number){
            this.memNum += curNum;
        },
        modeMM(curNum: number){
            this.memNum -= curNum;
        }
    },
})
</script>