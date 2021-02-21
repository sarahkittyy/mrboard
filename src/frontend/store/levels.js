import Vue from 'vue';

import fetch from 'node-fetch';
import validateCode from '../util/validate-code';

export default {
  state: () => ({
    levels: {},
  }),
  mutations: {
    setLevel(state, { id, obj }) {
      state.levels = {...state.levels, [id]: {...obj}};
    },
    updateTimes(state, { id, times }) {
      state.levels = {...state.levels, [id]: {...state.levels[id], times} };
    },
  },
  actions: {
    fetchLevel({ commit }, { id }) {
      fetch(`/api/levels/${id}`, {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((json) => {
          commit('setLevel', { id, obj: json });
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error', 'Could not fetch level.');
        });
    },
    fetchTimesOfLevel({ commit }, { id }) {
      fetch(`/api/levels/${id}/times`, {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((json) => {
          commit('updateTimes', { id, times: json });
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error', 'Could not fetch level times.');
        });
    },
  },
  getters: {
    level: (state) => (id) => {
      return state.levels[id];
    },
  },
};
