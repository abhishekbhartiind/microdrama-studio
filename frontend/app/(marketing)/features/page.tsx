import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  Film,
  Layers3,
  ListChecks,
  Play,
  Sparkles,
  Timer,
  Video,
} from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'Features',
  description: 'Explore Reelcraft tools for timing, shaping, and organizing micro drama stories.',
};

const capabilities = [
  {
    icon: <Timer />,
    label: 'Live runtime',
    title: 'The minute is always in view.',
    body: 'Every scene adds to your total. See when a draft runs long, find the beat to tighten, and keep the sixty-second target visible.',
  },
  {
    icon: <Layers3 />,
    label: 'Scene structure',
    title: 'Build the turn on purpose.',
    body: 'Arrange story beats in order. Capture visual action, dialogue, and production notes without losing the shape of the episode.',
  },
  {
    icon: <ListChecks />,
    label: 'Production status',
    title: 'Know what is ready to roll.',
    body: 'Keep drafts, shoot-ready scripts, and archived ideas in one searchable place. Move an episode forward when it is ready.',
  },
  {
    icon: <Video />,
    label: 'Video preview',
    title: 'Keep the finished reel with its script.',
    body: 'Attach a direct video URL to a drama and preview the reel from the project card. The script and the cut stay connected.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.eyebrow}>
          <span /> THE TOOLS BEHIND THE TWIST
        </div>
        <h1>
          Built for stories
          <br />
          <em>that move fast.</em>
        </h1>
        <p>
          Keep the creative work clear, timed, and ready for production—without getting in the way
          of the story.
        </p>
        <Link href="/studio" className={styles.primaryCta}>
          Explore the studio <ArrowRight size={16} />
        </Link>
        <div className={styles.subpageHeroMeta}>
          <span>
            <Clock3 size={14} /> A real-time 60-second meter
          </span>
          <span>
            <Film size={14} /> Script and reel in one place
          </span>
        </div>
      </section>
      <section className={styles.capabilitySection}>
        <div className={styles.capabilityGrid}>
          {capabilities.map((item, index) => (
            <article className={styles.capabilityCard} key={item.label}>
              <div className={styles.capabilityTop}>
                <span>{item.icon}</span>
                <small>0{index + 1}</small>
              </div>
              <p>{item.label}</p>
              <h2>{item.title}</h2>
              <div className={styles.capabilityRule} />
              <p className={styles.capabilityBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.featureHighlight}>
        <div className={styles.highlightCopy}>
          <div className={styles.eyebrow}>
            <span /> MADE FOR THE LAST SECOND
          </div>
          <h2>
            Make the ending
            <br />
            <em>earn the next one.</em>
          </h2>
          <p>
            Track the hook, the turn, and the cliffhanger as distinct beats. Keep your final moment
            sharp enough to earn the rewatch.
          </p>
          <Link href="/how-it-works" className={styles.textLink}>
            See the writing flow <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.miniEditor} aria-label="Sample scene timing layout">
          <div className={styles.miniEditorHead}>
            <span>
              <Sparkles size={13} /> SCRIPT TIMELINE
            </span>
            <b>
              00:58 <i>/ 01:00</i>
            </b>
          </div>
          <div className={styles.miniTimeline}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.miniScene}>
            <small>00–03 · THE HOOK</small>
            <b>A message from inside.</b>
            <span>03 sec</span>
          </div>
          <div className={styles.miniScene}>
            <small>03–40 · THE TURN</small>
            <b>The empty room isn’t empty.</b>
            <span>37 sec</span>
          </div>
          <div className={styles.miniScene}>
            <small>40–58 · THE CLIFFHANGER</small>
            <b>“I’m already in your house.”</b>
            <span>18 sec</span>
          </div>
        </div>
      </section>
      <section className={styles.subpageCta}>
        <Sparkles size={18} />
        <h2>
          One strong minute
          <br />
          starts with a single beat.
        </h2>
        <Link href="/studio" className={styles.primaryCta}>
          Start creating <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
