import React from 'react';
import type { IPageTemplateProps } from './IPageTemplate';
import { Navbar } from '../composite/navigation/Navbar';
import { Footer } from '../composite/navigation/Footer';
import { MoveToTopButton } from '../composite/controls/MoveToTopButton';

export const PageTemplate: React.FC<IPageTemplateProps> = ({
  globalProps,
  isLoading = false,
  children,
}) => {
  const { viewMode } = globalProps;

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
      data-view-mode={viewMode}
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateAreas: '"navbar" "body" "footer"'
      }}
    >
      {/* Navbar - Grid Row 1 */}
      <div style={{ gridArea: 'navbar' }}>
        <Navbar globalProps={globalProps} />
      </div>

      {/* Body Container - Grid Row 2 */}
      <div 
        style={{ 
          gridArea: 'body',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center p-8 flex-1">Loading…</div>
        ) : (
          <main className="max-w-6xl mx-auto px-6 py-10 flex-1">{children}</main>
        )}
      </div>

      {/* Footer - Grid Row 3 */}
      <div style={{ gridArea: 'footer' }}>
        <Footer />
      </div>
      
      {/* MoveToTopButton - Fixed Overlay (Not part of grid) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        <MoveToTopButton />
      </div>
    </div>
  );
};

export default PageTemplate;
