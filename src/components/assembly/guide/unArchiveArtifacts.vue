<template>
  <Form :label-width="120">
    <Row class="form-box">
      <FormItem label="要解档的文件列表">
        <gather></gather>
      </FormItem>
    </Row>
  </Form>
</template>
<script>
  import gather from '../common/gather';
  export default {
    data(){
      return {}
    },
    components: {
      gather
    }
  }
</script>
<style scoped>

</style>
