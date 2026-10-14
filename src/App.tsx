import { LeadCaptureForm } from "./features/lead-capture/LeadCaptureForm";
import { leadFields } from "./features/lead-capture/leadFields";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <a className={styles.brand} href="#top" aria-label="Vymo home">
          <span className={styles.brandMark} aria-hidden="true">
            v
          </span>
          <span className={styles.brandName}>vymo</span>
        </a>
        <div className={styles.pageBadge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Lead inquiry
        </div>
      </header>

      <main id="top" className={styles.layout}>
        <section className={styles.story} aria-labelledby="story-title">
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            A better conversation starts here
          </div>
          <h1 id="story-title">Let’s make your next conversation count.</h1>
          <p className={styles.intro}>
            Tell us a little about what you’re looking for. We’ll connect you
            with the right person to take it forward.
          </p>

          <div className={styles.promiseCard}>
            <div className={styles.promiseIcon} aria-hidden="true">
              <span>✳</span>
            </div>
            <div>
              <p className={styles.promiseTitle}>A thoughtful first step</p>
              <p className={styles.promiseCopy}>
                Your goals shape the conversation, from the very beginning.
              </p>
            </div>
            <span className={styles.promiseArrow} aria-hidden="true">
              ↗
            </span>
          </div>

          <div className={styles.storyFooter}>
            <div className={styles.avatarStack} aria-hidden="true">
              <span>R</span>
              <span>A</span>
              <span>M</span>
            </div>
            <p>
              A real person from our team
              <br />
              will be in touch.
            </p>
          </div>
          <div className={styles.orbit} aria-hidden="true">
            <span className={styles.orbitCore} />
            <span className={styles.orbitRing} />
            <span className={styles.orbitDot} />
          </div>
        </section>

        <section className={styles.formSection} aria-label="Lead capture">
          <LeadCaptureForm config={leadFields} />
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Vymo · Lead capture</span>
        <span>Made for a clear first step</span>
      </footer>
    </div>
  );
}
