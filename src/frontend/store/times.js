import Vue from 'vue';

import fetch from 'node-fetch';
import axios from 'axios';
import validateCode from '../util/validate-code';

import moment from 'moment';

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
    submitTime({ commit, dispatch }, { form, callback }) {
      commit('startUploading');

      axios.post('/api/times/new', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'json',
      })
        .then(res => {
          Vue.$snotify.success('Redirecting you...', 'Replay upload successful!');
          commit('uploadSuccess');
          dispatch('fetchTimes');
          setTimeout(() => callback(res.data.redirect), 1000);
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response.data || 'Unknown error.', 'Replay upload failed.');
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
    pin({ commit, dispatch }, id) {
      fetch(`/api/times/pin/${id}`, {
        method: 'post'
      })
        .then(validateCode)
        .then(() => {
          Vue.$snotify.success('Time pinned.', 'Success!');
          dispatch('fetchTimes');
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Could not pin time.');
        });
    },
    unpin({ commit, dispatch }, id) {
      fetch(`/api/times/unpin/${id}`, {
        method: 'post'
      })
        .then(validateCode)
        .then(() => {
          Vue.$snotify.success('Time unpinned.', 'Success!');
          dispatch('fetchTimes');
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Could not unpin time.');
        });
    },
    accept({ commit, dispatch }, id) {
      fetch(`/api/times/accept/${id}`, {
        method: 'post'
      })
        .then(validateCode)
        .then(() => {
          Vue.$snotify.success('Time accepted.', 'Success!');
          dispatch('fetchTimes');
          dispatch('fetchReports');
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Could not accept time.');
        });
    },
    unaccept({ commit, dispatch }, id) {
      fetch(`/api/times/unaccept/${id}`, {
        method: 'post'
      })
        .then(validateCode)
        .then(() => {
          Vue.$snotify.success('Time unaccepted.', 'Success!');
          dispatch('fetchTimes');
          dispatch('fetchReports');
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Could not unaccept time.');
        });
    },
    reject({ commit, dispatch }, id) {
      fetch(`/api/times/reject/${id}`, {
        method: 'post'
      })
        .then(validateCode)
        .then(() => {
          Vue.$snotify.success('Time rejected.', 'Success!');
          dispatch('fetchReports');
          dispatch('fetchTimes');
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Could not reject time.');
        });
    },
    downloadTime(_, id) {
      axios({
        url: `/api/times/id/${encodeURIComponent(id)}/download`,
        method: 'GET',
        responseType: 'arraybuffer',
      })
        .then(async (res) => {
          var fileURL = window.URL.createObjectURL(new Blob([res.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'replay.rpl');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          console.error(err);
          Vue.$snotify.error(err.response.data || 'Unknown error.', 'Could not download .rpl file.');
        });
    },
  },
  getters: {
    allTimes(state) {
      return state.all;
    },
    pinnedTimes(state) {
      return state.all.filter(v => v.pinned);
    },
    timesOfLevel: (state) => (id) => {
      return state.all.filter(t => t.levelID === id);
    },
    recentTimes(state) {
      let ids = [];
      let times = state.all.concat().sort(((a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      }))
        .slice(0, 25)
        .reverse() // now in order from first - last
        .filter(v => {
          if (ids.indexOf(v.level.id) == -1) {
            ids.push(v.level.id);
            return true;
          } else {
            return false;
          }
        });
      return times.slice(0, 30);
    },
    recentUserTimes: (state, getters) => (id) => {
      let ids = [];
      let times = getters.timesOfUser(id).concat().sort(((a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      }))
        .slice(0, 25)
        .reverse() // now in order from first - last
        .filter(v => {
          if (ids.indexOf(v.level.id) == -1) {
            ids.push(v.level.id);
            return true;
          } else {
            return false;
          }
        });
      return times.slice(0, 30);
    },
    timesOfUser: (state) => (id) => {
      return state.all.filter(x => x.authorID == id);
    },
    myTimes(state, getters, rootState) {
      if (!rootState.auth.me) {
        return null;
      } else {
        return state.all.filter(x => x.author == rootState.auth.me._id);
      }
    },
    timesReady(state) {
      return !!state.all;
    },
    timeFromId: (state) => (id) => {
      return state.all.find(x => x.id == id);
    },
  }
};
