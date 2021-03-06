import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';
import Page404 from './views/Page404';
import Times from './views/Times';
import TimeForm from './views/TimeForm';
import LevelPage from './views/LevelPage';
import Reports from './views/Reports';
import LevelSearch from './views/LevelSearch';
import Profile from './views/Profile';

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
    path: '/levels',
    component: LevelSearch,
    props: {
      title: 'Search levels',
    }
  },
  {
    path: '/levels/:id',
    component: LevelPage,
    props: {
      title: 'View level records'
    }
  },
  {
    path: '/levels/steam/:id',
    component: LevelPage,
    props: {
      title: 'View level records',
      steam: true,
    },
  },
  {
    path: '/reports',
    component: Reports,
    props: {
      title: 'Active reports',
    },
  },
  {
    path: '/profile/:id?',
    component: Profile,
  },
  { path: '*', component: Page404 },
];

const router = new VueRouter({
  routes,
  mode:
  'history',
  base: process.env.BASE_URL,
});

export default router;
