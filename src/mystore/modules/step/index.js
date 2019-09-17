import * as types from '../../types/step'
function _findIndex(list, index) {
  return list.findIndex((item) => {
    return item.stepIndex === index
  })
}
const steps = {
	state: {
		activeStepIndex: '',
		stepList: [],
		curStep: {},
	},
	mutations: {
		// 获取 并初始化stepList；直接从stage中获取到stepList,
		[types.INIT_STEPLIST](state, list){
			state.stepList = list;
		},

		// 回显，初始化当前step得内容
		[types.INIT_CURSTEP](state, info){
			state.curStep = Object.assign({}, info);
		},

		// 改变某一个step中得内容
		[types.CHANGE_STEP](state, {index, info}){
			state.stepList[index] = Object.assign({}, state.stepList[index], info);
		},

		// 激活状态得index
		[types.SET_STEPINDEX](state, index) {
			// 在每次切换step时，都将curStep清零;
			state.curStep = Object.assign({});
			state.activeStepIndex = index;
		},
	},
	actions: {
		changeStepList({state, commit}, info){
			commit('INIT_STEPLIST', info);
		},
		initCurStep({state, commit}){
			let stepList = state.stepList;
			let index = state.activeStepIndex;
			let curStep = Object.assign({}, stepList[index]);
			commit('INIT_CURSTEP', curStep);
		},
		// 改变step内容得值，info 为对象形式
		changeStep({state, rootState, rootGetters, commit}, info){
			let index = _findIndex(state.stepList, state.activeStepIndex);
			commit('CHANGE_STEP', {index, info});
		}
	}
}

export default steps;