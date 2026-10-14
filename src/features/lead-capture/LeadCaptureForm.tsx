import { useState, type FormEvent } from "react";
import { Button } from "../../design-system/components/Button";
import { Checkbox } from "../../design-system/components/Checkbox";
import { Field } from "../../design-system/components/Field";
import { SelectInput } from "../../design-system/components/SelectInput";
import { TextArea } from "../../design-system/components/TextArea";
import { TextInput } from "../../design-system/components/TextInput";
import type {
  LeadFieldConfig,
  LeadFieldName,
  LeadSubmission,
  LeadValues,
} from "./types";
import { getVisibleFields, validateLead } from "./validation";
import styles from "./LeadCaptureForm.module.css";

function initialValues(config: readonly LeadFieldConfig[]): LeadValues {
  return Object.fromEntries(
    config.map((field) => [field.name, field.type === "checkbox" ? false : ""]),
  );
}

function controlValue(value: string | boolean): string {
  return typeof value === "string" ? value : "";
}

function visibleSubmission(
  fields: readonly LeadFieldConfig[],
  values: LeadValues,
): LeadSubmission {
  return Object.fromEntries(
    fields.map((field) => [field.name, values[field.name]]),
  ) as LeadSubmission;
}

function SubmissionSummary({
  config,
  values,
  onEdit,
}: {
  config: readonly LeadFieldConfig[];
  values: LeadSubmission;
  onEdit: () => void;
}) {
  const submittedFields = config.filter((field) =>
    Object.prototype.hasOwnProperty.call(values, field.name),
  );

  return (
    <section className={styles.success} aria-live="polite">
      <h2>Form values</h2>
      <p className={styles.successCopy}>
        These values passed validation. Nothing was sent.
      </p>

      <dl className={styles.summary}>
        {submittedFields.map((field) => {
          const value = values[field.name];
          const displayValue =
            field.type === "checkbox"
              ? value
                ? "Agreed"
                : "Not agreed"
              : String(value ?? "");

          return (
            <div className={styles.summaryRow} key={field.name}>
              <dt>{field.label}</dt>
              <dd>{displayValue}</dd>
            </div>
          );
        })}
      </dl>

      <Button type="button" variant="secondary" onClick={onEdit}>
        Edit details
      </Button>
    </section>
  );
}

export function LeadCaptureForm({
  config,
}: {
  config: readonly LeadFieldConfig[];
}) {
  const [values, setValues] = useState<LeadValues>(() => initialValues(config));
  const [touched, setTouched] = useState<Set<LeadFieldName>>(() => new Set());
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submission, setSubmission] = useState<LeadSubmission | null>(null);

  const fields = getVisibleFields(config, values);
  const errors = validateLead(config, values);

  const updateField = (field: LeadFieldConfig, value: string | boolean) => {
    setValues((current) => ({ ...current, [field.name]: value }));
    setSubmission(null);
  };

  const touchField = (name: LeadFieldName) => {
    setTouched((current) => {
      const next = new Set(current);
      next.add(name);
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (Object.keys(errors).length > 0) {
      const firstInvalid = fields.find((field) => errors[field.name]);
      if (firstInvalid) {
        window.requestAnimationFrame(() => {
          document.getElementById(firstInvalid.name)?.focus();
        });
      }
      return;
    }

    setSubmission(visibleSubmission(fields, values));
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  if (submission) {
    return (
      <div className={styles.panel}>
        <SubmissionSummary
          config={config}
          values={submission}
          onEdit={() => setSubmission(null)}
        />
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Contact details</h2>
        <p className={styles.panelIntro}>Fields marked * are required.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGrid}>
          {fields.map((field) => {
            const shouldShowError = hasSubmitted || touched.has(field.name);
            const error = shouldShowError ? errors[field.name] : undefined;
            const maxLength = field.validation.maxLength?.value;
            const hint =
              maxLength !== undefined
                ? [
                    field.hint,
                    String(values[field.name]).length + "/" + maxLength + " characters",
                  ]
                    .filter(Boolean)
                    .join(" · ")
                : field.hint;
            const describedBy = [
              hint ? field.name + "-hint" : null,
              error ? field.name + "-error" : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined;
            const layoutClass =
              field.layout === "full" ? styles.fieldFull : styles.fieldHalf;
            const fieldValue = values[field.name];
            const required = Boolean(field.validation.required);
            const onBlur = () => touchField(field.name);

            let control;
            if (field.type === "select") {
              control = (
                <SelectInput
                  id={field.name}
                  name={field.name}
                  value={controlValue(fieldValue)}
                  placeholder={field.placeholder}
                  options={field.options ?? []}
                  describedBy={describedBy}
                  invalid={Boolean(error)}
                  required={required}
                  onChange={(value) => updateField(field, value)}
                  onBlur={onBlur}
                />
              );
            } else if (field.type === "checkbox") {
              control = (
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={Boolean(fieldValue)}
                  label={field.controlLabel ?? field.label}
                  describedBy={describedBy}
                  invalid={Boolean(error)}
                  required={required}
                  onChange={(checked) => updateField(field, checked)}
                  onBlur={onBlur}
                />
              );
            } else if (field.type === "textarea") {
              control = (
                <TextArea
                  id={field.name}
                  name={field.name}
                  value={controlValue(fieldValue)}
                  placeholder={field.placeholder}
                  maxLength={maxLength}
                  describedBy={describedBy}
                  invalid={Boolean(error)}
                  required={required}
                  onChange={(value) => updateField(field, value)}
                  onBlur={onBlur}
                />
              );
            } else {
              control = (
                <TextInput
                  id={field.name}
                  name={field.name}
                  type={field.type === "email" ? "email" : "text"}
                  value={controlValue(fieldValue)}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  maxLength={maxLength}
                  describedBy={describedBy}
                  invalid={Boolean(error)}
                  required={required}
                  onChange={(value) => updateField(field, value)}
                  onBlur={onBlur}
                />
              );
            }

            return (
              <Field
                key={field.name}
                id={field.name}
                label={field.label}
                required={required}
                hint={hint}
                error={error}
                className={layoutClass}
              >
                {control}
              </Field>
            );
          })}
        </div>

        <div className={styles.submitBar}>
          <p className={styles.demoNote}>Demo form. Nothing is sent.</p>
          <Button type="submit" className={styles.submitButton}>
            Submit form
          </Button>
        </div>
      </form>
    </div>
  );
}
