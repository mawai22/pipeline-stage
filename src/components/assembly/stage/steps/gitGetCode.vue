<template>
	<Form :model="gitGetCode" :label-width="80" id="form">
		<FormItem label="自定名称">
			<Input v-model="gitGetCode.stepName" placeholder="请输入自定义名称: 默认为步骤名称"></Input>
		</FormItem>
	</Form>
</template>
<script>
	import {mapMutations, mapActions} from 'vuex';
	export default{
		data(){
			return {
				gitGetCode: {
					stepName: 'gitGetCode'
				},
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			gitGetCode: {
				handler(val){
					this.changeStep(this.gitGetCode);
				},
				deep: true
			}
		},
		methods: {
			init() {
				this.initCurStep();
				this.gitGetCode = this.$store.state.Step.curStep;
			},
			...mapActions([
				'changeStep',
				'initCurStep'
			])
		}
	}
</script>