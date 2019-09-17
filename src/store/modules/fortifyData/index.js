import { FORTIFY_DATA } from '@/store/mutation_type.js';

const fortifyData = {
  state: {
    fortify: {}
  },
  actions: {
    add_fortifyData({commit}, info){
      commit('FORTIFY_DATA', info);
    },
    echo_fortify({commit, state}, info){
     
      state.fortify  =  Object.assign({}, state.fortify, info);
   
    },
    init_fortify({commit, state}){
      state.fortify = null;
      state.fortify = {};
    }
  },
  mutations: {
    [FORTIFY_DATA](state, info){
      state.list.push(info);
    }
  },
  getters: {
    fortifyDataList(){
      return true;
    }
  }
};

export default fortifyData;
