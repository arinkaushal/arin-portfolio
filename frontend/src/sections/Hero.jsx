import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiGithub, FiLinkedin, FiTwitter, FiDownload } from 'react-icons/fi'
import { personal, heroRoles, heroStats } from '../data/portfolio'

// Profile avatar placeholder
const AvatarPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-dark-muted"
    style={{ background: 'radial-gradient(circle at 60% 30%, #00ff8815, #000)' }}>
    <svg viewBox="0 0 80 80" className="w-24 h-24 opacity-25">
      <circle cx="40" cy="28" r="16" fill="#00ff88" />
      <ellipse cx="40" cy="72" rx="28" ry="20" fill="#00ff88" />
    </svg>
  </div>
)

const socialLinks = (links) => [
  { icon: <FiGithub />, label: 'GitHub', href: links.github },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: links.linkedin },
  ...(links.twitter ? [{ icon: <FiTwitter />, label: 'Twitter', href: links.twitter }] : []),
]

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = heroRoles[roleIndex]
    let t
    if (!isDeleting && displayed.length < currentRole.length) {
      t = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === currentRole.length) {
      t = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else {
      setIsDeleting(false)
      setRoleIndex((p) => (p + 1) % heroRoles.length)
    }
    return () => clearTimeout(t)
  }, [displayed, isDeleting, roleIndex])

  const socials = socialLinks(personal.links)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Left content ─────────────────────────────────── */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-neon/30 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" style={{ boxShadow: '0 0 6px #00ff88' }} />
              <span className="font-mono text-xs text-neon tracking-widest">{personal.availability.toUpperCase()}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
            >
              <span className="text-white">Hi, I'm </span>
              <span className="text-neon" style={{ textShadow: '0 0 20px #00ff88, 0 0 40px #00ff8840' }}>
                {personal.shortName}
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6 h-10"
            >
              <span className="text-neon font-mono text-sm">&gt;</span>
              <span className="font-mono text-lg md:text-xl text-gray-300">
                {displayed}
                <span className="inline-block w-0.5 h-5 ml-1 bg-neon align-middle"
                  style={{ animation: 'blink 0.8s step-end infinite', boxShadow: '0 0 4px #00ff88' }} />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              {personal.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-neon-filled"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#terminal')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-neon flex items-center gap-2"
              >
                Try Terminal
              </motion.button>
              {personal.links.resume && (
                <motion.a
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  href={personal.links.resume} download
                  className="btn-neon flex items-center gap-2 text-xs"
                >
                  <FiDownload /> Resume
                </motion.a>
              )}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="flex items-center gap-6 mt-8"
            >
              <span className="font-mono text-xs text-gray-600 tracking-widest">CONNECT</span>
              <div className="flex gap-3">
                {socials.map(({ icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                    whileHover={{ scale: 1.2, boxShadow: '0 0 12px #00ff88' }}
                    className="w-9 h-9 flex items-center justify-center border border-neon/30 text-neon text-lg
                               transition-all duration-300 hover:border-neon hover:bg-neon/10"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: photo + code card ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden md:flex flex-col gap-5 animate-float"
          >
            {/* Profile photo */}
            <div className="relative mx-auto w-64 h-64">
              <div className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(#00ff88, #00ff8840, #00ff88)', padding: '2px',
                  borderRadius: '50%', boxShadow: '0 0 25px #00ff8860, 0 0 50px #00ff8830',
                  animation: 'glowPulse 3s ease-in-out infinite' }}
              />
              <div className="absolute inset-[3px] rounded-full overflow-hidden border-2 border-black bg-dark-card">
                {personal.profilePhoto ? (
                  <img src={personal.profilePhoto} alt={personal.name} className="w-full h-full object-cover" style={{ objectPosition: 'center 10%' }} />
                ) : (
                  <div className="w-full h-full relative">
                    <AvatarPlaceholder />
                    <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] text-neon/50 tracking-widest">ADD PHOTO</p>
                  </div>
                )}
              </div>
            </div>

            {/* Code card */}
            <div className="relative card-neon p-5 font-mono text-xs" style={{ borderColor: '#00ff8830' }}>
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-dark-border">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-neon/70" />
                <span className="ml-2 text-gray-600">developer.js</span>
              </div>
              <div className="space-y-1 leading-6">
                <div><span className="text-purple-400">const </span><span className="text-neon">dev</span><span className="text-white"> = {'{'}</span></div>
                <div className="pl-4"><span className="text-blue-400">name</span><span className="text-white">: </span><span className="text-orange-300">'{personal.name}'</span><span className="text-white">,</span></div>
                <div className="pl-4"><span className="text-blue-400">role</span><span className="text-white">: </span><span className="text-orange-300">'{personal.tagline}'</span><span className="text-white">,</span></div>
                <div className="pl-4"><span className="text-blue-400">stack</span><span className="text-white">: [</span><span className="text-orange-300">'React'</span><span className="text-white">, </span><span className="text-orange-300">'Node'</span><span className="text-white">, </span><span className="text-orange-300">'Mongo'</span><span className="text-white">],</span></div>
                <div className="pl-4"><span className="text-blue-400">open</span><span className="text-white">: </span><span className="text-neon">true</span></div>
                <div><span className="text-white">{'}'}</span></div>
              </div>
              <div className="absolute top-0 right-0 w-14 h-14 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, #00ff8815, transparent)' }} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {heroStats.map(({ n, label }) => (
                <motion.div key={label} whileHover={{ scale: 1.05 }}
                  className="card-neon p-3 text-center" style={{ borderColor: '#00ff8820' }}>
                  <div className="text-neon font-mono text-xl font-bold" style={{ textShadow: '0 0 10px #00ff88' }}>{n}</div>
                  <div className="text-gray-500 text-xs mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-gray-600 tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-neon/50 to-transparent" style={{ boxShadow: '0 0 4px #00ff88' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
