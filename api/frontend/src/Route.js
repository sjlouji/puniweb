import React, { lazy } from 'react';
import AppBar from './components/AppBar/AppBar'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
const routes = [
  {
    path: '/account/login',
    exact: true,
    component: () => <Login />
  },
  {
    path: '/account/register',
    exact: true,
    component: () => <Register />
  },
  {
    route: '*',
    component: AppBar,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./pages/RecentVideos/RecentVideos'))
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('./pages/Settings/Settings'))
      },
      {
        path: '/results',
        exact: true,
        component: lazy(() => import('./pages/SearchListPage/List'))
      },
      {
        path: '/trending',
        exact: true,
        component: lazy(() => import('./pages/Trending/Trending'))
      },
      {
        path: '/recent',
        exact: true,
        component: lazy(() => import('./pages/Recent/Recent'))
      },
      {
        path: '/watch',
        exact: true,
        component: lazy(() => import('./pages/Watch/Watch'))
      },
      {
        path: '/blog',
        exact: true,
        component: lazy(() => import('./pages/Blog/Blog'))
      },
      {
        path: '/blog/view/:slug',
        exact: true,
        component: lazy(() => import('./pages/Blog/View/View'))
      },
      {
        path: '/calender',
        exact: true,
        component: lazy(() => import('./pages/Calender/Calenders'))
      },
    ]
  },
];

export default routes;
