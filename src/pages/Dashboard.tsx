import { useUI } from "@lib/context/UiContext";
import { EModalView } from "@lib/constants/ui";
import Button from "@components/ui/Button";
import { useTranslation } from "react-i18next";

export default function MainDashboardPage() {
  const { t } = useTranslation("common");
  const { setModalView, openModal } = useUI();

  const openPlaceModal = (title: string, image: string) => {
    setModalView(EModalView.PlaceItem, {
      title: title,
      image: image,
    });
    openModal();
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <img
            src="/images/dogs.gif"
            alt="Dogs"
            className="w-full h-64 object-cover rounded shadow"
          />
          <Button
            variant="secondary"
            onClick={() =>
              openPlaceModal(t("7 tikrai atbėgs pirmas!"), "/images/dogs.gif")
            }
          >
            {t("Gal ant šuniukų?")}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <img
            src="/images/nba.gif"
            alt="NBA"
            className="w-full h-64 object-cover rounded shadow"
          />
          <Button
            variant="secondary"
            onClick={() =>
              openPlaceModal(
                t("Kombinuotui statytmui, geras variantas"),
                "/images/nba.gif",
              )
            }
          >
            {t("O gal šiek tiek NBA?")}
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <img
            src="/images/curling.gif"
            alt="curling"
            className="w-full h-64 object-cover rounded shadow"
          />
          <Button
            variant="secondary"
            onClick={() =>
              openPlaceModal(
                t("Nebuk durnas, tik ne ant Kurlingo"),
                "/images/curling.gif",
              )
            }
          >
            {t('O gal "some CURLING ACTION"?')}
          </Button>
        </div>
      </div>
    </div>
  );
}
