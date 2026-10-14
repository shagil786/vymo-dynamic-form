import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { leadFields } from "./leadFields";
import type { LeadFieldConfig } from "./types";

test("renders an added field from the supplied config", () => {
  const fields: readonly LeadFieldConfig[] = [
    ...leadFields,
    {
      name: "referralCode",
      type: "text",
      label: "Referral code",
      validation: {},
      layout: "half",
    },
  ];

  const markup = renderToStaticMarkup(<LeadCaptureForm config={fields} />);

  expect(markup).toMatch(/<input[^>]*name="referralCode"[^>]*value=""/);
});
