import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "@components/headers/MainHeader";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTranslation } from "react-i18next";
import i18n from "@lib/i18n";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation("common");
  const currentLang = i18n.language;

  const menuItems = [
    {
      path: "/dashboard",
      label: t("Dashboard"),
      icon: <DashboardIcon />,
      end: true,
    },
    {
      path: "/dashboard/bets",
      label: t("Bettings"),
      icon: <AttachMoneyIcon />,
    },
    {
      path: "/dashboard/transactions",
      label: t("Transactions"),
      icon: <ReceiptIcon />,
    },
  ];

  const renderMenu = () =>
    menuItems.map((item) => (
      <NavLink
        key={item.path}
        end={item.end}
        to={`/${currentLang}/${item.path}`}
        className={({ isActive }) =>
          `flex items-center gap-2 px-2 py-2 rounded transition-colors ${
            isActive ? "bg-purple-500 text-white" : "hover:bg-purple-600"
          }`
        }
      >
        <span className="text-lg">{item.icon}</span>
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    ));

  return (
    <div className="flex min-h-screen">
      <aside
        className={`bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full p-3">
          <button
            className="mb-4 self-end"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ArrowForwardIosIcon
              className={`text-white ${collapsed ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
            />
          </button>
          <nav className="flex-1 flex flex-col gap-2">{renderMenu()}</nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
