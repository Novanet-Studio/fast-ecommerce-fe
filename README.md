<div align="center">
  <img width="180" src="./docs/logo.svg" alt="Novanet Logo" />
</div>

<div align="center">
  <h1 align="center">Fast Ecommerce</h1>
   <p>Base ecommerce site :computer:</p>
</div>

<div align="center">
  <img src="https://api.netlify.com/api/v1/badges/78aa6416-c116-42af-8a43-b05f8a3b637d/deploy-status" />
</div>

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [Volar extension](https://github.com/johnsoncodehk/volar)

## Getting started

This project use an [Strapi](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html) project to handle the backend request, and the frontend is built in [Nuxt](https://nuxt.com/docs/getting-started/introduction)

After install the prerequisites:

> **NOTE** You need to set the env variables in both projects for the right functionality.

#### Backend

Clone repo:

```console
git clone https://github.com/novanet/backend
```

Install dependencies

```console
yarn install
```

And run the project:

```console
yarn develop
```

After that you should see the server initializated, and you can open the project in `http://localhost:1337/admin`

#### Frontend

Clone repo:

```console
git clone https://github.com/novanet/frontend
```

Install dependencies

```console
yarn install
```

And run the project:

```console
yarn dev
```

After this you can open `http://localhost:3000`

## Production

Build the application for production:

```console
yarn generate
```

Locally preview production build:

```console
yarn preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
