import React, { useState, useEffect } from "react";
import { calculateMindAmount, formatNumber, formatUSD } from "../utils/crypto";
import { AppliedCoupon } from "../types";
import {
  ArrowDown,
  Zap,
  Sparkles,
  CheckCircle2,
  Tag,
  Check,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useLayoutStore } from "../store/useLayoutStore";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { AxiosError } from "axios";
import { Invoice } from "../types/invoice";

interface PresaleCalculatorProps {
  onProceedToPay: (
    usdAmount: number,
    address: string,
    coupon?: AppliedCoupon | null,
    invoiceId?: string | null,
  ) => void;
  className?: string;
  isLoggedIn?: boolean;
  onOpenAuth?: () => void;
}

export const PresaleCalculator: React.FC<PresaleCalculatorProps> = ({
  onProceedToPay,
  className = "",
  isLoggedIn = false,
  onOpenAuth,
}) => {
  const MIND_PRICE_USD = useLayoutStore(
    (state) => state.siteConfig?.mind.mind_price,
  );
  const [usdInput, setUsdInput] = useState<string>("100");
  const [couponCodeInput, setCouponCodeInput] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccessMsg, setCouponSuccessMsg] = useState<string | null>(null);
  const [isCouponOpen, setIsCouponOpen] = useState<boolean>(false);
  const purchaseSlots = useLayoutStore(
    (state) => state.siteConfig?.purchase.purchase_slots,
  );

  const numericUsd = parseFloat(usdInput) || 0;
  const { baseMind } = calculateMindAmount(numericUsd);

  const currentSlot = purchaseSlots?.find(
    (s) => numericUsd >= s.min_usd && numericUsd <= s.max_usd,
  );
  const bonusPercent = currentSlot?.bonus_percentage ?? 0;
  const bonusMind = (baseMind * bonusPercent) / 100;
  const totalMind = baseMind + bonusMind;

  // MIND calculation always based on original USD, discount only reduces payable amount
  const discountAmount = appliedCoupon
    ? Number(((numericUsd * appliedCoupon.discountPercent) / 100).toFixed(2))
    : 0;
  const payableUsd = Math.max(
    0,
    Number((numericUsd - discountAmount).toFixed(2)),
  );

  const presetAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleInputChange = (val: string) => {
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setUsdInput(val);
      setCouponError(null);
    }
  };

  const handlePresetClick = (amount: number) => {
    setUsdInput(amount.toString());
    setCouponError(null);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput("");
    setCouponError(null);
    setCouponSuccessMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onOpenAuth?.();
      return;
    }
    purchaseMutation.mutate();
  };

  // Mutations
  const couponMutation = useMutation<
    { coupon_code: string; discount_percentage: number },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (codeToApply: string) =>
      api
        .post("/coupon/validate", { coupon_code: codeToApply })
        .then((data) => data.data.data),
    onSuccess: (data) => {
      const newCoupon: AppliedCoupon = {
        code: data.coupon_code,
        discountPercent: data.discount_percentage,
        description: `${data.discount_percentage}% discount on purchase amount`,
      };
      setAppliedCoupon(newCoupon);
      setCouponCodeInput(data.coupon_code);
      setCouponError(null);
      setCouponSuccessMsg(
        `${data.coupon_code} applied! You get ${data.discount_percentage}% discount.`,
      );
      setIsCouponOpen(false);
    },
    onError: (error) => {
      setCouponError(error.response?.data.message || "Invalid coupon code");
      setCouponSuccessMsg(null);
    },
  });

  const purchaseMutation = useMutation<
    Invoice,
    AxiosError<{ message: string }>
  >({
    mutationFn: () =>
      api
        .post("/purchase", {
          usdt_amount: numericUsd,
          ...(appliedCoupon && { coupon_code: appliedCoupon.code }),
        })
        .then((res) => res.data.data),
    onSuccess: (data) => {
      onProceedToPay(
        numericUsd,
        data.payment_address,
        appliedCoupon,
        data.invoice_id,
      );
    },
    onError: () => {},
  });

  return (
    <div
      className={`bg-[#131d31] border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative ${className}`}
    >
      {/* Sleek top highlight bar */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-400"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Official Bonus Rate
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1">
            Buy MIND Coin
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase font-mono text-slate-400">Rate</p>
          <p className="text-sm font-black text-cyan-400 font-mono">
            1 MIND = ${MIND_PRICE_USD} USD
          </p>
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Input: You Pay */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-0.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Buy Amount (USD)
            </label>
            <span className="text-[11px] font-mono text-slate-400">
              Min: $10
            </span>
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 font-mono text-lg font-bold">
              $
            </span>
            <input
              type="text"
              value={usdInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="100"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-3 pl-8 pr-28 text-white font-mono text-lg font-bold placeholder-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-colors"
            />
            <div className="absolute right-2.5 flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                USDT
              </span>
            </div>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetClick(amt)}
                className={`py-2 sm:py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                  numericUsd === amt
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                    : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                ${amt >= 1000 ? `${amt / 1000}k` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Divider / Arrow */}
        <div className="flex justify-center -my-1">
          <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-md">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Output: You Receive */}
        <div>
          <div className="flex flex-wrap justify-between items-center mb-1.5 px-0.5 gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              You Receive
            </label>
            {bonusPercent > 0 ? (
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 shrink-0" /> +{bonusPercent}% Bonus
                Included
              </span>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                Bonus:{" "}
                {purchaseSlots
                  ?.filter((s) => s.bonus_percentage > 0)
                  .map(
                    (s) =>
                      `$${formatNumber(s.min_usd)} (+${s.bonus_percentage}%)`,
                  )
                  .join(", ")}
              </span>
            )}
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              readOnly
              value={formatNumber(totalMind)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-3 px-4 text-cyan-300 font-mono text-lg sm:text-xl font-extrabold outline-none cursor-default"
            />
            <div className="absolute right-2.5 flex items-center gap-1 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg">
              <span className="text-xs font-black text-cyan-300 font-mono">
                MIND
              </span>
            </div>
          </div>

          {/* Simple calculation receipt */}
          <div className="mt-2 px-3 py-2 bg-slate-950/50 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-slate-400">
            <span>Base: {formatNumber(baseMind)} MIND</span>
            {bonusPercent > 0 ? (
              <span className="text-emerald-400 font-bold">
                Bonus: +{formatNumber(bonusMind)} MIND
              </span>
            ) : (
              <span className="text-slate-400">Standard Tier</span>
            )}
          </div>
        </div>

        {/* COUPON SECTION */}
        <div className="pt-1">
          {!appliedCoupon ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsCouponOpen(!isCouponOpen)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isCouponOpen
                      ? "Hide Coupon Code"
                      : "Have a Promo / Coupon Code?"}
                  </span>
                </button>
              </div>

              {isCouponOpen && (
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => {
                          setCouponCodeInput(e.target.value.toUpperCase());
                          setCouponError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            couponMutation.mutate(couponCodeInput);
                          }
                        }}
                        placeholder="Enter coupon code"
                        className="w-full bg-slate-900 border border-slate-700/90 rounded-lg py-2 pl-9 pr-3 text-xs font-mono uppercase text-white placeholder-slate-500 focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => couponMutation.mutate(couponCodeInput)}
                      disabled={
                        couponMutation.isPending || !couponCodeInput.trim()
                      }
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 text-xs font-mono font-black rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
                    >
                      {couponMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>

                  {couponError && (
                    <div className="flex items-center gap-1.5 text-[11px] text-rose-400 font-mono">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Applied Coupon Box */
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-black text-white">
                        {appliedCoupon.code}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        {appliedCoupon.discountPercent}% OFF
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-300/80 font-mono">
                      {appliedCoupon.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded transition-colors"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Discount Summary Row */}
              <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">
                  Original:{" "}
                  <span className="line-through text-slate-400">
                    {formatUSD(numericUsd)}
                  </span>
                </span>
                <span className="text-emerald-400 font-bold">
                  Save: -{formatUSD(discountAmount)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Final Payable Box if coupon is applied */}
        {appliedCoupon && (
          <div className="px-3.5 py-2.5 bg-gradient-to-r from-emerald-950/40 to-slate-950 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold">
              Final Payable Amount:
            </span>
            <span className="text-emerald-400 text-sm font-black">
              {formatUSD(payableUsd)} USDT
            </span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={numericUsd < 0.01 || purchaseMutation.isPending}
          className="w-full py-4 bg-linear-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {purchaseMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-slate-950" />
              {isLoggedIn
                ? `Buy MIND (${formatUSD(payableUsd)})`
                : `Sign In & Buy MIND (${formatUSD(payableUsd)})`}
            </>
          )}
        </button>

        {/* Clean trust note */}
        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            Instant EVM credit • Transfer & sell anytime on mindchain.info
          </span>
        </div>
      </form>
    </div>
  );
};
