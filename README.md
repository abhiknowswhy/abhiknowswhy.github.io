# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features multiple themes, smooth animations, and a clean component architecture.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Works perfectly on all devices
- **Theme Support**: Multiple theme options (light, dark, neon, glassmorphism)
- **Data-Driven**: Content is loaded from JSON files for easy maintenance
- **Performance**: Optimized with Vite and modern React patterns
- **Multi-Page Navigation**: React Router implementation with clean URLs
- **Accessibility**: Built with accessibility best practices

## 🛠️ Technology Stack

- **React 19+** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **shadcn/ui** for base components
- **ESLint** for code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── primitives/           # shadcn/ui components (style-agnostic)
│   │   ├── button.tsx
│   │   ├── sheet.tsx
│   │   └── navigation-menu.tsx
│   │
│   ├── composite/            # Composite components (primitives + styles)
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Navbar.styles.ts
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.styles.ts
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   └── Layout.styles.ts
│   │   ├── controls/
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   ├── ThemeSwitcher.styles.ts
│   │   │   ├── MoveToTopButton.tsx
│   │   │   ├── MoveToTopButton.styles.ts
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── LoadingSpinner.styles.ts
│   │   └── index.ts         # Export all composite components
│   │
│   └── templates/
│       └── IPageTemplate.ts  # Page structure interface
│
├── styles/
│   ├── themes/              # Theme design tokens
│   │   ├── light.ts
│   │   ├── dark.ts
│   │   ├── neon.ts
│   │   └── glassmorphism.ts
│   │
│   ├── tokens/              # Design system tokens
│   │   ├── typography.ts
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── effects.ts
│   │
│   └── index.ts            # Export all styles and themes
│
├── hooks/                   # Custom hooks
│   ├── useTheme.ts
│   ├── useGlobalProps.ts
│   └── index.ts            # Export all hooks
│
├── types/                   # Type definitions
│   ├── themes.ts
│   ├── components.ts
│   └── globalProps.ts
│
└── pages/                   # Page implementations
    ├── Home.tsx             # Implements IPageTemplate + content
    ├── About.tsx            # Implements IPageTemplate + content
    ├── Work.tsx             # Implements IPageTemplate + content
    ├── Blogs.tsx            # Implements IPageTemplate + content
    ├── Contact.tsx          # Implements IPageTemplate + content
    └── Connect.tsx          # Implements IPageTemplate + content
```

## 🎨 Architecture Overview

### **Component Layers**

1. **Primitives** (`components/primitives/`)
   - shadcn/ui base components
   - Style-agnostic, focus on accessibility and behavior
   - Never used directly in pages

2. **Composite Components** (`components/composite/`)
   - Styled components with full theme support
   - Use primitives + custom styles
   - Can be used directly in pages or by templates

3. **Templates** (`components/templates/`)
   - `IPageTemplate` interface enforces page structure
   - All pages must implement required components
   - Ensures consistency across the site

### **Styling System**

- **Theme Tokens**: Centralized design values (colors, typography, spacing)
- **Component Styles**: Co-located with components for easy maintenance
- **Tailwind CSS**: Utility-first styling with custom theme extensions
- **Theme Switching**: Dynamic theme changes with CSS custom properties

### **Page Structure**

Every page implements `IPageTemplate` which requires:
- Navbar (always present, no modification allowed)
- Footer (always present, no modification allowed)
- Theme Switcher (always accessible, no modification allowed)
- Move to Top Button (always present, no modification allowed)
- Loading Spinner (controlled by template, no page override)
- Content area (pages can customize this)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Principles

- **DRY (Don't Repeat Yourself)**: Centralized styles and shared components
- **Separation of Concerns**: Clear distinction between logic, styling, and content
- **Type Safety**: Full TypeScript implementation with strict typing
- **Accessibility**: Built-in accessibility features from shadcn/ui
- **Performance**: Optimized builds with Vite and modern React patterns

## 🔧 Customization

### Adding New Themes

1. Create theme file in `styles/themes/`
2. Define color, typography, and effect tokens
3. Update theme context and switcher

### Adding New Components

1. Create component in appropriate `components/composite/` folder
2. Add component styles with theme support
3. Export from `components/composite/index.ts`

### Adding New Pages

1. Create page folder in `pages/`
2. Implement `IPageTemplate` interface
3. Add route in router configuration

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio project. For questions or suggestions, please open an issue.

## 📄 License

This project is private and not licensed for public use.
