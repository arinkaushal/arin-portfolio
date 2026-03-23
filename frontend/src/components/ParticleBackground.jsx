import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
//  HIGH-PERFORMANCE CURSOR-REACTIVE PARTICLE NETWORK
//  • Dual-zone mouse interaction: repel < 90px, attract 90-220px
//  • Connections glow brighter + thicker near cursor
//  • Particles scale up and intensify near cursor
//  • Velocity + momentum physics (not just drift)
//  • Partial-clear motion trail effect
//  • Grid-based spatial partitioning for near-O(n) connection checks
//  • requestAnimationFrame @ 60 fps, canvas translate3d GPU hint
// ─────────────────────────────────────────────────────────────────────────────

const NEON = '#00ff88'
const MAX_PARTICLES = 220
const CONNECT_DIST   = 130      // px — max distance for connecting lines
const REPULSE_RADIUS =  90      // px — inner zone: push away
const ATTRACT_RADIUS = 220      // px — outer zone: pull toward
const REPULSE_FORCE  =   6.0
const ATTRACT_FORCE  =   0.55
const FRICTION       =   0.88   // velocity damping per frame
const RETURN_SPRING  =   0.035  // spring back to base position

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    // willReadFrequently:false + alpha:true for GPU compositing
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })
    let animId
    let particles = []
    let W = 0, H = 0

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMouseMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    const onMouseLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999 }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    // ── Particle ─────────────────────────────────────────────────────────────
    class Particle {
      constructor() { this.reset() }

      reset() {
        this.baseX = Math.random() * W
        this.baseY = Math.random() * H
        this.x     = this.baseX
        this.y     = this.baseY
        this.vx    = (Math.random() - 0.5) * 0.7
        this.vy    = (Math.random() - 0.5) * 0.7
        this.baseRadius  = Math.random() * 1.4 + 0.5
        this.radius      = this.baseRadius
        this.baseAlpha   = Math.random() * 0.45 + 0.15
        this.alpha       = this.baseAlpha
        this.phase       = Math.random() * Math.PI * 2
        this.pulseSpeed  = Math.random() * 0.018 + 0.004
        // slow base drift
        this.driftVx     = (Math.random() - 0.5) * 0.12
        this.driftVy     = (Math.random() - 0.5) * 0.12
        // cursor attraction state
        this.cursorProximity = 0  // 0..1
      }

      update(t) {
        // ── Drift base position ──────────────────────────────────────────
        this.baseX += this.driftVx
        this.baseY += this.driftVy

        // Wrap
        if (this.baseX < -10) this.baseX = W + 10
        if (this.baseX > W + 10) this.baseX = -10
        if (this.baseY < -10) this.baseY = H + 10
        if (this.baseY > H + 10) this.baseY = -10

        // ── Mouse force ──────────────────────────────────────────────────
        const mx = mouse.current.x
        const my = mouse.current.y
        const dx = this.x - mx
        const dy = this.y - my
        const distSq = dx * dx + dy * dy
        const dist   = distSq > 0 ? Math.sqrt(distSq) : 0.001

        this.cursorProximity = 0

        if (dist < ATTRACT_RADIUS) {
          this.cursorProximity = 1 - dist / ATTRACT_RADIUS

          if (dist < REPULSE_RADIUS) {
            // Inner zone: repel (explosive push)
            const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS
            const fMag  = force * force * REPULSE_FORCE
            this.vx += (dx / dist) * fMag
            this.vy += (dy / dist) * fMag
          } else {
            // Outer zone: attract (gentle pull toward cursor)
            const force = ((dist - REPULSE_RADIUS) / (ATTRACT_RADIUS - REPULSE_RADIUS))
            const fMag  = (1 - force) * ATTRACT_FORCE
            this.vx -= (dx / dist) * fMag
            this.vy -= (dy / dist) * fMag
          }
        }

        // ── Physics ──────────────────────────────────────────────────────
        this.vx *= FRICTION
        this.vy *= FRICTION

        // Spring back toward base
        this.vx += (this.baseX - this.x) * RETURN_SPRING
        this.vy += (this.baseY - this.y) * RETURN_SPRING

        this.x += this.vx
        this.y += this.vy

        // ── Appearance based on cursor proximity ─────────────────────────
        const p = this.cursorProximity
        const pulse = 0.6 + 0.4 * Math.sin(t * this.pulseSpeed + this.phase)

        this.radius = this.baseRadius * (1 + p * 2.8)          // grow near cursor
        this.alpha  = Math.min(1, this.baseAlpha * pulse + p * 0.55) // brighten
        this.glow   = 6 + p * 28                               // glow radius
      }

      draw() {
        ctx.save()

        // Outer glow
        ctx.shadowBlur  = this.glow
        ctx.shadowColor = NEON

        // For highly proximal particles, add extra ring
        if (this.cursorProximity > 0.5) {
          ctx.globalAlpha = (this.cursorProximity - 0.5) * 0.4
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = NEON
          ctx.fill()
        }

        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = NEON
        ctx.fill()

        ctx.restore()
      }
    }

    // ── Init particles ───────────────────────────────────────────────────────
    const initParticles = () => {
      const count = Math.min(Math.floor((W * H) / 8500), MAX_PARTICLES)
      particles = Array.from({ length: count }, () => new Particle())
    }

    // ── Draw connections using spatial grid ──────────────────────────────────
    // Divides canvas into cells to limit distance checks to neighbours only.
    const drawConnections = () => {
      const mx = mouse.current.x
      const my = mouse.current.y
      const CELL = CONNECT_DIST
      const COLS = Math.ceil(W / CELL)
      const ROWS = Math.ceil(H / CELL)

      // Build grid
      const grid = new Array(COLS * ROWS)
      for (let i = 0; i < grid.length; i++) grid[i] = []
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const cx = Math.floor(p.x / CELL)
        const cy = Math.floor(p.y / CELL)
        if (cx >= 0 && cx < COLS && cy >= 0 && cy < ROWS) {
          grid[cy * COLS + cx].push(i)
        }
      }

      // Check each particle against its 3x3 neighbourhood
      for (let i = 0; i < particles.length; i++) {
        const a  = particles[i]
        const cx = Math.floor(a.x / CELL)
        const cy = Math.floor(a.y / CELL)

        for (let nx = cx - 1; nx <= cx + 1; nx++) {
          for (let ny = cy - 1; ny <= cy + 1; ny++) {
            if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue
            const cell = grid[ny * COLS + nx]
            for (let k = 0; k < cell.length; k++) {
              const j = cell[k]
              if (j <= i) continue // avoid duplicates

              const b  = particles[j]
              const dx = a.x - b.x
              const dy = a.y - b.y
              const d  = Math.sqrt(dx * dx + dy * dy)
              if (d >= CONNECT_DIST) continue

              // Base alpha from distance
              const distFactor = 1 - d / CONNECT_DIST

              // Boost if either particle is near cursor
              const proximityBoost = Math.max(a.cursorProximity, b.cursorProximity)

              // Check if midpoint is near cursor
              const midX = (a.x + b.x) / 2
              const midY = (a.y + b.y) / 2
              const mdx  = midX - mx
              const mdy  = midY - my
              const midDist = Math.sqrt(mdx * mdx + mdy * mdy)
              const midBoost = midDist < ATTRACT_RADIUS
                ? (1 - midDist / ATTRACT_RADIUS) * 0.7
                : 0

              const totalBoost = Math.max(proximityBoost, midBoost)
              const lineAlpha  = distFactor * (0.08 + totalBoost * 0.55)
              const lineWidth  = 0.4 + totalBoost * 2.0

              // Glowing line
              ctx.save()
              ctx.globalAlpha = lineAlpha
              ctx.strokeStyle = NEON
              ctx.lineWidth   = lineWidth
              ctx.shadowBlur  = totalBoost > 0.1 ? 8 + totalBoost * 12 : 0
              ctx.shadowColor = NEON
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      }
    }

    // ── Draw directional grid ────────────────────────────────────────────────
    const drawGrid = () => {
      const SPACING = 65
      const mx = mouse.current.x
      const my = mouse.current.y

      ctx.save()
      ctx.strokeStyle = NEON
      ctx.lineWidth   = 0.35

      for (let x = 0; x <= W; x += SPACING) {
        const d = Math.abs(x - mx)
        ctx.globalAlpha = d < 240 ? (1 - d / 240) * 0.14 + 0.02 : 0.028
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y <= H; y += SPACING) {
        const d = Math.abs(y - my)
        ctx.globalAlpha = d < 240 ? (1 - d / 240) * 0.14 + 0.02 : 0.028
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      ctx.restore()
    }

    // ── Cursor halo (multi-ring) ─────────────────────────────────────────────
    const drawCursorHalo = () => {
      const mx = mouse.current.x
      const my = mouse.current.y
      if (mx < 0 || my < 0) return

      // Soft glow
      const g1 = ctx.createRadialGradient(mx, my, 0, mx, my, 160)
      g1.addColorStop(0, 'rgba(0,255,136,0.10)')
      g1.addColorStop(0.5, 'rgba(0,255,136,0.04)')
      g1.addColorStop(1, 'rgba(0,255,136,0)')
      ctx.save()
      ctx.fillStyle = g1
      ctx.beginPath()
      ctx.arc(mx, my, 160, 0, Math.PI * 2)
      ctx.fill()

      // Bright inner halo
      const g2 = ctx.createRadialGradient(mx, my, 0, mx, my, 40)
      g2.addColorStop(0, 'rgba(0,255,136,0.18)')
      g2.addColorStop(1, 'rgba(0,255,136,0)')
      ctx.fillStyle = g2
      ctx.beginPath()
      ctx.arc(mx, my, 40, 0, Math.PI * 2)
      ctx.fill()

      // Crosshair ring
      ctx.globalAlpha = 0.15
      ctx.strokeStyle = NEON
      ctx.lineWidth   = 0.8
      ctx.shadowBlur  = 4
      ctx.shadowColor = NEON
      ctx.beginPath()
      ctx.arc(mx, my, REPULSE_RADIUS, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    let t = 0
    const animate = () => {
      // Partial clear with slight trail (motion blur feel)
      ctx.fillStyle = 'rgba(0,0,0,0.82)'
      ctx.fillRect(0, 0, W, H)

      t++
      drawGrid()
      drawCursorHalo()
      particles.forEach((p) => p.update(t))
      drawConnections()
      particles.forEach((p) => p.draw())

      animId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    const onResize = () => {
      resize()
      initParticles()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        // GPU-composited layer — keeps main thread healthy
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    />
  )
}

export default ParticleBackground
