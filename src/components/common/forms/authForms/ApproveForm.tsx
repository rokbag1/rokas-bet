import Button from "@components/ui/Button";
import type { ApproveFormProps } from "@lib/constants/forms";
import type { FC } from "react";
import { useTranslation } from "react-i18next";


const ApproveForm: FC<ApproveFormProps> = ({ onConfirm, onCancel }) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl text-black font-bold">
        {t("Are you sure? You will win next time we promise!")}
      </h2>
      <h4 className="text-black">
        {t("You will get your money back instantly")}
      </h4>
      <div className="flex gap-2 justify-center mt-5">
        <Button variant="destructive" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="alternate" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ApproveForm;
