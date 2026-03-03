// for experimental parallax effect on hero section 

/**
 * Hero.jsx — Cinematic 3D Text Sandwich Hero
 *
 * HOW THE EFFECT WORKS (4 layers by z-index):
 *   z-1  → Blurred background image
 *   z-5  → "BASANT BANSAL" solid filled text  ← BEHIND your photo
 *   z-7  → Your photo                         ← SITS ON TOP of solid text
 *   z-10 → "BASANT BANSAL" outline-only text  ← IN FRONT of your photo
 *
 * ─────────────────────────────────────────────
 * 📸 TO CHANGE YOUR IMAGES:
 *   Background → change BACKGROUND_IMAGE (line ~20)
 *   Your photo → change SUBJECT_IMAGE    (line ~24)
 *
 *   Best practice for subject image:
 *     - PNG with transparent/removed background
 *     - Full body or half body shot works best
 *     - Put it in src/assets/ and import it at the top
 * ─────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// ─── 🖼️ CHANGE YOUR IMAGES HERE ───────────────────────────────────────────
// import subjectImage from '../assets/your-photo.png'      // ← your PNG photo
// import backgroundImage from '../assets/your-bg.jpg'      // ← your background

// Placeholders — replace the imports above and swap these out
const BACKGROUND_IMAGE = null   // set to your backgroundImage import, or a URL string
const SUBJECT_IMAGE    = null   // set to your subjectImage import, or a URL string
// ──────────────────────────────────────────────────────────────────────────

const HERO_TEXT = 'BASANT'           // ← change your display name here
const TAGLINE   = 'Full Stack Developer'
const DESC      = 'Building things. Breaking limits. Learning in public.'


// ─── Magnetic Button ──────────────────────────────────────────────────────
function MagneticButton({ children, href = '#' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width  / 2) * 0.35,
      y: (e.clientY - r.top  - r.height / 2) * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block px-8 py-3 bg-white text-gray-950 font-bold
                 rounded-full hover:bg-gray-200 transition-colors duration-200
                 cursor-pointer select-none text-sm tracking-widest uppercase"
    >
      {children}
    </a>
  )
}


// ─── Main Hero ────────────────────────────────────────────────────────────
function Hero() {
  const bgRef          = useRef(null)
  const solidTextRef   = useRef(null)
  const subjectRef     = useRef(null)
  const outlineTextRef = useRef(null)
  const bioRef         = useRef(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Entrance animations
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      ;[bgRef, solidTextRef, subjectRef, outlineTextRef, bioRef].forEach(r => {
        if (r.current) r.current.style.opacity = '1'
      })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(bgRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 }
    )
    .fromTo(solidTextRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.7'
    )
    .fromTo(subjectRef.current,
      { y: 120, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1 },
      '-=0.5'
    )
    .fromTo(outlineTextRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.7'
    )
    .fromTo(bioRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    )
  }, [])

  // Parallax on mouse move
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || isMobile) return

    let moved = false

    const onMove = (e) => {
      moved = true
      const nx = (e.clientX / window.innerWidth  - 0.5)  // -0.5 → 0.5
      const ny = (e.clientY / window.innerHeight - 0.5)

      // Background drifts opposite
      gsap.to(bgRef.current, {
        x: -nx * 18, y: -ny * 18, duration: 0.5, ease: 'power2.out',
      })
      // Solid text — slow
      gsap.to(solidTextRef.current, {
        x: nx * 6, y: ny * 6, duration: 0.5, ease: 'power2.out',
      })
      // Subject — medium
      gsap.to(subjectRef.current, {
        x: nx * 12, y: ny * 12, duration: 0.5, ease: 'power2.out',
      })
      // Outline text — fastest (most "in front")
      gsap.to(outlineTextRef.current, {
        x: nx * 20, y: ny * 20, duration: 0.5, ease: 'power2.out',
      })
    }

    const onLeave = () => {
      if (!moved) return
      ;[bgRef, solidTextRef, subjectRef, outlineTextRef].forEach(r => {
        gsap.to(r.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [isMobile])

  // ── shared text style ──────────────────────────────────────────────────
  const textStyle = {
    fontSize: 'clamp(3rem, 13vw, 14rem)',
    fontFamily: "'Bebas Neue', 'Anton', 'Oswald', sans-serif",
    fontWeight: 900,
    lineHeight: 0.85,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 600 }}
      aria-label="Hero section"
    >
      {/* ── LAYER 1: Background (z-1) ─────────────────────────────── */}
      <div
        ref={bgRef}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        {BACKGROUND_IMAGE ? (
          <img
            src={BACKGROUND_IMAGE}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-5%', left: '-5%',
              width: '110%', height: '110%',
              objectFit: 'cover',
              filter: 'blur(12px)',
              opacity: 0.65,
            }}
          />
        ) : (
          /* Fallback CSS gradient background */
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 60% 40%, #0d1b2a 0%, #020617 70%)',
          }} />
        )}

        {/* Film-grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)
          `,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          animation: 'grainMove 0.5s steps(10) infinite',
        }} />

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── LAYER 2: Solid filled text — BEHIND photo (z-5) ─────────── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
      }}>
        <div ref={solidTextRef} style={{ ...textStyle, color: '#ffffff' }}>
          {HERO_TEXT}
        </div>
      </div>

      {/* ── LAYER 3: Subject / your photo (z-7) ──────────────────────── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 7,
        height: isMobile ? '120vw' : '95vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div ref={subjectRef} style={{ height: '100%' }}>
          {SUBJECT_IMAGE ? (
            // ── 📸 YOUR PHOTO RENDERS HERE ──────────────────────────────
            <img
              src={SUBJECT_IMAGE}
              alt="Basant Bansal"
              style={{
                height: '100%',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          ) : (
            /* Placeholder silhouette when no image is set */
            <div style={{
              height: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              borderRadius: '50% 50% 0 0',
              border: '1px dashed rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
                your photo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── LAYER 4: Outline text — IN FRONT of photo (z-10) ─────────── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}>
        <div ref={outlineTextRef} style={{
          ...textStyle,
          color: 'transparent',
          WebkitTextStroke: isMobile ? '2px rgba(255,255,255,0.45)' : '4px rgba(255,255,255,0.45)',
          pointerEvents: 'none',
        }}>
          {HERO_TEXT}
        </div>
      </div>

      {/* ── Bio / tagline (bottom left, z-20) ────────────────────────── */}
      <div
        ref={bioRef}
        style={{
          position: 'absolute',
          bottom: isMobile ? 40 : 60,
          left: isMobile ? 24 : 60,
          zIndex: 20,
          maxWidth: 340,
        }}
      >
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          {TAGLINE}
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 15,
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          {DESC}
        </p>
        <MagneticButton href="https://github.com/basantbansal">
          View My Work
        </MagneticButton>
      </div>

      {/* ── Grain keyframe ────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes grainMove {
          0%,100% { transform: translate(0,0); }
          10%  { transform: translate(-5%,-5%); }
          30%  { transform: translate(5%,-10%); }
          50%  { transform: translate(-10%,5%); }
          70%  { transform: translate(0,10%); }
          90%  { transform: translate(10%,5%); }
        }
      `}</style>
    </section>
  )
}

export default Hero