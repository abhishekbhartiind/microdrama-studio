import Link from 'next/link';
import { ArrowRight, Check, Clapperboard, Sparkles } from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'Pricing',
  description: 'Reelcraft Studio is free to use during early access. Explore what is included.',
};

const included = [
  'Create and organize drama projects',
  'Write scenes with live runtime feedback',
  'Track drafts and ready-to-shoot scripts',
  'Add cover art and preview a direct video URL',
  'Search, filter, and update your stories',
];

export default function PricingPage() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.eyebrow}>
          <span /> SIMPLE BY DESIGN
        </div>
        <h1>
          More story.
          <br />
          <em>Less setup.</em>
        </h1>
        <p>
          Reelcraft is in early access. The creator studio is free to use while we build the tools
          around the story.
        </p>
      </section>
      <section className={styles.pricingWrap}>
        <article className={styles.priceCard}>
          <div className={styles.priceTop}>
            <span>
              <Clapperboard size={17} /> REELCRAFT STUDIO
            </span>
            <span className={styles.priceBadge}>EARLY ACCESS</span>
          </div>
          <h2>Free</h2>
          <p className={styles.priceCaption}>Everything you need to shape a one-minute story.</p>
          <Link href="/studio" className={styles.primaryCta}>
            Start creating <ArrowRight size={16} />
          </Link>
          <div className={styles.priceDivider} />
          <p className={styles.includedLabel}>INCLUDED</p>
          <ul>
            {included.map((item) => (
              <li key={item}>
                <Check size={15} />
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.priceFoot}>
            <Sparkles size={14} /> No billing or payment details required.
          </div>
        </article>
        <aside className={styles.priceAside}>
          <div className={styles.eyebrow}>
            <span /> THE FOCUS
          </div>
          <h3>
            Good stories
            <br />
            come first.
          </h3>
          <p>
            This version helps you plan and organize. Video uploading, rendering, and AI story
            generation are not included or charged as part of early access.
          </p>
          <Link href="/faq">
            Read common questions <ArrowRight size={14} />
          </Link>
        </aside>
      </section>
      <section className={styles.subpageCta}>
        <h2>
          Ready when
          <br />
          <em>your story is.</em>
        </h2>
        <Link href="/studio" className={styles.primaryCta}>
          Open Reelcraft Studio <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
