import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  Film,
  Play,
  Sparkles,
  Timer,
  WandSparkles,
} from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'Reelcraft — Make them stop scrolling',
  description:
    'Plan, write, and shape addictive one-minute dramas with Reelcraft Studio. Build your next scroll-stopping story, one beat at a time.',
};

const features = [
  {
    number: '01',
    icon: <Timer size={18} />,
    title: 'Every second has a job.',
    description:
      'See your story’s runtime as you write. Find the slow beat, tighten the turn, land inside sixty.',
    className: 'featureTiming',
  },
  {
    number: '02',
    icon: <Film size={18} />,
    title: 'Write in scenes, not blank pages.',
    description: 'Shape the hook, the reveal, and the cliffhanger as clear, shootable scene beats.',
    className: 'featureScenes',
  },
  {
    number: '03',
    icon: <WandSparkles size={18} />,
    title: 'Keep every story in motion.',
    description:
      'Track drafts, ready-to-shoot episodes, production notes, and your video in one studio.',
    className: 'featureStudio',
  },
];

const beats = [
  { time: '00–03', label: 'THE HOOK', title: 'Her phone lights up.', detail: '“I’m downstairs.”' },
  {
    time: '03–42',
    label: 'THE TURN',
    title: 'She checks the camera.',
    detail: 'The hallway is empty. The message is from her own number.',
  },
  {
    time: '42–60',
    label: 'THE CLIFFHANGER',
    title: 'Another message arrives.',
    detail: '“Don’t open the door.” Then the handle starts to turn.',
  },
];

const faqs = [
  {
    question: 'What is a micro drama?',
    answer:
      'A short, serialized story built for vertical video. Each episode delivers a hook, a turn, and a reason to watch the next one.',
  },
  {
    question: 'Can I upload and edit video here?',
    answer:
      'Reelcraft helps you plan the story, time scenes, and link a finished video for preview. Video upload, editing, and rendering are not part of this version.',
  },
  {
    question: 'Do I need to finish the script in one minute?',
    answer:
      'Drafts can run long while you work. Reelcraft shows the overage; a drama must fit sixty seconds before you mark it ready to shoot.',
  },
];

