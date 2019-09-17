import Vue from 'vue';
import Vuex from 'vuex';
import Stage from '@/mystore/modules/stage/index';
import Step from '@/mystore/modules/step/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Stage,
    Step
  }
});
export default store;