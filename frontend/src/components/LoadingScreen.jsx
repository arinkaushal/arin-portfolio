import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootLines = [
  { text: 'Initializing portfolio system...', delay: 100 },
  { text: 'Loading assets ████████────── 60%', delay: 400 },
  { text: 'Loading assets ████████████── 90%', delay: 700 },
  { text: 'Loading assets ██████████████ 100%', delay: 950 },
  { text: 'Compiling React components...  ✓', delay: 1200 },
  { text: 'Connecting to MongoDB...       ✓', delay: 1450 },
  { text: 'Starting Express server...     ✓', delay: 1650 },
  { text: 'Ready. Launching portfolio...', delay: 1900 },
]

const LoadingScreen = ({ onDone }) => {
  const [visibleLines, setVisibleLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = bootLines.map(({ text, delay }) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, text]), delay)
    )
    const exitTimer = setTimeout(() => {
      setDone(true)
      setTimeout(onDone, 600) // wait for fade-out
    }, 2500)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(exitTimer)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Corner decorations */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-6 h-6 border-neon opacity-40`}
              style={{ borderWidth: pos.includes('top') && pos.includes('left') ? '2px 0 0 2px' :
                pos.includes('top') ? '2px 2px 0 0' : pos.includes('left') ? '0 0 2px 2px' : '0 2px 2px 0' }}
            />
          ))}

          <div className="w-full max-w-2xl px-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="font-mono text-5xl font-black tracking-widest mb-2"
                style={{ textShadow: '0 0 30px #00ff88, 0 0 60px #00ff8840' }}>
                <span className="text-neon">&lt;</span>
                <span className="text-white">AK</span>
                <span className="text-neon">/&gt;</span>
              </div>
              <p className="font-mono text-xs text-gray-600 tracking-widest">ARIN KAUSHAL — PORTFOLIO v2.0</p>
            </motion.div>

            {/* Terminal window */}
            <div className="bg-dark-card border border-neon/20 rounded-sm overflow-hidden"
              style={{ boxShadow: '0 0 30px #00ff8820, 0 0 60px #00ff8810' }}>
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neon/10 bg-dark-muted">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-neon/60" />
                <span className="ml-4 font-mono text-xs text-gray-600">bash — portfolio-boot</span>
              </div>

              {/* Boot lines */}
              <div className="p-6 font-mono text-sm min-h-[220px]">
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 mb-1.5"
                  >
                    <span className="text-neon">$</span>
                    <span className={line.includes('✓') ? 'text-neon' : 'text-gray-300'}>{line}</span>
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-neon">$</span>
                  <span
                    className="inline-block w-2 h-4 bg-neon"
                    style={{ animation: 'blink 0.8s step-end infinite', boxShadow: '0 0 6px #00ff88' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
