<template>
  <div>
    <Breadcrumb class="bread" separator=">">
      <BreadcrumbItem v-for="item in breadList" :key="item.value"><span>{{item.value}}</span></BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  import {getBread} from './js/bread'

  export default {
    name: "bread",
    data() {
      return {
        breadList: []
      }
    },
    created() {
      this.getBreadData();
    },
    methods: {
      getBreadData() {
        this.breadList = getBread();
      },
    }
  }
</script>
<style scoped>
  .bread {
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
</style>
