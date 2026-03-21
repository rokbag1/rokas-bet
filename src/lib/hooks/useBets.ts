import { BACKEND_URL } from "@lib/constants/constants";
import type { Bet, BetsResponse } from "@lib/constants/interfaces";
import { EModalView } from "@lib/constants/ui";
import { useAuth } from "@lib/context/AuthContext";
import { useUI } from "@lib/context/UiContext";
import { useEffect, useState } from "react";

export const PAGE_SIZE = 10;

export const useBets = () => {
  const { accessToken, updateBalance } = useAuth();
  const { setModalView, openModal, closeModal } = useUI();

  const [state, setState] = useState({
    bets: [] as Bet[],
    page: 1,
    total: 0,
    status: "all" as "all" | "win" | "lost" | "pending",
  });

  const [loading, setLoading] = useState(false);
  const fetchBets = async () => {
    setLoading(true);

    try {
      const url = new URL("/my-bets", BACKEND_URL);
      const params = new URLSearchParams({
        page: state.page.toString(),
        limit: PAGE_SIZE.toString(),
      });

      if (state.status !== "all") {
        params.append("status", state.status);
      }

      url.search = params.toString();

      const res = await fetch(url.toString(), {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch bets");

      const data: BetsResponse = await res.json();
      setState((prev) => ({
        ...prev,
        bets: data.data,
        total: data.total,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmCancelBet = async (id: string) => {
    setModalView(EModalView.Approve, {
      onConfirm: async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/my-bet/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          });

          closeModal();

          if (!res.ok) throw new Error("Failed to cancel bet");

          const data = await res.json();

          updateBalance(data.balance);

          await fetchBets();
        } catch (err) {
          //Cia siaip negerai, bet tebunie, is esmes visur turi grazinti ir atvaizduoti error message
          console.error(err);
        }
      },
      onCancel: () => {
        closeModal();
      },
    });

    openModal();
  };

  const setPage = (page: number) => setState((prev) => ({ ...prev, page }));
  const setStatus = (status: "all" | "win" | "lost") =>
    setState((prev) => ({ ...prev, status, page: 1 }));

  useEffect(() => {
    fetchBets();
  }, [state.page, state.status]);

  return {
    loading,
    state,
    fetchBets,
    setPage,
    setStatus,
    confirmCancelBet,
  };
};
