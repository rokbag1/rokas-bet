import {
  EValidation,
  PASSWORD_VALIDATION_REGEX,
} from "@lib/constants/validations";
import { type AnySchema, ref, string, object } from "yup";

export const getValidationSchema = <T extends object>(
  initialValues: T,
  t: any,
  returnYupObject = true,
) => {
  const schema: Record<string, AnySchema> = {};
  const validators: Record<string, AnySchema> = {
    name: string()
      .required(t(EValidation.FirstNameRequired))
      .min(2, t(EValidation.FirstNameMinLength)),
    email: string()
      .email(t(EValidation.EmailInvalid))
      .required(t(EValidation.EmailRequired)),
    password: string()
      .required(t(EValidation.PasswordRequired))
      .matches(PASSWORD_VALIDATION_REGEX, t(EValidation.PasswordInvalid)),
    confirmPassword: string()
      .required(t(EValidation.RepeatNewPassword))
      .oneOf([ref("password"), ""], t(EValidation.RepeatNewPassword)),
  };

  Object.entries(initialValues).forEach(([key]) => {
    schema[key] = validators[key] ?? string();
  });

  return returnYupObject ? object(schema) : schema;
};
