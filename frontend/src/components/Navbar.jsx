import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { TbTerminal2 } from 'react-icons/tb'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Terminal', href: '#terminal', icon: <TbTerminal2 className="text-sm" /> },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = navItems.map(({ href }) => href.replace('#', ''))

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const clickedRef = useRef(false)

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver — update active link as sections scroll into view
  useEffect(() => {
    const observers = []
    const visibleMap = {}

    const pickActive = () => {
      // Find the topmost visible section
      for (const id of sectionIds) {
        if (visibleMap[id]) {
          const label = navItems.find((n) => n.href === `#${id}`)?.label
          if (label) setActive(label)
          return
        }
      }
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleMap[id] = entry.isIntersecting
          // Don't override while a click-scroll is animating
          if (!clickedRef.current) pickActive()
        },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (label, href) => {
    setActive(label)
    setMenuOpen(false)
    clickedRef.current = true
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    // Re-enable observer updates after scroll animation (~800 ms)
    setTimeout(() => { clickedRef.current = false }, 900)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-neon/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={() => handleNavClick('Home', '#home')}
          className="font-mono text-xl font-bold tracking-widest group">
          <span className="text-neon group-hover:text-white transition-colors">&lt;</span>
          <span className="text-white">AK</span>
          <span className="text-neon group-hover:text-white transition-colors">/&gt;</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map(({ label, href, icon }) => (
            <li key={label}>
              <button
                onClick={() => handleNavClick(label, href)}
                className={`flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase transition-all duration-300 relative group ${
                  active === label ? 'text-neon' : 'text-gray-400 hover:text-neon'
                }`}
              >
                {icon}
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-neon transition-all duration-300 ${
                    active === label ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ boxShadow: '0 0 5px #00ff88' }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Hire Me button */}
        <a href="#contact" onClick={() => handleNavClick('Contact', '#contact')}
          className="hidden lg:block btn-neon text-xs">
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu"
          className="lg:hidden p-2 text-neon transition-transform duration-200 hover:scale-110">
          {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-neon/10 overflow-hidden"
          >
            <ul className="flex flex-col py-5 px-6 gap-4">
              {navItems.map(({ label, href, icon }) => (
                <li key={label}>
                  <button onClick={() => handleNavClick(label, href)}
                    className={`flex items-center gap-2 font-mono text-sm tracking-wider uppercase transition-colors duration-300 ${
                      active === label ? 'text-neon' : 'text-gray-400'
                    }`}>
                    <span className="text-neon text-xs">&gt;</span>
                    {icon}
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => handleNavClick('Contact', '#contact')}
                  className="btn-neon text-xs inline-block">Hire Me</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
