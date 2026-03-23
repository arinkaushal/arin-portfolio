import { useState, useCallback, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import Terminal from './components/Terminal'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)

  // Always open at home — wipe any lingering hash/scroll position
  useEffect(() => {
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleLoadDone = useCallback(() => {
    setLoaded(true)
    // After boot screen fades, ensure we start at the very top
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  }, [])

  return (
    <>
      {/* ── Loading screen (shown until loaded) ──────────── */}
      {!loaded && <LoadingScreen onDone={handleLoadDone} />}

      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        {/* Cursor-reactive animated particle canvas */}
        <ParticleBackground />

        {/* Subtle scan line */}
        <div
          className="fixed left-0 w-full h-px pointer-events-none z-0 opacity-15"
          style={{ background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
            animation: 'scanLine 10s linear infinite' }}
        />

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Terminal />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#ffffff',
              border: '1px solid #00ff8840',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
            },
            success: { iconTheme: { primary: '#00ff88', secondary: '#000' } },
            error: { iconTheme: { primary: '#ff4444', secondary: '#000' } },
          }}
        />
      </div>
    </>
  )
}

export default App
