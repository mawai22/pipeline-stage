<template>
  <Form :label-width="120">
    <Row class="form-box">
      <FormItem label="要stash的文件列表">
        <gather></gather>
      </FormItem>
    </Row>
    <Row class="form-box">
      <FormItem label="要排除的文件列表">
        <gather></gather>
      </FormItem>
    </Row>
    <Row class="form-box">
      <Checkbox>允许文件为空</Checkbox>
    </Row>
  </Form>
</template>
<script>
  import gather from '../common/gather';

  export default {
    data() {
      return {}
    },
    components: {
      gather
    }
  }
</script>
<style scoped>
  .form-box {
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ccc;
  }
</style>
