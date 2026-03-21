import { useEffect, useState } from "react";
import { formatCurrency } from "@lib/utils/helpers";
import { BACKEND_URL } from "@lib/constants/constants";
import { PAGE_SIZE } from "@lib/hooks/useBets";
import { useAuth } from "@lib/context/AuthContext";
import type { Bet } from "@lib/constants/interfaces";
import Button from "@components/ui/Button";
import { useTranslation } from "react-i18next";

export default function TransactionsPage() {
  const { t } = useTranslation("common");
  const { accessToken } = useAuth();
  const [transactions, setTransactions] = useState<Bet[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (pageNumber: number) => {
    try {
      setLoading(true);

      const url = new URL("/my-transactions", BACKEND_URL);

      const params = new URLSearchParams({
        page: pageNumber.toString(),
        limit: PAGE_SIZE.toString(),
      });

      url.search = params.toString();

      const res = await fetch(url.toString(), {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">{t("Transactions")}</h1>

      {loading ? (
        <div>{t("Loading...")}</div>
      ) : transactions.length ? (
        <>
          <ul className="flex flex-col gap-3">
            <div className="hidden md:grid md:grid-cols-4 gap-4 py-2 border-b font-semibold text-sm text-gray-600 dark:text-gray-300">
              <span>{t("ID")}</span>
              <span>{t("Date")}</span>
              <span>{t("Status")}</span>
              <span>{t("Amount")}</span>
            </div>

            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="border rounded-md p-3 flex flex-col gap-2 md:grid md:grid-cols-4 md:gap-4 md:items-center"
              >
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("ID")}:</span>
                  <span className="truncate max-w-40">{tx.id}</span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Date")}:</span>
                  <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Status")}:</span>
                  <span>{formatCurrency(tx.status)}</span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Amount")}:</span>
                  <span>{tx.amount}</span>
                </div>

                {/* Desktop view */}
                <span className="hidden md:block truncate">{tx.id}</span>
                <span className="hidden md:block">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </span>
                <span className="hidden md:block">{formatCurrency(tx.status)}</span>
                <span className="hidden md:block">{tx.amount}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 justify-center items-center mt-4">
            <Button
              variant="alternate"
              className="text-white"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              {t("Prev")}
            </Button>

            <span className="px-3 py-1">
              {page} / {totalPages}
            </span>

            <Button
              variant="alternate"
              className="text-white"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              {t("Next")}
            </Button>
          </div>
        </>
      ) : (
        <div>{t("No transactions have been found")}</div>
      )}
    </div>
  );
}
