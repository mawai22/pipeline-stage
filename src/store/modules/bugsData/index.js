import { ADD_BUGSDATA } from '@/store/mutation_type.js';

const bugsData = {
  state: {
    list: []
  },
  actions: {
    add_bugsData({commit},info){
      commit('ADD_BUGSDATA', info);
    }
  },
  mutations: {
    [ADD_BUGSDATA](state, info){
      state.list.push(info);
    }
  }
};

export default bugsData;