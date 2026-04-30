# React OJT Mini Project

[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://drixmolina.github.io/miniproject/)

A completed React training project built with Vite. The app demonstrates React fundamentals, routing, context API, authentication, CRUD state management, and a capstone blog application.

## Release

- **Version:** 1.0.0
- **Date:** April 30, 2026
- **Deployment:** GitHub Pages ready via `npm run deploy`
- **Highlights:** routing, Context API, protected auth flow, CRUD task manager, blog capstone, localStorage persistence

## Features

- Home, About, Contact, and Dashboard pages
- Todo app using Context API
- Task manager with CRUD behavior
- Authentication flow using `reqres.in` fake login API
- Protected route access for dashboard and blog post creation/editing
- Blog capstone with create, read, update, delete, and like actions
- LocalStorage persistence for auth session and blog posts

## Project structure

- `src/main.jsx` — entry point
- `src/AppRouter.jsx` — router and global providers
- `src/context/AuthContext.jsx` — auth state and login/logout
- `src/context/BlogContext.jsx` — blog CRUD state
- `src/pages/` — page components
- `src/TaskManager.jsx` — task management app

## Run locally

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open the local URL shown in the terminal

## Build for production

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Deploy to GitHub Pages

This project includes GitHub Pages deployment support.

### Manual deploy

1. Install dependencies (if not already installed)

```bash
npm install
```

2. Deploy

```bash
npm run deploy
```

The production build is published from the `dist` folder.

### Automatic deploy

A GitHub Actions workflow is configured to run on every push to `main`.
It builds the app and deploys it automatically to GitHub Pages.

## Notes

- The app uses Vite and React Router v7.
- The GitHub Pages base path is configured in `vite.config.js`.
- If you prefer Netlify or Vercel, point the publish folder to `dist`.
