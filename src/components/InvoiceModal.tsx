import React, { useState, useEffect, useRef } from "react";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { PaymentInvoice, Transaction, AppliedCoupon } from "../types";
import {
  DEFAULT_DEPOSIT_ADDRESS,
  MIND_PRICE_USD,
  calculateMindAmount,
  formatNumber,
  formatUSD,
} from "../utils/crypto";
import { Copy, Check, Clock, ShieldCheck, Loader2, X, Tag } from "lucide-react";
import QRCode from "react-qr-code";
import { useUserStore } from "../store/useUserStore";

interface InvoiceModalProps {
  isOpen: boolean;
  usdAmount: number;
  address: string;
  coupon?: AppliedCoupon | null;
  onClose: () => void;
  onPaymentSuccess: (invoice: PaymentInvoice, tx: Transaction) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  usdAmount,
  address,
  coupon = null,
  onClose,
  onPaymentSuccess,
}) => {
  const [invoice, setInvoice] = useState<PaymentInvoice | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 mins

  // Initialize invoice on open
  useEffect(() => {
    if (isOpen && usdAmount > 0) {
      const calc = calculateMindAmount(usdAmount);
      const originalUsd = usdAmount;
      let finalPayable = usdAmount;
      let activeCoupon = coupon ? { ...coupon } : null;

      if (activeCoupon) {
        const discountVal = Number(
          ((usdAmount * activeCoupon.discountPercent) / 100).toFixed(2),
        );
        finalPayable = Math.max(
          0,
          Number((usdAmount - discountVal).toFixed(2)),
        );
        activeCoupon.discountAmountUSD = discountVal;
      }

      const generatedInvoice: PaymentInvoice = {
        invoiceId: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        usdAmount: finalPayable,
        originalUsdAmount: originalUsd,
        coupon: activeCoupon,
        mindAmount: calc.baseMind,
        bonusPercent: calc.bonusPercent,
        bonusMind: calc.bonusMind,
        totalMind: calc.totalMind,
        depositAddress: DEFAULT_DEPOSIT_ADDRESS,
        network: "BNB Smart Chain (BEP20)",
        token: "USDT",
        status: "awaiting_deposit",
        confirmations: 0,
        requiredConfirmations: 3,
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000,
      };

      setInvoice(generatedInvoice);
      setTimeLeft(900);
    }
  }, [isOpen, usdAmount, coupon]);

  // Invoice expiration timer
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleCopyAddress = () => {
    if (invoice?.depositAddress) {
      navigator.clipboard.writeText(invoice.depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !invoice) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#1e293b] border border-slate-700/90 max-w-xl w-full max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden relative text-white my-auto">
        {/* Top Gradient Highlight */}
        <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 shrink-0"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-7 space-y-5 sm:space-y-6 overflow-y-auto">
          {/* Header & Status Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 pr-8 sm:pr-0">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {invoice.invoiceId}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  BEP20 USDT
                </span>
                {invoice.coupon && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                    <Tag className="w-3 h-3" />
                    {invoice.coupon.code} (-{invoice.coupon.discountPercent}%)
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Automated Payment Invoice
              </h3>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400">Expires:</span>
              <span className="text-amber-400 font-bold">{formattedTime}</span>
            </div>
          </div>

          {/* PAYMENT STATUS BANNER */}
          <div className="rounded-2xl p-4 border transition-all duration-300 bg-slate-900/90 border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Awaiting BEP20 USDT Deposit...
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Send exactly{" "}
                    <strong className="text-emerald-400 text-xs">
                      {formatUSD(invoice.usdAmount)} USDT
                    </strong>{" "}
                    to the address below
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold hidden sm:inline">
                  LISTENING
                </span>
              </div>
            </div>
          </div>

          {/* QR Code & Payment Address Display */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* QR Code Container */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
              <div className="bg-white p-2 rounded-lg">
                <QRCode value={address} size={150} />
              </div>

              <span className="text-[10px] text-slate-400 font-mono mt-2">
                Scan with Binance / Trust / Metamask
              </span>
            </div>

            {/* Address & Deposit Summary */}
            <div className="sm:col-span-7 space-y-3.5">
              {/* Deposit Address Box */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  BEP20 USDT Deposit Address
                </label>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-700/80 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-cyan-300 break-all select-all font-medium">
                    {address}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Copy address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Buy Value (USD):</span>
                  <span className="text-white font-bold">
                    {formatUSD(invoice.originalUsdAmount)}
                  </span>
                </div>

                {invoice.coupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Coupon ({invoice.coupon.code}):
                    </span>
                    <span className="font-bold">
                      -{formatUSD(invoice.coupon.discountAmountUSD)} (-
                      {invoice.coupon.discountPercent}%)
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-1 border-t border-slate-800/80">
                  <span className="text-slate-200 font-bold">
                    Exact Deposit Amount:
                  </span>
                  <span className="text-emerald-400 font-extrabold">
                    {formatUSD(invoice.usdAmount)} USDT
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Accepted Network:</span>
                  <span className="text-emerald-400 font-bold">
                    BNB Smart Chain (BEP-20)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Fixed Rate:</span>
                  <span className="text-cyan-400">
                    1 MIND = ${MIND_PRICE_USD}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-200 font-bold">
                    Total MIND Credited:
                  </span>
                  <span className="text-cyan-300 font-black text-sm">
                    {formatNumber(invoice.totalMind)} MIND
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notice Note */}
          <div className="flex items-center gap-2.5 p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/25 text-[11px] text-slate-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Send only{" "}
              <strong className="text-emerald-400">USDT on BEP-20 (BSC)</strong>
              . Tokens are credited instantly with bonus and can be withdrawn or
              sold anytime on{" "}
              <strong className="text-white">mindchain.info</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
