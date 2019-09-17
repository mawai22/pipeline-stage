<template>
  <div class="structure-container">
    <div class="from">
      <Form ref="formValidate" :label-width="150">
        <FormItem label="自定义名称">
          <Input placeholder="请输入自定义的名称" v-model="nodeJs.stepName" style="width: 200px"></Input>
        </FormItem>
        
      
          <FormItem label="构建物收集">
            <gather></gather>
          </FormItem>
          <FormItem label="nodejs命令">        
            <Input style="width: 150px" v-model="nodeJs.command" placeholder="mvn findbugs:findbugs"/>
           
          </FormItem>
       
     
      </Form>
    </div>
  </div>
</template>
<script>
   import { EventBus } from '@/tools';
   import gather from '../common/gather';
 
  export default {
    data(){
      return {
        nodeJs: {

        }
      }
    },
    mounted(){
      EventBus.$on('add_nodejsCompile', this.addNodeJsData);
      EventBus.$on('edit_nodejsCompile', this.editNodeJsCompile);
      EventBus.$on('echo_step_nodejsCompile', this.echoStepNodejsCompile);
      EventBus.$on('echo_nodejsCompile', this.echoNodeJsCompile);
    },
    methods: {
      addNodeJsData(info){
        let _nodeJsData = null;
        let gatherList = this.$store.getters.gatherList;
        if(this.nodeJs.stepName == undefined){
          _nodeJsData = Object.assign({},
                                      {stepId: 'nodejsCompile'},
                                      {stepName: info.typeIdName, gather: gatherList}, 
                                       this.nodeJs);
        }else{
          _nodeJsData =  Object.assign({}, 
                                        {stepId: 'nodejsCompile'},
                                        {gather: gatherList}, 
                                        this.nodeJs);
        }

        this.$store.dispatch('add_to_stepLists', _nodeJsData);
        this.$store.dispatch('initGather');
      },
      echoStepNodejsCompile(item){
        this.nodeJs = {};
        let _data = this.$store.getters.getSteps;
        let index = item.stepIndex;
         
        this.nodeJs =  Object.assign( {},  _data[index]);
        this.$store.dispatch('echo_gather', this.nodeJs.gather);
      
      },
      echoNodeJsCompile(info){
         this.nodeJs = Object.assign({}, info);
      },
      editNodeJsCompile(info){
        this.$store.dispatch('editStep', {index: info, data: this.nodeJs });
    
      }
    },
    components: {
      gather
    }
  }
</script>
<style scoped>
  
</style>