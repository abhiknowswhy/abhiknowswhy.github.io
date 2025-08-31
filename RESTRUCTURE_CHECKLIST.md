# Restructure Checklist

Track progress of the new src architecture migration. Check items as they are completed.

## 1) Files to Populate (move/implement correct code)

- [x] components/primitives/button.tsx (from src/components/ui/button.tsx)
- [x] components/primitives/sheet.tsx (from src/components/ui/sheet.tsx)
- [x] components/primitives/navigation-menu.tsx (from src/components/ui/navigation-menu.tsx)

- [x] components/composite/navigation/Navbar.tsx (from src/common/Navbar/Navbar.tsx)
- [x] components/composite/navigation/Navbar.styles.ts (from src/common/Navbar/styles.ts)
- [x] components/composite/navigation/Footer.tsx (from src/common/Footer/Footer.tsx)
- [x] components/composite/navigation/Footer.styles.ts (from src/common/Footer/styles.ts)
- [x] components/composite/layout/Layout.tsx (from src/common/Layout.tsx)
- [x] components/composite/layout/Layout.styles.ts (from src/common/styles.ts)
- [x] components/composite/controls/ThemeSwitcher.tsx (from src/common/ThemeSwitcher/ThemeSwitcher.tsx)
- [x] components/composite/controls/ThemeSwitcher.styles.ts (from src/common/ThemeSwitcher/styles.ts)
- [x] components/composite/controls/MoveToTopButton.tsx (from src/common/MoveToTopButton/MoveToTopButton.tsx)
- [x] components/composite/controls/MoveToTopButton.styles.ts (from src/common/MoveToTopButton/styles.ts)
- [x] components/composite/controls/LoadingSpinner.tsx (from src/common/LoadingSpinner/LoadingSpinner.tsx)
- [x] components/composite/controls/LoadingSpinner.styles.ts (from src/common/LoadingSpinner/styles.ts)

- [x] pages/Home.tsx (from src/pages/Home/Home.tsx)
- [x] pages/About.tsx (from src/pages/About/About.tsx)
- [x] pages/Work.tsx (from src/pages/Work/Work.tsx)
- [x] pages/Blogs.tsx (from src/pages/Blogs/Blogs.tsx)
- [x] pages/Contact.tsx (from src/pages/Contact/Contact.tsx)
- [x] pages/Connect.tsx (from src/pages/Connect/Connect.tsx)
- [x] pages/NotFound.tsx (from src/pages/NotFound/NotFound.tsx)

- [x] styles/themes/light.ts (implement tokens)
- [x] styles/themes/dark.ts (implement tokens)
- [x] styles/themes/neon.ts (implement tokens)
- [x] styles/themes/glassmorphism.ts (implement tokens)
- [x] styles/tokens/typography.ts (implement tokens)
- [x] styles/tokens/colors.ts (implement tokens)
- [x] styles/tokens/spacing.ts (implement tokens)
- [x] styles/tokens/effects.ts (implement tokens)

## 2) Files/Folders to Delete (after migration verified)

- [x] src/common/ (entire folder)
- [x] src/components/ui/ (entire folder)
- [x] src/pages/Home/ (folder)
- [x] src/pages/About/ (folder)
- [x] src/pages/Work/ (folder)
- [x] src/pages/Blogs/ (folder)
- [x] src/pages/Contact/ (folder)
- [x] src/pages/Connect/ (folder)
- [x] src/pages/NotFound/ (folder)

## Notes
- Perform deletions only after the equivalent files are populated and imports updated.
- Keep builds green between steps (npm run build).
- Update README and import paths as needed.
