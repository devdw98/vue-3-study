<template>
    <number @number-initialize=setNum2></number>
    <symbols @symbol-initialize=setSymbol></symbols>
    <modes @modes-initialize=runMode></modes>
    <memory @memory-initialize=memoryMode></memory>

    <div class="main">
        <h2>{{objList}}</h2>
        <h2> {{num}}</h2>
        
        <h2>nums: {{numList}}</h2>
        <!-- <h2>symbols: {{symList}}</h2> -->
        <h2>resultList (for GT): {{resList}}</h2>
        <!-- <h2>objList: </h2> -->
        <h1>{{calculate}}</h1>
        <h1>memoryNum: {{memoryCompute}}</h1>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Number from './Number.vue';
import Symbols from './Symbols.vue';
import Modes from './Mode.vue';
import Memory from './Memory.vue';

export default defineComponent({
    name: 'Calculator',
    components: {
        Number,
        Symbols,
        Modes,
        Memory,
    },
    data() {
        return {
            status: false, //결과 저장: true, 저장 안함: false
            numCount: 0,
            objCount:0,
            resCount:0,
            preSym:'',
            curSym:'',
            memSym:'',
            numList: [] as number[],
            resList:[] as number[],
            objList:[] as any[],
            num: 0, //inputNum
            memoryNum: 0,
            resNum: 0, 
        }
    },
    methods: {
        setNum2: function(inum: number){
            this.num = this.num*10+inum;
        },
        
        setSymbol: function(data: string){
            if(this.num === 0){ 
                //숫자가 0이면 저장 안함
            }else{
                this.numList[this.numCount++] = this.num;
                this.objList[this.objCount++] = this.num;
                this.num = 0;
                
            }
            
            if(data.localeCompare('=') === 0){
                if(this.curSym.localeCompare('') != 0){
                    this.preSym = this.curSym;
                    this.curSym = '';
                }
               this.status = true;
            }
            else{
                this.preSym = this.curSym;
                this.curSym = data;
            }
            this.objList[this.objCount++] = data;
            console.log("pre: "+this.preSym+" cur: "+this.curSym);
        },

        runMode: function(mode: string){
            switch(mode){
                case 'C':   
                    this.num = 0;
                    
                    break;
                case 'AC':
                    this.numList = [];
                    this.numCount = 0;
                    this.resList = [];
                    this.resCount = 0;
                    this.num = 0;
                    this.resNum = 0;
                    break;
                case 'GT':
                    let value: number = 0;
                    for(const r of this.resList){
                        value += r;
                    }
                    console.log("value:"+value);
                    this.resNum = value;
                    this.preSym = '';
                    break;
            }
        },
        memoryMode: function(mode: string){
            switch(mode){
                case 'MC':
                    this.memSym = "MC";
                    break;
                case 'MR':
                    this.memSym = "MR";
                    break;
                case 'M+':
                    this.memSym = 'M+';
                    break;
                case 'M-':
                    this.memSym = 'M-';
                    break;
            }
                
        }
    },

    computed: {
        calculate(): number {
            let resultNum : number = 0;//= this.resNum;// this.resList[this.resCount];
            let curNum;
            if(this.numCount === 0){
                curNum = this.num;
                resultNum = this.num;
            }else{
                curNum = this.numList[this.numCount-1];
                resultNum = this.resNum;
            }
            console.log("resNum: "+resultNum);
            console.log("curNum: "+curNum);
                switch(this.preSym){
                case '+':
                    resultNum += this.numList[this.numCount-1];
                    break;
                case '-':
                    resultNum -= this.numList[this.numCount-1];
                    break;
                case '*':
                    resultNum *= this.numList[this.numCount-1];
                    break;
                case '/':
                    resultNum /= this.numList[this.numCount-1];
                    break;
                }
                console.log("result: "+resultNum);
                this.resNum = resultNum;
                
                if(this.status == true){ // = 입력
                    this.resList[this.resCount++] = resultNum;
                    console.log("resCount: "+this.resCount);
                    this.resNum = 0;
                    this.status = false;
                }
            return resultNum;
        },
        memoryCompute: function( ) :number {
            let temp;
            if(this.num === 0){
                temp = this.resList[this.resCount-1];//this.resNum;
            }else{
                temp = this.num;
            }
            console.log("temp: "+temp);
            switch(this.memSym){
                case 'M+':
                    console.log("1."+this.memSym);
                    this.memoryNum += temp; //계산 후 저장되는 곳
                    console.log(this.memoryNum);
                    this.num = 0;
                    break;
                case 'M-':
                    console.log("2."+this.memSym);
                    this.memoryNum -= temp; //계산 후 저장되는 곳
                    this.num = 0;
                    break;
                case 'MC':
                    this.memoryNum = 0;
                    break;
                case 'MR':
                    this.resNum = this.memoryNum;
                    break;
            }
            this.memSym = '';
            return this.memoryNum;
        }
    }

})
</script>