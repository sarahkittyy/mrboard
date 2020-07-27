import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router';

Vue.use(VueRouter);

const vm = new Vue({
	el: '#root',
	router,
	template: '<router-view />'
});

window.vm = vm;