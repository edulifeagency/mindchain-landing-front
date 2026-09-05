export interface Invoice {
  purchase_id: number;
  invoice_id: string;
  payment_address: string;
  coupon_code: string | null;
  usdt_amount: string;
  payable_usdt: string;
  mind_price: string;
  mind_amount: string;
  bonus_percentage: string;
  bonus_mind: string;
  total_mind: string;
  slot: number;
  status: "pending" | string;
}
