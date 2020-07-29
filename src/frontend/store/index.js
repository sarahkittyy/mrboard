import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import times from './times';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
		times,
	}
});

export default store;