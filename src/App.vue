<template>
  <Layout id="app" class="layout">
    <my-header></my-header>
    <Layout class="my-content">
      <Content class="app-content">
        <my-aside></my-aside>
        <my-content></my-content>
      </Content>
    </Layout>
    <div style="height: 40px;overflow: hidden">
      <my-footer></my-footer>
    </div>
  </Layout>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import MyAside from '@/components/aside/aside'
  import MyContent from '@/components/content/content'
  import MyFooter from 'foot'
  export default {
    name: 'App',
    data() {
      return {
      }
    },

    components: {
      MyHeader,
      MyAside,
      MyContent,
      MyFooter
    }
  }
</script>
<style lang="less">
@import './less/index.less';
html, body {
  height: 100%;
}

.layout {
  position: relative;
  height: 100%;
}

.my-content {
  padding-top: 90px;
  height: calc(100% - 130px);
  width: 100%;
  background-color: #fff !important;
  overflow-y: auto;
  flex-direction: row !important;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 69px;
  overflow: hidden;
  background: #f9f9f9 !important;
}

.router-span {
  display: block;
  width: 100%;
  height: 100%;
}

.layout-footer-center {
  background: #21488a !important;
  color: #fff;
  z-index: 100;
}

.ivu-layout-sider-trigger {
  width: 40px !important;
  top: 50%;
  left: 160px;
  font-size: 20px;
  background: transparent !important;
}

.ivu-layout-sider-trigger-collapsed {
  left: 48px;
  width: 40px !important;
}
</style>
