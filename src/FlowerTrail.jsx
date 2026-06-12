import { useEffect, useRef } from 'react'

function FlowerTrail() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')

    if (!layer || reducedMotion.matches || !finePointer.matches) {
      return undefined
    }

    let lastX = 0
    let lastY = 0
    let lastTime = 0

    const flowers = ['✿', '❀', '✾']

    const createFlower = (event) => {
      const now = performance.now()
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY)

      if (now - lastTime < 46 || distance < 14) {
        return
      }

      lastTime = now
      lastX = event.clientX
      lastY = event.clientY

      const flower = document.createElement('span')
      const size = 11 + Math.random() * 11
      const driftX = -26 + Math.random() * 58
      const driftY = 30 + Math.random() * 54
      const rotation = 120 + Math.random() * 260
      const duration = 820 + Math.random() * 620

      flower.className = 'flower-trail__petal'
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)]
      flower.style.left = `${event.clientX}px`
      flower.style.top = `${event.clientY}px`
      flower.style.fontSize = `${size}px`
      flower.style.setProperty('--drift-x', `${driftX}px`)
      flower.style.setProperty('--drift-y', `${driftY}px`)
      flower.style.setProperty('--rotation', `${rotation}deg`)
      flower.style.setProperty('--duration', `${duration}ms`)
      flower.style.setProperty('--flower-lightness', `${82 + Math.random() * 10}%`)

      layer.appendChild(flower)
      flower.addEventListener('animationend', () => flower.remove(), { once: true })
    }

    window.addEventListener('pointermove', createFlower, { passive: true })
    return () => window.removeEventListener('pointermove', createFlower)
  }, [])

  return (
    <div ref={layerRef} className="flower-trail" aria-hidden="true">
      <span className="flower-trail__cursor">✿</span>
    </div>
  )
}

export default FlowerTrail
