import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { BACKEND_URL } from "@lib/constants/constants";
import { useAuth } from "@lib/context/AuthContext";
import { formatCurrency } from "@lib/utils/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PlaceBetProps {
  title?: string;
  image?: string;
  onSubmit?: (amount: number) => void;
}

interface PlaceBetResponse {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount: number;
  message: string;
}

export default function PlaceBet({ title, image }: PlaceBetProps) {
  const { t } = useTranslation("common");
  const { accessToken, updateBalance, user } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [newImage, setNewImage] = useState<string>(image ?? "");
  const [newTitle, setNewTitle] = useState<string>(title ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleQuickAdd = (value: number) => {
    setAmount((prev) => prev + value);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setAmount(0);     
    } else {
      const num = Number(val);
      if (num >= 0) setAmount(num);
    }
  };

  const handleSubmit = async (amount: number) => {
    try {
      //Teoriskai galima butu ir nedaryti request jei ammount > balance, bet backend yra source of true
      const res = await fetch(`${BACKEND_URL}/bet`, {
        method: "POST",
        body: JSON.stringify({ amount: amount }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const data: PlaceBetResponse = await res.json();

      setError('');

      if (!res.ok) {
        let errorMessage = "Bet failed";
        try {
          if (data?.message) errorMessage = data.message;
        } catch (e) {}

        setError(errorMessage);

        return;
      }

      setNewTitle(
        data.winAmount
          ? t("Bravo boss, you did it!")
          : t("Dėja, bandyk dar kartą"),
      );
      setNewImage(data.winAmount ? "/images/bravo.gif" : (image ?? ""));
      updateBalance(data.balance);
    } catch (error) {}
    setAmount(0);
  };

  return (
    <div className="flex flex-col w-full items-center gap-4 bg-white p-6 rounded">
      <h2 className="text-xl font-bold text-black">{newTitle}</h2>
      <img
        src={newImage}
        alt={title}
        className="w-full h-48 object-cover rounded"
      />
      <div className="text-black">{`Balance: ${formatCurrency(user?.balance ?? 0)}`}</div>
      <div className="flex gap-2">
        {[10, 20, 30, 50].map((val) => (
          <Button
            key={val}
            variant="alternate"
            size="sm"
            className="text-white"
            onClick={() => handleQuickAdd(val)}
          >
            +{val}
          </Button>
        ))}
      </div>
      <Input
        type="number"
        value={amount}
        min={0}
        onChange={handleChange}
        placeholder="Enter amount"
      />
      <div className="text-black">{`Betting ammount: ${formatCurrency(amount)}`}</div>

      {error && (
        <span className="text-red-500 text-sm text-center mt-1">{error}</span>
      )}

      <Button
        disabled={!amount}
        variant="alternate"
        className="text-white"
        onClick={() => handleSubmit(amount)}
      >
        Place Bet
      </Button>
    </div>
  );
}
