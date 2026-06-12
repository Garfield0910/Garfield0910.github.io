const petals = Array.from({ length: 30 }, (_, index) => ({
  x: (index * 19 + 5) % 104,
  y: (index * 31 + 9) % 82,
  delay: 0.35 + (index % 9) * 0.26,
  duration: 2.4 + (index % 6) * 0.32,
  size: 10 + (index % 5) * 5,
  driftX: -180 + (index % 8) * 54,
  driftY: 160 + (index % 7) * 42,
  rotation: 180 + (index % 6) * 95,
}))

function SpringIntro({ phase }) {
  return (
    <div className={`spring-intro spring-intro--${phase}`} aria-hidden="true">
      <div className="spring-intro__scene spring-intro__scene--grove">
        <img src="/assets/pink-canopy.png" alt="" />
      </div>
      <div className="spring-intro__scene spring-intro__scene--wind">
        <img src="/assets/intro-sakura-wind.png" alt="" />
      </div>

      <div className="spring-intro__sun" />
      <div className="spring-intro__petals">
        {petals.map((petal, index) => (
          <i
            key={index}
            style={{
              '--petal-x': `${petal.x}%`,
              '--petal-y': `${petal.y}%`,
              '--petal-delay': `${petal.delay}s`,
              '--petal-duration': `${petal.duration}s`,
              '--petal-size': `${petal.size}px`,
              '--petal-drift-x': `${petal.driftX}px`,
              '--petal-drift-y': `${petal.driftY}px`,
              '--petal-rotation': `${petal.rotation}deg`,
            }}
          />
        ))}
      </div>
      <div className="spring-intro__grain" />
      <div className="spring-intro__flash" />
    </div>
  )
}

export default SpringIntro
