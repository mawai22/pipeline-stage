<template>
	<div class="next-step">
		<div class="next-step-item"
		:class="{'next-step-item-first':step.num=='1',
		'next-step-item-process': stepNum >= step.num,
		'next-step-item-wait': stepNum < step.num,
		'next-step-item-last': step.num == '3'
		}"
		v-for="step in stepList"
		:key="step.num"
		>
		<div class="next-step-item-container">
			<div class="next-step-item-title">
				<span class="next-step-arrow-num">{{step.num}}</span>
				<span>{{step.info}}</span>
			</div>
		</div>
	</div>

</div>
</template>
<script>
	export default{
		props: {
			stepNum: {
				type: String,
				default: '1'
			}
		},
		data(){
			return {
				stepList: [{
					num: 1,
					info: '基本信息'
				},
				{
					num: 2,
					info: '步骤'
				},
				{
					num: 3,
					info: '预览'
				}
				]
			}
		}
	}
</script>
<style scoped>
.next-step {
	width: 100%;
	overflow: hidden;
	position: relative;
	border: none;
	display: flex;
}
.next-step-item {
	display: inline-block;
	position: relative;
	text-align: center;
	vertical-align: top;
	flex: 1;
}
.next-step .next-step-item {
	height: 28px;
	line-height: 28px;
	margin-left: 14px;
	margin-right: 3.5px;
}
.next-step .next-step-item-process {
	background: #00c1de;
}
.next-step .next-step-item-first {
	margin-left: 0;
}

.next-step .next-step-item:before {
	content: "";
	position: absolute;
	left: -14px;
	top: 0;
	z-index: 1;
	border-left-color: transparent;
	border: 14px solid transparent;
}
.next-step-item-process:before {
	border: 14px solid transparent;
	border-left-color: transparent;
}

.next-step .next-step-item-process:before {
	border: 14px solid #00c1de;
	border-left-color: transparent;
}

.next-step .next-step-item-first:before {
	border: 14px solid transparent;
}
.next-step .next-step-item:after {
	content: "";
	position: absolute;
	right: -14px;
	top: 0;
	z-index: 1;
	border-top: 14px solid transparent;
	border-bottom: 14px solid transparent;
	border-left: 14px solid transparent;
}
.next-step .next-step-item-process:after {
	border-left-color: #00c1de;
}
.next-step-item-container {
	min-width: 100px;
	height: 28px;
	cursor: default;
}
.next-step-item-title {
	height: 28px;
	line-height: 28px;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: left;
	padding-left: 14px;
}
.next-step-item-process .next-step-item-title{
	color: #fff;
}
.next-step-arrow-num {
	display: inline-block;
	width: 16px;
	height: 16px;
	background: #fff;
	border-radius: 100%;
	text-align: center;
	position: relative;
	line-height: 16px;
	margin-right: 8px;
}
.next-step-item-process .next-step-arrow-num {
	color: #00c1de;
}
.next-step-item-wait {
	background: #d7d8d9;
}
.next-step .next-step-item-wait:before {
	border: 14px solid #d7d8d9;
	border-left-color: transparent;
}
.next-step .next-step-item-wait:after {
	border-left-color: #d7d8d9;
}
.next-step .next-step-item-last:after {
	border: 14px solid transparent;
}
</style>