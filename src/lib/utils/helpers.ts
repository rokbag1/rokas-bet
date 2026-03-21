import i18next from "i18next";

//Lengva praplesti su kitomis currencys, nes kai kur grazina jas
export function formatCurrency(
  amount: number | string,
  currency: string = "EUR",
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) return `€0.00`;

  return num.toLocaleString("en-IE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const currentLanguage = () => i18next.language || "en";

export const setLanguage = (newLang: string) => {
  i18next.changeLanguage(newLang);
};

export const linkWithLang = (path: string) => {
  const lang = currentLanguage();
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${lang}/${cleanPath}`;
};