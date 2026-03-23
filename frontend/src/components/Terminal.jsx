import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, skills, projects } from '../data/portfolio'

// ── Terminal command responses ─────────────────────────────────────────────
const COMMANDS = {
  help: {
    output: [
      { text: 'Available commands:', style: 'text-neon font-bold' },
      { text: '  help       — Show this help menu', style: 'text-gray-300' },
      { text: '  about      — About me', style: 'text-gray-300' },
      { text: '  skills     — My tech stack', style: 'text-gray-300' },
      { text: '  projects   — My projects', style: 'text-gray-300' },
      { text: '  contact    — Get in touch', style: 'text-gray-300' },
      { text: '  clear      — Clear terminal', style: 'text-gray-300' },
    ],
  },
  about: {
    output: [
      { text: `> ${personal.name}`, style: 'text-neon font-bold' },
      { text: `  Role    : ${personal.tagline}`, style: 'text-gray-300' },
      { text: `  Location: ${personal.location}`, style: 'text-gray-300' },
      { text: `  Status  : ${personal.availability}`, style: 'text-neon' },
      { text: `  "${personal.bio}"`, style: 'text-gray-400 italic' },
    ],
  },
  skills: {
    output: [
      { text: '> Tech Stack:', style: 'text-neon font-bold' },
      ...skills.slice(0, 8).map((s) => ({
        text: `  ${s.name.padEnd(15)} [${'█'.repeat(Math.round(s.level / 10))}${'░'.repeat(10 - Math.round(s.level / 10))}] ${s.level}%`,
        style: 'text-gray-300 font-mono',
      })),
    ],
  },
  projects: {
    output: [
      { text: '> Featured Projects:', style: 'text-neon font-bold' },
      ...projects.map((p, i) => ({
        text: `  [${i + 1}] ${p.title} (${p.period})`,
        style: 'text-gray-300',
      })),
      { text: '  Type "open 1" to see project details', style: 'text-gray-600 italic' },
    ],
  },
  contact: {
    output: [
      { text: '> Contact Info:', style: 'text-neon font-bold' },
      { text: `  Email   : ${personal.email}`, style: 'text-gray-300' },
      { text: `  Phone   : ${personal.phone}`, style: 'text-gray-300' },
      { text: `  GitHub  : ${personal.links.github}`, style: 'text-blue-400' },
      { text: `  LinkedIn: ${personal.links.linkedin}`, style: 'text-blue-400' },
    ],
  },
  whoami: {
    output: [{ text: personal.name, style: 'text-neon' }],
  },
  date: {
    output: [{ text: new Date().toLocaleString(), style: 'text-gray-300' }],
  },
  pwd: {
    output: [{ text: '/home/arin/portfolio', style: 'text-gray-300' }],
  },
  ls: {
    output: [
      { text: 'about/  skills/  projects/  experience/  contact/', style: 'text-neon' },
    ],
  },
}

const UNKNOWN = (cmd) => ({
  output: [
    { text: `bash: ${cmd}: command not found`, style: 'text-red-400' },
    { text: "Type 'help' for available commands.", style: 'text-gray-600' },
  ],
})

// ── Terminal Component ─────────────────────────────────────────────────────
const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', lines: [{ text: "Welcome to Arin's Portfolio Terminal v2.0", style: 'text-neon font-bold' },
      { text: "Type 'help' to see available commands.", style: 'text-gray-500' }] },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const outputRef = useRef(null)   // ref on the scrollable output container
  const inputRef  = useRef(null)

  // ── Auto-scroll INSIDE the terminal box (not the page) ────────────────
  useEffect(() => {
    const el = outputRef.current
    if (!el) return
    // Defer one tick so the new DOM nodes are painted first
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [history])

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    // Add to history
    setCmdHistory((prev) => [cmd, ...prev])
    setHistIdx(-1)

    let outputLines
    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    } else if (COMMANDS[cmd]) {
      outputLines = COMMANDS[cmd].output
    } else {
      outputLines = UNKNOWN(cmd).output
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', lines: outputLines },
    ])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(next)
      setInput(cmdHistory[next] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  return (
    <section id="terminal" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-subtitle">// Interactive</p>
          <h2 className="section-title">
            Dev <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Terminal</span>
          </h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
          <p className="text-gray-500 font-mono text-sm mt-4">
            Type commands like <span className="text-neon">help</span>, <span className="text-neon">about</span>, <span className="text-neon">skills</span>, <span className="text-neon">projects</span>
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-sm overflow-hidden border border-neon/20"
          style={{ boxShadow: '0 0 40px #00ff8820, 0 0 80px #00ff8808' }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-dark-muted border-b border-neon/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 cursor-pointer transition-colors" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 cursor-pointer transition-colors" />
              <span className="w-3 h-3 rounded-full bg-neon/70 hover:bg-neon cursor-pointer transition-colors" onClick={() => setIsOpen(true)} />
            </div>
            <span className="font-mono text-xs text-gray-600">arin@portfolio: ~/dev</span>
            <span className="font-mono text-xs text-neon/40">terminal v2.0</span>
          </div>

          {/* Output area — scrolls internally, NOT the page */}
          <div
            ref={outputRef}
            className="bg-black/95 p-5 font-mono text-sm overflow-y-auto"
            style={{ minHeight: '380px', maxHeight: '480px', scrollBehavior: 'smooth' }}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.type === 'input' && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-neon">arin@portfolio</span>
                    <span className="text-gray-600">:~$</span>
                    <span className="text-white">{entry.text}</span>
                  </div>
                )}
                {(entry.type === 'output' || entry.type === 'system') && (
                  <div className="mt-1 mb-3 space-y-0.5 pl-0">
                    {entry.lines.map((line, j) => (
                      <div key={j} className={`leading-6 ${line.style}`}>{line.text}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Current input line */}
            <div className="flex items-center gap-2">
              <span className="text-neon">arin@portfolio</span>
              <span className="text-gray-600">:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none caret-neon font-mono text-sm"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Quick commands */}
          <div className="flex flex-wrap gap-2 px-4 py-3 bg-dark-muted/50 border-t border-neon/10">
            <span className="font-mono text-xs text-gray-600">Quick:</span>
            {['help', 'about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => { setInput(cmd); setTimeout(() => runCommand(cmd), 50) }}
                className="font-mono text-xs px-2 py-0.5 border border-neon/20 text-neon/70
                           hover:border-neon hover:text-neon transition-all duration-200"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Terminal
