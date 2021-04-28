const state = {
  count: 0,
}

const actions = {
  incrementCount({ commit }) {
    commit('incrementCount');
  }
}

const mutations = {
  incrementCount(state) {
    state.count++;
  }
}

export default {
  namespaced: true,
  // 名前空間の登録
  state,
  actions,
  mutations
}