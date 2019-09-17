import { INIT_STAGE, ADD_STAGE, SHOW_STAGENAME, 
         CHANGE_STAGE_INDEX, ADD_STEP_TO_STAGE,
         DELETE_STAGE,
         SAVE_STEP_TO_STAGE  } from '@/store/mutation_type.js';
import { EventBus } from '@/tools';
const stageState = {
  state: {
    stageCount: 0,
    stageModal: {
      stageName: '',
      stageId: 0,
      stepList: [],
      active: false,
      transferMode: '',
      transferPerson: '',
     
    },
    stageList: [
   
    ]
  },
  actions: {
    init_stage({state, commit}, info){
     
      commit('INIT_STAGE', info);
    },
    add_stage({state, commit}, info){
   
      commit('ADD_STAGE', info);
    },
    show_stageName({state, commit}, info){
    
      commit('SHOW_STAGENAME', info);
    },
    changeStageIndex({state, commit}, info){
     
      commit('CHANGE_STAGE_INDEX', info);
    },
  
    add_step_to_stage({state, commit, rootState}, info){
     
      commit('ADD_STEP_TO_STAGE', rootState, info)
    },
    save_step_to_stage({state, commit, rootState},info){
      commit('SAVE_STEP_TO_STAGE',{rootState, info} )
    },
    delete_stage({state, commit},info){
     
      let stages = state.stageList;
      let _currentStage = info;
       let filteredStage = stages.filter(function(item, index){

        if(_currentStage.stageId !== item.stageId){
          return true;
        }
      });
      console.log('delete stage >>> ', info)
      commit('CHANGE_STAGE_INDEX', filteredStage);
      
      let _CurrentCount = state.stageCount - 1;
      state.stageCount = _CurrentCount;
    }
  },
  mutations: {
    [INIT_STAGE](state, info){
      state.stageModal.stepList = [];
      let _CurrentCount = parseFloat(state.stageCount);
      let currentStage = state.stageModal;
      state.stageList.push(Object.assign({}, currentStage, 
                          {stageId: _CurrentCount,stageName:'stage' + (_CurrentCount + 1),
                          transferMode: 'auto', active: true}));
      if(_CurrentCount > 0){
        Object.assign( state.stageList[state.stageCount - 1], {active: false} )
      }
      state.stageCount = parseFloat(state.stageCount) + 1;
    },
  
    [SHOW_STAGENAME](state, info){
      let _currentStage = state.stageList[state.stageCount-1];
      console.log(' show stagename  >>>  ', info);
      console.log(' show stage name >>>  ', _currentStage)
      Object.assign( _currentStage, info);
    },
    [CHANGE_STAGE_INDEX](state, info){
      state.stageList = [];
      for(let i = 0; i < info.length; i++){
        info[i].stageId = i;
      }
      state.stageList = info; 
    },
    [ADD_STEP_TO_STAGE](state, rootState, info){
      let stateCount = parseFloat(state.stageCount) - 2;
      state.stageList[stateCount].stepList.push(...rootState.addStep.steps);
      rootState.addStep.stepIndex = 0;
      rootState.addStep.steps = [];
      EventBus.$emit('initComponent');
    },
    [SAVE_STEP_TO_STAGE](state, {rootState,info}){
      let _stepslist = rootState.addStep.steps;
       if(_stepslist.length > 0){
        state.stageList[info].active = false;
        state.stageList[info].stepList = []; 
        state.stageList[info].stepList.push(..._stepslist);
        _stepslist = [];
      }
     

    },
    [DELETE_STAGE](state, {commit}, info){
     
    }
  },
  getters: {
    stageList(state){
      return state.stageList;
    },
    showStage(state){
     
      return state.stageCount;
    }
  }
};

export default stageState;