import Vuex from 'vuex';

import fetch from 'node-fetch';
import validateCode from '../util/validate-code';

export default {
  state: () => ({
    status: false,
    loading: false,
    me: null,
  }),
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setMe(state, me) {
      state.me = me;
    },
    authLoading(state) {
      state.loading = true;
    },
    authDone(state) {
      state.loading = false;
    },
    setLevel(state, level) {
      state.level = level;
    }
  },
  actions: {
    /**
    * login if we're not logged in, otherwise update `auth`
    */
    refreshAuth({ commit }) {
      commit('authLoading');
      fetch('/api/auth/me')
        .then(validateCode)
        .then(async (res) => {
          let json = await res.json();
          commit('setStatus', true);
          commit('setMe', json);
          commit('authDone');
        })
        .catch((err) => {
          console.error(err);
          commit('setStatus', false);
          commit('authDone');
        });
    }
  },
  getters: {
    myAvatar(state) {
      if (state.me != null) {
        return state.me.avatarURL;
      } else {
        return 'https://picsum.photos/64';
      }
    },
    myDisplayname(state) {
      if (state.me != null) {
        return state.me.name;
      } else {
        return 'guest';
      }
    },
    myAuthLevel(state) {
      if (state.loading) return 0;
      if (!state.status) return 0;

      if (state.me != null) {
        return state.me.level;
      } else {
        return 0;
      }
    },
    authReady(state) {
      return !state.loading;
    }
  }
};
