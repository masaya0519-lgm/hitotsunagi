import { useState } from "react";
import { Search, MessageCircle, Megaphone, User, HelpCircle } from "lucide-react";
import ExploreTab from "./components/ExploreTab";
import SessionsTab from "./components/SessionsTab";
import MyPageTab from "./components/MyPageTab";
import HelpTab from "./components/HelpTab";
import BoshuuTab from "./components/BoshuuTab";
import { ME } from "./data/mock";

type Tab = "explore" | "sessions" | "boshuu" | "mypage" | "help";

const navItems = [
  { id: "explore"  as Tab, label: "さがす",       shortLabel: "さがす",   icon: Search },
  { id: "sessions" as Tab, label: "やりとり",     shortLabel: "やりとり", icon: MessageCircle },
  { id: "boshuu"   as Tab, label: "ひろば",       shortLabel: "ひろば",   icon: Megaphone },
  { id: "mypage"   as Tab, label: "プロフィール", shortLabel: "わたし",   icon: User },
  { id: "help"     as Tab, label: "ヘルプ",       shortLabel: "ヘルプ",   icon: HelpCircle },
];

const subtitles: Record<Tab, string> = {
  explore:  "社内のだれかと、話してみよう 🌿",
  sessions: "声かけ・もらった声かけを確認",
  boshuu:   "こんな人に話を聞いてほしい、を発信する",
  mypage:   "自分のことを教えよう",
  help:     "コンセプト・使い方・アップデート情報",
};

export default function App() {
  const [tab, setTab] = useState<Tab>("explore");
  const current = navItems.find((n) => n.id === tab)!;

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#f0fdf4" }}>
      {/* ── Sidebar（PC） ── */}
      <aside className="hidden md:flex flex-col w-56 lg:w-64 bg-white border-r border-green-100 shrink-0">
        <div className="px-5 py-5 border-b border-green-100">
          <h1 className="text-lg font-extrabold bg-gradient-to-r from-green-600 to-lime-400 bg-clip-text text-transparent tracking-wide">
            🍎 Papple
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">社内のひとと、もっと話そう</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left ${
                tab === id
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-gray-500 hover:bg-green-50 hover:text-gray-700"
              }`}
            >
              <Icon size={18} strokeWidth={tab === id ? 2.5 : 1.8} />
              {label}
            </button>
          ))}
        </nav>

        {/* Profile footer */}
        <div className="px-4 py-4 border-t border-green-100 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-lg shrink-0 ring-2 ring-green-200">
            {ME.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{ME.name}</p>
            <p className="text-xs text-gray-400 truncate">{ME.role}</p>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white/85 backdrop-blur-sm border-b border-green-100 px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-extrabold text-gray-900 text-base md:text-lg">
              <span className="md:hidden bg-gradient-to-r from-green-600 to-lime-400 bg-clip-text text-transparent">
                🍎 Papple
              </span>
              <span className="hidden md:inline">{current.label}</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              <span className="md:hidden">社内のひとと、もっと話そう</span>
              <span className="hidden md:inline">{subtitles[tab]}</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-lg md:hidden ring-2 ring-green-200">
            {ME.avatar}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {tab === "explore"  && <ExploreTab />}
          {tab === "sessions" && <SessionsTab />}
          {tab === "boshuu"   && <BoshuuTab />}
          {tab === "mypage"   && <MyPageTab />}
          {tab === "help"     && <HelpTab />}
        </main>

        {/* ── Bottom nav（スマホ） ── */}
        <nav className="md:hidden bg-white/90 backdrop-blur-sm border-t border-green-100 flex justify-around shrink-0">
          {navItems.map(({ id, shortLabel, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 transition-colors ${
                tab === id ? "text-green-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={19} strokeWidth={tab === id ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold">{shortLabel}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
