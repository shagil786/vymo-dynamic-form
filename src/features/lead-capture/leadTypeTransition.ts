import type { LeadType, LeadValues } from "./types";

/**
 * Keep conditional-field state changes in one pure helper instead of the generic select.
 * Preserve the draft while a field is hidden; submission uses visible fields only.
 */
export function transitionLeadType(
  values: LeadValues,
  nextType: LeadType,
): LeadValues {
  const nextValues = { ...values, leadType: nextType };
  return nextValues;
}
