import React from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import type { IPageTemplateProps } from '../components/templates/IPageTemplate';

const Blogs: React.FC<IPageTemplateProps> = ({ globalProps }) => {
  return (
    <PageTemplate globalProps={globalProps}>
      <h1 className="text-2xl font-bold">Blogs</h1>
      <p className="text-muted-foreground">Blogs page content goes here.</p>
    </PageTemplate>
  );
};

export default Blogs;
