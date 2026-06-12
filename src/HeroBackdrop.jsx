const scenes = [
  {
    src: '/assets/pink-window.png',
    className: 'hero-backdrop__scene--window',
  },
  {
    src: '/assets/pink-flower-sea.png',
    className: 'hero-backdrop__scene--canopy',
  },
  {
    src: '/assets/pink-water-garden.png',
    className: 'hero-backdrop__scene--flowers',
  },
  {
    src: '/assets/pink-dancer.png',
    className: 'hero-backdrop__scene--dancer',
  },
]

function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      {scenes.map((scene, index) => (
        <img
          key={scene.src}
          className={`hero-backdrop__scene ${scene.className}`}
          src={scene.src}
          alt=""
          decoding="async"
          fetchPriority={index === 0 ? 'high' : undefined}
        />
      ))}
      <div className="hero-backdrop__sunlight" />
      <div className="hero-backdrop__grain" />
    </div>
  )
}

export default HeroBackdrop
