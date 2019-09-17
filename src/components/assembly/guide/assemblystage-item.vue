<template>
  <div class="stage-wrapper">
    <draggable v-model="stageList"
               :options="{animation: 300,draggable:'.step-item-wrapper'}"
               @end="onEnd">
               <div class="step-item-wrapper" >
                  <span class="handle"></span>
                  <span class="addOrOk">
                    <Icon  
                           type="record"  
                         
                           color="#19be6b" size="28"></Icon>
              
                  </span>
                  <span class="arrow">
                      <Icon type="arrow-right-a" 
                            color="#19be6b" 
                            size="28"></Icon>
                  
                  </span>
            </div>
    
      <div  class="step-item-wrapper"
            v-for="(stageItem, index) in stageList"
            :key="index">
          <span class="handle">
              </span>
          <span class="addOrOk">
    
              <Icon  v-if="stageItem.active" 
                     type="plus-circled"  
                     @click="echoCurrentStage(stageItem)"
                     :style="stageItem.acitve ? {'color': '#2db7f5','font-size': '42px'} : {'color': '#2d8cf0', 'font-size': '42px', 'margin-top': '-7px'}"
                    ></Icon>  
                     <!-- + -->
              <Icon  v-if="!stageItem.active" 
                  
                     size="28"
                     :style="!stageItem.acitve ? {'color': '#47cb89'} : ''"
                     @click="echoCurrentStage(stageItem)"  
                     type="checkmark-circled"></Icon>
                     <!-- 对钩 -->
           <font>
              {{ stageItem.stageName }}
           </font>
         
          </span>
          <Icon class="close" 
                type="close"
                size="16"
                color="red"
                @click="deleteStage(stageItem)"
                ></Icon>
          <span class="arrow">
              <Icon type="arrow-right-a" 
                    v-if="!stageItem.active"
                    :style="!stageItem.acitve ? {'color': '#47cb89'} : {'color': '#2d8cf0'}"
                    size="28"
                    ></Icon>
                    <Icon type="arrow-right-a" 
                    v-if="stageItem.active"
                    :style="stageItem.acitve ? {'color': '#2d8cf0'} : {'color': '#2d8cf0'}"
                    size="28"
                    ></Icon>
                  
          </span>
      </div>
    </draggable>
      <div  class="step-item-wrapper" >
          <span class="handle">
            <img  src="@/assets/stepHandle.png" alt="">
          </span>
          <span class="addOrOk">
    
              <Icon  
                     type="plus-circled"  
                     @click="initStageHandle"
                     color="#2d8cf0" size="28"></Icon>
        
          </span>
          <span class="arrow">
              <Icon type="arrow-right-a" 
                    color="#2d8cf0" 
                    size="28"></Icon>
           
          </span>
      </div>
      <div class="step-item-wrapper" >
        <span class="handle"></span>
        <span class="addOrOk">
          <Icon  
                 type="record"  
               
                 color="#19be6b" size="28"></Icon>
    
        </span>
     
  </div>
  </div>
  
</template>

<script>
  import draggable from 'vuedraggable';
  import { EventBus } from '@/tools';
  export default{
  
    data(){
      return {
       
        stage: {
            
            }
      }
    },
  
    methods: {
      initStageHandle(info){ // 加号 新增 stage, 
      
        this.$store.dispatch('init_stage');
        var _stageCount = this.$store.state.stageState.stageCount;
        if(_stageCount > 1){
          EventBus.$emit('add_toStageState');
          
          EventBus.$emit('initStageBase');
       
        }
  
       
      },
      echoCurrentStage(info){ // 回显 stage, 并 保存之前修改的 stage
        EventBus.$emit('saveStage');
         
        EventBus.$emit('echoStage', info);
      
      },
      
      deleteStage(info){
        console.log(info, 'delete Stage')
        EventBus.$emit('deleteStage', info);
        //  
       
      },
      onEnd(Evt){},

    },
    computed: {
      stageList: {
        get(){
          return this.$store.getters.stageList;
        },
        set(value){
          this.$store.dispatch('changeStageIndex', value);
        }
      }
    },
    components: {
      draggable
    }
  
  }
</script>

<style scoped>
  .step-item-wrapper{
    width: 90px;
    position: relative;
    float: left;

  }

  .step-item-wrapper:hover{
    cursor: pointer;
  }
  .step-item-wrapper .close{
    display: none;
  }
  .step-item-wrapper:hover .close{
    display: inline-block;
    position: absolute;
    right: 45px;
    top: 10px;
  }
  .handle{
    display: inline-block;
    float: left;
    height: 30px;
  }
  .addOrOk{
    display: inline-block;
    float: left;
    clear: both;
    width: 60%;
    text-align: center;
  }
  .addOrOk font{
    width: 100%;
    text-align: center;
    display: inline-block;
  }
  .arrow{
    display: inline-block;
    float: left;
    margin-top: 2px;
  }

</style>