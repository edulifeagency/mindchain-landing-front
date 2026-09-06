import React from "react";
import { PresaleCalculator } from "../components/PresaleCalculator";
import { AppliedCoupon } from "../types";
import { ShieldCheck, CheckCircle2, Sparkles, Award } from "lucide-react";
import { useLayoutStore } from "../store/useLayoutStore";

interface PresalePageProps {
  isLoggedIn: boolean;
  onOpenBuyFlow: (
    amount: number,
    address: string,
    coupon?: AppliedCoupon | null,
    invoiceId?: string | null,
  ) => void;
  onOpenAuth?: () => void;
}

export const PresalePage: React.FC<PresalePageProps> = ({
  isLoggedIn,
  onOpenBuyFlow,
  onOpenAuth,
}) => {
  const MIND_PRICE_USD =
    useLayoutStore((state) => state.siteConfig?.mind.mind_price) || 0;
  const purchaseSlots = useLayoutStore(
    (state) => state.siteConfig?.purchase.purchase_slots,
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            OFFICIAL MINDCHAIN ECOSYSTEM PRESALE ROUND
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Presale Terminal &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Bonus Allocation
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Acquire native MindChain Layer-1 coins at the early-access fixed
            rate of{" "}
            <strong className="text-emerald-400 font-mono">
              ${MIND_PRICE_USD} USDT
            </strong>
            . Receive tier bonuses up to +
            {purchaseSlots?.[purchaseSlots.length - 1]?.bonus_percentage ?? 0}%
            and automated instant credit to your EVM account.
          </p>
        </div>

        {/* Top Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1e293b]/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Current Price
            </span>
            <p className="text-2xl font-black text-emerald-400 font-mono mt-1">
              ${MIND_PRICE_USD} USDT
            </p>
            <span className="text-[10px] text-slate-500 font-mono">
              Guaranteed Floor
            </span>
          </div>

          <div className="bg-[#1e293b]/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Total Raised
            </span>
            <p className="text-2xl font-black text-cyan-400 font-mono mt-1">
              $4,850,000
            </p>
            <span className="text-[10px] text-slate-500 font-mono">
              Round 2 Target: $6.5M
            </span>
          </div>

          <div className="bg-[#1e293b]/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Max Bonus Tier
            </span>
            <p className="text-2xl font-black text-amber-400 font-mono mt-1">
              +
              {purchaseSlots?.[purchaseSlots.length - 1]?.bonus_percentage ?? 0}
              % MIND
            </p>
            <span className="text-[10px] text-slate-500 font-mono">
              On $1,000+ Deposits
            </span>
          </div>

          <div className="bg-[#1e293b]/60 border border-slate-800 rounded-2xl p-4 text-center">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Payment Gateway
            </span>
            <p className="text-2xl font-black text-white font-mono mt-1">
              USDT (BEP-20)
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">
              Automated QR Verification
            </span>
          </div>
        </div>

        {/* Main Interactive Terminal Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Calculator Widget */}
          <div className="lg:col-span-7">
            <PresaleCalculator
              isLoggedIn={isLoggedIn}
              onProceedToPay={(amount, address, coupon, invoiceId) =>
                onOpenBuyFlow(amount, address, coupon, invoiceId)
              }
              onOpenAuth={onOpenAuth}
            />
          </div>

          {/* Right: Presale Benefits & Step Guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tier Bonus Card */}
            <div className="bg-[#1e293b]/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  Volume Bonus Tiers
                </h3>
              </div>

              <div className="space-y-3">
                {purchaseSlots?.map((tier) => {
                  const isLastTier =
                    tier.slot === purchaseSlots[purchaseSlots.length - 1]?.slot;

                  const tierName =
                    tier.slot === 1
                      ? "Standard Pioneer Tier"
                      : tier.slot === 2
                        ? "Validator Tier"
                        : "Whale & Institutional Tier";

                  const tierColors = [
                    {
                      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
                      container: "border-slate-800",
                      description: "text-slate-400",
                    },
                    {
                      badge: "bg-teal-500/10 text-teal-400 border-teal-500/30",
                      container: "border-slate-800",
                      description: "text-slate-400",
                    },
                    {
                      badge:
                        "bg-amber-500/20 text-amber-300 border-amber-500/40",
                      container:
                        "border-amber-500/30 shadow-lg shadow-amber-500/5",
                      description: "text-amber-300/80",
                    },
                  ];

                  const colors = tierColors[tier.slot - 1] ?? tierColors[0];

                  const depositLabel =
                    tier.max_usd >= 100000
                      ? `$${tier.min_usd.toLocaleString()}+ Deposit`
                      : `$${tier.min_usd.toLocaleString()} – $${tier.max_usd.toLocaleString()} Deposit`;

                  return (
                    <div
                      key={tier.slot}
                      className={`flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border ${colors.container}`}
                    >
                      <div>
                        <p className="text-xs font-bold text-white">
                          {depositLabel}
                        </p>

                        <p className={`text-[10px] ${colors.description}`}>
                          {tierName}
                        </p>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${colors.badge}`}
                      >
                        +{tier.bonus_percentage}% Free MIND
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How to Participate Steps */}
            <div className="bg-[#1e293b]/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                  Simple 3-Step Process
                </h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0 text-[11px]">
                    1
                  </span>
                  <div>
                    <p className="font-bold text-white">
                      Select USDT Deposit Amount
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Input desired amount or choose a quick preset to instantly
                      calculate coin return and bonus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0 text-[11px]">
                    2
                  </span>
                  <div>
                    <p className="font-bold text-white">
                      Transfer USDT (BEP-20)
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Scan the dynamic QR code or copy the official MindChain
                      treasury deposit address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0 text-[11px]">
                    3
                  </span>
                  <div>
                    <p className="font-bold text-white">
                      Instant Balance Credited
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      The automated system verifies your on-chain transaction
                      and assigns MIND coins directly to your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Audit Badge */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">
                  Smart Contract Verified & Audited
                </p>
                <p className="text-slate-400 text-[11px]">
                  Presale contracts audited by CertiK and Hacken with zero
                  critical vulnerabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
