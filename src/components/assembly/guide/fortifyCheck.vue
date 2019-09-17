<template>
  <div class="structure-container">
    <div class="from">
      <Form ref="formValidate" :label-width="150">
        <FormItem label="自定义名称">
          <Input v-model="fortify.stepName" placeholder="请输入自定义的名称" style="width: 200px"></Input>
        </FormItem>
    
      
      </Form>
    </div>
  </div>
</template>
<script>
  import { EventBus } from '@/tools';
  export default {
    data() {
      return {
       fortify: {
       
       }
      }
    },
   created(){
     this.echoFortify();
   },
    mounted(){
     
      EventBus.$on('add_fortifyCheck', this.submitData);
      EventBus.$on('edit_fortifyCheck', this.editFortify);
      EventBus.$on('echo_step_fortifyCheck', this.echoData);
      EventBus.$on('echo_fortifyCheck', this.echoFortify)
    },
    methods: {
      submitData(info){
        let _fortifyData = null;
        if(this.fortify.stepName == undefined){
          _fortifyData = Object.assign({}, {stepId: 'fortifyCheck'}, {stepName: info.typeIdName});
       
        }else{
          _fortifyData = Object.assign({}, {stepId: 'fortifyCheck'}, this.fortify);
       
        }
        
        this.$store.dispatch('add_to_stepLists', _fortifyData);
      },
      echoData(item){
        this.fortify = {};
        let _data = this.$store.getters.getSteps;
        let index = item.stepIndex;
        this.fortify =  Object.assign( {},  _data[index]) ;

      },
      editFortify(info){
        console.log(' edit_fortify  >>> ', this.fortify)
        this.$store.dispatch('editStep', {index: info, data: this.fortify });
      },
      echoFortify(){
        let _fortify = this.$store.state.fortifyData.fortify;
     
        this.fortify =  Object.assign({}, this.fortify, _fortify)
      }
    },
    beforeDestroy(){
       EventBus.$off('add_fortifyCheck');
      EventBus.$off('echo_fortifyCheck');
     
    }
  }
</script>
<style scoped>
  .high-level {
    width: 70%;
    margin: 20px auto;
    padding: 10px 0;
    border: 1px solid #21488a;
  }

  .form-label, .form-in-label {
    width: 150px;
    display: inline-block;
    text-align: right;
  }

  .form-in-label {
    width: 100px;
  }
</style>
