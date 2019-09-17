<template>
	<Form :model="shellScript" :label-width="120" id="form">
		<FormItem label="自定名称">
			<Input v-model="shellScript.stepName" placeholder="请输入自定义名称: 默认为步骤名称"></Input>
		</FormItem>
		<FormItem label="shell脚本编写区域">
			<Input type="textarea" :rows="4" v-model="shellScript.shellTextStr" placeholder="请输入脚本"></Input>
		</FormItem>
	</Form>
</template>
<script>
	import {mapMutations, mapActions} from 'vuex';
	export default{
		data(){
			return {
				shellScript: {
					stepName: '自定义shell脚'
				}
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			shellScript: {
				handler(val){
					this.changeStep(this.shellScript);
				},
				deep: true
			}
		},
		methods: {
			init() {
				this.initCurStep();
				this.shellScript = this.$store.state.Step.curStep;
			},
			...mapActions([
				'changeStep',
				'initCurStep'
			])
		}
	}
</script>