<template>
  <div class="guide-container">
    <div class="guite-process">
      <Row class="code-row-bg" type="flex">
        <div id="step-wrapper">
            <assemblyStageItem></assemblyStageItem>
        </div>
      </Row>

    </div>
    <div class="stepContent" v-if="contentShow">
        <Row :gutter="12">
            <div class="stage-wrapper">
              <Col span="8">
                <Input v-model="stage.stageName"
                       @on-blur="showName">
                  <span slot="prepend">定义阶段名称</span>
                </Input>
              </Col>
              <Col span="8">
                <Select v-model="stage.transferMode"
                        @on-query-change="showOrHidden"
                        style="width:200px">
                  <Option value="auto">自动流转</Option>
                  <Option value="hand">手动流转</Option>
                </Select>
              </Col>
              <Col v-if="transferPersonShow" span="8">
                <Input v-model="stage.transferPerson">
                  <span slot="prepend">流转人</span>
                </Input>
              </Col>
            </div>
          </Row>
      <guide-content ></guide-content>
      <router-link to="/assembly/preview" tag="Button">确定</router-link>
      <router-link to="/assembly/create" tag="Button">预览</router-link>
    </div>
  </div>
</template>
<script>

  import Sortable from 'sortablejs';
  import assemblyStageItem from './guide/assemblystage-item';
  import GuideContent from './guide/guidecontent';
  import { EventBus } from '@/tools';
  export default {
    data() {
      return {
        activeStage: 0,
        transferPersonShow: true,
        stage: {

        },


      }
    },
    created(){
     },

    mounted() {

      EventBus.$on('on-blur', this.showName);
      EventBus.$on('initStageBase', this.intiStageBaseHandle); //
      EventBus.$on('echoStage', this.echoStage); // 监听 stage-item 的 回显 事件;
      EventBus.$on('saveStage', this.saveStage); // 保存 stage;
      EventBus.$on('deleteStage', this.deleteStage); // 删除 stage;
      EventBus.$on('add_toStageState', this.add_toStageStateHandle);
    },
    beforeDestory(){

    },
    computed: {

      contentShow(){
        return this.$store.getters.showStage;

      },

    },

    methods: {
      intiStageBaseHandle(){
          this.stage = Object.assign({}, this.stage, {stageName: '', transferMode: 'auto', transferPerson: ''})
      },
      showName(){
        this.$store.dispatch('show_stageName', this.stage);
      },
      showOrHidden(){
        if(this.stage.transferMode == 'auto'){
          this.transferPersonShow = false;
        }else{
          this.transferPersonShow = true;
        }
      },
      echoStage(info){
      this.stage =  Object.assign({}, this.stage, info);
      this.activeStage = info.stageId;
      this.showOrHidden();
      let stage = this.stage;
      let stages = this.$store.state.stageState.stageList;
      console.log(' stages  >>>  ', stages.length)
      for(let i = 0; i < stages.length; i++){
        if(stages[i].stageId == info.stageId){
          stages[i].active = true;
        }else{
          stages[i].active = false;
        }
      }
      EventBus.$emit('echoStep', { activeStage: info.stageId, stepList: stage.stepList});
      EventBus.$emit('echoComponent',stage.stepList);

      },
      saveStage(info){
          this.$store.dispatch('save_step_to_stage', this.activeStage);
      },
      deleteStage(info){
        this.$store.dispatch('delete_stage', info);
      },
      add_toStageStateHandle(){
        let steps = this.$store.getters.getSteps;
        let stages = this.$store.state.stageState;
        let stageIndex = stages.stageCount - 2;

       Object.assign( stages.stageList[stageIndex], this.stage);
       this.$store.dispatch('add_step_to_stage');
      }

    },

    components: {
      assemblyStageItem,
      GuideContent
    }
  }
</script>

<style scoped lang="less">
  .icon-cricle,
  .icon-add {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #637ead;
    border-radius: 50%;
    text-align: center;
    color: #fff;
  }

  .icon-arrow,
  .icon-add {
    font-size: 20px;
    font-weight: bold;
  }
 #step-wrapper{
   width: 100%;
 }
  .guite-process {
    min-height: 80px;

  }
</style>
