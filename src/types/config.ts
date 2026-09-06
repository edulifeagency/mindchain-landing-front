export interface SiteConfig {
  general: {
    site_name: string;
    logo: string;
    favicon: string;
  };
  mind: {
    mind_price: number;
  };
  purchase: {
    purchase_slots: PurchaseSlot[];
  };
  referral_commission: number;
}

export interface PurchaseSlot {
  slot: number;
  min_usd: number;
  max_usd: number;
  bonus_percentage: number;
}
