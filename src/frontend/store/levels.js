import Vue from 'vue';

import fetch from 'node-fetch';
import validateCode from '../util/validate-code';

export default {
  state: () => ({
    levels: {},
    fetching: false,
  }),
  mutations: {
    setLevel(state, { id, obj }) {
      state.levels = {...state.levels, [id]: {...obj}};
    },
    startFetching(state) {
      state.fetching = true;
    },
    doneFetching(state) {
      state.fetching = false;
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
      commit('startFetching');
      fetch(`/api/levels/${id}`, {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((json) => {
          commit('setLevel', { id, obj: json });
          commit('doneFetching');
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error', 'Could not fetch level.');
          commit('doneFetching');
        });
    },
    fetchLevelBySteam({ commit }, { id }) {
      commit('startFetching');
      fetch(`/api/levels/steam/${id}`, {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((json) => {
          commit('setLevel', { id: [json.id], obj: json });
          commit('doneFetching');
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error', 'Could not fetch level.');
          commit('doneFetching');
        });
    },
    fetchLevels({ commit }) {
      commit('startFetching');
      fetch('/api/levels', {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((json) => {
          commit('setLevels', { levels: json });
          commit('doneFetching');
        })
        .catch((err) => {
          console.error(err);
          commit('doneFetching');
          Vue.$snotify.error(err.response || 'Unknown error', 'Could not fetch levels.');
        });
    },
  },
  getters: {
    level: (state) => (id) => {
      return state.levels[id];
    },
    idFromSteam: (state) => (steam_id) => {
      let lvl = Object.values(state.levels).find(v => v.steam_id === steam_id);
      if (!lvl) {
        return null;
      } else {
        return lvl.id;
      }
    },
    levels(state) {
      return state.levels;
    },
    levelsLoading(state) {
      return state.fetching;
    }
  },
};
