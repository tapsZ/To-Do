# TZ Todo Application

Frontend To-Do Application Competency Task by Tapiwa Zireva.

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

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

### Setup

1. Go to your GitHub repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Automatic Deployment

- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments

## Author

**Tapiwa Zireva**

## License

Private - All Rights Reserved