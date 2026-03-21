# Betting Platform Frontend

This project is a React + Vite frontend application.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Then run:

```bash
npm run dev
```

On the backend, you need to allow CORS so the frontend can make requests to the API. Example for Node/Express:
```bash
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```
JWT tokens are currently stored in localStorage. Since the backend does not provide a refresh token, using localStorage or an HTTP-only cookie does not add extra security — the token is still accessible client-side.

## About project
Light - Dark mode is installed.
Language support added, but I have some missing translations
.I am using Auth and UI Contexts to controll all site
.I dont write my comments in Lithuanian, and I almost never write comments, these comments are added because I want to understand the guys who checks the project why I did some of the things :) 
.Good luck to you guys