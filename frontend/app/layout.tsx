import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from './providers';
export const metadata: Metadata = {
  title: 'Reelcraft Studio',
  description: 'Write your next one-minute drama.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
