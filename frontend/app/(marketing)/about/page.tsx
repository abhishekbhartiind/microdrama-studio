import Link from 'next/link';
import { ArrowRight, Clapperboard, Heart, Lightbulb } from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'About',
  description:
    'Why Reelcraft exists: to give short-form drama a thoughtful place to be written and shaped.',
};

export default function AboutPage() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.eyebrow}>
          <span /> WHY REELCRAFT
        </div>
        <h1>
          Short doesn’t
          <br />
          mean <em>shallow.</em>
        </h1>
        <p>
          A minute can hold a secret, a heartbreak, a reveal, and the reason someone asks for part
          two. Reelcraft helps creators make room for all of it.
        </p>
      </section>
      <section className={styles.aboutManifesto}>
        <div className={styles.aboutQuote}>“</div>
        <p>We believe the best short stories respect the viewer’s time and still leave a mark.</p>
        <span>THE REELCRAFT IDEA</span>
      </section>
      <section className={styles.valuesGrid}>
        <article>
          <span>
            <Clapperboard size={18} />
          </span>
          <small>01 · CRAFT</small>
          <h2>Make every beat count.</h2>
          <p>
            A tight runtime is a creative constraint. The right structure gives an idea room to
            surprise.
          </p>
        </article>
        <article>
          <span>
            <Heart size={18} />
          </span>
          <small>02 · FEELING</small>
          <h2>Leave something behind.</h2>
          <p>
            We care about the emotional turn—the image or line that stays with someone after the
            scroll.
          </p>
        </article>
        <article>
          <span>
            <Lightbulb size={18} />
          </span>
          <small>03 · MOMENTUM</small>
          <h2>Keep the next story close.</h2>
          <p>
            Ideas happen between shoots. A simple studio helps keep them organized and moving
            forward.
          </p>
        </article>
      </section>
      <section className={styles.subpageCta}>
        <h2>
          Have a story
          <br />
          <em>worth a minute?</em>
        </h2>
        <Link href="/studio" className={styles.primaryCta}>
          Make it in Reelcraft <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
