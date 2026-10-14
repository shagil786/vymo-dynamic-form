import { LeadCaptureForm } from "./features/lead-capture/LeadCaptureForm";
import { leadFields } from "./features/lead-capture/leadFields";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <main className={styles.layout}>
        <div className={styles.intro}>
          <h1>Lead capture form</h1>
          <p>Enter contact details and review the values on this page.</p>
        </div>
        <section aria-label="Lead capture form">
          <LeadCaptureForm config={leadFields} />
        </section>
      </main>
    </div>
  );
}
