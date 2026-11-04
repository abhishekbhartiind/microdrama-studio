import Link from 'next/link';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'Story examples',
  description: 'See how a hook, a turn, and a cliffhanger can fit into a one-minute micro drama.',
};

const examples = [
  {
    genre: 'THRILLER',
    title: 'The Empty Hallway',
    logline: 'She gets a warning from the one person who can’t be there.',
    beats: [
      ['00–03', 'THE HOOK', 'Her phone lights up: “I’m downstairs.”'],
      ['03–42', 'THE TURN', 'The hallway camera is empty. The message came from her own number.'],
      ['42–60', 'THE CLIFFHANGER', '“Don’t open the door.” The handle begins to turn.'],
    ],
  },
  {
    genre: 'ROMANCE',
    title: 'One More Song',
    logline: 'Two exes are alone at the venue where they almost got married.',
    beats: [
      ['00–04', 'THE HOOK', 'The DJ plays their song. The room is empty.'],
      ['04–41', 'THE TURN', 'He kept the reservation every year. She kept the ring.'],
      ['41–60', 'THE CLIFFHANGER', 'The lights come on. Her new fiancé is at the door.'],
    ],
  },
  {
    genre: 'MYSTERY',
    title: 'Room 12',
    logline: 'The motel has eleven rooms. Her key says twelve.',
    beats: [
      ['00–03', 'THE HOOK', 'The clerk swears there is no room twelve.'],
      ['03–40', 'THE TURN', 'Her key opens a door behind the ice machine.'],
      ['40–60', 'THE CLIFFHANGER', 'Inside, someone is watching her arrive—yesterday.'],
    ],
  },
];

export default function StoriesPage() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.eyebrow}>
          <span /> STORY STARTERS
        </div>
        <h1>
          Small stories.
          <br />
          <em>Big aftertaste.</em>
        </h1>
        <p>
          Three sample story shapes. Each is built to hook, turn, and leave the door open for what
          comes next.
        </p>
      </section>
      <section className={styles.examplesGrid}>
        {examples.map((story, index) => (
          <article className={styles.exampleCard} key={story.title}>
            <div className={`${styles.exampleArt} ${styles[`exampleArt${index + 1}`]}`}>
              <span>{story.genre}</span>
              <b>0{index + 1}</b>
              <div>{story.title}</div>
            </div>
            <div className={styles.exampleContent}>
              <p className={styles.exampleGenre}>
                <Sparkles size={12} /> {story.genre} · 1 MINUTE
              </p>
              <h2>{story.title}</h2>
              <p className={styles.exampleLogline}>{story.logline}</p>
              <div className={styles.exampleBeats}>
                {story.beats.map(([time, label, text]) => (
                  <div key={label}>
                    <span>{time}</span>
                    <p>
                      <b>{label}</b>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.exampleFoot}>
                <span>
                  <Clock3 size={13} /> 60 SECONDS
                </span>
                <Link href="/studio">
                  Build a story like this <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className={styles.subpageCta}>
        <h2>
          Take a spark.
          <br />
          <em>Make it yours.</em>
        </h2>
        <Link href="/studio" className={styles.primaryCta}>
          Open the story studio <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
