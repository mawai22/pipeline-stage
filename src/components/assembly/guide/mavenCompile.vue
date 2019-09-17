<template>
  <div class="structure-container">
    <div class="from">
      <Form ref="formValidate" :label-width="150">
        <FormItem label="自定义名称">
          <Input placeholder="请输入自定义的名称" v-model="maven.stepName" style="width: 200px"></Input>
        </FormItem>
        
      
          <FormItem label="构建物收集">
            <gather></gather>
          </FormItem>
          <FormItem label="maven命令">        
            <Input style="width: 150px" v-model="maven.command" placeholder="mvn findbugs:findbugs"/>
           
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
        maven: {

        }
      }
    },
    mounted(){
      EventBus.$on('add_mavenCompile', this.mavenCompileData);
      EventBus.$on('edit_mavenCompile', this.editmavenCompile);
      EventBus.$on('echo_step_mavenCompile', this.echostepmavenCompile);
      EventBus.$on('echo_mavenCompile', this.echomavenCompile);
    },
    methods: {
      mavenCompileData(info){
        let _mavenData = null;
        let gatherList = this.$store.getters.gatherList;
        if(this.maven.stepName == undefined){
          _mavenData = Object.assign({}, 
                                        {stepId: 'mavenCompile'},
                                        {stepName: info.typeIdName, gather: gatherList}, 
                                        this.maven);
         
        }else{
          _mavenData = Object.assign({}, 
                                        {stepId: 'findbugsCheck'},
                                        { gather: gatherList}, 
                                        this.maven);
        
        }
           this.$store.dispatch('add_to_stepLists', _mavenData);
           this.$store.dispatch('initGather');
      },

      editmavenCompile(info){
        this.$store.dispatch('editStep', {index: info, data: this.maven });
    
      },
      echostepmavenCompile(item){
          this.maven = {};
          let _data = this.$store.getters.getSteps;
          let index = item.stepIndex;
         
          this.maven =  Object.assign( {},  _data[index]);
          this.$store.dispatch('echo_gather', this.maven.gather);
      
      },
      echomavenCompile(info){
        this.maven = Object.assign({}, info);
      }


    },
    components: {
      gather
    }
  }
</script>
<style scoped>
  
</style>