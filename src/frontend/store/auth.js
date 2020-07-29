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
				let text = await res.text();
				if (text != 'no') {
					commit('setStatus', true);
					commit('setMe', JSON.parse(text));
					commit('authDone');
				} else {
					commit('setStatus', false);
					commit('authDone');
				}
			})
			.catch((err) => {
				console.error(err);
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
		}
	}
};