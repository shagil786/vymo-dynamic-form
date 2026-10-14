import styles from "./Input.module.css";

type TextAreaProps = {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function TextArea({
  id,
  name,
  value,
  placeholder,
  maxLength,
  describedBy,
  invalid = false,
  required = false,
  onChange,
  onBlur,
}: TextAreaProps) {
  return (
    <textarea
      className={[styles.control, styles.textarea].join(" ")}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={4}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      aria-required={required}
      onChange={(event) => onChange(event.currentTarget.value)}
      onBlur={onBlur}
    />
  );
}
