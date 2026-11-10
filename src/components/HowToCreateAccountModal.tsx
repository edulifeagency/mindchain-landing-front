import React from "react";
import { X, PlayCircle } from "lucide-react";

interface HowToCreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToCreateAccountModal: React.FC<
  HowToCreateAccountModalProps
> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#1e293b] border border-slate-700/90 max-w-2xl w-full max-h-[92vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden relative text-white my-auto">
        {/* Top Gradient Bar */}
        <div className="h-1.5 bg-linear-to-r from-cyan-400 via-teal-400 to-emerald-400 shrink-0"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-7 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                How to Create Account
              </h3>
              <p className="text-xs text-slate-400">
                Watch this short guide to get started
              </p>
            </div>
          </div>

          {/* Video */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/ewbHQZFyYIk?autoplay=1&rel=0&playsinline=1"
              title="How to Create Account"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
