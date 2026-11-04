import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clapperboard, Sparkles } from 'lucide-react';
import styles from './marketing.module.css';

const navigation = [
  { label: 'Features', href: '/features' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Stories', href: '/stories' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

function Brand() {
  return (
    <Link href="/" className={styles.brand} aria-label="Reelcraft home">
      <span className={styles.brandMark}>
        <Clapperboard size={19} strokeWidth={2.2} />
      </span>
      <span>
        reelcraft<span className={styles.brandPeriod}>.</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <>
      <div className={styles.announcement}>
        <Sparkles size={14} />
        <span>A new kind of story studio for a one-minute world.</span>
        <Link href="/studio">
          Take a look <ArrowRight size={13} />
        </Link>
      </div>
      <header className={styles.header}>
        <Brand />
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <Link href="/studio" className={styles.signIn}>
            Open studio
          </Link>
          <Link href="/studio" className={styles.headerCta}>
            Start creating <ArrowUpRight size={15} />
          </Link>
        </div>
        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/studio">
              Open studio <ArrowRight size={15} />
            </Link>
          </nav>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Brand />
      <p>Make a minute mean something.</p>
      <div>
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/faq">FAQ</Link>
        <Link href="/studio">
          Open app <ArrowUpRight size={13} />
        </Link>
      </div>
      <small>© 2026 REELCRAFT STUDIO</small>
    </footer>
  );
}
