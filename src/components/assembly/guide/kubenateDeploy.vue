<template>
  <Form :label-width="120">
    <Row class="form-box">
      <h4>环境1</h4>
      <FormItem label="环境唯一标识">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="k8s集群地址">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="用户名">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="密码">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="部署文件路径">
        <Input style="width: 200px"/>
      </FormItem>
    </Row>
    <Row class="form-box">
      <h4>环境2</h4>
      <FormItem label="环境唯一标识">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="k8s集群地址">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="用户名">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="密码">
        <Input style="width: 200px"/>
      </FormItem>
      <FormItem label="部署文件路径">
        <Input style="width: 200px"/>
      </FormItem>
    </Row>
  </Form>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style scoped>
  .ivu-form-item {
    margin-bottom: 10px !important;
  }

  .form-box {
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ccc;
  }
</style>
