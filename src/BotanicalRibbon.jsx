function BotanicalRibbon() {
  return (
    <div className="botanical-ribbon" aria-hidden="true">
      <svg viewBox="0 0 320 1200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ribbon-color" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1f5" stopOpacity="0" />
            <stop offset="0.22" stopColor="#f3adc2" stopOpacity="0.78" />
            <stop offset="0.5" stopColor="#ffe7ee" stopOpacity="0.9" />
            <stop offset="0.76" stopColor="#d985a4" stopOpacity="0.72" />
            <stop offset="1" stopColor="#f9ceda" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbon-softness" x="-80%" y="-20%" width="260%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path
          className="botanical-ribbon__glow"
          d="M182 -40 C 48 124, 284 244, 126 405 C -12 546, 267 662, 145 820 C 36 961, 202 1070, 124 1240"
        />
        <path
          className="botanical-ribbon__core"
          d="M182 -40 C 48 124, 284 244, 126 405 C -12 546, 267 662, 145 820 C 36 961, 202 1070, 124 1240"
        />
      </svg>
      <span className="botanical-ribbon__flower botanical-ribbon__flower--one">✿</span>
      <span className="botanical-ribbon__flower botanical-ribbon__flower--two">✽</span>
      <span className="botanical-ribbon__flower botanical-ribbon__flower--three">❀</span>
    </div>
  )
}

export default BotanicalRibbon
