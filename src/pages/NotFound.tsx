import React from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import type { IPageTemplateProps } from '../components/templates/IPageTemplate';

const NotFound: React.FC<IPageTemplateProps> = ({ globalProps }) => {
  return (
    <PageTemplate globalProps={globalProps}>
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
    </PageTemplate>
  );
};

export default NotFound;
