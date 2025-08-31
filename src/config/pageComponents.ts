import React from 'react';
import type { GlobalProps } from '../types/globalProps';

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Work = React.lazy(() => import('../pages/Work'));
const Blogs = React.lazy(() => import('../pages/Blogs'));
const Connect = React.lazy(() => import('../pages/Connect'));
const Components = React.lazy(() => import('../pages/Components'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

export const pageComponents: Record<string, React.LazyExoticComponent<React.FC<{ globalProps: GlobalProps }>>> = {
  Home,
  About,
  Work,
  Blogs,
  Connect,
  Components,
  NotFound,
};
