export interface Trans {
  id: number;
  order_id: string;
  type: "purchase" | "referral_bonus" | "withdrawal" | "admin_adjustment";
  amount_mind: number | null;
  amount_usdt: number | null;
  rate_applied: number | null;
  description: string;
  status: "pending" | "completed";
  created_at: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
