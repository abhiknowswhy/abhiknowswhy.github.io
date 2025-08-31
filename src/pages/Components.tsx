import React from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import type { IPageTemplateProps } from '../components/templates/IPageTemplate';
import { LoadingSpinner } from '../components/composite/controls/LoadingSpinner';
import { MoveToTopButton } from '../components/composite/controls/MoveToTopButton';
import { ThemeSwitcher } from '../components/composite/controls/ThemeSwitcher';
import { Navbar } from '../components/composite/navigation/Navbar';
import { Footer } from '../components/composite/navigation/Footer';
import pagesData from '../config/pages.json';
import type { PageConfig } from '../config/types';

const Section: React.FC<{ title: string; tag: string; children: React.ReactNode }> = ({ title, tag, children }) => (
  <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <span className="text-xs text-slate-500 dark:text-slate-400">{tag}</span>
    </div>
    <div className="p-4">{children}</div>
  </section>
);

const Components: React.FC<IPageTemplateProps> = ({ globalProps }) => {
  const menuItems = (pagesData as PageConfig[])
    .filter(p => p.visible)
    .map(p => ({ name: p.name, path: p.path }));

  return (
    <PageTemplate globalProps={globalProps}>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Components Gallery</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Preview composite components in isolation.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <Section title="Navbar" tag="Component">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            <Navbar menuItems={menuItems} globalProps={globalProps} />
          </div>
        </Section>

        <Section title="Footer" tag="Component">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            <Footer companyName="Abhiram" year={new Date().getFullYear()} />
          </div>
        </Section>

        <Section title="LoadingSpinner" tag="Feedback">
          <div className="p-8 flex items-center justify-center min-h-32">
            <LoadingSpinner />
          </div>
        </Section>

        <Section title="ThemeSwitcher" tag="Control">
          <ThemeSwitcher />
        </Section>

        <Section title="MoveToTopButton" tag="Control">
          <div className="relative">
            <div className="h-64 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-white dark:bg-slate-900">
              {Array.from({ length: 50 }).map((_, i) => (
                <p key={i} className="text-sm text-slate-600 dark:text-slate-400">Scroll content line {i + 1}</p>
              ))}
            </div>
            <MoveToTopButton />
          </div>
        </Section>
      </div>
    </PageTemplate>
  );
};

export default Components;
