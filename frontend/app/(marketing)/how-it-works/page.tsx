import Link from 'next/link';
import { ArrowRight, Check, Clapperboard, PenLine, Scissors, Timer } from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'How it works',
  description: 'Turn a spark into a timed, shootable one-minute drama in three simple steps.',
};

const steps = [
  {
    number: '01',
    icon: <SparklesIcon />,
    title: 'Start with the thing they can’t ignore.',
    body: 'Name the secret, impossible choice, or sudden arrival that makes the next second matter. Turn it into a title and one-line logline.',
    output: 'A premise worth stopping for',
  },
  {
    number: '02',
    icon: <PenLine />,
    title: 'Give every beat a reason to exist.',
    body: 'Build the hook, reveal, and cliffhanger as scenes. Write the action and dialogue, move beats into order, and keep the total runtime in view.',
    output: 'A timed, shootable script',
  },
  {
    number: '03',
    icon: <Scissors />,
    title: 'Cut the fat. Keep the feeling.',
    body: 'Tighten the story until it fits. Mark the script ready when the final beat lands, then attach the finished video for a quick preview.',
    output: 'One minute. One more episode.',
  },
];

function SparklesIcon() {
  return <Clapperboard />;
}

export default function HowItWorksPage() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.eyebrow}>
          <span /> FROM SPARK TO “PART TWO?”
        </div>
        <h1>
          Make a minute
          <br />
          <em>mean something.</em>
        </h1>
        <p>
          A focused story workflow, from first idea to shoot-ready script. No blank-page marathon
          required.
        </p>
        <Link href="/studio" className={styles.primaryCta}>
          Try the workflow <ArrowRight size={16} />
        </Link>
      </section>
      <section className={styles.stepsPage}>
        <div className={styles.stepsPageRail}>
          <span />
          <Timer size={17} />
          <span />
        </div>
        {steps.map((step) => (
          <article className={styles.stepPageCard} key={step.number}>
            <div className={styles.stepNumber}>{step.number}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepCopy}>
              <small>STEP {step.number}</small>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
              <div className={styles.stepOutput}>
                <Check size={14} /> {step.output}
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className={styles.workflowCallout}>
        <div>
          <span className={styles.calloutIcon}>
            <Timer size={18} />
          </span>
          <span>
            <b>The 60-second promise</b>
            <small>Drafts can run long. Ready scripts have to fit.</small>
          </span>
        </div>
        <Link href="/features">
          Explore the tools <ArrowRight size={15} />
        </Link>
      </section>
      <section className={styles.subpageCta}>
        <h2>
          Ready to write
          <br />
          <em>the first beat?</em>
        </h2>
        <Link href="/studio" className={styles.primaryCta}>
          Open Reelcraft Studio <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
