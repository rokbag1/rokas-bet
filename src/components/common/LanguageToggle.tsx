import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function LanguageToggle() {
  const { i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;

    i18n.changeLanguage(newLang);

    const segments = location.pathname.split("/").filter(Boolean);

    if (segments[0] === "en" || segments[0] === "lt") {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }

    navigate("/" + segments.join("/"), { replace: true });
  };

  return (
    <select value={i18n.language} onChange={handleChange}>
      <option value="en">English</option>
      <option value="lt">Lithuanian</option>
    </select>
  );
}