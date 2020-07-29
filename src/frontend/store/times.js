import Vue from 'vue';

import fetch from 'node-fetch';
import axios from 'axios';
import validateCode from '../util/validate-code';

export default {
	state: () => ({
		uploading: false,
		uploadStatus: false,
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
		}
	},
	actions: {
		submitTime({ commit }, form) {
			commit('startUploading');
			
			axios.post('/api/times/new', form, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
			})
			.then(res => {
				Vue.$snotify.success('Redirecting you home...', 'Replay upload successful!');
				commit('uploadSuccess');
			})
			.catch(err => {
				console.error(err);
				Vue.$snotify.error(err.response || 'Unknown error.', 'Replay upload failed.');
				commit('uploadFailed');
			});
		},
	},
	getters: {
		
	}
};