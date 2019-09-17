<template>
	<Form :model="mavenCompile" :label-width="80" id="form">
		<FormItem label="自定名称">
			<Input v-model="mavenCompile.stepName" placeholder="请输入自定义名称: 默认为步骤名称"></Input>
		</FormItem>
		<FormItem label="私服地址">
			<Input v-model="mavenCompile.mavenCommand" placeholder=""></Input>
		</FormItem>
		<FormItem label="maven命令">
			<Input v-model="mavenCompile.mingling" placeholder=""></Input>
		</FormItem>
	</Form>
</template>
<script>
	import {mapMutations, mapActions} from 'vuex';
	export default{
		data(){
			return {
				mavenCompile: {
					stepName: 'maven编译'
				}
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			mavenCompile: {
				handler(val){
					this.changeStep(this.mavenCompile);
				},
				deep: true
			}
		},
		methods: {
			init() {
				this.initCurStep();
				this.mavenCompile = this.$store.state.Step.curStep;
			},
			...mapActions([
				'changeStep',
				'initCurStep'
			])
		}
	}
</script>