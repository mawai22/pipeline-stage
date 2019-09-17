<template>
  <Layout class="header">
    <my-header isgo=false></my-header>
    <div class="header-under-bar"></div>
  </Layout>
</template>
<script>
  import {headerRouter} from '@/router/routerconfig'
  import MyHeader from 'header'

  export default {
    data() {
      return {
        header: headerRouter
      }
    },
    components: {
      MyHeader
    }
  }
</script>
<style lang="less" scoped>
  .layout-logo {
    // width: 500px;
    height: 52px;
    float: left;
    position: relative;
    top: 6px;
    left: 0;
  }

  .header-logo img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .layout-nav {
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }

  .header-menu {
    background-color: #f9f9f9;
  }

  .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item {
    color: #333;
  }

  .header-under-bar {
    width: 100%;
    height: 10px;
    background-color: #21488a;
  }

  .header-menu-ui {
    float: right;
    height: 64px;
    line-height: 64px;
  }

  .router-link-active {
    color: #21488a;
  }
</style>
