<template>
	<div class="stage-container">
		<div class="stage-box flexContainer">
			<div class="stage-start">
				<div class="stage-start-end-content">开始</div>
			</div>
			<div class="flexContainer">
				<div class="stage-item"
				:class="{'active': index == activeIndex}" 
				v-for="(stage,index) in stageList"
				:key="stage.stageId"				
				>
				<div class="stage-item-content">
					<div class="stage-item-title">
						<input @click.stop="chageStage(stage, index)" value="New stage" v-model="stage.stageName">
					</div>
				</div>
				<div class="stage-add stage-add-before" @click="addBefore(stage)">
					<Icon type="plus-round next-icon"></Icon>
				</div>
				<div class="stage-add stage-add-after" @click="addAfter(stage)">
					<Icon type="plus-round next-icon"></Icon>
				</div>
				<div class="stage-delete" @click="deleteStage(stage)">
					<Icon type="close-round"></Icon>
				</div>
			</div>
			<div class="stage-end" :class="{'active': stageList.length == 0}">
				<div class="stage-start-end-content">结束</div>
				<div class="stage-add" @click="addFirst">
					<Icon type="plus-round next-icon"></Icon>
				</div>
			</div>
		</div>
		<div class="stage-active-arrow">				
		</div>
	</div>
	<div class="stage-info" v-if="stageList.length">
		<div class="stage-info-title">阶段基础信息</div>
		<div class="stage-info-name">
			<Input v-model="activeStage.stageName">
        <span slot="prepend">阶段名称： </span>
    </Input>
		</div>		
	</div>
	<div class="stage-info" v-if="stageList.length">
		<div class="stage-info-title">任务设置</div>
		<step-main v-if="hackReset" :curStage="activeStage"></step-main>
	</div>
	<div class="stage-btn" v-if="stageList.length">
		<div class="">
			<Button>上一步</Button>
			<Button type="success" @click="previewStage">预览</Button>
			<Button type="primary" @click="submitStage">提交</Button>
		</div>
	</div>
</div>
</template>
<script>
	import StepMain from './stepmain'
	import {mapMutations} from 'vuex'
	import {success, error} from '@/base/common';
	export default{
		data() {
			return {
				hackReset: true,
				isHasListLen: false,
				activeIndex: 0,   // 激活当前stage
				activeStage: {},  // 当前的stage
			}
		},
		computed: {
			stageList: {
				get() {
					return this.$store.getters.getStageList || [];
				}
			}
		},
		mounted() {
			this.initStageList();
		},
		methods: {
			initStageList() {
				this.setStage([]);
			},
			// 初始状态下，增加的第一个stage
			addFirst() {
				let stageList = [{stageId: 0, stageName:'new Stage', stepList: []}];
				this.activeIndex = 0;
				this.activeStage = stageList[0];
				// 添加一个stage
				this.setStage(stageList);
			},
			chageStage(stage, index){
				this.hackReset = false
				this.$nextTick(() => {
					this.hackReset = true
				})
				this.activeIndex = index;
				this.activeStage = stage;
				// 强刷
				// stepList 默认显示第一个项;
				this.setStepIndex(0);
				this.setStageId(stage.stageId)
			},
			addBefore(stage) {
				let findIndex = this._findIndex(this.stageList, stage);
				this._insertStage(this.stageList, findIndex);
			},
			addAfter(stage) {
				let findIndex = this._findIndex(this.stageList, stage);
				this._insertStage(this.stageList, findIndex+1);
			},
			deleteStage(stage){
				let findIndex = this._findIndex(this.stageList, stage);
				this._deleteStage(this.stageList, findIndex, this.stageList.length);
			},

			previewStage() {
				if (!this.stageList.length) {error('请添加阶段')}
					console.log(this.stageList);
			},
			submitStage() {
				if (!this.stageList.length) {error('请添加阶段')}
			},

			// 在某个位置添加某一项
			_insertStage(stageList, index) {
				let beforeList = stageList.slice(0, index);
				let afterList = stageList.slice(index);
				afterList.filter(item => {
					return item.stageId ++;
				})
				stageList = [...beforeList,...[{stageId: index, stageName:'new Stage', stepList: []}], ...afterList];
				this.activeIndex = index;
				this.activeStage = stageList[index];
				this.setStageId(stageList[index].stageId)
				// 添加一个stage
				this.setStage(stageList);
				// return stageList;
			},

			// 在某处删除某一项
			_deleteStage(stageList, index, maxLen){
				let beforeList = stageList.slice(0, index);
				let afterList = stageList.slice(index+1);
				// 删除最后一项
				if (index == maxLen-1) {
					stageList = [...beforeList];
				} else {
					afterList.filter(item => {
						return item.stageId --;
					})
					stageList = [...beforeList, ...afterList];
				}
				// 删除的时最后一个 
				// 删除最后一个 激活前一个; 否则，激活当前index值
				if (index == maxLen-1 && maxLen != 1) {
					// 因为删了一个，所以stageList最后一个时 index-1
					this.activeIndex = index-1;
					this.activeStage = stageList[index-1];
					this.setStageId(stageList[index-1].stageId)
				} else if(index < maxLen-1 && maxLen != 1){
					this.activeIndex = index;
					this.activeStage = stageList[index];
					this.setStageId(stageList[index].stageId)
				}
				this.setStage(stageList);
			},

			// 发现当前项的索引
			_findIndex(list, stage) {
				return list.findIndex((item) => {
					return item.stageId === stage.stageId
				})
			},
			...mapMutations({
				setStage: 'SET_STAGE',
				setStageId: 'SET_STAGEID',
				setStepIndex: 'SET_STEPINDEX',
			})
		},
		components: {
			StepMain
		}
	}
