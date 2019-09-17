<template>
  <div class="structure-container">
    <div class="from">
      <Form ref="formValidate" :label-width="150">
        <FormItem label="自定义名称">
          <Input placeholder="请输入自定义的名称" v-model="bugsData.stepName" style="width: 200px"></Input>
        </FormItem>
        
      
          <FormItem label="构建物收集">
            <gather></gather>
          </FormItem>
          <FormItem label="findbugs命令">        
            <Input style="width: 150px" v-model="bugsData.peizhi2" placeholder="mvn findbugs:findbugs"/>
           
          </FormItem>
       
     
      </Form>
    </div>
  </div>
</template>
<script>

  import { EventBus } from '@/tools';
  import gather from '../common/gather';
  
  export default {
    data() {
      return {
        bugsData: {
         
        }
      }
    },
    created(){
       },
    mounted(){
        EventBus.$on('add_findbugsCheck', this.submitdata);
        EventBus.$on('edit_findbugsCheck', this.editfindbugs);
        EventBus.$on('echo_step_findbugsCheck', this.echostepfindbugs);
        EventBus.$on('echo_findbugsCheck', this.echofindBugs);
    },
    methods: {
      submitdata(info){
        let _findBugsData = null;
        let gatherList = this.$store.getters.gatherList;
        if(this.bugsData.stepName == undefined){
          _findBugsData = Object.assign({}, 
                                        {stepId: 'findbugsCheck'},
                                        {stepName: info.typeIdName, gather: gatherList}, 
                                        this.bugsData);
         
        }else{
          _findBugsData = Object.assign({}, 
                                        {stepId: 'findbugsCheck'},
                                        { gather: gatherList}, 
                                        this.bugsData);
        
        }
           this.$store.dispatch('add_to_stepLists', _findBugsData);
           this.$store.dispatch('initGather');
      },
      echostepfindbugs(item){ 
          this.bugsData = {};
          let _data = this.$store.getters.getSteps;
          let index = item.stepIndex;
         
          this.bugsData =  Object.assign( {},  _data[index]);
          this.$store.dispatch('echo_gather', this.bugsData.gather);
      
      },
      echofindBugs(info){
         this.bugsData = Object.assign({}, info);
      },
      editfindbugs(info){
        this.$store.dispatch('editStep', {index: info, data: this.bugsData });
    
      }
    },
    components: {
      gather
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
