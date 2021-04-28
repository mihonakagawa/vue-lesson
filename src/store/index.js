import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import count from './modules/count';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    count,
  },
  state: {
    count: 0,
  },
  // 第1引数に入っているオブジェクトのstateが「store」で管理するリアクティブプロパティの初期値に当たる箇所
  actions,
  mutations,
});