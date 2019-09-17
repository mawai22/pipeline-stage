<template>
	<div class="steps-container">
		<div class="steps-lf">
			<div class="add-step">
				<draggable v-model="stepList"
				@end="dragEnd"
				>
					<div class="add-step-main" 
					v-if="stepList.length>0"
					v-for="(step, index) in stepList"
					:key="index"
					@click="changeStep(step, index)"
					>
					<div class="add-step-index">
						<div class="step-index" :class="{'active': index == activeStepIndex}">
							{{index+1}}.
						</div>
					</div>
					<div class="add-step-list" >
						<div class="step-list" :class="{'active': index == activeStepIndex}">
							{{step.stepName}}
							<Icon type="close-round" class="step-list-close" @click.stop="deleteStep(step)"></Icon>
						</div>
					</div>
				</div>
			</draggable>
			<span id="add-step-btn" href="#" @click="clickAddStepBtn">
				<Icon type="plus-round"></Icon>
				添加步骤					
			</span>
			<div class="step-list-menu" v-if="isShowSteplistMenu">
				<steplist-menu @selectStep="choseStep"></steplist-menu>
			</div>
		</div>
	</div>
	<div class="steps-rg" v-if="stepList.length>0">
		<component v-if="hackReset" :is="activeStep.typeId"></component>
	</div>		
</div>
</template>
<script>
	import Vue from 'vue';
	import Draggable from 'vuedraggable';
	import { stepList } from './js/stepList.js';
	import {mapMutations, mapActions} from 'vuex';
	import SteplistMenu from './steps/steplistmenu';
	import {success, error} from '@/base/common';
	// 动态引入组件
	(function initComponent(){
		stepList.filter(item => {
			Vue.component(item.typeId, ()=>
				import(`./steps/${item.typeId}.vue`))
		})
	})();
	export default{
		props: {
			curStage: {
				type: Object,
				default: {}
			}
		},
		data() {
			return{
				isShowSteplistMenu: false,
				activeStepIndex: 0,
				activeStep: {},
				hackReset: true
			}
		},
		computed: {
			stepList: {
				get() {
					// 在store得step中，初始化stepList;
					this.initStepList(this.$store.getters.getStepList || []);
					return this.$store.getters.getStepList || [];
				},
				set(list) {
					this.dragStep(list);
				}
			}
		},
		mounted() {
			let self = this;
			document.onclick = function(e)  {
				if (e.target.id != 'add-step-btn') {
					self.isShowSteplistMenu = false;
				}
			}

			this.initStep();
		},
		methods: {
			dragEnd(event) {
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true
				})
				this.activeStepIndex = event.newIndex;
				this.setStepIndex(event.newIndex);
				this.initCurStep();
			},
			initStep() {
				this.activeStep = stepList[0];
			},
			deleteStep(step) {
				let findIndex = this._findIndex(this.stepList, step);
				this._deleteStep(this.stepList, findIndex, this.stepList.length)
			},
			choseStep(step) {
				// 初始化中的step中没有stepIndex值;
				this.addStep(step);
				this.activeStepIndex = this.stepList.length - 1;
				this.activeStep = step;
				this.setStepIndex(this.activeStepIndex);
			},
			changeStep(step, index) {
				// 强刷
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true
				})
				this.activeStepIndex = index;
				this.activeStep = step;
				this.setStepIndex(step.stepIndex);
			},
			clickAddStepBtn() {
				let len = this.$store.getters.getStageList.length;
				if (len>0) {
					this.isShowSteplistMenu = true;
				}else {
					error('请添加stage');
				}
			},

			// 删除某一个step
			_deleteStep(stepList, index, maxLen){
				let beforeList = stepList.slice(0, index);
				let afterList = stepList.slice(index+1);
				// 删除最后一项
				if (index == maxLen-1) {
					stepList = [...beforeList];
				} else {
					afterList.filter(item => {
						return item.stepIndex --;
					})
					stepList = [...beforeList, ...afterList];
				}

				if (maxLen != 1) {
					this.activeStepIndex = 0;
					this.activeStep = stepList[0];
					this.setStepIndex(stepList[0].stepIndex);
				} 

				this.setSteplist(stepList);
			},
			// 发现当前项的索引
			_findIndex(list, step) {
				return list.findIndex((item) => {
					return item.stepIndex === step.stepIndex
				})
			},
			...mapMutations({
				setSteplist: 'SET_STEPLIST',
				addStep: 'ADD_STEP',
				setStepIndex: 'SET_STEPINDEX',
				initStepList: 'INIT_STEPLIST'
			}),
			...mapActions([
				'dragStep',
				'initCurStep'
			])
		},
		components: {
			SteplistMenu,
			Draggable
		}
	}
</script>
<style scoped>
.steps-container{
	display: flex;
	flex-wrap: wrap;
	position: relative;
}
.steps-lf{
	width: 300px;
	padding: 20px 20px 20px 45px;
}
.steps-rg{
	width: calc(100% - 300px);
	margin: 26px 0;
	border: 1px solid #DCDEE3;
	background-color: #F7F8FA;
	border-radius: 3px;
	padding: 20px;
}
.add-step {
	margin: 10px 25px;
}
.add-step>span{
	color: #00c1de;
	padding-left: 30px;
}
.step-list-menu{
	min-width: 71px;
	position: absolute;
	left: 50px;
}
.add-step-main{
	display: flex;
}
.step-index {
	height: 32px;
	line-height: 32px;
	margin: 6px 10px;
	position: relative;
}
.step-index.active:before, .step-index.active:after{
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	border-width: 14px;
	border-style: dashed solid;
	top: 50%;
	left: 193px;
	margin-top: -13px;
	border-color: transparent #F7F8FA transparent transparent;
	z-index: 2;
}
.step-index.active:after{
	left: 192px;
	border-color: transparent #DCDEE3 transparent transparent;
	z-index: 1;
}
.step-list{
	width: 120px;
	height: 32px;
	line-height: 32px;
	border: 1px solid #DCDEE3;
	border-radius: 3px;
	padding: 0 30px 0 10px;
	margin: 6px 0;
	overflow: hidden;
	position: relative;
	white-space: nowrap;
	text-overflow: ellipsis;
	cursor: pointer;
}
.step-list.active{
	color: #fff;
	background-color: #00c1de;
}
.step-list-close{
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 12px;

}
</style>