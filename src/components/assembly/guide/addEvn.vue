<template>
  <Form>
    <Row class="form-box">
      <FormItem label="自定义名称">
          <Input placeholder="请输入自定义的名称" v-model="addEvn.stepName" style="width: 200px"></Input>
      </FormItem>
      <FormItem label="环境变量列表">
        <Input type="textarea" :rows="4" style="width: 250px"/>
      </FormItem>
    </Row>
  </Form>
</template>
<script>
  export default {
    data(){
      return {
        addEvn: {

        }
      }
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
