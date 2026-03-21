import type { EModalView } from "./ui";

export interface ForgotPasswordProps {
  onReset?: (email: string) => void;
}

export interface ApproveFormProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface PlaceBetProps {
  title: string;
  image: string;
  onSubmit?: (amount: number) => void;
}

export type ModalPropsMap =
  | { modalView: typeof EModalView.Login; childProps?: never }
  | { modalView: typeof EModalView.Signup; childProps?: never }
  | {
      modalView: typeof EModalView.ForgetPassword;
      childProps?: ForgotPasswordProps;
    }
  | { modalView: typeof EModalView.Approve; childProps?: ApproveFormProps }
  | { modalView: typeof EModalView.PlaceItem; childProps?: PlaceBetProps };
