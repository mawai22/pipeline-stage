<template>
  <Sider collapsible :collapsed-width="78" class="aside-bar" v-model="isCollapsed">
    <aside-bar class="sider-item" :class="menuitemClasses"></aside-bar>
  </Sider>
</template>
<script>
	import AsideBar from '@/components/aside/asidebar'
	export default {
		data () {
			return {
				isCollapsed: false
			};
		},
		computed: {
			menuitemClasses: function () {
				return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		},
		components: {
			AsideBar
		}
	}
</script>
<style scoped>
  .aside-bar{
    position: fixed;
    left: 0;
    top: 69px;
    overflow-y: auto;
    height: calc(100% - 108px);
    background-color: #21488a;
  }
  .sider-item{
    color: #fff;
    background-color: transparent;
  }
</style>
