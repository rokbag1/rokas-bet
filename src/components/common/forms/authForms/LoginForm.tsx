import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { useLogin } from "@lib/hooks/auth/useLogin";
import type { FC } from "react";

const LoginForm: FC = () => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    loginError,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-black">Login</h2>

      <Input
        name="email"
        type="email"
        placeholder="Email"
        className="text-black placeholder-gray-500"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        className="text-black placeholder-gray-500"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : undefined}
      />

      {loginError && <div className="text-red-500">{loginError}</div>}

      <Button type="submit" variant="secondary" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
