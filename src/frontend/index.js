import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from './router';
import store from './store';

import vuetify from './vuetify';

Vue.use(VueRouter);

const vm = new Vue({
	router,
	store,
	vuetify,
	template: '<v-main><router-view /></v-main>',
}).$mount('#root');

window.vm = vm;