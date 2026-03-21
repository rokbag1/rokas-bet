import Button from "@components/ui/Button";
import LangLink from "@components/ui/LangLing";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("common");
  const images = [
    { src: "/images/dogs.gif", label: t("Dog Betting") },
    { src: "/images/nba.gif", label: t("NBA Fun") },
    { src: "/images/curling.gif", label: t("Curling action") },
  ];
  return (
    <div className="flex flex-col gap-6 p-6 justify-center items-center">
      <h1 className="text-2xl font-bold">{t("welcomeMessage")}</h1>
      <p>{t("homeInfo")}</p>
      <div className="flex gap-6 flex-wrap items-center justify-center">
        {images.map((img) => (
          <div key={img.src} className="flex flex-col gap-2 w-64">
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-48 object-cover rounded shadow"
            />
            <div>
              <LangLink to="/dashboard">
                <Button variant="alternate" className="text-white">
                  {img.label}
                </Button>
              </LangLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
