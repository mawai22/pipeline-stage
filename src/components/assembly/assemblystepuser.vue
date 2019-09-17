<template>
  <Form>
    <FormItem label="构建参数定义:">
      <Input type="textarea" :autosize="{minRows: 5,maxRows: 15}"/>
    </FormItem>
    <FormItem label="构建脚本:">
      <Input type="textarea" :autosize="{minRows: 5,maxRows: 15}"/>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit()">确定</Button>
      <Button type="ghost" @click="handleReset()" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      handleSubmit() {
        this.$router.push({path: '/assembly/preview'});
      }
    }
  }
</script>
