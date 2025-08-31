import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/templates/PageTemplate';
import type { IPageTemplateProps } from '../components/templates/IPageTemplate';

const Home: React.FC<IPageTemplateProps> = ({ globalProps }) => {
  return (
    <PageTemplate globalProps={globalProps}>
      <h1 className="text-2xl font-bold">Home</h1>
      <p className="text-muted-foreground mb-6">Welcome to the home page.</p>
      <Link
        to="/gallery"
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        Open Components Gallery
      </Link>
    </PageTemplate>
  );
};

export default Home;
