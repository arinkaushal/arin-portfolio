// ============================================================
//  PORTFOLIO DATA — Edit everything here.
//  Components import from this file, so the structure stays
//  intact no matter how much content you update.
// ============================================================

// ──────────────────────────────────────────────
// PERSONAL INFO
// ──────────────────────────────────────────────
export const personal = {
  name: 'Arin Kaushal',
  shortName: 'ARIN',
  initials: 'AK',
  tagline: 'Full Stack Developer',
  bio: `I'm a passionate Full Stack Developer pursuing B.Tech in Computer Science at LPU. I love building scalable, performant web applications and thrive at the intersection of clean engineering and great UX.`,
  bio2:
    `With hands-on experience in the MERN stack, I've built everything from real-time MES platforms to AI-integrated learning tools. I'm committed to writing maintainable code and delivering great products.`,
  location: 'Phagwara, Punjab, India',
  email: 'arinkaushal06@gmail.com',
  phone: '+91 9418178049',
  availability: 'Open to Work',

  // ── Profile photo ──────────────────────────────────────────
  // Drop your photo into frontend/public/ and set the filename here.
  // E.g. if you save it as `profile.jpg`, set:  profilePhoto: '/profile.jpg'
  // Leave as null to show the placeholder avatar.
  profilePhoto: 'img.png',

  // ── Social / external links ────────────────────────────────
  links: {
    github: 'https://github.com/arinkaushal',
    linkedin: 'https://www.linkedin.com/in/arin-kaushal/',
    twitter: '', // add your handle URL when ready
    portfolio: '', // live portfolio URL after deployment
    resume: '/resume.pdf', // place resume PDF in frontend/public/
  },
}

// ──────────────────────────────────────────────
// HERO — roles shown in the typewriter effect
// ──────────────────────────────────────────────
export const heroRoles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'React.js Developer',
  'Node.js Developer',
  'Problem Solver',
]

// ──────────────────────────────────────────────
// HERO STATS
// ──────────────────────────────────────────────
export const heroStats = [
  { n: '3+', label: 'Projects' },
  { n: '2+', label: 'Years Exp' },
  { n: '10+', label: 'Technologies' },
]

// ──────────────────────────────────────────────
// SKILLS
// ──────────────────────────────────────────────
export const skills = [
  { name: 'JavaScript', icon: '⚡', level: 88, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 'Language' },
  { name: 'React.js',   icon: '⚛️', level: 85, url: 'https://react.dev',                                       category: 'Frontend'  },
  { name: 'Node.js',    icon: '🟢', level: 82, url: 'https://nodejs.org',                                      category: 'Backend'   },
  { name: 'MongoDB',    icon: '🍃', level: 78, url: 'https://www.mongodb.com',                                 category: 'Database'  },
  { name: 'Express.js', icon: '🚀', level: 80, url: 'https://expressjs.com',                                   category: 'Backend'   },
  { name: 'Tailwind CSS',icon:'🎯', level: 85, url: 'https://tailwindcss.com',                                 category: 'Frontend'  },
  { name: 'HTML5',      icon: '🌐', level: 95, url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',       category: 'Language'  },
  { name: 'CSS3',       icon: '🎨', level: 90, url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',        category: 'Language'  },
  { name: 'Python',     icon: '🐍', level: 72, url: 'https://www.python.org',                                  category: 'Language'  },
  { name: 'PHP',        icon: '🐘', level: 68, url: 'https://www.php.net',                                     category: 'Backend'   },
  { name: 'SQL / MySQL',icon: '🗄️', level: 75, url: 'https://www.mysql.com',                                   category: 'Database'  },
  { name: 'Git & GitHub',icon:'🔧', level: 82, url: 'https://git-scm.com',                                     category: 'Tools'     },
]

export const otherSkills = [
  'C', 'C#', 'C++', 'Java', 'Bootstrap', '.NET',
  'Postman', 'VS Code', 'Unix/Linux', 'MS Office',
  'WebSockets', 'React Flow', 'Gemini API',
]

// ──────────────────────────────────────────────
// PROJECTS
// ──────────────────────────────────────────────
export const projects = [
  {
    title: 'GST Software Dashboard',
    description:
      'A scalable GST management platform enabling automated tax computation, real-time financial insights, and efficient invoice handling. Designed with a modern dashboard, secure backend APIs, and optimized performance for multi-user environments.',
    tech: ['Express.js', 'React.js', 'MongoDB', 'Node.js', 'Tailwind CSS', 'React Flow', 'WebSockets'],
    github: 'https://github.com/arinkaushal/GSTsoftware',   // ← replace with actual repo URL
    demo: 'https://share.google/d23oURzuUR8p9kPTC',                                    // ← add live demo URL when deployed
    period: 'Dec 2025',
    status: 'Live',
  },
  {
    title: 'AI-Integrated Learning & Career Guidance Platform',
    description:
      'A learning platform with interactive education modules, secure auth, personalized course onboarding, quiz dashboards with proctoring features, and Gemini AI integration for career guidance and PDF/text summarisation.',
    tech: ['Express.js', 'React.js', 'MongoDB', 'Node.js', 'Tailwind CSS', 'Gemini API'],
    github: 'https://github.com/arinkaushal',   // ← replace with actual repo URL
    demo: '',
    period: 'Jul 2025',
    status: 'Live',
  },
  {
    title: 'EstateEase',
    description:
      'A streamlined property listing platform with real-time filters, dedicated property detail pages, a complete purchase flow, intuitive transaction confirmation, and polished checkout animations.',
    tech: ['HTML', 'CSS', 'Tailwind CSS', 'PHP'],
    github: 'https://github.com/arinkaushal',   // ← replace with actual repo URL
    demo: '',
    period: 'Apr 2025',
    status: 'Live',
  },
]

// ──────────────────────────────────────────────
// EDUCATION
// ──────────────────────────────────────────────
export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: 'Sep 2023 – Present',
    grade: 'CGPA: 7.0',
  },
  {
    degree: 'Intermediate (XII)',
    school: 'Sheetal Model Sr. Secondary School',
    location: 'Hamirpur, Himachal Pradesh',
    period: 'Apr 2022 – May 2023',
    grade: 'Percentage: 90%',
  },
  {
    degree: 'Matriculation (X)',
    school: 'Sheetal Model Sr. Secondary School',
    location: 'Hamirpur, Himachal Pradesh',
    period: 'Apr 2020 – Mar 2021',
    grade: 'Percentage: 97%',
  },
]

