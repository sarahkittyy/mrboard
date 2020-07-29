import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Snotify, { SnotifyPosition } from 'vue-snotify';

import 'vue-snotify/styles/material.css';

import router from './router';
import store from './store';

import vuetify from './vuetify';
import Vuelidate from 'vuelidate';

import Index from './views/Index';

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Snotify, {
	toast: {
		position: SnotifyPosition.rightBottom,
		timeout: 2000,
		titleMaxLength: 25,
	},
});

Vue.component('index', Index);

const vm = new Vue({
	router,
	store,
	vuetify,
	template: '<v-main><index /></v-main>',
	beforeCreate() {
		Vue.$snotify = this.$snotify;
	}
}).$mount('#root');

window.vm = vm;