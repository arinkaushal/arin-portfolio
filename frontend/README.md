# 🖥️ Portfolio Frontend

React + Vite frontend for **Arin Kaushal's** developer portfolio.

## ⚡ Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

## ✏️ Updating Content

All portfolio data is in one place:

```
src/data/portfolio.js
```

| Export          | What it controls                         |
|-----------------|------------------------------------------|
| `personal`      | Name, bio, photo, links, contact info    |
| `heroRoles`     | Typewriter roles in the Hero section     |
| `heroStats`     | Stats counters (projects, years, tech)   |
| `skills`        | Skill cards with levels & categories     |
| `otherSkills`   | Additional skills shown as tags          |
| `projects`      | Project cards with tech, links & period  |
| `education`     | Education timeline                       |
| `experience`    | Work / internship timeline               |
| `certificates`  | Certificate list with issuer & links     |
| `achievements`  | Achievements (optional)                  |
| `softSkills`    | Soft skills tags in About section        |

## 📬 EmailJS Setup

Create a `.env` file in this directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📁 Static Assets

Place files inside `public/`:

| File         | Purpose             |
|--------------|---------------------|
| `img.png`    | Profile photo       |
| `resume.pdf` | Downloadable resume |

## 🛠️ Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v3**
- **Framer Motion** (animations)
- **Canvas API** (particle background)
- **EmailJS** (contact form, no backend)
- **React Hot Toast** (notifications)
