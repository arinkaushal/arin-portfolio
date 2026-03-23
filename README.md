# 🚀 Arin Kaushal — Developer Portfolio

A modern, futuristic developer portfolio built with **React + Vite** featuring a **black + neon green (`#00ff88`)** cyberpunk theme, animated particle background, Framer Motion animations, and EmailJS-powered contact form.

## 👤 About

- **Name:** Arin Kaushal
- **Role:** Full Stack Developer (MERN Stack)
- **Location:** Phagwara, Punjab, India
- **Email:** arinkaushal06@gmail.com
- **GitHub:** [arinkaushal](https://github.com/arinkaushal)
- **LinkedIn:** [arin-kaushal](https://www.linkedin.com/in/arin-kaushal/)

---

## 🗂️ Project Structure

```
portfolio/
└── frontend/
    ├── public/
    │   ├── img.png              # Profile photo
    │   └── resume.pdf           # Resume (place here)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ParticleBackground.jsx
    │   │   └── Footer.jsx
    │   ├── sections/
    │   │   ├── Hero.jsx         # Typewriter animation + stats
    │   │   ├── About.jsx        # Bio + education + soft skills
    │   │   ├── Skills.jsx       # Animated skill progress cards
    │   │   ├── Projects.jsx     # Project cards with links
    │   │   ├── Experience.jsx   # Timeline
    │   │   └── Contact.jsx      # EmailJS contact form
    │   ├── data/
    │   │   └── portfolio.js     # ⭐ All content lives here
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── App.css
    ├── .env                     # EmailJS credentials
    ├── vite.config.js
    └── index.html
```

---

## ⚡ Quick Start

```bash
cd frontend
npm install
npm run dev
```

App runs on **http://localhost:5173**

> **Note:** This is a fully frontend-only project. No backend or database required.

---

## 🛠️ Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS v3       |
| Animation  | Framer Motion, Canvas API (particles) |
| Contact    | EmailJS (no backend needed)           |
| HTTP       | Axios                                 |
| Toast      | React Hot Toast                       |

---

## 🎨 Color Palette

| Color      | Hex       | Usage                 |
|------------|-----------|-----------------------|
| Neon Green | `#00ff88` | Accent, glow, buttons |
| Black      | `#000000` | Background            |
| Dark Card  | `#0a0a0a` | Card backgrounds      |

---

## 📬 Contact Form (EmailJS)

The contact form uses **EmailJS** — no backend required.

Create `frontend/.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## ✏️ Customising Content

All portfolio content (personal info, skills, projects, education, certificates) is centralised in:

```
frontend/src/data/portfolio.js
```

Edit that single file — all sections update automatically.

---

## 📦 Featured Projects

| Project | Tech | Period |
|---------|------|--------|
| Manufacturing Execution System | MERN, React Flow, WebSockets | Dec 2025 |
| AI-Integrated Learning & Career Guidance Platform | MERN, Gemini API | Jul 2025 |
| EstateEase | HTML, CSS, Tailwind, PHP | Apr 2025 |

---

## 🎓 Education

- **B.Tech CSE** — Lovely Professional University *(Sep 2023 – Present)* · CGPA: 7.0
- **Intermediate (XII)** — Sheetal Model Sr. Secondary School · 90%
- **Matriculation (X)** — Sheetal Model Sr. Secondary School · 97%

---

## 🏅 Certifications

- Computational Theory: Language Principle & Finite Automata Theory 5 — *Infosys (Aug 2025)*
- CodeQuery: The Ultimate PUSQL & Data Science Bootcamp — *LPU (Jul 2025)*
- The Bits and Bytes of Computer Networking — *Google (Sep 2024)*
- Introduction to Hardware and Operating Systems — *IBM (Sep 2024)*
- Peer-to-Peer Protocols and Local Area Networks — *UOC (Sep 2024)*
