# Nimble Gravity Challenge

A mini React application that allows candidates to browse open job positions and submit their application with a GitHub repository URL.

## What it does

1. Fetches the candidate's profile from the API using their email.
2. Fetches the list of open job positions.
3. Displays each position with an input field for a GitHub repo URL and a **Submit** button.
4. Posts the application to the API and shows inline success/error feedback.

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- Vanilla CSS (no UI library)

## Project structure

```
src/
├── components/
│   └── JobItem.jsx       # Individual job card with form and submit logic
├── services/
│   └── apiService.js     # All API calls (candidate, jobs, apply)
├── App.jsx               # Root component — data fetching and layout
├── main.jsx              # App entry point
└── index.css             # Global styles
```

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/EFrega/nimble-gravity-challenge.git
cd nimble-gravity-challenge
```

### 2. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
