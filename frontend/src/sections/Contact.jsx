import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { FiMail, FiPhone, FiMapPin, FiClock, FiGithub, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi'
import { personal } from '../data/portfolio'

// ── EmailJS credentials — set in frontend/.env ──────────────────────────────
//    VITE_EMAILJS_SERVICE_ID   → your EmailJS Service ID
//    VITE_EMAILJS_TEMPLATE_ID  → your EmailJS Template ID
//    VITE_EMAILJS_PUBLIC_KEY   → your EmailJS Public Key
const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// ── Neon input style helper (applied inline so it reacts to focus state) ────
const inputClass =
  `w-full bg-black/60 border border-neon/20 text-white font-mono text-sm px-4 py-3
   outline-none placeholder-gray-600 transition-all duration-300
   focus:border-neon focus:shadow-[0_0_16px_#00ff8830] caret-neon`

const Contact = () => {
  const ref    = useRef(null)
  const formRef = useRef(null)           // ref on the <form> element for emailjs.sendForm
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd   = new FormData(formRef.current)
    const name = fd.get('name')?.trim()
    const email= fd.get('email')?.trim()
    const msg  = fd.get('message')?.trim()

    // Basic validation
    if (!name || !email || !msg) {
      toast.error('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    // Check env vars are configured
    if (!EJ_SERVICE || !EJ_TEMPLATE || !EJ_KEY ||
        EJ_SERVICE === 'your_service_id_here') {
      toast.error('EmailJS is not configured yet. Check your .env file.')
      return
    }

    setLoading(true)
    try {
      await emailjs.sendForm(EJ_SERVICE, EJ_TEMPLATE, formRef.current, EJ_KEY)
      toast.success("Message sent! I'll get back to you soon 🚀")
      formRef.current.reset()
      setCharCount(0)
    } catch (err) {
      console.error('[EmailJS]', err)
      toast.error('Failed to send message. Please try again or email me directly.')
    } finally {
      setLoading(false)
    }
  }

  // ── Contact meta ────────────────────────────────────────────────────────
  const contactInfo = [
    { icon: <FiMail />,    label: 'Email',         value: personal.email,    href: `mailto:${personal.email}` },
    { icon: <FiPhone />,   label: 'Phone',         value: personal.phone,    href: `tel:${personal.phone}`    },
    { icon: <FiMapPin />,  label: 'Location',      value: personal.location, href: null                       },
    { icon: <FiClock />,   label: 'Response Time', value: 'Within 24 hours', href: null                       },
  ]
  const socials = [
    { icon: <FiGithub />,   label: 'GitHub',   href: personal.links.github   },
    { icon: <FiLinkedin />, label: 'LinkedIn', href: personal.links.linkedin  },
    ...(personal.links.twitter ? [{ icon: <FiTwitter />, label: 'Twitter', href: personal.links.twitter }] : []),
  ]

  return (
    <section id="contact" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="section-subtitle">// Let's Talk</p>
          <h2 className="section-title">
            Get In <span className="text-neon" style={{ textShadow: '0 0 20px #00ff8860' }}>Touch</span>
          </h2>
          <div className="w-16 h-px bg-neon mx-auto mt-4" style={{ boxShadow: '0 0 6px #00ff88' }} />
          <p className="font-mono text-xs text-gray-600 mt-4 tracking-wider">
            Powered by <span className="text-neon/60">EmailJS</span> — direct to my inbox, no backend required
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ── Contact Info ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Have a project in mind, an opportunity, or just want to say hi?<br/>
              My inbox is always open — I'll respond within 24 hours.
            </p>

            <div className="space-y-4">
              {contactInfo.map(({ icon, label, value, href }) => (
                <motion.div key={label} whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-default">
                  <div className="w-10 h-10 flex items-center justify-center border border-neon/20 text-neon text-lg
                                  group-hover:border-neon/60 group-hover:shadow-[0_0_12px_#00ff8830] transition-all duration-300">
                    {icon}
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-mono tracking-widest uppercase">{label}</p>
                    {href
                      ? <a href={href} className="text-gray-200 text-sm hover:text-neon transition-colors duration-200">{value}</a>
                      : <p className="text-gray-200 text-sm">{value}</p>
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            {socials.length > 0 && (
              <div className="pt-6 border-t border-neon/10">
                <p className="font-mono text-xs text-gray-600 tracking-widest mb-4">FIND ME ON</p>
                <div className="flex gap-3 flex-wrap">
                  {socials.map(({ icon, label, href }) => href && (
                    <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="flex items-center gap-2 px-4 py-2 border border-neon/15 font-mono text-xs text-gray-400
                                 hover:border-neon/50 hover:text-neon hover:shadow-[0_0_12px_#00ff8820] transition-all duration-300">
                      {icon} {label}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Contact Form ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Name */}
              <div className="group">
                <label className="font-mono text-xs text-gray-500 tracking-widest mb-2 block uppercase">
                  Name <span className="text-neon">*</span>
                </label>
                <input
                  type="text"
                  name="name"               /* EmailJS template variable: {{name}} */
                  required
                  maxLength={100}
                  placeholder="Your Name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="font-mono text-xs text-gray-500 tracking-widest mb-2 block uppercase">
                  Email <span className="text-neon">*</span>
                </label>
                <input
                  type="email"
                  name="email"              /* EmailJS template variable: {{email}} */
                  required
                  placeholder="Your Email"
                  className={inputClass}
                />
              </div>

              {/* Hidden fields for EmailJS "Contact Us" default template */}
              <input type="hidden" name="title" value="New Portfolio Contact Message" />
              <input type="hidden" name="time"  value={new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} />

              {/* Message */}
              <div className="group">
                <label className="font-mono text-xs text-gray-500 tracking-widest mb-2 block uppercase">
                  Message <span className="text-neon">*</span>
                </label>
                <textarea
                  name="message"            /* EmailJS template variable: {{message}} */

                  required
                  rows={6}
                  maxLength={1000}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`}
                  onChange={(e) => setCharCount(e.target.value.length)}
                />
                <p className="text-right font-mono text-[10px] text-gray-700 mt-1">
                  <span className={charCount > 900 ? 'text-yellow-500' : ''}>{charCount}</span>/1000
                </p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 30px #00ff8850' } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`w-full py-4 font-mono text-sm font-bold tracking-widest uppercase
                            flex items-center justify-center gap-3 transition-all duration-300
                            ${loading
                              ? 'bg-neon/10 text-neon/40 border border-neon/15 cursor-not-allowed'
                              : 'bg-neon text-black border border-neon hover:bg-neon/90 cursor-pointer'
                            }`}
                style={!loading ? { boxShadow: '0 0 20px #00ff8840' } : {}}
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-neon/30 border-t-neon rounded-full animate-spin" /> Sending...</>
                  : <><FiSend /> Send Message</>
                }
              </motion.button>

              <p className="font-mono text-[10px] text-gray-700 text-center">
                This form sends directly to my email via EmailJS — no data stored.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
