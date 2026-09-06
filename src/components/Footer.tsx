import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileCode2,
  Send,
  Globe,
  ExternalLink,
  Zap,
} from "lucide-react";

const socialLinks = [
  {
    href: "https://www.facebook.com/mindchain.info",
    label: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>Facebook</title>
        <g id="facebook_line" fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
          <path
            fill="#94A3B8"
            d="M4 12a8 8 0 1 1 9 7.938V14h2a1 1 0 1 0 0-2h-2v-2a1 1 0 0 1 1-1h.5a1 1 0 1 0 0-2H14a3 3 0 0 0-3 3v2H9a1 1 0 1 0 0 2h2v5.938A8.001 8.001 0 0 1 4 12m8 10c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "https://x.com/MindChain1",
    label: "X / Twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>X /Twitter</title>
        <g id="social_x_line" fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
          <path
            fill="#94A3B8"
            d="M19.753 4.659a1 1 0 0 0-1.506-1.317l-5.11 5.84L8.8 3.4A1 1 0 0 0 8 3H4a1 1 0 0 0-.8 1.6l6.437 8.582-5.39 6.16a1 1 0 0 0 1.506 1.317l5.11-5.841L15.2 20.6a1 1 0 0 0 .8.4h4a1 1 0 0 0 .8-1.6l-6.437-8.582 5.39-6.16ZM16.5 19 6 5h1.5L18 19z"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "https://t.me/mindchainMIND",
    label: "Telegram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>Telegram</title>
        <g id="telegram_line" fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
          <path
            fill="#94A3B8"
            d="M21.84 6.056a1.5 1.5 0 0 0-2.063-1.626l-17.1 7.2c-1.192.502-1.253 2.226 0 2.746a56.46 56.46 0 0 0 3.774 1.418c1.168.386 2.442.743 3.463.844.279.334.63.656.988.95.547.45 1.205.913 1.885 1.357 1.362.89 2.873 1.741 3.891 2.295 1.217.66 2.674-.1 2.892-1.427zM4.594 12.993l15.124-6.368-2.118 12.84c-.999-.543-2.438-1.356-3.72-2.194a19.982 19.982 0 0 1-1.709-1.229 7.962 7.962 0 0 1-.426-.374l3.961-3.96a1 1 0 0 0-1.414-1.415L9.955 14.63c-.734-.094-1.756-.366-2.878-.736a48.89 48.89 0 0 1-2.482-.902Z"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@MINDCHAIN",
    label: "YouTube",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>YouTube</title>
        <g id="youtube_line" fill="none">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
          <path
            fill="#94A3B8"
            d="M12 4c.855 0 1.732.022 2.582.058l1.004.048.961.057.9.061.822.064a3.802 3.802 0 0 1 3.494 3.423l.04.425.075.91c.07.943.122 1.971.122 2.954 0 .983-.052 2.011-.122 2.954l-.075.91c-.013.146-.026.287-.04.425a3.802 3.802 0 0 1-3.495 3.423l-.82.063-.9.062-.962.057-1.004.048A61.59 61.59 0 0 1 12 20a61.59 61.59 0 0 1-2.582-.058l-1.004-.048-.961-.057-.9-.062-.822-.063a3.802 3.802 0 0 1-3.494-3.423l-.04-.425-.075-.91A40.662 40.662 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91c.013-.146.026-.287.04-.425A3.802 3.802 0 0 1 5.73 4.288l.821-.064.9-.061.962-.057 1.004-.048A61.676 61.676 0 0 1 12 4m0 2c-.825 0-1.674.022-2.5.056l-.978.047-.939.055-.882.06-.808.063a1.802 1.802 0 0 0-1.666 1.623C4.11 9.113 4 10.618 4 12c0 1.382.11 2.887.227 4.096.085.872.777 1.55 1.666 1.623l.808.062.882.06.939.056.978.047c.826.034 1.675.056 2.5.056s1.674-.022 2.5-.056l.978-.047.939-.055.882-.06.808-.063a1.802 1.802 0 0 0 1.666-1.623C19.89 14.887 20 13.382 20 12c0-1.382-.11-2.887-.227-4.096a1.802 1.802 0 0 0-1.666-1.623l-.808-.062-.882-.06-.939-.056-.978-.047A60.693 60.693 0 0 0 12 6m-2 3.575a.6.6 0 0 1 .819-.559l.081.04 4.2 2.424a.6.6 0 0 1 .085.98l-.085.06-4.2 2.425a.6.6 0 0 1-.894-.43l-.006-.09z"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "https://discord.gg/XuUFG3Ehj7",
    label: "Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>Discord</title>
        <g id="discord_line" fill="none">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
          <path
            fill="#94A3B8"
            d="M15.003 4c.259 0 .584.068.845.132.91.22 1.989.493 2.755 1.068.713.535 1.267 1.468 1.695 2.416.89 1.975 1.509 4.608 1.723 6.61.102.95.127 1.906-.056 2.549-.09.316-.285.554-.422.7-.418.443-.956.774-1.488 1.075l-.264.149a25.21 25.21 0 0 1-.525.284l-.522.27-.717.357-.577.284a1 1 0 0 1-1.166-1.59l-.434-.868A13.057 13.057 0 0 1 12 18c-1.37 0-2.677-.2-3.85-.564l-.433.866a1 1 0 0 1-1.164 1.592l-.544-.27c-.604-.298-1.208-.596-1.796-.925-.614-.343-1.265-.708-1.752-1.225a1.737 1.737 0 0 1-.422-.7c-.184-.642-.158-1.597-.057-2.548.214-2.002.833-4.635 1.724-6.61.427-.948.981-1.881 1.694-2.416.766-.575 1.845-.848 2.755-1.068C8.416 4.068 8.74 4 9 4a1 1 0 0 1 .99 1.147A13.65 13.65 0 0 1 12 5c.691 0 1.366.05 2.014.148A1 1 0 0 1 15.004 4Zm1.354 2.363c-.15-.048-.186-.027-.24.063l-.062.112a1.515 1.515 0 0 1-1.635.716A11.405 11.405 0 0 0 12 7c-.852 0-1.667.09-2.42.254a1.515 1.515 0 0 1-1.635-.716l-.062-.111c-.053-.09-.089-.111-.238-.064-.356.113-.738.234-1.045.437-.287.215-.67.75-1.071 1.639-.766 1.697-1.366 4.204-1.558 6-.04.379-.061.704-.066.972v.294c.004.178.017.319.035.422.254.248.568.443.883.622l.682.377.446.235.364-.728a1 1 0 0 1 1.133-1.624C8.664 15.62 10.246 16 12 16c1.753 0 3.336-.382 4.552-.99a1 1 0 0 1 1.213 1.538l-.08.085.364.73c.298-.154.597-.317.897-.483.39-.216.8-.443 1.117-.753.018-.103.03-.244.035-.422v-.294a11.403 11.403 0 0 0-.066-.973c-.192-1.795-.792-4.302-1.558-6-.4-.888-.784-1.423-1.07-1.638-.308-.203-.69-.324-1.047-.437M8.75 10.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5m6.5 0a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5"
          />
        </g>
      </svg>
    ),
  },
  {
    href: "https://mindchain.info",
    label: "Website",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>Website</title>
        <g id="earth_4_line" fill="none" fillRule="nonzero">
          <path d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
          <path
            fill="#94A3B8"
            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2M9.523 13c.09 1.982.438 3.726.934 5.002.29.746.612 1.282.917 1.614.304.331.517.384.626.384s.322-.053.626-.384c.305-.332.627-.868.917-1.614.496-1.276.845-3.02.934-5.002zm-5.459 0a8 8 0 0 0 4.8 6.36 10 10 0 0 1-.271-.633C7.994 17.187 7.61 15.189 7.52 13zm12.416 0c-.09 2.189-.474 4.187-1.073 5.727q-.127.328-.271.633a8 8 0 0 0 4.8-6.36zm-1.344-8.361q.144.306.271.634c.599 1.54.982 3.538 1.073 5.727h3.456a8 8 0 0 0-4.8-6.361M12 4c-.109 0-.322.053-.626.384-.305.332-.627.868-.917 1.614-.496 1.276-.844 3.02-.934 5.002h4.954c-.09-1.982-.438-3.726-.934-5.002-.29-.746-.612-1.282-.917-1.614C12.322 4.053 12.109 4 12 4m-3.137.639A8 8 0 0 0 4.064 11h3.457c.09-2.189.473-4.187 1.072-5.727q.127-.328.27-.634"
          />
        </g>
      </svg>
    ),
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#090d16] text-slate-400 text-xs">
      {/* 1. Verified Badges Row */}
      <div className="border-b border-slate-800/60 bg-[#0c121e]/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Security & Audit Certified:
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {/* Badge 1: CertiK */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-400">CertiK Audit:</span>
                <strong className="text-emerald-400 font-bold">
                  Passed (98.4)
                </strong>
              </div>

              {/* Badge 2: Hacken */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-400">Hacken:</span>
                <strong className="text-emerald-400 font-bold">
                  Verified Zero Flaws
                </strong>
              </div>

              {/* Badge 3: EVM Native */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Chain:</span>
                <strong className="text-cyan-300 font-bold">
                  EVM Layer-1 (9982)
                </strong>
              </div>

              {/* Badge 4: BEP-20 USDT Gateway */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold">₮</span>
                <span className="text-slate-400">Gateway:</span>
                <strong className="text-slate-200 font-bold">
                  USDT BEP-20
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Footer Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-center">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="inline-flex items-center group">
              <img
                src="/logo.png"
                alt="MindChain"
                className="h-auto w-32 md:w-48 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              High-throughput EVM Layer-1 blockchain with institutional
              throughput, sub-second finality, and direct ecosystem bonus
              distribution.
            </p>
          </div>

          {/* Quick Internal & External Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono">
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link
              to="/presale"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-cyan-400" /> Presale Terminal
            </Link>
            <Link
              to="/ecosystem"
              className="hover:text-cyan-400 transition-colors"
            >
              Ecosystem Suite
            </Link>
            <Link
              to="/tokenomics"
              className="hover:text-cyan-400 transition-colors"
            >
              L1 Comparison
            </Link>
            <a
              href="https://mindchain.info"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 hover:underline"
            >
              Mindchain CEX <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Socials & Smart Contract */}
          <div className="md:col-span-3 space-y-2 md:text-right">
            <div className="flex items-center md:justify-end gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Secured by EVM Smart Contracts
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              Network:{" "}
              <strong className="text-emerald-400">
                MindChain Mainnet (Operational)
              </strong>
            </span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} MindChain Ecosystem. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
