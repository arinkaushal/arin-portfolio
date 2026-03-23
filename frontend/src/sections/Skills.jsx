import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiHtml5, SiPython, SiMysql, SiGit, SiBootstrap, SiPostman, SiLinux,
} from 'react-icons/si'
import { FaJava, FaPhp, FaCss3Alt } from 'react-icons/fa'
import { TbPlugConnected } from 'react-icons/tb'
import { skills, otherSkills } from '../data/portfolio'

// ── Icon + colour for every skill ─────────────────────────────────────────
const ICON_MAP = {
  'JavaScript':   { Icon: SiJavascript,   color: '#f7df1e' },
  'React.js':     { Icon: SiReact,        color: '#61dafb' },
  'Node.js':      { Icon: SiNodedotjs,    color: '#68a063' },
  'MongoDB':      { Icon: SiMongodb,      color: '#4db33d' },
  'Express.js':   { Icon: SiExpress,      color: '#cccccc' },
  'Tailwind CSS': { Icon: SiTailwindcss,  color: '#38bdf8' },
  'HTML5':        { Icon: SiHtml5,        color: '#e34c26' },
  'CSS3':         { Icon: FaCss3Alt,      color: '#264de4' },
  'Python':       { Icon: SiPython,       color: '#3572a5' },
  'PHP':          { Icon: FaPhp,          color: '#8892be' },
  'SQL / MySQL':  { Icon: SiMysql,        color: '#f29111' },
  'Git & GitHub': { Icon: SiGit,          color: '#f05032' },
  'Java':         { Icon: FaJava,         color: '#f89820' },
  'Bootstrap':    { Icon: SiBootstrap,    color: '#7952b3' },
  'Postman':      { Icon: SiPostman,      color: '#ff6c37' },
  'Unix/Linux':   { Icon: SiLinux,        color: '#f7c948' },
  'WebSockets':   { Icon: TbPlugConnected,color: '#00ff88' },
  // Text-based fallbacks
  'C':            { Icon: null, emoji: 'C',   color: '#a8b9cc' },
  'C#':           { Icon: null, emoji: 'C#',  color: '#9b4f96' },
  'C++':          { Icon: null, emoji: 'C++', color: '#00599c' },
  '.NET':         { Icon: null, emoji: '.N',  color: '#512bd4' },
  'VS Code':      { Icon: null, emoji: '{}',  color: '#007acc' },
  'MS Office':    { Icon: null, emoji: 'W',   color: '#d83b01' },
  'React Flow':   { Icon: SiReact,        color: '#ff4785' },
  'Gemini API':   { Icon: null, emoji: '✦',   color: '#8e75b2' },
}

// ── Category definitions ───────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Languages',
    color: '#f7df1e',
    items: [
      ...skills.filter((s) => s.category === 'Language').map((s) => s.name),
      'C', 'C++', 'C#', 'Java',
    ],
  },
  {
    label: 'Frontend',
    color: '#61dafb',
    items: [...skills.filter((s) => s.category === 'Frontend').map((s) => s.name), 'Bootstrap', 'React Flow'],
  },
  {
    label: 'Backend',
    color: '#68a063',
    items: [...skills.filter((s) => s.category === 'Backend').map((s) => s.name), '.NET', 'WebSockets'],
  },
  {
    label: 'Database',
    color: '#4db33d',
    items: skills.filter((s) => s.category === 'Database').map((s) => s.name),
  },
  {
    label: 'Tools & DevOps',
    color: '#f05032',
    items: [...skills.filter((s) => s.category === 'Tools').map((s) => s.name), 'Postman', 'VS Code', 'Unix/Linux'],
  },
  {
    label: 'Other',
    color: '#8e75b2',
    items: ['MS Office', 'Gemini API'],
  },
]

// ── Skill pill ─────────────────────────────────────────────────────────────
const SkillPill = ({ name, url, index }) => {
  const meta  = ICON_MAP[name] ?? { Icon: null, emoji: name[0], color: '#00ff88' }
  const { Icon, emoji, color } = meta

  const inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -3, scale: 1.06 }}
      className="group flex items-center gap-2.5 px-4 py-2.5 border border-white/8
                 bg-white/[0.03] hover:bg-white/[0.07] rounded-sm
                 transition-all duration-250 cursor-pointer"
      style={{ '--c': color }}
    >
      {/* Icon */}
      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {Icon
          ? <Icon style={{ fontSize: 16, color, filter: `drop-shadow(0 0 4px ${color}80)` }} />
          : <span style={{ fontSize: emoji.length > 1 ? 9 : 14, color, fontWeight: 800,
              textShadow: `0 0 6px ${color}`, lineHeight: 1 }}>{emoji}</span>
        }
      </span>
      {/* Name */}
      <span className="font-mono text-xs text-gray-300 group-hover:text-white
                       transition-colors duration-200 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  )

  return url
    ? <a href={url} target="_blank" rel="noopener noreferrer">{inner}</a>
    : inner
}

// ── Category Block ─────────────────────────────────────────────────────────
const CategoryBlock = ({ label, color, items, skillsData }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="p-5 border border-white/5 bg-white/[0.02] rounded-sm"
    style={{ borderTop: `2px solid ${color}60` }}
  >
    {/* Category heading */}
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="font-mono text-xs tracking-widest uppercase"
            style={{ color }}>{label}</span>
    </div>

    {/* Pills */}
    <div className="flex flex-wrap gap-2">
      {items.map((name, i) => {
        const sd = skillsData.find((s) => s.name === name)
        return <SkillPill key={name} name={name} url={sd?.url || null} index={i} />
      })}
    </div>
  </motion.div>
)

// ── Skills Section ─────────────────────────────────────────────────────────
const Skills = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="section-subtitle">// Tools I Work With</p>
          <h2 className="section-title">
            Tech <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Stack</span>
          </h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
        </motion.div>

        {/* Category grid — 2 columns on md+, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map(({ label, color, items }) => (
            <CategoryBlock
              key={label}
              label={label}
              color={color}
              items={items}
              skillsData={skills}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills
