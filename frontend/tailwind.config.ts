import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#1f2823', muted: '#758078', canvas: '#f6f7f3', lime: '#d5f36a', forest: '#1c392d' }, fontFamily: { sans: ['var(--font-inter)', 'Arial', 'sans-serif'] } } }, plugins: [] } satisfies Config;
