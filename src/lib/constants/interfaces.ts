export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
}

export interface Bet {
  id: string;
  amount: number;
  status: "win" | "lost" | string;
  createdAt: string;
  winAmount: number | null;
}

export interface BetsResponse {
  data: Bet[];
  total: number;
  page: number;
  limit: number;
}
