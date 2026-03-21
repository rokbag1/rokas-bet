import { EModalView } from "@lib/constants/ui";
import { useAuth } from "@lib/context/AuthContext";
import { useUI } from "@lib/context/UiContext";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRoute {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRoute) {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const { openModal, setModalView } = useUI();
  const isAuth = !!accessToken && !!user?.id;

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
      setModalView(EModalView.Login);
      openModal();
    }
  }, [isAuth, navigate, setModalView, openModal]);

  if (!isAuth) return null;

  return children;
}