// ──────────────────────────────────────────────
// EXPERIENCE (work / internship)
// ──────────────────────────────────────────────
export const experience = [
  // Add work experience here as you gain more:
  // {
  //   title: 'Frontend Intern',
  //   company: 'ACME Corp',
  //   period: 'Jun 2025 – Aug 2025',
  //   description: 'Built React dashboards...',
  //   tech: 'React · Node.js',
  // },
]

// ──────────────────────────────────────────────
// CERTIFICATES
// ──────────────────────────────────────────────
export const certificates = [
  {
    name: 'Computational Theory: Language Principle & Finite Automata Theory 5',
    issuer: 'Infosys',
    period: 'Aug 2025',
    url: 'https://drive.google.com/file/d/1ruZb7NOLEytg34Ef5cs6PGSyI8BXnE9c/view',   // ← paste certificate link here
  },
  {
    name: 'CodeQuery: The Ultimate PUSQL & Data Science Bootcamp',
    issuer: 'LPU',
    period: 'Jul 2025',
    url: 'https://drive.google.com/file/d/1-4PqxLAcBPjjqxUxYwnli6zB9i5_kI1z/view',
  },
  {
    name: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    period: 'Sep 2024',
    url: 'https://drive.google.com/file/d/1HuaudpYpVAKvi4X83PWuxCH-boF7Y5b1/view',
  },
  {
    name: 'Introduction to Hardware and Operating Systems',
    issuer: 'IBM',
    period: 'Sep 2024',
    url: 'https://drive.google.com/file/d/1jNfOQL1rdMCxfCVFHsXLk31l7_-SkH4o/view',
  },
  {
    name: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'UOC',
    period: 'Sep 2024',
    url: 'https://drive.google.com/file/d/1i23kwMBSJuj_G2fLmLneV5hGfK0fqm18/view',
  },
]

// ──────────────────────────────────────────────
// ACHIEVEMENTS
// ──────────────────────────────────────────────
export const achievements = [
  // {
  //   title: '2nd Position — Soft-Skills Workshop',
  //   description:
  //     'Achieved 2nd position in a soft-skills workshop, showcasing exceptional communication and teamwork.',
  //   period: 'Nov 2023',
  // },
]

// ──────────────────────────────────────────────
// SOFT SKILLS (displayed in About section)
// ──────────────────────────────────────────────
export const softSkills = [
  'Problem-Solving',
  'Teamwork',
  'Adaptability',
  'Time Management',
  'Critical Thinking',
]
