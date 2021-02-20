import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import times from './times';
import reports from './reports';
import users from './users';
import levels from './levels';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    times,
    reports,
    users,
    levels,
  }
});

export default store;
