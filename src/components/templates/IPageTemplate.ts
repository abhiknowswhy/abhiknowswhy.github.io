// Shared page template props used across all pages
// Ensures every page receives the same core context

import type { GlobalProps } from '../../types/globalProps';

export interface IPageTemplateProps {
  // Global reactive context available to all pages (theme, viewMode, etc.)
  globalProps: GlobalProps;
  // Optional loading flag for pages that fetch data
  isLoading?: boolean;
  // Optional children rendered inside the template's main slot
  children?: React.ReactNode;
}
