import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { pageComponents } from './config/pageComponents';
import pagesData from './config/pages.json';
import type { PageConfig } from './config/types';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {(pagesData as PageConfig[]).filter(page => page.visible).map(page => {
          const PageComponent = pageComponents[page.name] || pageComponents['NotFound'];
          return (
            <Route
              key={page.path}
              path={page.path}
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PageComponent />
                </React.Suspense>
              }
            />
          );
        })}
        <Route path="*" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <pageComponents.NotFound />
          </React.Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
