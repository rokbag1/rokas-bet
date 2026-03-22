import { useState } from "react";
import { useFormik } from "formik";
import { getValidationSchema } from "@lib/utils/getValidationSchema";
import { useAuth } from "@lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUI } from "@lib/context/UiContext";
import { linkWithLang } from "@lib/utils/helpers";
import { useTranslation } from "react-i18next";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { closeModal } = useUI();
  const { login } = useAuth();
  const { t } = useTranslation("common");
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const validationSchema = getValidationSchema(initialValues, t);

  const onSubmit = async (values: LoginForm) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });

      closeModal();
      navigate(linkWithLang("/dashboard"));
    } catch (error: any) {
      setLoginError(error?.message || "Login failed");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return {
    ...formik,
    loginError,
  };
};
