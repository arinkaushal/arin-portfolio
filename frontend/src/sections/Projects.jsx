import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiGithub, FiExternalLink, FiX, FiCode, FiZap, FiStar } from 'react-icons/fi'
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiPhp, SiHtml5 } from 'react-icons/si'
import { projects } from '../data/portfolio'

// ── Map tech badge → icon ────────────────────────────────────────────────
const techIcons = {
  'React.js': <SiReact className="text-sky-400" />,
  'Node.js': <SiNodedotjs className="text-green-400" />,
  'MongoDB': <SiMongodb className="text-emerald-400" />,
  'Express.js': <SiExpress className="text-gray-300" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-400" />,
  'PHP': <SiPhp className="text-purple-400" />,
  'HTML': <SiHtml5 className="text-orange-400" />,
}

// ── Project features (add matching features in portfolio.js later) ────────
const projectMeta = {
  'Manufacturing Execution System': {
    features: [
      'Role-based access control with 3 permission tiers',
      'Real-time WebSocket updates for live process monitoring',
      'Visual process-flow builder using React Flow',
      'Multi-user concurrent editing with conflict resolution',
      'Audit-ready execution logs with export',
      'Step-level status tracking dashboard',
    ],
    color: '#00ff88',
  },
  'AI-Integrated Learning & Career Guidance Platform': {
    features: [
      'Personalized course onboarding with AI recommendations',
      'Quiz module with proctoring (tab limits, fullscreen)',
      'Gemini API integration for career guidance',
      'PDF/text notes analyser for summarisation',
      'Dynamic study schedule generation',
      'Weak area detection from quiz performance',
    ],
    color: '#00ccff',
  },
  'EstateEase': {
    features: [
      'Real-time property filters with instant results',
      'Detailed property listing pages',
      'Complete purchase/transaction flow',
      'Polished checkout animations',
      'Mock payment confirmation module',
      'Responsive mobile-first design',
    ],
    color: '#f59e0b',
  },
}

const gradients = [
  'from-neon/30 via-transparent to-transparent',
  'from-cyan-400/30 via-transparent to-transparent',
  'from-amber-400/30 via-transparent to-transparent',
]

const glowColors = ['#00ff88', '#00ccff', '#f59e0b']

// ── Modal ─────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null
  const meta = projectMeta[project.title] || { features: [], color: '#00ff88' }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl bg-dark-card border overflow-hidden rounded-sm"
          style={{ borderColor: `${meta.color}30`, boxShadow: `0 0 40px ${meta.color}20, 0 0 80px ${meta.color}10` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }} />

          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FiCode style={{ color: meta.color }} className="text-xl" />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: meta.color }}>
                  {project.period}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-mono mb-1 leading-snug">{project.title}</h2>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center border border-gray-700
                         text-gray-400 hover:border-red-400 hover:text-red-400 transition-all duration-200"
            >
              <FiX />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Features */}
              <div>
                <h3 className="font-mono text-xs tracking-widest mb-4 flex items-center gap-2" style={{ color: meta.color }}>
                  <FiZap /> KEY FEATURES
                </h3>
                <ul className="space-y-2">
                  {meta.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: meta.color, boxShadow: `0 0 4px ${meta.color}` }} />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div>
                <h3 className="font-mono text-xs tracking-widest mb-4 flex items-center gap-2" style={{ color: meta.color }}>
                  <FiStar /> TECH STACK
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t}
                      className="flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs"
                      style={{ borderColor: `${meta.color}30`, color: meta.color, background: `${meta.color}08` }}>
                      {techIcons[t] || <FiCode className="text-xs" />}
                      {t}
                    </span>
                  ))}
                </div>

                {/* Status */}
                <div className="card-neon p-4 mt-4" style={{ borderColor: `${meta.color}20` }}>
                  <p className="font-mono text-xs text-gray-600 mb-1">STATUS</p>
                  <p className="font-mono text-sm" style={{ color: meta.color }}>
                    ● {project.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-dark-border">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border font-mono text-sm
                             text-gray-400 border-gray-700 hover:border-neon/40 hover:text-neon transition-all duration-300">
                  <FiGithub /> View Source
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 font-mono text-sm text-black font-bold"
                  style={{ background: meta.color, boxShadow: `0 0 15px ${meta.color}60` }}>
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────
const statusColors = {
  Live: { bg: 'bg-neon/10', text: 'text-neon', border: 'border-neon/30' },
  'In Progress': { bg: 'bg-yellow-400/10', text: 'text-yellow-400', border: 'border-yellow-400/30' },
  Beta: { bg: 'bg-purple-400/10', text: 'text-purple-400', border: 'border-purple-400/30' },
}

const ProjectCard = ({ project, index, inView, onClick }) => {
  const s = statusColors[project.status] || statusColors['Live']
  const glowColor = glowColors[index % glowColors.length]
  const meta = projectMeta[project.title] || { color: '#00ff88' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="card-neon group flex flex-col h-full cursor-pointer relative overflow-hidden"
      onClick={() => onClick(project)}
      style={{ '--glow': glowColor }}
    >
      {/* Top gradient shimmer */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${meta.color}08, transparent 70%)` }}
      />

      <div className="p-6 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-mono text-white font-bold text-sm leading-snug group-hover:text-neon transition-colors duration-300">
            {project.title}
          </h3>
          <span className={`text-xs font-mono px-2 py-0.5 border rounded-sm flex-shrink-0 ${s.bg} ${s.text} ${s.border}`}>
            {project.status}
          </span>
        </div>

        <p className="text-gray-600 font-mono text-xs mb-3">{project.period}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t}
              className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 bg-neon/5 border border-neon/15 text-neon/70">
              {techIcons[t] && <span className="text-xs">{techIcons[t]}</span>}
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-700 text-gray-400 font-mono text-xs
                       hover:border-neon/40 hover:text-neon transition-all duration-300"
            onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank') }}
          >
            <FiGithub /> GitHub
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 border border-neon/30 text-neon font-mono text-xs
                       hover:bg-neon/10 transition-all duration-300"
            onClick={(e) => { e.stopPropagation(); onClick(project) }}
            style={{ boxShadow: '0 0 5px #00ff8820' }}
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Projects Section ──────────────────────────────────────────────────────
const Projects = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="section-subtitle">// What I've Built</p>
          <h2 className="section-title">
            Featured <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Projects</span>
          </h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
          <p className="text-gray-500 text-sm mt-4 font-mono">
            Click any card to view full details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} onClick={setSelected} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="text-center mt-12">
          <a href="https://github.com/arinkaushal" target="_blank" rel="noopener noreferrer"
            className="btn-neon text-xs inline-flex items-center gap-2">
            <FiGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Projects
