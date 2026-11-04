import type { ReactNode } from 'react';
import styles from '@/components/marketing/marketing.module.css';
import { SiteFooter, SiteHeader } from '@/components/marketing/site-header';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
