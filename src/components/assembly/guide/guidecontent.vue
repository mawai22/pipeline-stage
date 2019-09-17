<template>
  <div class="guide-content">
    <layout>
      <Sider hide-trigger :style="{background: '#fff'}">
      <Menu width="auto" active-name="plus" ref="asideMenu">
            <draggable v-model="curGuideStepItems" 
                      :options="{animation: 300,draggable:'.menu-item-wrapper'}"
                      @end="onEnd">
                <div class="menu-item-wrapper"
                     v-for="(guideItem, index) in curGuideStepItems"
                     :key="index">   
                    <MenuItem
                              v-text="guideItem.stepName"
                              :name="index" 
                              :id="guideItem.stepId + guideItem.stepIndex"
                              @click.native="choseAsideItem(guideItem)">
                    </MenuItem>
                    <Icon size="18"
                          color="blue"
                          type="close-circled"
                          @click="deleteStep(guideItem)"></Icon>  
              </div>
              <div slot="footer" style="text-align: center;margin-top: 10px;">
                <Button type="primary"  shape="circle" icon="plus-round" @click.capture.stop="submitGuide"></Button>
            
              </div>

            </draggable> 
        </Menu>
      

       
      </Sider>
      <Content class="guide-content-box">
    
        <div class="form">
          <Row style="margin-bottom: 20px;">
            <span class="form-label">选择步骤：</span>
            <Select v-model="typeId" style="width: 150px">
              <Option v-for="(step, index) in guideTypeItems" :value="step.typeId" :key="index">
                {{step.name}}
              </Option>
            </Select>
          </Row>
            <keep-alive>

           
            <component v-bind:is="currentComponent"></component>
          </keep-alive>
        </div>
      </Content>
    </layout>
  </div>
</template>

<script>
  import {guideTypeList} from '@/base/commonparam'

  import { EventBus } from '@/tools';
  import draggable from 'vuedraggable';
  import Vue from 'vue';
  Vue.component('none',() => import('./guidenone'));
  Vue.component('gitGetCode', () => import('./gitGetCode'));
  Vue.component('mavenCompile', () => import('./mavenCompile'));
  Vue.component('shellScript', () => import('./shellScript'));
  Vue.component('addEvn', () => import('./addEvn'));
  Vue.component('nodejsCompile', () => import('./nodejsCompile'));
  Vue.component('fortifyCheck',() => import('./fortifyCheck'));
  Vue.component('findbugsCheck',() => import('./findbugsCheck'));
  Vue.component('coberturaScan', () => import('./coberturaScan'));
  Vue.component('archiveArtifacts', () => import('./archiveArtifacts'));
  Vue.component('unArchiveArtifacts', () => import('./unArchiveArtifacts'));
  Vue.component('buildAndpushImage', () => import('./buildAndpushImage'));
  Vue.component('kubenateDeploy', () => import('./kubenateDeploy'));
  Vue.component('wartforInteractiveInput', () => import('./wartforInteractiveInput'));
  Vue.component('stash', () => import('./stash'));

  export default {
    data() {
      return {
        typeId: 'gitGetCode',
        typeIdName: '',
        guideTypeItems: guideTypeList,
        currentComponent: 'none',
        stepActive: 0,                
      
      }
    },
    beforeCreate(){
   },
    created(){
     
    },
    mounted() {
      EventBus.$on('initComponent', this.initComponent);
      EventBus.$on('echoComponent', this.echoComponent);
      EventBus.$on('echoStep', this.echoStep);
      if(this.typeId == 0){
        this.currentComponent = 'none';
      }
    },
    computed: {
      curGuideStepItems: {
        get(){
          return this.$store.getters.getSteps;
        },
        set(value){
          this.$store.dispatch('changeStepIndex', value);
        }
      }
    },
    beforeDestroy(){
      },
    methods: {
      
      submitGuide() {
        EventBus.$emit('add_' + this.typeId, {typeIdName: this.typeIdName});
      
        this.curGuideStepItems = this.$store.getters.getSteps;
        
      },
      initComponent(info){
        this.currentComponent = 'none';
        this.typeId = 0;
      },
      echoComponent(info){
       if(info.length > 0){
            this.currentComponent = info[0].stepId;
          this.typeId = info[0].stepId; 
          // this.$store.dispatch('echo_' + info[0].stepId, info[0]);

        EventBus.$emit('echo_' + info[0].stepId, info[0]); 
        }else{
          this.currentComponent = 'none';
          this.typeId = 0; 
        }
       
      },

      echoStep(info){
      
        this.$store.dispatch('echoStep', info);
       
      },
      choseAsideItem(item){
        console.log(' active stepId >>> ', this.typeId);
        EventBus.$emit('edit_' + this.typeId, this.stepActive);
        this.currentComponent = item.stepId;
        this.typeId = item.stepId;
        console.log(' new stepId >>> ', this.typeId);
        EventBus.$emit('echo_step_' + item.stepId, item);
        this.stepActive = item.stepIndex;
      },
      changeStepHandle(info){
        // this.$store.dispatch('changeStepIndex', info);
      },
      deleteStep(item){
        this.$store.dispatch('deleteStep', item);
      },
      onEnd(evt){},
      getTypeIdName(typeId){
        let lists = guideTypeList;
        let item = lists.filter(function(item, index){
          if(typeId == item.typeId){
            return true;
          }
        });
       
        return item;
      }
  
     },
     watch: {
      typeId() {
       
       let _typeItems = this.guideTypeItems;
       
       for(let i = 0; i < _typeItems.length; i++){
         if(this.typeId == _typeItems[i].typeId){
          this.currentComponent = _typeItems[i].typeId;
         this.typeId = _typeItems[i].typeId;
         this.typeIdName = this.getTypeIdName(this.typeId)[0].name;
         this.$store.dispatch('initGather');
         }
       };
       
      }
    },
    components: {
      draggable
    }
 
  }
</script>

<style scoped>
  .guide-content {
    margin-top: 20px;
    border-top: 1px solid #ccc;
  }

  .form {
    margin: 30px;
    padding: 30px;
    border: 1px solid #21488a;
  }

  .form-label {
    width: 150px;
    display: inline-block;
    text-align: right;
  }

  .guide-content-box {
    background-color: #fff;
    border-left: 1px solid #ccc;
  }
  .menu-item-wrapper{
    position: relative;
  }
  .menu-item-wrapper .ivu-icon{
    display: none;
    position: absolute;
    right: 20px;
     top:30%;
  }
  .menu-item-wrapper .ivu-icon:hover{
    cursor: pointer;
  }
  .menu-item-wrapper:hover .ivu-icon{
    z-index: 3;
    display: inline-block;
  }
  .ivu-layout.ivu-layout-has-sider > .ivu-layout-content {
    overflow-x: visible;
  }
</style>
