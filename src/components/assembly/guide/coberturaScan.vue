<template>
  <div class="structure-container">
    <div class="from">
      <Form ref="formValidate" :label-width="150">
        <FormItem label="自定义名称">
          <Input v-model="cobertura.stepName" placeholder="请输入自定义的名称" style="width: 200px"></Input>
        </FormItem>
    
      
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        cobertura: {

        }
      }
    }
  }
</script>
<style scoped>
  
</style>