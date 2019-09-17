<template>
	<Menu ref="asideName" width="auto">
		<Menu-Item :name="aside.path" class="aside-option" :key="aside.name" v-for="aside in asideList">
			<router-link tag="div" class="router-span" :to="aside.path">
				<Icon :type="aside.icon"></Icon>
				<span v-text="aside.title"></span>
			</router-link>
		</Menu-Item>
	</Menu>
</template>
<script>
	import {asideRouter} from '@/router/routerconfig'
	export default {
		data() {
			return {
				asideList: [],
				curRouterName: '',
				curRouterPath: '',
				routerobj: {},
			}
		},
		watch: {
			$route: {
				handler(curRouter, oldVal) {
					this.curRouterName = curRouter.name;
					this.curRouterPath = curRouter.path;
					this.setAsideList();
				},
				deep: true
			},
		},
		created() {

			this.curRouterName = this.$router.history.current.name;
			this.curRouterPath = this.$router.history.current.path;
			this.setAsideList();

		},
		methods: {
			openhh() {
				window.location.href='./hello.html';
			},
			// 将当前路由与routerconfig项进行匹配 返回配置信息
			setAsideList () {
				var self = this;
				this.routerobj = asideRouter;
				let obj = this.routerobj.find(item => {
					return this.curRouterName.includes(item.name) === true;
				})
				this.asideList = obj.list;
				this.$nextTick(() => {
					this.$refs.asideName.currentActiveName = this.curRouterPath;
					return
				})
			}
		}
	}
</script>
<style scoped>
  .aside-option{
    color: #ccc;
  }
  .aside-option:hover{
    background-color: #637ead;
    color: #fff;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    color: #fff;
    background-color: #637ead;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    padding: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item{
    border-right: none;
  }
</style>
