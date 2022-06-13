# Fast Ecommerce

Fast Ecommerce, is a base ecommerce app, using [Nuxt3](<(https://v3.nuxtjs.org)>) + Strapi as backend.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Scaffold

This application is based on the modular structure, to have consistency and flexibility, under this concept, the file structure is as follows:

```
├── functions
├── layouts
├── modules
│   ├── product
│   │   ├── components
│   │   ├── pages
│   │   └── module.ts
│   └── shared
│       ├── assets
│       │   ├── fonts
│       │   └── scss
│       ├── components
│       │   ├── common
│       │   ├── footer
│       │   ├── header
│       │   ├── information
│       │   ├── mobile
│       │   └── Etc...
│       ├── plugins
│       └── public
├── pages
├── store (It might be changed)
└── types (It might be changed)
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
