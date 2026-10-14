import type {
  LeadErrors,
  LeadFieldConfig,
  LeadFieldName,
  LeadValues,
} from "./types";

const EMAIL_PATTERN = /^[^\s@.]+(?:\.[^\s@.]+)*@[^\s@.]+(?:\.[^\s@.]+)+$/;
const TEN_DIGIT_PHONE_PATTERN = /^\d{10}$/;

export function isFieldVisible(
  field: LeadFieldConfig,
  values: LeadValues,
): boolean {
  return (
    !field.showWhen ||
    values[field.showWhen.field] === field.showWhen.equals
  );
}

export function getVisibleFields(
  fields: readonly LeadFieldConfig[],
  values: LeadValues,
): LeadFieldConfig[] {
  return fields.filter((field) => isFieldVisible(field, values));
}

export function validateLead(
  fields: readonly LeadFieldConfig[],
  values: LeadValues,
): LeadErrors {
  const errors: LeadErrors = {};

  for (const field of getVisibleFields(fields, values)) {
    const value = values[field.name];
    const isEmpty =
      typeof value === "boolean" ? !value : value.trim().length === 0;

    if (field.validation.required && isEmpty) {
      errors[field.name] = field.validation.required;
      continue;
    }

    if (typeof value !== "string" || value.trim().length === 0) {
      continue;
    }

    const trimmedValue = value.trim();
    const pattern = field.validation.pattern;

    if (pattern?.kind === "email" && !EMAIL_PATTERN.test(trimmedValue)) {
      errors[field.name] = pattern.message;
    } else if (
      pattern?.kind === "ten-digit-phone" &&
        !TEN_DIGIT_PHONE_PATTERN.test(value)
    ) {
      errors[field.name] = pattern.message;
    } else if (
      field.validation.maxLength &&
      value.length > field.validation.maxLength.value
    ) {
      errors[field.name] = field.validation.maxLength.message;
    }
  }

  return errors;
}

export function getFieldError(
  errors: LeadErrors,
  name: LeadFieldName,
): string | undefined {
  return errors[name];
}
