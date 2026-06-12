import { useEffect, useRef, useState } from 'react'

function HealingAudio() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.16

    const markPlaying = () => {
      setHasStarted(true)
      setIsPlaying(true)
    }
    const markPaused = () => setIsPlaying(false)
    const tryStart = () => {
      audio.play().catch(() => {
        // Browsers may wait for the first deliberate user interaction.
      })
    }

    audio.addEventListener('play', markPlaying)
    audio.addEventListener('pause', markPaused)
    window.addEventListener('pointerdown', tryStart, { once: true })
    tryStart()

    return () => {
      window.removeEventListener('pointerdown', tryStart)
      audio.removeEventListener('play', markPlaying)
      audio.removeEventListener('pause', markPaused)
      audio.pause()
    }
  }, [])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/background-piano.mp3" loop preload="auto" />
      <button
        className={`sound-control ${isPlaying ? 'is-playing' : ''}`}
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? '关闭背景音乐' : '开启背景音乐'}
        title={hasStarted ? (isPlaying ? '关闭背景音乐' : '开启背景音乐') : '点击开启背景音乐'}
      >
        <span className="sound-control__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  )
}

export default HealingAudio
