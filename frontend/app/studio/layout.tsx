import type { ReactNode } from 'react';
import { AppProviders } from '../providers';

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
