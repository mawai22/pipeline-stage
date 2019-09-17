<template>
    <Form>
        <Row class="form-box">
          <FormItem label="自定义名称">
              <Input placeholder="请输入自定义的名称" v-model="addEvn.stepName" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="shell脚本编写区域">
            <Input type="textarea" :rows="4" style="width: 250px"/>
          </FormItem>
        </Row>
      </Form>
</template>
<script>
  export default {
    data(){
      return {
        addEvn: {}
      }
    }
  }
</script>
<style scoped>
  
</style>