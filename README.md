# TZ Todo Application

Frontend To-Do Application Competency Task by Tapiwa Zireva.

## Features

### Phase 1: Foundation & Core Features ✅
- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks with confirmation modal
- Dark/Light/System theme switching
- LocalStorage persistence
- Responsive design
- Smooth animations with Framer Motion
- Custom TZ branding (purple & rose gold)
- Error boundary for error handling

### Phase 2: Enhanced Functionality ✅
- **Inline Edit Mode**: Double-click any todo or click the edit icon to edit inline
  - Press Enter to save changes
  - Press Escape to cancel editing
- **Smart Filtering**: Filter todos by status
  - All: View all todos
  - Active: View only incomplete todos
  - Completed: View only completed todos
  - Real-time count updates for each filter
- **Loading States**: Skeleton loaders while fetching todos (2-second delay simulates API calls)
- **Error Handling**: Graceful error messages with retry capability
- **Delete Confirmation**: Modal confirmation before deleting to prevent accidents
- **Optimistic Updates**: UI updates immediately for better UX, with rollback on error
- **Clean Architecture**: All async operations implemented inline within TodoContext, following best practices for React state management with reducers

### Phase 3: Polish & Advanced Features ✅
- **Enhanced Theme System**:
  - Smooth color transitions between light/dark modes (0.3s ease)
  - System preference detection and auto-switching
  - Custom TZ brand colors (purple #433458 & rose gold) maintained across themes
  - CSS custom properties for consistent theming
- **Smooth Animations**:
  - Framer Motion AnimatePresence for list items
  - Enter/exit animations with fade and slide effects
  - Layout animations on todo reordering
  - Hover states with smooth transitions
- **Accessibility**:
  - Keyboard navigation with focus-visible states
  - ARIA-compliant button and checkbox components
  - Focus ring indicators (2px ring with offset)
  - Proper focus management in modals and forms
  - Screen reader friendly component structure

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vitest** - Unit testing

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

### Test

```bash
# Run tests
npm test
```


## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Live Demo
[https://tapsZ.github.io/To-Do/](https://tapsZ.github.io/To-Do/)

### Setup

1. Go to your GitHub repository Settings → Pages
2. Ensure "Build and deployment" source is set to "GitHub Actions" (or "Deploy from a branch" if using the `gh-pages` branch directly, but our workflow handles this).
   *Actually, our workflow deploys to `gh-pages` branch, so:*
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

### Automatic Deployment

- Every push to `main` branch triggers tests and automatic deployment to GitHub Pages.
- Pull requests trigger tests to ensure code quality.

## Author

**Tapiwa Zireva**

## License

Private - All Rights Reserved