import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiHtml5, SiPython, SiPhp, SiMysql, SiGit
} from 'react-icons/si'
import { skills, otherSkills } from '../data/portfolio'

// ── per-skill visual config ────────────────────────────────────────────────
const META = {
  'JavaScript':  { Icon: SiJavascript,  color: '#f7df1e', size: 88,  left:'7%',  top:'8%',  delay:0.0  },
  'React.js':    { Icon: SiReact,       color: '#61dafb', size:104,  left:'28%', top:'1%',  delay:0.12 },
  'Node.js':     { Icon: SiNodedotjs,   color: '#68a063', size: 86,  left:'53%', top:'5%',  delay:0.24 },
  'MongoDB':     { Icon: SiMongodb,     color: '#4db33d', size: 72,  left:'74%', top:'14%', delay:0.36 },
  'Express.js':  { Icon: SiExpress,     color: '#cccccc', size: 58,  left:'90%', top:'42%', delay:0.48 },
  'Tailwind CSS':{ Icon: SiTailwindcss, color: '#38bdf8', size: 88,  left:'68%', top:'60%', delay:0.60 },
  'HTML5':       { Icon: SiHtml5,       color: '#e34c26', size: 96,  left:'12%', top:'57%', delay:0.72 },
  'CSS3':        { Icon: null,          color: '#264de4', size: 64,  left:'40%', top:'72%', delay:0.84 },
  'Python':      { Icon: SiPython,      color: '#3572a5', size: 62,  left:'3%',  top:'38%', delay:0.96 },
  'PHP':         { Icon: SiPhp,         color: '#8892be', size: 60,  left:'22%', top:'27%', delay:1.08 },
  'SQL / MySQL': { Icon: SiMysql,       color: '#f29111', size: 76,  left:'46%', top:'36%', delay:1.20 },
  'Git & GitHub':{ Icon: SiGit,         color: '#f05032', size: 74,  left:'82%', top:'75%', delay:1.32 },
}

// small decorative micro-dots
const DOTS = [
  { left:'2%',  top:'18%', s:12 }, { left:'48%', top:'18%', s:10 },
  { left:'92%', top:'20%', s:11 }, { left:'60%', top:'46%', s:10 },
  { left:'27%', top:'76%', s:13 }, { left:'72%', top:'86%', s:10 },
  { left:'6%',  top:'70%', s:11 }, { left:'35%', top:'52%', s: 9 },
  { left:'55%', top:'82%', s:10 }, { left:'18%', top:'46%', s: 9 },
]

// float each bubble at its own rhythm
const floatAnim = (i) => ({
  y: [0, -(8 + (i % 4) * 5), 0],
  x: [0, (i % 2 === 0 ? 3 : -3), 0],
  transition: { duration: 3.6 + (i % 5) * 0.55, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
})

// ── Bubble component ───────────────────────────────────────────────────────
const Bubble = ({ skill, index, inView }) => {
  const m = META[skill.name]
  if (!m) return null
  const { Icon, color, size, left, top, delay } = m
  const iconSize = size * 0.42

  return (
    <motion.a
      href={skill.url} target="_blank" rel="noopener noreferrer" title={skill.name}
      className="absolute group cursor-pointer select-none"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ delay, duration: 0.55, type: 'spring', stiffness: 160, damping: 12 }}
    >
      <motion.div animate={floatAnim(index)} className="relative">

        {/* Pulsing outer ring — always subtly glowing */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
          style={{ border: `1.5px solid ${color}`, borderRadius: '50%', boxShadow: `0 0 12px ${color}40` }}
        />

        {/* Hover glow blast */}
        <div
          className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
            boxShadow: `0 0 30px ${color}50, 0 0 60px ${color}20` }}
        />

        {/* Main circle */}
        <div
          className="relative flex items-center justify-center rounded-full transition-all duration-300
                     group-hover:scale-115"
          style={{
            width: size, height: size,
            background: `radial-gradient(circle at 35% 35%, ${color}18, ${color}06 60%, black 100%)`,
            border: `1.5px solid ${color}35`,
            boxShadow: `0 0 0 0.5px ${color}15, inset 0 0 ${size * 0.4}px ${color}10`,
          }}
        >
          {/* Icon */}
          {Icon
            ? <Icon style={{ fontSize: iconSize, color, filter: `drop-shadow(0 0 8px ${color}90)` }} />
            : <span style={{ fontSize: iconSize * 0.9, color, textShadow: `0 0 10px ${color}` }}>{skill.icon}</span>
          }
        </div>

        {/* Name tooltip */}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap pointer-events-none
                     font-mono text-[10px] font-bold tracking-widest uppercase
                     opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
          style={{ color, textShadow: `0 0 8px ${color}` }}
        >
          {skill.name}
        </div>
      </motion.div>
    </motion.a>
  )
}

// ── Skills Section ─────────────────────────────────────────────────────────
const Skills = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // marquee: duplicate array for seamless loop
  const marqueeItems = [...otherSkills, ...otherSkills]

  return (
    <section id="skills" className="py-28 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <p className="section-subtitle">// Tools I Work With</p>
          <h2 className="section-title">
            Tech <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Stack</span>
          </h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
          <p className="font-mono text-xs text-gray-600 mt-3 tracking-wider">
            Hover to reveal · Click to open official docs
          </p>
        </motion.div>

        {/* ── Bubble cloud ────────────────────────────── */}
        <div className="relative w-full" style={{ height: '500px' }}>
          {/* Ambient background glow blob */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #00ff8806, transparent)',
            }}
          />

          {/* Decorative micro-dots */}
          {DOTS.map(({ left, top, s }, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-neon/20 bg-neon/5"
              style={{ left, top, width: s, height: s }}
              animate={{ y: [0, -7, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
            />
          ))}

          {/* Main skill bubbles */}
          {skills.map((skill, i) => (
            <Bubble key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Also Familiar With — scrolling marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
          className="mt-8"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-neon/15" />
            <span className="font-mono text-xs text-neon/60 tracking-widest uppercase whitespace-nowrap">
              ALSO FAMILIAR WITH
            </span>
            <div className="flex-1 h-px bg-neon/15" />
          </div>

          {/* Marquee track */}
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
            <motion.div
              className="flex gap-3 w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              {marqueeItems.map((tech, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-4 py-2 border border-neon/25 text-gray-200 font-mono text-xs
                             bg-neon/5 tracking-wider hover:border-neon hover:text-neon hover:bg-neon/10
                             transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Skills
