import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personal, education, softSkills } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <p className="section-subtitle">// Who I Am</p>
          <h2 className="section-title">About <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Me</span></h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Bio — 3 cols */}
          <div className="md:col-span-3 space-y-6">
            <motion.p custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="text-gray-300 text-lg leading-relaxed">
              I'm <span className="text-neon font-semibold">{personal.name}</span>, a passionate{' '}
              <span className="text-neon">Full Stack Developer</span> who loves crafting elegant, efficient, and
              scalable web applications. {personal.bio2}
            </motion.p>

            {/* Quick facts */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-4 mt-6">
              {[
                { label: 'Location', value: personal.location },
                { label: 'Email', value: personal.email },
                { label: 'Phone', value: personal.phone },
                { label: 'Availability', value: personal.availability },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="text-neon font-mono text-sm mt-0.5">&gt;</span>
                  <div>
                    <span className="text-gray-500 text-xs font-mono">{label}: </span>
                    <span className="text-gray-200 text-sm">{value}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Soft skills */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <p className="font-mono text-xs text-gray-600 tracking-widest mb-3">SOFT SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((s) => (
                  <span key={s}
                    className="px-3 py-1 border border-neon/20 text-gray-400 font-mono text-xs
                               hover:border-neon/50 hover:text-neon transition-all duration-300">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="flex gap-4 mt-4 flex-wrap">
              {personal.links.resume && (
                <a href={personal.links.resume} download className="btn-neon text-xs">↓ Download CV</a>
              )}
              {personal.links.github && (
                <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="btn-neon text-xs">GitHub →</a>
              )}
              {personal.links.linkedin && (
                <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-neon text-xs">LinkedIn →</a>
              )}
            </motion.div>
          </div>

          {/* Education — 2 cols */}
          <div className="md:col-span-2 space-y-4">
            <motion.h3 custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="font-mono text-neon text-sm tracking-widest uppercase mb-6">
              // Education
            </motion.h3>

            {education.map(({ degree, school, period, grade, location }, i) => (
              <motion.div key={degree} custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="card-neon p-4 group">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className="text-white text-sm font-semibold leading-tight">{degree}</h4>
                  <span className="text-neon font-mono text-xs flex-shrink-0">{grade}</span>
                </div>
                <p className="text-gray-400 text-xs">{school}</p>
                <p className="text-gray-600 text-xs">{location}</p>
                <p className="text-gray-600 text-xs font-mono mt-1">{period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
