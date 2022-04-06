import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
// import { createStore } from 'vuex'

// load Vuex
Vue.use(Vuex);

// to handle state
const state = {
  performance: [],
  startDate: '',
  endDate: '',
};

// // to handle state
const getters = {
  // eslint-disable-next-line no-shadow
  getterPerformance: (state) => state.performance,
  // eslint-disable-next-line no-shadow
  getterDateOptions: (state) => {
    return { startDate: state.startDate, endDate: state.endDate };
  },
};

// to handle actions
const actions = {
  getPerformance({ commit }) {
    axios.get('https://fe-task.getsandbox.com/performance')
      .then(response => {
        commit('SET_PREFORMANCE', response.data);
      });
  },
  getStartDate({ commit }, payload) {
    commit('GET_START_DATE', payload);
  },
  getEndDate({ commit }, payload) {
    commit('GET_END_DATE', payload);
  },
};

// to handle mutations
const mutations = {
  // eslint-disable-next-line no-shadow
  SET_PREFORMANCE(state, performance) {
    state.performance = performance;
  },
  // eslint-disable-next-line no-shadow
  GET_START_DATE(state, payload) {
    state.startDate = payload;
  },
  // eslint-disable-next-line no-shadow
  GET_END_DATE(state, payload) {
    state.endDate = payload;
  },
};
const store = new Vuex.Store();
store.registerModule('preformance', {
  state,
  getters,
  actions,
  mutations,
});

// export store module
export default store;