export default function LandingPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span /> THE STORY STUDIO FOR SHORT ATTENTION SPANS
          </div>
          <h1>
            Make them
            <br />
            <em>stop scrolling.</em>
          </h1>
          <p className={styles.heroLead}>
            Big feelings. Sharp turns. One minute to make it matter.
          </p>
          <p className={styles.heroBody}>
            Reelcraft is where micro dramas take shape—from the first irresistible hook to the
            last-second cliffhanger.
          </p>
          <div className={styles.heroActions}>
            <Link href="/studio" className={styles.primaryCta}>
              Build your first drama <ArrowUpRight size={16} />
            </Link>
            <a href="#story" className={styles.playLink}>
              <span>
                <Play size={13} fill="currentColor" />
              </span>{' '}
              See a story in 60 seconds
            </a>
          </div>
          <div className={styles.heroProof}>
            <div className={styles.creatorStack} aria-hidden="true">
              <span>J</span>
              <span>M</span>
              <span>A</span>
              <span>+</span>
            </div>
            <p>
              <strong>Made for storytellers.</strong>
              <br />
              Ready for the next episode.
            </p>
          </div>
        </div>

        <div
          className={styles.heroVisual}
          aria-label="Preview of a one-minute drama story"
          role="img"
        >
          <div className={`${styles.orbit} ${styles.orbitOne}`} />
          <div className={`${styles.orbit} ${styles.orbitTwo}`} />
          <div className={styles.floatingNote}>
            <span className={styles.liveDot} /> EPISODE 04 <b>·</b> THRILLER
          </div>
          <div className={styles.phone}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneStatus}>
                <span>9:41</span>
                <span>•••　▰</span>
              </div>
              <div className={styles.filmArtwork}>
                <div className={styles.artLight} />
                <div className={styles.artDoor} />
                <div className={styles.artFigure} />
                <div className={styles.artShadow} />
                <div className={styles.filmCaption}>
                  <small>A REELCRAFT ORIGINAL</small>
                  <strong>
                    The Last
                    <br />
                    Seen
                  </strong>
                  <span>
                    She blocked him.
                    <br />
                    He never left.
                  </span>
                </div>
                <div className={styles.frameCounter}>
                  00:47 <i /> 01:00
                </div>
              </div>
              <div className={styles.phoneControls}>
                <span className={styles.pauseIcon}>Ⅱ</span>
                <div>
                  <b>THE LAST SEEN</b>
                  <small>EPISODE 04 · 1 MIN</small>
                </div>
                <span className={styles.soundIcon}>⌁</span>
              </div>
            </div>
          </div>
          <div className={styles.runtimeCard}>
            <span className={styles.runtimeIcon}>
              <Timer size={16} />
            </span>
            <div>
              <small>YOUR STORY, TIMED</small>
              <b>
                00:60 <i> / 01:00</i>
              </b>
            </div>
            <div className={styles.runtimeBars}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.turnCard}>
            <span>THE TURN</span>
            <b>
              “I’m already
              <br />
              inside.”
            </b>
            <ArrowDownRight size={18} />
          </div>
          <div className={styles.heroFootnote}>
            01 / 03 <span /> THE LAST SEEN
          </div>
        </div>
        <div className={styles.heroBottom}>
          <span>IDEA → SCRIPT → SHOOT</span>
          <span>
            YOUR NEXT EPISODE STARTS HERE <ArrowDownRight size={14} />
          </span>
        </div>
      </section>

      <section className={styles.manifesto}>
        <p>THE FEED MOVES FAST.</p>
        <h2>
          Your story can still
          <br />
          <em>make them feel something.</em>
        </h2>
        <div className={styles.manifestoMark}>“</div>
      </section>

      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionIntro}>
          <div>
            <div className={styles.eyebrow}>
              <span /> BUILT FOR THE BEAT
            </div>
            <h2>
              Small screen.
              <br />
              <em>Full-size story.</em>
            </h2>
          </div>
          <p>
            Forget the endless blank page. Give your big idea the structure—and the tension—it needs
            to land in sixty.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <article
              className={`${styles.featureCard} ${styles[feature.className as keyof typeof styles]}`}
              key={feature.number}
            >
              <div className={styles.featureTop}>
                <span>{feature.icon}</span>
                <small>{feature.number} / 03</small>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.featureRule} />
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className={styles.workflow}>
        <div className={styles.workflowIntro}>
          <div className={styles.eyebrow}>
            <span /> FROM SPARK TO “PART TWO?”
          </div>
          <h2>
            Three beats.
            <br />
            <em>One more episode.</em>
          </h2>
          <p>Keep the process simple so the story can get complicated.</p>
          <Link href="/studio" className={styles.textLink}>
            Step into the studio <ArrowRight size={16} />
          </Link>
        </div>
        <div className={styles.steps}>
          <div>
            <span>01</span>
            <div>
              <h3>Catch the hook.</h3>
              <p>Write the one-line premise that makes someone stop.</p>
            </div>
            <Check size={16} />
          </div>
          <div>
            <span>02</span>
            <div>
              <h3>Shape the turn.</h3>
              <p>Break the minute into timed, shootable scene beats.</p>
            </div>
            <Check size={16} />
          </div>
          <div>
            <span>03</span>
            <div>
              <h3>Leave them hanging.</h3>
              <p>Polish the ending. Mark it ready. Make the next one.</p>
            </div>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </section>

      <section id="story" className={styles.storySection}>
        <div className={styles.storyHeader}>
          <div>
            <div className={styles.eyebrow}>
              <span /> A MINUTE, ON THE PAGE
            </div>
            <h2>
              There’s no such thing
              <br />
              as a <em>small ending.</em>
            </h2>
          </div>
          <div className={styles.storyRuntime}>
            <Timer size={16} /> 60 SECONDS TOTAL
          </div>
        </div>
        <div className={styles.storyBoard}>
          <div className={styles.storyTitle}>
            <span>THRILLER · EPISODE 01</span>
            <h3>
              The Empty
              <br />
              Hallway
            </h3>
            <p>She gets a warning from the one person who can’t be there.</p>
            <div className={styles.storyMeta}>
              <span>
                <i /> DRAFT SCRIPT
              </span>
              <span>3 SCENES</span>
            </div>
          </div>
          <div className={styles.beatList}>
            {beats.map((beat, index) => (
              <article className={styles.beat} key={beat.time}>
                <div className={styles.beatTime}>
                  {beat.time}
                  <span>SEC</span>
                </div>
                <div className={styles.beatBody}>
                  <small>{beat.label}</small>
                  <h4>{beat.title}</h4>
                  <p>{beat.detail}</p>
                </div>
                <span className={styles.beatIndex}>0{index + 1}</span>
              </article>
            ))}
          </div>
          <div className={styles.storyEnd}>
            <span>END ON THE TURN</span>
            <ArrowDownRight size={18} />
          </div>
        </div>
        <p className={styles.storyCaption}>
          <Sparkles size={14} /> A strong minute is a chain of little promises—and one unforgettable
          payoff.
        </p>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.ctaGlow} />
        <div className={styles.eyebrow}>
          <span /> YOUR NEXT STORY IS WAITING
        </div>
        <h2>
          Give them a reason
          <br />
          to <em>stay for one more.</em>
        </h2>
        <p>Start with a spark. Leave with a story built for the next episode.</p>
        <Link href="/studio" className={styles.primaryCta}>
          Open Reelcraft Studio <ArrowUpRight size={16} />
        </Link>
        <span className={styles.ctaStamp}>
          60
          <br />
          <small>SECONDS</small>
        </span>
      </section>

      <section className={styles.faqSection}>
        <div>
          <div className={styles.eyebrow}>
            <span /> GOOD QUESTIONS
          </div>
          <h2>
            Before the
            <br />
            <em>first scene.</em>
          </h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <span>+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
