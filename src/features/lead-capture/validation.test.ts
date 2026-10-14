import { expect, test } from "vitest";
import { leadFields } from "./leadFields";
import type { LeadFieldConfig, LeadValues } from "./types";
import { validateLead } from "./validation";

test("rejects a phone number padded with spaces", () => {
  const values: LeadValues = {
    fullName: "Test User",
    email: "user@example.com",
    leadType: "individual",
    companyName: "",
    phone: " 9876543210 ",
    notes: "",
    consent: true,
  };

  expect(validateLead(leadFields, values).phone).toBeDefined();
});

test("rejects consecutive dots in an email domain", () => {
  const values: LeadValues = {
    fullName: "Test User",
    email: "a@b..com",
    leadType: "individual",
    companyName: "",
    phone: "9876543210",
    notes: "",
    consent: true,
  };

  expect(validateLead(leadFields, values).email).toBeDefined();
});

test("requires company name only while the company field is visible", () => {
  const values: LeadValues = {
    fullName: "Test User",
    email: "user@example.com",
    leadType: "company",
    companyName: "",
    phone: "9876543210",
    notes: "",
    consent: true,
  };

  expect(validateLead(leadFields, values).companyName).toBeDefined();
  expect(
    validateLead(leadFields, { ...values, leadType: "individual" }).companyName,
  ).toBeUndefined();
});

test("validates a new field using only its config entry", () => {
  const fields: readonly LeadFieldConfig[] = [
    {
      name: "referralCode",
      type: "text",
      label: "Referral code",
      validation: { required: "Enter a referral code." },
      layout: "half",
    },
  ];

  expect(validateLead(fields, { referralCode: "" }).referralCode).toBe(
    "Enter a referral code.",
  );
});
