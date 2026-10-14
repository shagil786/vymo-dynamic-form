import type { ReactNode } from "react";
import styles from "./Field.module.css";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function Field({
  id,
  label,
  required = false,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? <span className={styles.required}>*</span> : null}
      </label>
      {children}
      {hint ? (
        <p className={styles.hint} id={id + "-hint"}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={id + "-error"} role="alert">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
