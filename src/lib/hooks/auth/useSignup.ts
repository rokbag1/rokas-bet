import { useState } from "react";
import { useFormik } from "formik";
import { getValidationSchema } from "@lib/utils/getValidationSchema";
import { useAuth } from "@lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUI } from "@lib/context/UiContext";
import { EModalView } from "@lib/constants/ui";
import { useTranslation } from "react-i18next";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignup = () => {
  const [signupError, setSignupError] = useState<string | null>(null);
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { setModalView, closeModal } = useUI();
  const initialValues: SignupForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = getValidationSchema(initialValues);

  const onSubmit = async (values: SignupForm) => {
    setSignupError(null);

    try {
      await signup(values);

      //Gali buti ir taip kad as signupinu, bet login mirsta, reikia ir tai suhandlinti
      try {
        await login({
          email: values.email,
          password: values.password,
        });

        closeModal();

        navigate("/dashboard");
      } catch (error) {
        //Nepriloginom dabar nes kazkas crashino, pabandom dar per modala
        setModalView(EModalView.Login);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSignupError(t(err.message));
      } else {
        setSignupError(t("Signup failed"));
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return {
    ...formik,
    signupError,
  };
};
