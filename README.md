# 🚀 MERN Developer Portfolio

A modern, futuristic developer portfolio built with the MERN stack and Tailwind CSS featuring a **black + neon green (#00ff88)** theme with animated particle background and Framer Motion animations.

## 🗂️ Project Structure

```
portfolio/
├── backend/
│   ├── models/Contact.js          # Mongoose contact schema
│   ├── routes/contactRoutes.js    # POST & GET /api/contact
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── server.js                   # Express server entry
└── frontend/
    ├── public/favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx          # Sticky nav + mobile menu
    │   │   ├── ParticleBackground.jsx  # Canvas particle animation
    │   │   └── Footer.jsx
    │   ├── sections/
    │   │   ├── Hero.jsx            # Typewriter animation + code block
    │   │   ├── About.jsx           # Bio + education cards
    │   │   ├── Skills.jsx          # Animated progress bar cards
    │   │   ├── Projects.jsx        # 6 project cards with links
    │   │   ├── Experience.jsx      # Alternating timeline
    │   │   └── Contact.jsx         # Form → backend API
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css               # Tailwind + custom animations
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── index.html
```

## ⚡ Quick Start

### 1. Backend

```bash
cd backend
npm install
# Edit .env: set your MONGO_URI
npm run dev
```

Server runs on **http://localhost:5000**

> **MongoDB**: Make sure MongoDB is running locally (`mongod`) or update `MONGO_URI` in `.env` to point to MongoDB Atlas.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on **http://localhost:5173**  
The Vite proxy forwards `/api/*` requests to `http://localhost:5000`.

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite 8, Tailwind CSS v3  |
| Animation | Framer Motion, Canvas API           |
| HTTP      | Axios                               |
| Toast     | React Hot Toast                     |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB + Mongoose                  |

## 🌐 API Endpoints

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| POST   | /api/contact   | Save contact form       |
| GET    | /api/contact   | List all messages       |
| GET    | /api/health    | Server health check     |

## 🎨 Color Palette

| Color       | Hex       | Usage                  |
|-------------|-----------|------------------------|
| Neon Green  | `#00ff88` | Accent, glow, buttons  |
| Black       | `#000000` | Background             |
| Dark Card   | `#0a0a0a` | Card backgrounds       |

## 📦 Environment Variables (backend/.env)

```
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
```
