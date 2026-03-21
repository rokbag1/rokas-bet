import Switch from "@mui/material/Switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeToggle } from "@lib/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeToggle();

  const isDark = theme === "dark";

  const handleChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <LightModeIcon />

      <Switch checked={isDark} onChange={handleChange} />

      <DarkModeIcon />
    </div>
  );
}
