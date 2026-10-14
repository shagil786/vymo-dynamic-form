import type { LeadFieldConfig } from "./types";

export const leadFields: readonly LeadFieldConfig[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full name",
    placeholder: "e.g. Ananya Rao",
    autoComplete: "name",
    validation: { required: "Enter your full name." },
    layout: "half",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
    validation: {
      required: "Enter your email address.",
      pattern: {
        kind: "email",
        message: "Enter a valid email address.",
      },
    },
    layout: "half",
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead type",
    placeholder: "Choose one",
    options: [
      { label: "An individual", value: "individual" },
      { label: "A company", value: "company" },
    ],
    validation: { required: "Choose an option." },
    layout: "half",
  },
  {
    name: "companyName",
    type: "text",
    label: "Company name",
    placeholder: "e.g. Northstar Labs",
    autoComplete: "organization",
    showWhen: { field: "leadType", equals: "company" },
    validation: { required: "Enter your company name." },
    layout: "half",
  },
  {
    name: "phone",
    type: "text",
    label: "Phone number",
    placeholder: "10-digit phone number",
    autoComplete: "tel-national",
    inputMode: "tel",
    hint: "Use 10 digits, without a country code.",
    validation: {
      required: "Enter your phone number.",
      pattern: {
        kind: "ten-digit-phone",
        message: "Use a 10-digit phone number.",
      },
    },
    layout: "half",
  },
  {
    name: "notes",
    type: "textarea",
    label: "Notes",
    placeholder: "Optional context",
    hint: "Optional",
    validation: {
      maxLength: {
        value: 200,
        message: "Keep your note to 200 characters or fewer.",
      },
    },
    layout: "full",
  },
  {
    name: "consent",
    type: "checkbox",
    label: "Consent",
    controlLabel: "I agree to be contacted about my inquiry.",
    validation: { required: "Please provide consent to continue." },
    layout: "full",
  },
];
