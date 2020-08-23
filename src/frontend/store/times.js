import Vue from 'vue';

import fetch from 'node-fetch';
import axios from 'axios';
import validateCode from '../util/validate-code';

export default {
	state: () => ({
		uploading: false,
		uploadStatus: false,
		all: [],
		fetching: false,
	}),
	mutations: {
		startUploading(state) {
			state.uploading = true;
		},
		uploadFailed(state) {
			state.uploadStatus = false;
			state.uploading = false;
		},
		uploadSuccess(state) {
			state.uploadStatus = true;
			state.uploading = false;
		},
		resetUploadState(state) {
			state.uploading = false;
			state.uploadStatus = false;
		},
		setTimes(state, times) {
			state.all = [...times];
		},
		startFetching(state) {
			state.fetching = true;
		},
		stopFetching(state) {
			state.fetching = false;
		},
	},
	actions: {
		submitTime({ commit, dispatch }, form) {
			commit('startUploading');
			
			axios.post('/api/times/new', form, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
			})
			.then(res => {
				Vue.$snotify.success('Redirecting you home...', 'Replay upload successful!');
				commit('uploadSuccess');
				dispatch('getAllTimes');
			})
			.catch(err => {
				console.error(err);
				Vue.$snotify.error(err.response || 'Unknown error.', 'Replay upload failed.');
				commit('uploadFailed');
			});
		},
		fetchTimes({ commit }) {
			commit('startFetching');
			fetch('/api/times')
			.then(validateCode)
			.then(async (res) => {
				let json = await res.json();
				commit('setTimes', json);
				commit('stopFetching');
			})
			.catch((err) => {
				console.error(err);
				Vue.$snotify.error(err.response || 'Unknown error.', 'Could not fetch times');
				commit('setTimes', []);
				commit('stopFetching');
			});
		},
	},
	getters: {
		allTimes(state) {
			return state.all;
		},
		myTimes(state, getters, rootState) {
			if (!rootState.auth.me) {
				return null;
			} else {
				return state.all.filter(x => x.author == rootState.auth.me._id);
			}
		},
	}
};