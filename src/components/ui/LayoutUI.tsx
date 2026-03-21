import ApproveForm from "@components/common/forms/authForms/ApproveForm";
import ForgotPassword from "@components/common/forms/authForms/ForgotPassword";
import LoginForm from "@components/common/forms/authForms/LoginForm";
import SignupForm from "@components/common/forms/authForms/SignUpForm";
import PlaceBet from "@components/common/forms/bet";
import Modal from "@components/common/Modal";
import type { ModalPropsMap } from "@lib/constants/forms";
import { EModalView } from "@lib/constants/ui";
import { useUI } from "@lib/context/UiContext";
import type { FC, JSX } from "react";

export type TModalProps = any;

const ModalView: FC<ModalPropsMap> = ({ modalView, childProps }) => {
  let child: JSX.Element | null = null;

  switch (modalView) {
    case EModalView.Login:
      child = <LoginForm />;
      break;
    case EModalView.Signup:
      child = <SignupForm />;
      break;
    case EModalView.ForgetPassword:
      child = <ForgotPassword />;
      break;
    case EModalView.Approve:
      child = <ApproveForm {...childProps} />;
      break;
    case EModalView.PlaceItem:
      child = <PlaceBet {...childProps} />;
      break;
    default:
      child = null;
  }

  return <Modal {...childProps}>{child}</Modal>;
};

const ModalUI: FC = () => {
  const { displayModal, modalView, modalProps } = useUI();

  return displayModal ? (
    <ModalView modalView={modalView} childProps={modalProps} />
  ) : null;
};

//Ateityje cia desime daugiau UI components
const LayoutUI: FC = () => {
  return <ModalUI />;
};

export default LayoutUI;
