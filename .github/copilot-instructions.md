# GitHub Copilot Instructions

This file contains instructions for GitHub Copilot when working in this repository.

## Project Overview
- This is a personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS
- The project uses a component-based architecture
- Uses Framer Motion for animations
- Uses Lucide React for icons

## UI Components Approach (shadcn-style)
This project uses **manually copied shadcn/ui component source code** rather than the shadcn CLI. This provides:
- Full control over component styling
- No shadcn CLI dependency
- Components customized to match project's design system

### How to Add New shadcn Components
1. **Install required Radix UI primitive** (if needed):
   ```bash
   npm install @radix-ui/react-[component-name]
   ```
2. **Copy the component source** from shadcn/ui GitHub or docs
3. **Place in `src/components/ui/`** with kebab-case filename (e.g., `dropdown-menu.tsx`)
4. **Update imports** to use `@/lib/utils` for the `cn` function
5. **Customize colors** to use project's color tokens (gray, primary colors)

### Existing shadcn-style Components
- `src/components/ui/button.tsx` - Button with variants (default, outline, ghost, etc.)
- `src/components/ui/dropdown-menu.tsx` - Dropdown menu with submenus support

### Required Dependencies for shadcn Components
- `clsx` and `tailwind-merge` - For the `cn()` utility function
- `class-variance-authority` - For component variants
- `@radix-ui/react-slot` - For the `asChild` prop pattern
- `@radix-ui/react-[component]` - Specific Radix primitive per component

### The `cn` Utility Function
Located at `src/lib/utils.ts` - combines `clsx` and `tailwind-merge` for conditional class merging.

## Code Style Guidelines
- Use TypeScript for all new files
- Use functional components with hooks (no class components)
- Follow React best practices and use proper TypeScript types
- Use Tailwind CSS for styling
- Keep components small and focused on a single responsibility
- Use the `@/` path alias for imports (e.g., `@/components/ui/button`)

## File Organization
- Components go in `src/components/`
- UI primitives (buttons, dropdowns, etc.) go in `src/components/ui/`
- Layout components go in `src/components/layout/`
- Pages go in `src/pages/`
- Custom hooks go in `src/hooks/`
- Type definitions go in `src/types/`
- Data files go in `src/data/`
- Utility functions go in `src/lib/`

## Naming Conventions
- Use PascalCase for component files and names
- Use camelCase for utility functions and hooks
- Use kebab-case for shadcn-style UI component files (e.g., `dropdown-menu.tsx`)
- Prefix custom hooks with `use` (e.g., `useTheme`)

## Color System
The project uses custom CSS variables defined in `src/index.css`:
- Primary colors: `primary-50` through `primary-900` (sky blue tones)
- Secondary colors: `secondary-50` through `secondary-900` (purple tones)
- Use Tailwind's `dark:` variant for dark mode styles

## Dark Mode / Light Mode Guidelines
This project supports both dark and light themes. **Always implement both modes** for any new component or feature.

### Theme Implementation Rules
1. **Always pair light and dark styles** - Every color class should have a `dark:` counterpart
2. **Use semantic color mappings**:
   - Backgrounds: `bg-white dark:bg-gray-800` or `bg-gray-50 dark:bg-gray-900`
   - Text: `text-gray-900 dark:text-white` (primary) or `text-gray-600 dark:text-gray-400` (secondary)
   - Borders: `border-gray-200 dark:border-gray-700`
   - Hover states: `hover:bg-gray-100 dark:hover:bg-gray-700`

### Color Patterns for Common Elements
```
Cards/Containers:     bg-white dark:bg-gray-800
Page backgrounds:     bg-gray-50 dark:bg-gray-900
Primary text:         text-gray-900 dark:text-white
Secondary text:       text-gray-600 dark:text-gray-400
Muted text:           text-gray-500 dark:text-gray-500
Borders:              border-gray-200 dark:border-gray-700
Dividers:             bg-gray-200 dark:bg-gray-700
Interactive hover:    hover:bg-gray-100 dark:hover:bg-gray-700
Primary accent:       text-primary-600 dark:text-primary-400
Links:                text-blue-600 dark:text-blue-400
```

### Icons in Dark Mode
- Always add color classes to icons: `text-gray-700 dark:text-white` or `text-gray-600 dark:text-gray-400`
- Never leave icons without explicit color in components that support dark mode

### Testing
- Always test components in both light and dark modes before considering them complete
- Toggle theme using the sun/moon button in the navigation

## Adding New Social Links
Social icons are centralized in `src/lib/socialIcons.ts`. To add a new social platform:

1. **Add the URL** to `src/data/personal.json` under the `social` object:
   ```json
   "social": {
     "newplatform": "https://newplatform.com/username"
   }
   ```

2. **Update `src/lib/socialIcons.ts`** with:
   - Import the icon from `react-icons` (e.g., `FaNewPlatform` from `react-icons/fa6`)
   - Add to `socialIcons` mapping: `newplatform: FaNewPlatform`
   - Add to `socialColors` (gradient for Contact page cards): `newplatform: 'from-color-500 to-color-700'`
   - Add to `socialIconColors` (brand color for inline icons): `newplatform: 'text-[#HEXCOLOR]'`

The social links will automatically appear in:
- Home page (hero section)
- Footer
- Contact page ("Follow Me" section)

## Dependencies
- React 19+
- Vite as the build tool
- Tailwind CSS v4 for styling
- TypeScript for type safety
- Framer Motion for animations
- Lucide React for icons
- Radix UI primitives for accessible UI components
