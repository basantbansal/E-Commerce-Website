/**
 * ShowMe.jsx — Full Portfolio Page
 * Built to match Shubham's portfolio exactly.
 *
 * 📸 TO SWAP IMAGES:
 *   Line 16 → subject PNG (background removed)
 *   Line 17 → background JPG/WEBP
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ParticlePortrait from '../components/ParticlePortrait'
import { FaInstagram, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

import subjectImage    from '../assets/izuku-midoriya-10667x6000-19490-Photoroom.png'
import backgroundImage from '../assets/izuku-midoriya-10667x6000-19490.jpg'

const HERO_TEXT = 'BASANT'
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
      duration: 0.3, ease: 'power2.out',
    })
  }
  const onLeave = () => gsap.to(ref.current, {
    x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)',
  })
  return (
    <a
      ref={ref} href={href}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        display: 'inline-block',
        padding: '12px 32px',
        background: '#ffffff',
        color: '#0a0a0a',
        fontWeight: 700,
        borderRadius: 9999,
        fontSize: 12,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#e5e5e5'}
      onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
    >
      {children}
    </a>
  )
}


// ─── Hero Section ─────────────────────────────────────────────────────────
function HeroSection({ isMobile }) {
  const backgroundRef  = useRef(null)
  const solidTextRef   = useRef(null)
  const subjectRef     = useRef(null)
  const outlineTextRef = useRef(null)
  const bioRef         = useRef(null)

  // ── Entrance animations — exact from HeroSection.tsx ────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      ;[backgroundRef, solidTextRef, subjectRef, outlineTextRef, bioRef]
        .forEach(r => { if (r.current) r.current.style.opacity = '1' })
      return
    }

    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(backgroundRef.current,
          { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 })
        .fromTo(solidTextRef.current,
          { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(subjectRef.current,
          { y: 150, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1 }, '-=0.5')
        .fromTo(outlineTextRef.current,
          { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
        .fromTo(bioRef.current,
          { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // ── Parallax — exact multipliers from HeroSection.tsx ───────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || isMobile) return

    let hasMouseMoved = false
    const maxOffset = 50

    const handleMouseMove = (e) => {
      hasMouseMoved = true
      const centerX = window.innerWidth  / 2
      const centerY = window.innerHeight / 2
      const normalizedX = (e.clientX - centerX) / centerX
      const normalizedY = (e.clientY - centerY) / centerY

      gsap.to(backgroundRef.current, {
        x: -normalizedX * 0.25 * maxOffset,
        y: -normalizedY * 0.25 * maxOffset,
        duration: 0.4, ease: 'power2.out',
      })
      gsap.to(solidTextRef.current, {
        x: normalizedX * 0.08 * maxOffset,
        y: normalizedY * 0.08 * maxOffset,
        duration: 0.4, ease: 'power2.out',
      })
      gsap.to(subjectRef.current, {
        x: normalizedX * 0.12 * maxOffset,
        y: normalizedY * 0.12 * maxOffset,
        duration: 0.4, ease: 'power2.out',
        transformOrigin: 'center center',
      })
      gsap.to(outlineTextRef.current, {
        x: normalizedX * 0.18 * maxOffset,
        y: normalizedY * 0.18 * maxOffset,
        duration: 0.4, ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      if (!hasMouseMoved) return
      ;[backgroundRef, solidTextRef, subjectRef, outlineTextRef].forEach(r => {
        gsap.to(r.current, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isMobile])

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      contain: 'layout style paint',
      willChange: 'transform',
    }}>

      {/* ── LAYER 1: Background (z-1) — exact from BackgroundLayer.tsx ── */}
      <div
        ref={backgroundRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      >
        {/* Background image — blur(12px) opacity(0.7) from HeroSection.tsx */}
        <div style={{ position: 'absolute', top: '-5%', left: '-5%', width: '110%', height: '110%' }}>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(12px)',
              opacity: 0.7,
            }}
          />
        </div>

        {/* Film grain overlay — from BackgroundLayer.tsx */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px)
          `,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          opacity: 0.3,
          animation: 'grain-animation 0.5s steps(10) infinite',
        }} />

        {/* Gradient overlay — top and bottom darken */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── LAYER 2: Solid text — BEHIND subject (z-5) ──────────────── */}
      {/* Exact from HeroSection.tsx: white color, centered */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) scaleX(1.3)',
        zIndex: 5,
      }}>
        <div
          ref={solidTextRef}
          style={{
            fontSize: 'clamp(2.5rem, 20vw, 16rem)',
            fontFamily: "'Bebas Neue', 'Anton', 'Oswald', sans-serif",
            color: '#ffffff',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
          aria-hidden="true"
        >
          {HERO_TEXT}
        </div>
      </div>

      {/* ── LAYER 3: Subject image (z-7) ────────────────────────────── */}
      {/* Exact from HeroSection.tsx + SubjectLayer.tsx:
          container h=95vh, img scale(2.2), width auto, height 100% */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) ',
        zIndex: 7,
        width: 'auto',
        height: isMobile ? '150vh' : '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div
          ref={subjectRef}
          style={{ width: 'auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src={subjectImage}
            alt={HERO_TEXT}
            style={{
              width: 'auto',
              height: '100%',
              objectFit: 'contain',
              transform: `scale(${isMobile ? 5.5 : 2.2})`,
              imageRendering: 'crisp-edges',
            }}
          />
        </div>
      </div>

      {/* ── LAYER 4: Outline text — IN FRONT of subject (z-10) ──────── */}
      {/* Exact from HeroSection.tsx: transparent, white stroke */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) scaleX(1.3)',
        zIndex: 10,
      }}>
        <div
          ref={outlineTextRef}
          style={{
            fontSize: 'clamp(2.5rem, 20vw, 16rem)',
            fontFamily: "'Bebas Neue', 'Anton', 'Oswald', sans-serif",
            color: 'transparent',
            WebkitTextStroke: isMobile ? '2px rgba(255,255,255,0.4)' : '4px rgba(255,255,255,0.4)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
          aria-label={HERO_TEXT}
        >
          {HERO_TEXT}
        </div>
      </div>

      {/* ── Bio — bottom left (z-20) ──────────────────────────────────── */}
      <div
        ref={bioRef}
        style={{
          position: 'absolute',
          bottom: isMobile ? 36 : 56,
          left: isMobile ? 20 : 56,
          zIndex: 20,
          maxWidth: 320,
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
          lineHeight: 1.65,
          marginBottom: 24,
        }}>
          {DESC}
        </p>
        <MagneticButton href="https://github.com/basantbansal">
          View My Work
        </MagneticButton>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes grain-animation {
          0%,100% { transform: translate(0,0); }
          10% { transform: translate(-5%,-5%); }
          20% { transform: translate(-10%,5%); }
          30% { transform: translate(5%,-10%); }
          40% { transform: translate(-5%,15%); }
          50% { transform: translate(-10%,5%); }
          60% { transform: translate(15%,0); }
          70% { transform: translate(0,10%); }
          80% { transform: translate(-15%,0); }
          90% { transform: translate(10%,5%); }
        }
      `}</style>
    </section>
  )
}


