import Vue from 'vue';

import fetch from 'node-fetch';
import validateCode from '../util/validate-code';

export default {
  state: () => ({
    reports: null, 
  }),
  mutations: {
    setReports(state, reports) {
      state.reports = [...reports];
    }
  },
  actions: {
    report({ commit }, { time, reason }) {
      fetch('/api/reports/submit', {
        method: 'post',
        body: JSON.stringify({ time, reason }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(validateCode)
        .then(() => {
          Vue.$snotify.success('Report submitted!', 'Success');
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Report error');
        });
    },
    fetchReports({ commit }) {
      fetch('/api/reports', {
        method: 'get',
      })
        .then(validateCode)
        .then(res => res.json())
        .then((reports) => {
          commit('setReports', reports);
        })
        .catch((err) => {
          console.error(err);
          Vue.$snotify.error(err.response || 'Unknown error.', 'Could not fetch reports.');
        });
    },
  },
  getters: {
    allReports(state) {
      return state.reports;
    },
    reportsReady(state) {
      return state.reports != null;
    },
    unverifiedReports(state) {
      if (state.reports == null) return [];
      return state.reports.filter(r => !r.checked);
    },
  }
};
