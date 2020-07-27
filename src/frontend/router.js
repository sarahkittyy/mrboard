import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';
import Page404 from './views/Page404';

const routes = [
	{ path: '/', component: Home },
	{ path: '*', component: Page404 },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;