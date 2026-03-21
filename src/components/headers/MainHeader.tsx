import { EModalView } from "@lib/constants/ui";
import { useUI } from "@lib/context/UiContext";
import { useAuth } from "@lib/context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ThemeToggle from "../common/ThemeToggle";
import Button from "../ui/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { formatCurrency } from "@lib/utils/helpers";
import LangLink from "@components/ui/LangLing";
import LanguageToggle from "@components/common/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation("common");
  const { setModalView, openModal } = useUI();
  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);

  const openLoginModal = () => {
    setModalView(EModalView.Login);
    openModal();
  };

  const openSignupModal = () => {
    setModalView(EModalView.Signup);
    openModal();
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow relative z-50">
      <LangLink
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-secondary dark:text-white"
      >
        MyLogo
      </LangLink>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="md:flex hidden gap-4">
          <LanguageToggle />
          {user ? (
            <>
              <LangLink to="/dashboard">
                <Button
                  variant="secondary"
                  size="sm"
                  iconBefore={<DashboardIcon />}
                />
              </LangLink>
              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                {user.balance > 0 && (
                  <span className="text-sm">
                    {`Balance: ${formatCurrency(user.balance, user.currency)}`}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end">
                <Button
                  onClick={logout}
                  size="sm"
                  variant="secondary"
                  iconAfter={<LogoutIcon />}
                  className="mt-1"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="md"
                iconBefore={<LoginIcon />}
                onClick={openLoginModal}
              >
                Login
              </Button>
              <Button variant="primary" size="md" onClick={openSignupModal}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {mobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenu(false)}
          />
          <nav className="fixed top-0 left-0 h-full w-2/3 bg-gray-800 dark:bg-gray-900 text-white z-50 flex flex-col gap-4 p-6">
            <div>
              <LanguageToggle />
            </div>
            {user ? (
              <>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{user.name}</span>
                  {user.balance > 0 && (
                    <span className="text-sm">
                      {formatCurrency(user.balance, user.currency)}
                    </span>
                  )}
                </div>
                <LangLink to="/dashboard">
                  <Button variant="secondary" className="w-full">
                    {t("Dashboard")}
                  </Button>
                </LangLink>
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenu(false);
                  }}
                  variant="secondary"
                  iconAfter={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    openLoginModal();
                    setMobileMenu(false);
                  }}
                  variant="primary"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    openSignupModal();
                    setMobileMenu(false);
                  }}
                  variant="primary"
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </>
      )}
    </header>
  );
}
