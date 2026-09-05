import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { truncateAddress } from "../utils/crypto";
import {
  Layers,
  LogOut,
  Menu,
  X,
  Copy,
  Check,
  Zap,
  Loader2,
} from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import Cookies from "js-cookie";
import { useLayoutStore } from "../store/useLayoutStore";

interface NavbarProps {
  onOpenAuth: (mode?: "login" | "signup") => void;
  onOpenBuy: () => void;
  onCopyAddress?: (addr: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenBuy,
  onCopyAddress,
}) => {
  const MIND_PRICE_USD =
    useLayoutStore((state) => state.siteConfig?.mind.mind_price) || 0;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  // Mutations
  const logoutMutation = useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      useUserStore.getState().clearUser();
      Cookies.remove("accessToken");
    },
  });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user?.wallet_address) {
      navigator.clipboard.writeText(user.wallet_address);
      setCopied(true);
      if (onCopyAddress) onCopyAddress(user.wallet_address);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isDashboardActive = location.pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0f172a]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo Link to Home with Crisp Web3 Vector Logo */}
        <Link
          to="/"
          className="flex items-center cursor-pointer group shrink-0"
        >
          <img
            src="/logo.png"
            alt="MindChain"
            className="h-auto w-32 md:w-56 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-300">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition-colors py-1 hover:text-cyan-400 cursor-pointer ${
                isActive ? "text-cyan-400 font-semibold" : "text-slate-300"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/presale"
            className={({ isActive }) =>
              `transition-colors py-1 hover:text-cyan-400 cursor-pointer flex items-center gap-1 ${
                isActive ? "text-cyan-400 font-semibold" : "text-slate-300"
              }`
            }
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Presale
          </NavLink>

          <NavLink
            to="/ecosystem"
            className={({ isActive }) =>
              `transition-colors py-1 hover:text-cyan-400 cursor-pointer ${
                isActive ? "text-cyan-400 font-semibold" : "text-slate-300"
              }`
            }
          >
            Ecosystem
          </NavLink>

          <NavLink
            to="/tokenomics"
            className={({ isActive }) =>
              `transition-colors py-1 hover:text-cyan-400 cursor-pointer ${
                isActive ? "text-cyan-400 font-semibold" : "text-slate-300"
              }`
            }
          >
            L1 Comparison
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition-colors py-1 hover:text-cyan-400 cursor-pointer flex items-center gap-1.5 ${
                  isActive || isDashboardActive
                    ? "text-cyan-400 font-semibold"
                    : "text-slate-300"
                }`
              }
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Right Section: Adaptive Price Badge & Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Live Price Badge */}
          <div className="bg-slate-900/90 border border-slate-700/80 px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-inner shrink-0">
            <div className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden xs:inline">
              MIND:
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-400 font-mono whitespace-nowrap">
              ${MIND_PRICE_USD}
            </span>
          </div>

          {/* User Auth Buttons / State */}
          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div
                onClick={handleCopy}
                title="Click to copy address"
                className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-600 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors group shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
                <span className="text-xs font-mono text-cyan-300 font-medium">
                  {truncateAddress(user.wallet_address)}
                </span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                )}
              </div>

              <button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                title="Disconnect EVM Session"
                className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 text-slate-400 transition-colors cursor-pointer shrink-0 hidden sm:block disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {logoutMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => onOpenAuth("login")}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              >
                Connect
              </button>
              <button
                onClick={onOpenBuy}
                className="relative group overflow-hidden rounded-xl p-px font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
              >
                <span className="absolute inset-0 bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-400 transition-all"></span>
                <span className="relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-[11px] bg-slate-950 text-cyan-300 transition-colors group-hover:bg-transparent group-hover:text-slate-950 font-extrabold uppercase tracking-wider text-[11px] sm:text-xs whitespace-nowrap">
                  <Zap className="w-3.5 h-3.5 shrink-0 fill-current" />
                  <span>Buy MIND</span>
                </span>
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b1120]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/presale"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3.5 py-2.5 rounded-xl text-cyan-300 font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              Presale Terminal
            </Link>
            <Link
              to="/ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Ecosystem Products
            </Link>
            <Link
              to="/tokenomics"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              L1 Comparison & Specs
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left px-3.5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                My Dashboard
              </Link>
            )}
          </div>

          {!user ? (
            <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenAuth("login");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-slate-800/90 hover:bg-slate-700 rounded-xl text-center text-xs font-bold text-white border border-slate-700 transition-colors cursor-pointer"
              >
                Connect EVM Wallet
              </button>
              <button
                onClick={() => {
                  onOpenBuy();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-linear-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-xl text-center text-xs font-black text-slate-950 uppercase tracking-wider shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Buy MIND (USDT BEP-20)
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between px-1">
              <div className="font-mono text-xs text-cyan-300 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                {truncateAddress(user.wallet_address)}
              </div>
              <button
                disabled={logoutMutation.isPending}
                onClick={() => {
                  logoutMutation.mutate();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {logoutMutation.isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Disconnecting...
                  </>
                ) : (
                  <>
                    <LogOut className="w-3.5 h-3.5" />
                    Disconnect
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
