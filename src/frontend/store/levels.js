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
    setLevels(state, { levels }) {
      state.levels = {...levels};
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
    fetchLevels({ commit }) {
      fetch('/api/levels', {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((json) => {
          commit('setLevels', { levels: json });
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error', 'Could not fetch levels.');
        });
    },
  },
  getters: {
    level: (state) => (id) => {
      return state.levels[id];
    },
    levels(state) {
      return state.levels;
    }
  },
};
