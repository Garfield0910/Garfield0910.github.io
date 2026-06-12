import { useEffect, useState } from 'react'
import './App.css'
import BotanicalRibbon from './BotanicalRibbon'
import FlowerTrail from './FlowerTrail'
import HealingAudio from './HealingAudio'
import HeroBackdrop from './HeroBackdrop'
import SpringIntro from './SpringIntro'
import { navigation, profile, strengths, visualNotes } from './content'

function SplitTitle({ children }) {
  return (
    <h2 className="split-title">
      {[...children].map((character, index) => (
        <span
          className={character === ' ' ? 'split-title__space' : ''}
          key={`${character}-${index}`}
          style={{ '--char-index': index }}
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </h2>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('#home')
  const [introPhase, setIntroPhase] = useState('blooming')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bloomDuration = reducedMotion ? 120 : 4200
    const exitDuration = reducedMotion ? 220 : 820

    window.scrollTo(0, 0)
    document.body.classList.add('intro-locked')

    const exitTimer = window.setTimeout(() => setIntroPhase('leaving'), bloomDuration)
    const finishTimer = window.setTimeout(() => {
      setIntroPhase('done')
      document.body.classList.remove('intro-locked')
    }, bloomDuration + exitDuration)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(finishTimer)
      document.body.classList.remove('intro-locked')
    }
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      revealObserver.observe(element)
    })

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) {
          setActiveSection(`#${visibleSection.target.id}`)
        }
      },
      { rootMargin: '-30% 0px -60%', threshold: 0 },
    )

    document.querySelectorAll('main > section[id]').forEach((section) => {
      sectionObserver.observe(section)
    })

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    let frame = 0

    const updateScrollEffects = () => {
      frame = 0
      const heroProgress = Math.min(window.scrollY / window.innerHeight, 1)
      const pageProgress = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
      document.documentElement.style.setProperty('--hero-scroll', heroProgress.toFixed(4))
      document.documentElement.style.setProperty('--page-scroll', pageProgress.toFixed(4))
    }

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScrollEffects)
      }
    }

    updateScrollEffects()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const handlePointerMove = (event) => {
    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
  }

  const handleTilt = (event) => {
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    card.style.setProperty('--tilt-x', `${y * -5}deg`)
    card.style.setProperty('--tilt-y', `${x * 5}deg`)
    card.style.setProperty('--card-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--card-y', `${(y + 0.5) * 100}%`)
  }

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      className={`site ${introPhase === 'blooming' ? 'site--intro-playing' : ''}`}
      onPointerMove={handlePointerMove}
    >
      {introPhase !== 'done' && <SpringIntro phase={introPhase} />}
      <FlowerTrail />
      <HealingAudio />
      <div className="pointer-light" aria-hidden="true" />
      <BotanicalRibbon />

      <header className="site-nav">
        <a className="brand" href="#home" aria-label="回到首页">
          <span className="brand__mark">✦</span>
        </a>

        <nav className="nav-links" aria-label="页面导航">
          {navigation.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href ? 'is-active' : ''}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button--glass nav-contact" href={`mailto:${profile.email}`}>
          Say hello
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__frame">
            <HeroBackdrop />
            <div className="hero__veil" />
          </div>

          <div className="shell hero__inner">
            <p className="hero__eyebrow hero-enter hero-enter--one">{profile.title}</p>
            <h1 className="hero-title hero-enter hero-enter--two" aria-label={profile.heroTitle}>
              <span aria-hidden="true">让视觉，</span>
              <span aria-hidden="true">在<em>风与光</em>之间发生。</span>
            </h1>
            <p className="hero__lead hero-enter hero-enter--three">{profile.heroLead}</p>

            <div className="hero__actions hero-enter hero-enter--four">
              <a className="button button--solid" href="#projects">
                Explore work
              </a>
              <a className="text-link" href="#about">
                向下看看 <span>↓</span>
              </a>
            </div>

            <div className="hero__chips hero-enter hero-enter--five">
              {profile.focusAreas.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="hero__scroll-cue hero-enter hero-enter--five">
              <span>Scroll to explore</span>
              <i />
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="shell">
            <div className="section-heading section-heading--compact" data-reveal>
              <p className="section-label">About / 01</p>
              <SplitTitle>在 AI 时代，保持感受与想象。</SplitTitle>
            </div>

            <div className="about-grid">
              <div
                className="portrait-card tilt-card"
                data-reveal
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
              >
                <img
                  className="portrait-card__image"
                  src="/assets/pink-portrait.png"
                  alt="夏日绿荫与白花组成的诗意自然头像"
                />
                <div className="portrait-card__image-shade" aria-hidden="true" />
                <div className="portrait-card__orbit portrait-card__orbit--left">Visual</div>
                <div className="portrait-card__orbit portrait-card__orbit--right">AI</div>
                <div className="portrait-card__orbit portrait-card__orbit--bottom">Brand</div>
                <p className="portrait-card__quote">Stay curious.<br />Keep feeling.</p>
              </div>

              <div className="about-copy" data-reveal>
                <p className="about-copy__lead">{profile.about}</p>

                <div className="about-tags">
                  <span>{profile.currentFocus}</span>
                  <span>Open to possibilities</span>
                </div>

                <a className="inline-contact" href={`mailto:${profile.email}`}>
                  {profile.email} <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--projects" id="projects">
          <div className="shell">
            <div className="section-heading section-heading--compact" data-reveal>
              <p className="section-label">Visual Notes / 02</p>
              <SplitTitle>一些仍在生长的视觉片段。</SplitTitle>
            </div>

            <div className="visual-notes">
              {visualNotes.map((note) => (
                <article
                  key={note.title}
                  className="visual-note tilt-card"
                  data-reveal
                  onPointerMove={handleTilt}
                  onPointerLeave={resetTilt}
                >
                  <img className="visual-note__image" src={note.image} alt="" />
                  <div className="visual-note__veil" />
                  <div className="visual-note__topline">
                    <span>{note.index}</span>
                    <span>{note.tone}</span>
                  </div>
                  <div className="visual-note__copy">
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="strengths">
          <div className="shell">
            <div className="section-heading section-heading--compact" data-reveal>
              <p className="section-label">Creative Direction / 03</p>
              <SplitTitle>我正在形成的创作方向。</SplitTitle>
            </div>

            <div className="strength-grid">
              {strengths.map((item, index) => (
                <article
                  key={item.title}
                  className="strength-card tilt-card"
                  data-reveal
                  onPointerMove={handleTilt}
                  onPointerLeave={resetTilt}
                >
                  <span className="strength-card__index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="strength-card__arrow">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__backdrop" />
          <div className="shell contact__inner" data-reveal>
            <p className="section-label">Contact / 04</p>
            <SplitTitle>一起做点有生命力的东西。</SplitTitle>
            <a className="contact__mail" href={`mailto:${profile.email}`}>
              {profile.email} <span>↗</span>
            </a>
            <p className="contact__meta">Visual · AI · Brand</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
