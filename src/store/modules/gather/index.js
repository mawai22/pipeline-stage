import {
  INIT_GATHER,
  ADD_GATHER,
  ECHO_GATHER,
  DELETE_GATHER
} from '@/store/mutation_type.js';

const gather = {
  state: {
    gatherIndex: 0,
    modal: {
      id: 0,
      path: ''
    },
    gatherList: []
  },
  actions: {
    initGather({commit}){
      commit('INIT_GATHER');
    },
    addGather({commit}, info){
      commit('ADD_GATHER',info);
    },
    echo_gather({commit}, info){
      commit('ECHO_GATHER', info);
    },
    deleteGather({commit}, info){
      commit('DELETE_GATHER', info);
    }
  },
  mutations: {
    [INIT_GATHER](state){
      state.gatherList = [];
      state.gatherIndex = 0;
    },
    [ADD_GATHER](state, info){

      state.gatherList.push(Object.assign({},{id: parseFloat(state.gatherIndex)}, info));
      state.gatherIndex = parseFloat(state.gatherIndex) + 1;
    },
    [ECHO_GATHER](state, info){
      state.gatherList = [];
      state.gatherList.push(...info);
    },
    [DELETE_GATHER](state, info){
      let _lists = null;
      _lists = state.gatherList.filter(function(item, index){
        if(item.id !== info.id){
          return true;
        }
      });
       for(let i = 0; i <  _lists.length; i++){
        console.log(' from store delete >>>  ', _lists.length)
     
        _lists[i].id = i;
      };
      state.gatherList = [];
      state.gatherList.push(..._lists);
      if(state.gatherList.length == 0){
        state.gatherIndex = 0;
      }
    }

  },
  getters: {
    gatherList(state){
      return state.gatherList;
    }
  }
}

export default gather;