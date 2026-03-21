import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { useSignup } from "@lib/hooks/auth/useSignup";
import type { FC } from "react";

const SignupForm: FC = () => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    signupError,
  } = useSignup();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-black">Sign Up</h2>

      <Input
        name="name"
        type="text"
        placeholder="Name"
        value={values.name}
        className="text-black placeholder-gray-500"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : undefined}
      />

      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={values.email}
        className="text-black placeholder-gray-500"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={values.password}
        className="text-black placeholder-gray-500"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : undefined}
      />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        className="text-black placeholder-gray-500"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
      />

      {signupError && <div className="text-red-500">{signupError}</div>}

      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
