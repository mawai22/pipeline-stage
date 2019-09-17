<template>
    <div class="structure-container">
        <div class="from">
          <Form ref="formValidate" :label-width="150">
            <FormItem label="自定义名称">
                <Input placeholder="" v-model="waitforInput.stepName" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="提示信息">
                <Input placeholder="" v-model="waitforInput.message" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="授权人">
                <Input placeholder="" v-model="waitforInput.person" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="OK按钮信息">
                <Input placeholder="" v-model="waitforInput.btnMessage" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="提交参数">
                <Input placeholder="" v-model="waitforInput.params" style="width: 200px"></Input>
            </FormItem>      
           
         
          </Form>
        </div>
      </div>
</template>
<script>
  import { EventBus } from '@/tools';
  export default {
    data(){
      return {
        waitforInput: {}
      }
    },
    mounted(){
     
    },
    methods: {
      test(info){
        console.log( 'page >>>  ', info)
      }
    }
  }
</script>
<style scoped>
  
</style>