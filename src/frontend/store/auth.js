import Vuex from 'vuex';

import fetch from 'node-fetch';
import validateCode from '../util/validate-code';

export default {
	state: () => ({
		auth: false,
		me: null,
	}),
	mutations: {
		setAuth(state, auth) {
			state.auth = auth;
		},
		setMe(state, me) {
			state.me = me;
		}
	},
	actions: {
		/**
		 * login if we're not logged in, otherwise update `auth`
		 */
		refreshAuth({ commit }) {
			fetch('/api/auth/me')
			.then(validateCode)
			.then(async (res) => {
				let text = await res.text();
				if (text != 'no') {
					commit('setAuth', true);
					commit('setMe', JSON.parse(text));
				} else {
					commit('setAuth', false);
				}
			})
			.catch((err) => {
				console.error(err);
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