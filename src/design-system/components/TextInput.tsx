import styles from "./Input.module.css";

type TextInputProps = {
  id: string;
  name: string;
  type?: "text" | "email";
  value: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  maxLength?: number;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function TextInput({
  id,
  name,
  type = "text",
  value,
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  describedBy,
  invalid = false,
  required = false,
  onChange,
  onBlur,
}: TextInputProps) {
  return (
    <input
      className={styles.control}
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      aria-required={required}
      onChange={(event) => onChange(event.currentTarget.value)}
      onBlur={onBlur}
    />
  );
}
