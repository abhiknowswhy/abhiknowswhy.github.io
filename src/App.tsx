import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { pageComponents } from './config/pageComponents';
import pagesData from './config/pages.json';
import type { PageConfig } from './config/types';
import { useGlobalProps } from './hooks/useGlobalProps';
import { LoadingSpinner } from './components/composite/controls/LoadingSpinner';

function App() {
  const globalProps = useGlobalProps();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {(pagesData as PageConfig[]).map(page => {
          const PageComponent = pageComponents[page.name] || pageComponents['NotFound'];
          return (
            <Route
              key={page.path}
              path={page.path}
              element={
                <React.Suspense fallback={<div className="flex items-center justify-center p-8"><LoadingSpinner /></div>}>
                  <PageComponent globalProps={globalProps} />
                </React.Suspense>
              }
            />
          );
        })}
        <Route path="*" element={
          <React.Suspense fallback={<div className="flex items-center justify-center p-8"><LoadingSpinner /></div>}>
            {React.createElement(pageComponents.NotFound, { globalProps })}
          </React.Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
