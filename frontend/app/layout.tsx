import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'Reelcraft Studio', template: '%s | Reelcraft' },
  description: 'Plan, write, and shape one-minute micro dramas with Reelcraft Studio.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
