import React from 'react';
const Home = React.lazy(() => import('../pages/Home/Home'));
const About = React.lazy(() => import('../pages/About/About'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));

export const pageComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  Home,
  About,
  NotFound,
};
