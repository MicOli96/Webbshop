// Stiliserade platshållarbilder i Mumin-inspirerat färgtema (ingen extern bildkälla,
// ritar inga upphovsrättsskyddade karaktärer - bara en färgad platta med initial).
const palette = [
  { bg: '#a9d8e6', fg: '#2c5f70' }, // himmelsblå
  { bg: '#8fb99a', fg: '#2f4a37' }, // muminvalley-grön
  { bg: '#f4e2c2', fg: '#8a6a3a' }, // sandbeige
  { bg: '#e3b7bd', fg: '#7a3d44' }, // solnedgångsrosa
  { bg: '#7e93a8', fg: '#e8eef2' }, // blåbärsblå
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getPlaceholderImage(seed: string, label: string): string {
  const { bg, fg } = palette[hashString(seed) % palette.length];
  const initial = (label.trim()[0] ?? '?').toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="${bg}" />
      <circle cx="200" cy="140" r="70" fill="${fg}" opacity="0.15" />
      <text x="200" y="165" font-family="Roboto, sans-serif" font-size="72" font-weight="700"
            fill="${fg}" text-anchor="middle">${initial}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
