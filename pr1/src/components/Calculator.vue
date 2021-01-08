<template>
	<div class="main">
		<h1>Calculator</h1>
		<div class="number-btn">
			<button type="button" @click="setNum(1)">1</button>
			<button type="button" @click="setNum(2)">2</button>
			<button type="button" @click="setNum(3)">3</button>
			<button type="button" @click="setNum(4)">4</button>
			<button type="button" @click="setNum(5)">5</button>
			<button type="button" @click="setNum(6)">6</button>
			<button type="button" @click="setNum(7)">7</button>
			<button type="button" @click="setNum(8)">8</button>
			<button type="button" @click="setNum(9)">9</button>
			<button type="button" @click="setNum(0)">0</button>
			<button type="button" @click="setFloat">.</button>
		</div>
		<div class="symbol-btn">
			<button type="button" @click="setSymbol('+')">+</button>
			<button type="button" @click="setSymbol('-')">-</button>
			<button type="button" @click="setSymbol('*')">*</button>
			<button type="button" @click="setSymbol('/')">/</button>
			<button type="button" @click="setSymbol('=')">=</button>
		</div>
		<div class="mode-btn">
			<button type="button" @click="setMode('C')">C</button>
			<button type="button" @click="setMode('AC')">AC</button>
			<button type="button" @click="setMode('GT')">GT</button>
			<button type="button" @click="setMode('MC')">MC</button>
			<button type="button" @click="setMode('MR')">MR</button>
			<button type="button" @click="setMode('M+')">M+</button>
			<button type="button" @click="setMode('M-')">M-</button>
		</div>
		{{ num }}
		<hr />
		{{ history }} =

		<strong>{{ resultNum }}</strong>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Operator = '+' | '-' | '*' | '/' | '';
type Mode = 'C' | 'AC' | 'GT' | 'MC' | 'MR' | 'M+' | 'M-';

const calculateFunc: Record<
	Operator,
	(num1: number, num2: number) => number
> = {
	'+': (num1, num2) => num1 + num2,
	'-': (num1, num2) => num1 - num2,
	'*': (num1, num2) => num1 * num2,
	'/': (num1, num2) => num1 / num2,
	'': (num1, num2) => 0,
};

export default defineComponent({
	name: 'Calculator',

	data() {
		return {
			isDot: false,
			decimalCount: 0,
			num: 0,
			resultNum: 0,
			memoryNum: 0,
			preSymbol: '' as Operator,
			numList: [] as number[],
			resultList: [] as number[],
			history: '',
		};
	},

	methods: {
		setNum(inputNum: number) {
			if (this.isDot) {
				this.decimalCount++;
				let i = 0;
				while (i < this.decimalCount) {
					inputNum /= 10;
					i++;
				}
				this.num = this.num + inputNum;
			} else {
				this.num = this.num * 10 + inputNum;
			}
		},

		setFloat() {
			this.isDot = true;
		},

		setSymbol(symbol: Operator) {
			if (this.num !== 0) {
				this.numList.push(this.num);
				this.history = this.history.concat(' ', this.num.toString());
				this.num = 0;
				this.isDot = false;
			}
			const len = this.numList.length;
			if (symbol.localeCompare('=')) {
				//=이 아니면
				// this.history = this.history.concat(
				// 	' ',
				// 	this.numList[len - 1].toString()
				// );
				this.history = this.history.concat(' ', symbol);
				this.resultNum =
					this.resultNum !== 0
						? calculateFunc[this.preSymbol](
								this.resultNum,
								this.numList[len - 1]
						  )
						: this.numList[len - 1];
				this.preSymbol = symbol;
			} else {
				this.resultNum =
					this.resultNum !== 0
						? calculateFunc[this.preSymbol](
								this.resultNum,
								this.numList[len - 1]
						  )
						: this.numList[len - 1];
				this.resultList.push(this.resultNum);
			}
		},
		setMode(mode: Mode) {
			switch (mode) {
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
					this.modeMP(this.num !== 0 ? this.num : this.resultNum);
					break;
				case 'M-':
					this.modeMM(this.num !== 0 ? this.num : this.resultNum);
					break;
			}
		},

		modeC() {
			this.num = 0;
			this.resultNum = 0;
			this.isDot = false;
			this.history = '';
		},
		modeAC() {
			this.numList = [];
			this.resultList = [];
			this.modeC();
		},
		modeGT() {
			this.resultNum = 0;
			this.resultNum = this.resultList.reduce((total, n) => {
				return total + n;
			}, 0);
		},
		modeMC() {
			this.memoryNum = 0;
		},
		modeMR() {
			this.resultNum = this.memoryNum;
		},
		modeMP(curNum: number) {
			this.memoryNum += curNum;
		},
		modeMM(curNum: number) {
			this.memoryNum -= curNum;
		},
	},
});
</script>
