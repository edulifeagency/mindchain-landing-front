export interface User {
  id: number;
  wallet_address: string;
  email: string | null;
  name: string | null;
  address: string | null;
  phone?: string | null;
  referral_code: string;
  referred_id: number | null;
  mind_balance: string;
  role: "user" | string;
  created_at: string;
  updated_at: string;
}
