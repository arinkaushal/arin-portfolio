import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { education, experience, certificates, achievements } from '../data/portfolio'

const typeConfig = {
  education: { label: 'EDU', color: '#00ff88' },
  experience: { label: 'EXP', color: '#00ccff' },
  certificate: { label: 'CERT', color: '#f59e0b' },
  achievement: { label: 'WIN', color: '#a855f7' },
}

// Build unified timeline from imported data
const buildTimeline = () => {
  const items = []

  experience.forEach((e) =>
    items.push({ type: 'experience', title: e.title, sub: e.company, period: e.period, desc: e.description, highlight: e.tech })
  )
  education.forEach((e) =>
    items.push({ type: 'education', title: e.degree, sub: `${e.school} — ${e.location}`, period: e.period, desc: '', highlight: e.grade })
  )
  certificates.forEach((c) =>
    items.push({
      type: 'certificate',
      title: c.name,
      sub: c.issuer,
      period: c.period,
      desc: '',
      highlight: c.url ? '📜 View Certificate' : null,
      url: c.url,
    })
  )
  achievements.forEach((a) =>
    items.push({ type: 'achievement', title: a.title, sub: '', period: a.period, desc: a.description, highlight: '🏆 Achievement' })
  )

  return items
}

const Experience = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const timeline = buildTimeline()

  return (
    <section id="experience" className="py-28 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="section-subtitle">// My Journey</p>
          <h2 className="section-title">
            Experience &amp; <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Education</span>
          </h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #00ff8840 10%, #00ff8840 90%, transparent)' }}
          />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const { label, color } = typeConfig[item.type]
              const isRight = i % 2 === 0

              return (
                <motion.div
                  key={`${item.type}-${i}`}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-28px)] ${isRight ? 'md:pr-8' : 'md:pl-8'} ml-10 md:ml-0`}>
                    <div className="card-neon p-5 group">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 border rounded-sm flex-shrink-0"
                          style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                          {label}
                        </span>
                        <span className="font-mono text-xs text-gray-500 text-right">{item.period}</span>
                      </div>

                      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-neon transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.sub && <p className="text-gray-500 text-xs font-mono mb-2">{item.sub}</p>}
                      {item.desc && <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>}

                      {item.highlight && (
                        item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer"
                            className="mt-3 text-xs font-mono px-2 py-1 inline-block border-l-2 transition-colors hover:text-neon"
                            style={{ color, borderColor: color }}>
                            {item.highlight}
                          </a>
                        ) : (
                          <div className="mt-3 text-xs font-mono px-2 py-1 inline-block border-l-2"
                            style={{ color, borderColor: color }}>
                            {item.highlight}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-5 timeline-dot flex-shrink-0"
                    style={{ boxShadow: `0 0 8px ${color}, 0 0 20px ${color}40`, borderColor: color }}
                  />

                  {/* Empty half */}
                  <div className="hidden md:block md:w-[calc(50%-28px)]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
