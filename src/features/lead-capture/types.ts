export type LeadValues = Record<string, string | boolean>;

export type LeadFieldName = string;

export type LeadFieldConfig = {
  name: LeadFieldName;
  type: "text" | "email" | "select" | "textarea" | "checkbox";
  label: string;
  controlLabel?: string;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  options?: ReadonlyArray<{ label: string; value: string }>;
  validation: {
    required?: string;
    pattern?: {
      kind: "email" | "ten-digit-phone";
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
  showWhen?: {
    field: string;
    equals: string | boolean;
  };
  layout: "half" | "full";
};

export type LeadErrors = Partial<Record<LeadFieldName, string>>;

export type LeadSubmission = Partial<LeadValues>;