// ─── Portrait Section ─────────────────────────────────────────────────────
function PortraitSection() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      padding: '96px 24px',
      background: 'radial-gradient(ellipse at top, #3d1800 0%, #0a0400 100%)',
    }}>
      {/* Glass card */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 16,
          background: 'rgba(56,189,248,0.15)',
          filter: 'blur(24px)',
        }} />
        <div style={{
          position: 'relative',
          borderRadius: 16,
          padding: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 0 60px rgba(56,189,248,0.12)',
          animation: 'float 6s ease-in-out infinite',
        }}>
          <ParticlePortrait />
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(56,189,248,0.7)', marginBottom: 8,
        }}>
          Creator
        </p>
        <p style={{
          fontSize: 14, lineHeight: 1.65,
          maxWidth: 280, color: 'rgba(148,163,184,0.6)', margin: '0 auto',
        }}>
          Building things. Breaking limits. Learning in public.
        </p>
      </div>

      {/* Socials */}
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { href: 'https://www.instagram.com/basant__bansal/', Icon: FaInstagram, hover: '#ec4899' },
          { href: 'https://github.com/basantbansal',           Icon: FaGithub,    hover: '#ffffff' },
          { href: 'https://www.linkedin.com/in/basant-bansal-22066036b/', Icon: FaLinkedin, hover: '#3b82f6' },
          { href: '#',                                          Icon: FaTwitter,   hover: '#38bdf8' },
        ].map(({ href, Icon, hover }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer"
            style={{ color: 'rgba(148,163,184,0.5)', fontSize: 22, transition: 'color 0.2s, transform 0.2s', display: 'block' }}
            onMouseEnter={e => { e.currentTarget.style.color = hover; e.currentTarget.style.transform = 'scale(1.15)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.5)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <Icon />
          </a>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────
function ShowMe() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ background: '#000000' }}>
      <HeroSection isMobile={isMobile} />
      <PortraitSection />
    </div>
  )
}

export default ShowMe