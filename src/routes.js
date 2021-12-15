import React from 'react';

const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Home = React.lazy(() => import('./views/dashboard/Home'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));


const routes = [
  { path: '/', exact: true, name: 'Ana Sayfa' },
  { path: '/home', name: 'Ana Sayfa', component: Home },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base/cards', name: 'Cards', component: Cards },
];

export default routes;
