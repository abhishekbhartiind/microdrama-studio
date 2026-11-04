import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/components/marketing/marketing.module.css';

export const metadata = {
  title: 'FAQ',
  description: 'Answers about writing, timing, and previewing one-minute dramas in Reelcraft.',
};

const questions = [
  [
    'What is a micro drama?',
    'A short, serialized story made for vertical video. It uses a compact episode to deliver an emotional turn and a reason to keep watching.',
  ],
  [
    'Does Reelcraft generate the video?',
    'No. Reelcraft helps you plan and write the episode, then link a direct video URL for preview. Uploading, editing, and rendering video are not included.',
  ],
  [
    'How strict is the one-minute target?',
    'Drafts can run over while you work. The editor shows the overage. To mark a script ready to shoot, it needs at least one scene and a total runtime of 60 seconds or less.',
  ],
  [
    'Can I save multiple episodes in a series?',
    'Add the same series name to related drama projects, then browse them together from the Series section in your studio.',
  ],
  [
    'Can I use my own cover art?',
    'Yes. Add a public image URL to a drama. A direct video URL can also be attached for preview.',
  ],
  [
    'What does early access cost?',
    'The current creator studio is free to use. There are no billing or payment details in this build.',
  ],
];

export default function FAQPage() {
  return (
    <>
      <section className={styles.subpageHero}>
        <div className={styles.eyebrow}>
          <span /> BEFORE THE FIRST TAKE
        </div>
        <h1>
          Good questions.
          <br />
          <em>Quick answers.</em>
        </h1>
        <p>What Reelcraft does, what it doesn’t, and how to get a one-minute story into shape.</p>
      </section>
      <section className={styles.faqPageList}>
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <section className={styles.faqContact}>
        <p>Still wondering where to start?</p>
        <Link href="/how-it-works">
          See the three-step workflow <ArrowRight size={15} />
        </Link>
      </section>
      <section className={styles.subpageCta}>
        <h2>
          Make the first
          <br />
          <em>minute matter.</em>
        </h2>
        <Link href="/studio" className={styles.primaryCta}>
          Open Reelcraft Studio <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
