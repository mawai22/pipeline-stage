<template>
	<div class="add-step">
		<ul class="add-step-ul">
			<li class="add-step-li"			
			v-for="step in list"
			:key="step.typeId"
			@click="selectStep(step)"
			>
			{{step.stepName}}
		</li>
	</ul>
</div>
</template>
<script>
	import { stepList } from '../js/stepList.js'
	export default{
		data() {
			return {
				list: stepList
			}
		},
		methods: {
			selectStep(step) {
				this.$emit('selectStep', step)
			}
		}
	}
</script>
<style scoped>
.add-step{

}
.add-step-ul{
	border: 1px solid #e6e7eb;
	border-radius: 4px;
	box-shadow: 0 1px 5px rgba(0,0,0,.2);
	line-height: 28px;
	padding: 8px 0;
	min-width: 100px;
	max-height: 300px;
	overflow-x: hidden;
	overflow-y: auto;
	background: #fff;
	position: relative;
}
.add-step-li{
	padding: 0 12px;
	line-height: 32px;
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	transition: background .2s ease;
}
.add-step-li:hover{
	background-color: #f2f3f7;
}
</style>