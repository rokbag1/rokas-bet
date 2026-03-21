import { formatCurrency } from "@lib/utils/helpers";
import Button from "@components/ui/Button";
import { PAGE_SIZE, useBets } from "@lib/hooks/useBets";
import { useTranslation } from "react-i18next";

export default function BetsPage() {
  const { t } = useTranslation("common");
  const { state, setPage, setStatus, confirmCancelBet, loading } = useBets();
  const { bets, page, total } = state;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">{t("My Bets")}</h1>

      {/* Filter */}
      <div className="flex gap-2 mb-2">
        {["all", "win", "lost"].map((s) => (
          <Button
            size="sm"
            key={s}
            className={`px-3 py-1 rounded ${
              state.status === s
                ? "bg-purple-500 text-white"
                : "bg-black text-white"
            }`}
            onClick={() => setStatus(s as any)}
          >
            {s.toUpperCase()}
          </Button>
        ))}
      </div>
      {loading ? (
        <div>{t("Loading...")}</div>
      ) : bets.length ? (
        <>
          <ul className="flex flex-col gap-3">
            {bets.map((b) => (
              <li
                key={b.id}
                className="border rounded-md p-3 flex flex-col gap-2 md:grid md:grid-cols-6 md:gap-4 md:items-center"
              >
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("ID")}:</span>
                  <span className="truncate max-w-40 flex-1 ">{b.id}</span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Amount")}:</span>
                  <span>{formatCurrency(b.amount)}</span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Win Amount")}:</span>
                  <span>{formatCurrency(b.winAmount ?? 0)}</span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Status")}:</span>
                  <span
                    className={
                      b.status === "win"
                        ? "text-green-500"
                        : b.status === "lost"
                          ? "text-red-500"
                          : "text-gray-500"
                    }
                  >
                    {t(b.status)}
                  </span>
                </div>
                <div className="flex justify-between md:hidden">
                  <span className="font-semibold">{t("Date")}:</span>
                  <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                </div>
                <span className="hidden md:block truncate">{b.id}</span>
                <span className="hidden md:block">{formatCurrency(b.amount)}</span>
                <span className="hidden md:block">
                  {formatCurrency(b.winAmount ?? 0)}
                </span>
                <span
                  className={`hidden md:block ${
                    b.status === "win"
                      ? "text-green-500"
                      : b.status === "lost"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}
                >
                  {t(b.status)}
                </span>
                <span className="hidden md:block">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
                <div className="flex justify-end md:justify-center mt-2 md:mt-0">
                  <Button
                    size="sm"
                    variant="alternate"
                    className="text-white"
                    disabled={b.status !== "win"}
                    onClick={() => confirmCancelBet(b.id)}
                  >
                    {t("Cancel")}
                  </Button>
                </div>
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
        t("No bets have been found")
      )}
    </div>
  );
}
