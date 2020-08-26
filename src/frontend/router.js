import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';
import Page404 from './views/Page404';
import Times from './views/Times';
import TimeForm from './views/TimeForm';
import LevelPage from './views/LevelPage';

const routes = [
	{
		path: '/',
		component: Home,
		props: {
			title: 'Home',
		}
	},
	{
		path: '/times',
		component: Times,
		children: [
			{
				path: 'submit',
				component: TimeForm,
				props: {
					title: 'Submit a new time',
				}
			}
		],
	},
	{
		path: '/levels/:id',
		component: LevelPage,
		props: {
			title: 'View level records'
		}
	},
	{ path: '*', component: Page404 },
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;