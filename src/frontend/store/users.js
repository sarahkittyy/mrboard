import Vue from 'vue';

import fetch from 'node-fetch';
import validateCode from '../util/validate-code';

export default {
  state: () => ({
    users: null,
  }),
  mutations: {
    setUsers(state, users) {
      state.users = [...users];
    }
  },
  actions: {
    fetchUsers({ commit }) {
      fetch('/api/users')
        .then(validateCode)
        .then(res => res.json())
        .then(json => {
          commit('setUsers', json);
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response.data || 'Unknown error.', 'User fetching failed.');
        });
    }
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    usersReady(state) {
      return state.users != null;
    },
    userById: (state) => (id) => {
      if (state.users == null) return null;
      return state.users.find(x => x.id == id);
    },
    userBySteamId: (state) => (id) => {
      if (state.users == null) return null;
      return state.users.find(x => x.steam_id == id);
    },
  }
};
