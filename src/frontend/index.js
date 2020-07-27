import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from './router';
import store from './store';

Vue.use(VueRouter);

const vm = new Vue({
	el: '#root',
	router,
	store,
	template: '<router-view />'
});

window.vm = vm;