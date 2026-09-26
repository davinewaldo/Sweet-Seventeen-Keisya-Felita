// Aesthetic SVG Illustrations as fallbacks for polaroid photos
export function generatePhotoFallbackSvg(title: string, theme: string, details: string): string {
  const themes: Record<string, { bg1: string; bg2: string; accent: string; icon: string }> = {
    adventure: { bg1: '#FCE7F3', bg2: '#FBCFE8', accent: '#EC4899', icon: '🎒🏔️' },
    scooter: { bg1: '#FEF3C7', bg2: '#FDE68A', accent: '#F59E0B', icon: '🛵💨' },
    road: { bg1: '#FED7AA', bg2: '#FDBA74', accent: '#EA580C', icon: '🛣️🌅' },
    smile: { bg1: '#FFE4E6', bg2: '#FECDD3', accent: '#F43F5E', icon: '🌸✨' },
    cute: { bg1: '#F3E8FF', bg2: '#E9D5FF', accent: '#A855F7', icon: '🎀🧸' },
    mirror: { bg1: '#F1F5F9', bg2: '#E2E8F0', accent: '#64748B', icon: '🪞📸' },
    study: { bg1: '#FEF9C3', bg2: '#FEF08A', accent: '#CA8A04', icon: '📚🎓' },
  };

  const t = themes[theme] || themes.smile;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450" width="100%" height="100%">
    <defs>
      <linearGradient id="grad_${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bg1}" />
        <stop offset="100%" stop-color="${t.bg2}" />
      </linearGradient>
      <pattern id="dotPattern_${theme}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="${t.accent}" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="400" height="450" fill="url(#grad_${theme})" />
    <rect width="400" height="450" fill="url(#dotPattern_${theme})" />
    
    <g transform="translate(200, 160)">
      <circle r="70" fill="#FFFFFF" opacity="0.8" />
      <circle r="60" fill="${t.bg1}" />
      <text text-anchor="middle" y="16" font-size="52" font-family="sans-serif">${t.icon}</text>
    </g>
    
    <g transform="translate(200, 290)">
      <rect x="-140" y="-20" width="280" height="40" rx="20" fill="#FFFFFF" opacity="0.9" />
      <text text-anchor="middle" y="6" font-size="16" font-weight="bold" fill="#374151" font-family="'Poppins', sans-serif">${title}</text>
    </g>
    
    <g transform="translate(200, 345)">
      <text text-anchor="middle" font-size="13" fill="#6B7280" font-family="'Poppins', sans-serif">${details}</text>
      <text text-anchor="middle" y="24" font-size="11" fill="#9CA3AF" font-family="'Poppins', sans-serif">Keisya Felita • Sweet 17 Memory</text>
    </g>

    <g transform="translate(20, 30)">
      <circle cx="0" cy="0" r="4" fill="${t.accent}" opacity="0.5" />
      <circle cx="360" cy="0" r="4" fill="${t.accent}" opacity="0.5" />
      <circle cx="0" cy="390" r="4" fill="${t.accent}" opacity="0.5" />
      <circle cx="360" cy="390" r="4" fill="${t.accent}" opacity="0.5" />
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
