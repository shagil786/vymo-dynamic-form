# Vymo Dynamic Form

A responsive lead-capture form and small React + TypeScript design system built for the Vymo take-home assignment.

## Run locally

```bash
npm install
npm run dev
```

Run the validation test with `npm test`. Create a production build with `npm run build`, then preview it with `npm run preview`.

## Project map

```text
src/
  design-system/
    components/       Generic inputs, button, and field wrapper
    tokens.css        Color, type, spacing, and surface tokens
  features/lead-capture/
    leadFields.ts     Lead form field configuration and select options
    validation.ts     Pure, configuration-driven validation
    leadTypeTransition.ts  Lead type state transition
    LeadCaptureForm.tsx    Config-rendered form and submission summary
  App.tsx             Page composition
```

### Design system

`src/design-system/tokens.css` holds the reusable visual tokens. The atoms in `src/design-system/components/` own generic input behavior and styling. `Field.tsx` composes a label, control, hint, and error without embedding lead-specific rules in the controls.

### Configuration and validation

`src/features/lead-capture/leadFields.ts` defines the form fields and lead-type options. `App.tsx` passes this config to `LeadCaptureForm`, which creates initial values and renders controls from it. Adding a supported field requires a config entry. `validation.ts` accepts that configuration and the current values, applies required, email, 10-digit phone, and 200-character notes rules, and skips fields that are not visible. The same visibility rule is used by the form and its submission summary.

The company name remains in local form state when the lead type changes to Individual, so switching back restores the draft. Hidden values are omitted from the submission summary.

### Responsive layout

`src/App.module.css` and `src/features/lead-capture/LeadCaptureForm.module.css` define the page and form layouts. Desktop uses a two-column form above 1024px; tablet and mobile use one column below that breakpoint. Below 768px, the submit action stays in a fixed bottom bar and the form adds safe bottom spacing so fields remain reachable.

## Scope

This is a front-end demonstration. A successful submit displays the visible field values locally; there is no backend or authentication flow.