</script>
<style scoped>
.flexContainer{
	display: flex;
	flex-wrap: wrap;
	position: relative;
}
.stage-box{
	flex-wrap: nowrap;
	padding: 0 20px 20px;
	border-bottom: 1px solid #DCDEE3;
}
.stage-start, .stage-end{
	position: relative;
	width: 120px;
	padding: 15px 0;
}
.stage-start{
	flex-shrink: 0;
	padding-right: 30px;
}

.stage-start-end-content{
	background: #fff;
	color: #C4C6CF;
	border: 1px solid #C4C6CF;
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	text-align: center;
}
.stage-item{
	line-height: 50px;
	background-color: #fff;
	padding: 10px 30px;
	position: relative;
	cursor: pointer;
}
.stage-item:before{
	content: ' ';
	position: absolute;
	top: 50%;
	left: -30px;
	width: 60px;
	height: 1px;
	background-color: #c4c6cf;
}
.stage-item .stage-item-content{
	color: #333;
	background: #fff;
	border-radius: 3px;
	border: 1px solid #c4c6cf;
	padding: 0;
	text-align: center;
}
.stage-item .stage-item-content:before{
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	border-width: 5px;
	border-style: dashed solid;
	top: 50%;
	left: 26px;
	margin-top: -4px;
	border-color: transparent transparent transparent #c4c6cf;
}
.stage-item.active .stage-item-content{
	border: none;
}
.stage-item .stage-item-title{
	width: 90px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.stage-item .stage-item-title input{
	text-align: center;
	width: 100%;
	border: none;
	outline: 0;
	padding: 0 5px;
}
.active .stage-item-title input{
	background-color: var(--bg, #00c1de);
	color: #fff;
}
.stage-add{
	position: absolute;
	top: 50%;
	border-radius: 100%;
	width: 20px;
	height: 20px;
	line-height: 20px;
	margin-top: -9px;
	background-color: #4E61D4;
	background-color: var(--color-b1-6,#4E61D4);
	color: #fff;
	display: none;
	z-index: 1;
	cursor: pointer;
	text-align: center;
}
.stage-delete{
	text-align: center;
}
.stage-add-before{
	left: -10px;
}
.stage-add-after{
	right: -10px;
}
.stage-item:focus .stage-add, .stage-item:focus .stage-delete,
.stage-item:hover .stage-add, .stage-item:hover .stage-delete{
	display: inline-block;
}
.next-icon{
	text-align: center;
}
.stage-item .stage-delete {
	position: absolute;
	top: 1px;
	right: 20px;
	border-radius: 100%;
	width: 20px;
	height: 20px;
	line-height: 20px;
	background-color: #CCC;
	background-color: var(--color-text1-1,#CCC);
	border: 2px solid #fff;
	color: #fff;
	z-index: 1;
	cursor: pointer;
	display: none;
}
.stage-end{
	padding-left: 30px;
}
.stage-end:before {
	content: ' ';
	position: absolute;
	top: 50%;
	left: -30px;
	width: 60px;
	height: 1px;
	background: #C4C6CF;
}
.stage-end .stage-add{
	left: -10px;
}
.stage-end.active .stage-add{
	display: inline-block;
}
.stage-active-arrow {
	position: absolute;
	left: 0;
	bottom: 0;
	margin-left: -14px;
}
.stage-active-arrow:after, .stage-active-arrow:before {
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	border-width: 14px;
	border-style: dashed;
	top: 50%;
	left: 0;
	margin-top: -27px;
	border-color: transparent transparent #fff;
	z-index: 2;
}
.stageActiveArrow:after {
	margin-top: -28px;
	border-color: transparent transparent #DCDEE3;
	z-index: 1;
}
.stage-info{
	border-top: 1px dashed #DCDEE3;
	margin: 30px 20px;
	position: relative;
}
.stage-info-title{
	font-weight: 700;
	position: absolute;
	background: #fff;
	top: -10px;
	padding-right: 10px;
	font-size: 14px;
}
.stage-btn{
	width: 100%;
	text-align: center;
}
.stage-info-name{
	width: 300px;
	padding: 30px 20px 0;
}
</style>