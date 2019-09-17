<template>
  <Layout class="content">
    <!--<div class="content-top">-->
      <!--<Icon type="navicon-round"></Icon>-->
      <!--选择项目-->
      <!--<Select placeholder="选择用户模块" style="width:150px">-->
        <!--<Option value="1">用户模块</Option>-->
        <!--<Option value="2">其他模块</Option>-->
      <!--</Select>-->
    <!--</div>-->
    <Content class="container">
      <main-content></main-content>
    </Content>
  </Layout>
</template>
<script>
	import {asideRouter} from '@/router/routerconfig'
	import MainContent from "@/components/content/maincontent"
	export default{
		data() {
			return {
				curRouterName: '',
				curRouterPath: '',
				curRouterTitle: '',
			}
		},
		created() {
			// this.curRouterName = this.$router.history.current.name;
			// this.curRouterPath = this.$router.history.current.path;
			// this.setBread();
		},
		watch: {
			// $route: {
			// 	handler(curRouter, oldVal) {
			// 		this.curRouterName = curRouter.name;
			// 		this.curRouterPath = curRouter.path;
			// 		this.setBread();
			// 	},
			// 	deep: true
			// },
		},
		methods: {
			setBread () {
				var self = this;
				this.routerobj = asideRouter;

				let obj = this.routerobj.find(item => {
					return this.curRouterName.includes(item.name) === true;
				})
				let curItemConfig = obj.list.find(item => this.curRouterPath === item.path);
				if (typeof curItemConfig == 'undefined') {
					this.curRouterTitle = '';
				} else {
					this.curRouterTitle = curItemConfig.title;
				}
			}
		},
		components: {
			MainContent
		}
	}
</script>
<style scoped>
  .content{
    width: calc(100% - 240px);
    text-align: left;
    margin-left: 220px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .content-top{
    margin: 10px 0;
    padding: 0 15px;
  }
  .container{
    background-color: #fff;
    padding: 15px;
  }
  .ivu-layout-sider-collapsed+.content{
    margin-left: 98px;
    width: calc(100% - 118px);
    transition: all .5s;
  }
</style>
