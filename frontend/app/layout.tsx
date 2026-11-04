import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Reelcraft Studio', description: 'Write your next one-minute drama.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
