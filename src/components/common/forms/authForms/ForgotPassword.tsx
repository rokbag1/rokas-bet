import Button from "@components/ui/Button";
import type { FC } from "react";

const ForgotPassword: FC = () => (
  <div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold">Forgot Password</h2>
    <input
      type="email"
      placeholder="Enter your email"
      className="border p-2 rounded"
    />
    <Button variant="primary">Reset Password</Button>
  </div>
);

export default ForgotPassword;
