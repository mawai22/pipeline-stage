import * as types from '../../types/stage'
function _findIndex(list, id) {
  return list.findIndex((item) => {
    return item.stageId === id
  })
} 
const stage = {
	state: {
		activeStageId: 0,
		stageList: []
	},
	getters: {
		getStageList(state){
			return state.stageList;
		},
		getStepList(state){
			let index = _findIndex(state.stageList, state.activeStageId);
			if (index == -1) {
				return [];
			}
			return state.stageList[index].stepList;
		}
	},
	mutations: {
		[types.SET_STAGEID](state, id) {
			state.activeStageId = id;
		},
		// 设置stage, 将 info数组全赋值给 stageList
		[types.SET_STAGE](state, info){
			state.stageList = [...info];
		},

		// 设置某个stage下的步骤step: stage 当前的stage, info 数组形式
		[types.SET_STEPLIST](state, info){
			let index = _findIndex(state.stageList, state.activeStageId);
			state.stageList[index].stepList = [...info];
		},

		// 添加step，info 为对象形式
		[types.ADD_STEP](state, info){
			let index = _findIndex(state.stageList, state.activeStageId);
			let len = state.stageList[index].stepList.length;
			let step = Object.assign({}, info, {stepIndex: len})
			state.stageList[index].stepList.push(step);
		}
	},
	actions: {
		setStage({commit, state}, info) {
			commit('SET_STAGE', info);
		},
		// 拖动莫一个步骤，改变其位置触发得事件
		dragStep({state, rootState, dispatch, commit}, list){
			list.filter((item, index) => {
				item.stepIndex = index;
			})
			commit('SET_STEPLIST', list);
			dispatch('changeStepList', list);
		}
	}
}
export default stage;