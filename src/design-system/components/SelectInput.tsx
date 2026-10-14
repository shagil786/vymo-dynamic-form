import styles from "./Input.module.css";

type SelectInputProps = {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  options: ReadonlyArray<{ label: string; value: string }>;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export function SelectInput({
  id,
  name,
  value,
  placeholder = "Choose one",
  options,
  describedBy,
  invalid = false,
  required = false,
  onChange,
  onBlur,
}: SelectInputProps) {
  return (
    <select
      className={[styles.control, styles.select].join(" ")}
      id={id}
      name={name}
      value={value}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      aria-required={required}
      onChange={(event) => onChange(event.currentTarget.value)}
      onBlur={onBlur}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
