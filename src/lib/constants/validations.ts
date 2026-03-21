// Feature, su test galima padaryti kad password butu sudetingas
// export const PASSWORD_VALIDATION_REGEX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
export const PASSWORD_VALIDATION_REGEX = new RegExp("^.{8,}$");
export const NAME_VALIDATION_REGEX = /^[\p{L}'][ \p{L}'-]*\p{L}$/u;
export const PHONE_VALIDATION_REGEX = /^\+?[\d\s()-]{1,20}$/;

export const LINK_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&\/=]*)/;

export const EValidation = {
  FirstNameRequired: "Name is required",
  FirstNameMinLength: "First name must be at least 2 characters long",
  EmailRequired: "Email is required",
  EmailInvalid: "Email is invalid",
  PasswordRequired: "Password is required",
  PasswordInvalid: "Password is invalid",
  RepeatNewPassword: "Passwords should match",
} as const;

export type EValidationType = (typeof EValidation)[keyof typeof EValidation];
