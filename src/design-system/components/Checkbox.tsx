import styles from "./Input.module.css";

type CheckboxProps = {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  onChange: (checked: boolean) => void;
  onBlur: () => void;
};

export function Checkbox({
  id,
  name,
  checked,
  label,
  describedBy,
  invalid = false,
  required = false,
  onChange,
  onBlur,
}: CheckboxProps) {
  return (
    <label className={styles.checkboxRow} htmlFor={id}>
      <input
        className={styles.checkbox}
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        aria-required={required}
        onChange={(event) => onChange(event.currentTarget.checked)}
        onBlur={onBlur}
      />
      <span>{label}</span>
    </label>
  );
}
