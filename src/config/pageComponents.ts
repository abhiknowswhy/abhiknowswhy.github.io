import React from 'react';
const Home = React.lazy(() => import('../pages/Home/Home'));
const About = React.lazy(() => import('../pages/About/About'));

const Work = React.lazy(() => import('../pages/Work/Work'));
const Blogs = React.lazy(() => import('../pages/Blogs/Blogs'));
const Connect = React.lazy(() => import('../pages/Connect/Connect'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));

export const pageComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  Home,
  About,
  Work,
  Blogs,
  Connect,
  NotFound,
};
