import { useState } from "react";
import { Search, MessageSquare, X } from "lucide-react";
import { users, INDUSTRIES, CAREER_ORIENTATIONS, STATUS_OPTIONS } from "../data/mock";
import type { User } from "../data/mock";
import ProfileModal from "./ProfileModal";
import RequestModal from "./RequestModal";

const allTopics    = Array.from(new Set(users.flatMap((u) => u.talkTopics)));
const allExpertise = Array.from(new Set(users.flatMap((u) => u.expertiseAreas)));
const allPersonality = Array.from(new Set(users.flatMap((u) => u.personality)));
const allIsms      = Array.from(new Set(users.flatMap((u) => u.workIsms)));

type FilterGroup = { label: string; key: string; items: string[]; color: string };

const filterGroups: FilterGroup[] = [
  { label: "🌿 得意なこと",   key: "expertise",   items: allExpertise,        color: "green" },
  { label: "🏢 業界経験",     key: "industry",    items: INDUSTRIES,          color: "amber" },
  { label: "🎯 キャリアの向き", key: "orientation", items: CAREER_ORIENTATIONS, color: "purple" },
  { label: "💬 話せるテーマ", key: "topic",       items: allTopics,           color: "teal" },
  { label: "🙋 性格",         key: "personality", items: allPersonality,      color: "pink" },
  { label: "⚡ 好きなISM",    key: "ism",         items: allIsms,             color: "yellow" },
];

const chipColors: Record<string, string> = {
  green:  "bg-green-500 text-white border-green-500",
  amber:  "bg-amber-500 text-white border-amber-500",
  purple: "bg-purple-500 text-white border-purple-500",
  teal:   "bg-teal-600 text-white border-teal-600",
  pink:   "bg-pink-500 text-white border-pink-500",
  yellow: "bg-yellow-400 text-white border-yellow-400",
};

const chipBase = "bg-white text-gray-600 border-gray-200";

function matchesFilters(user: User, active: Record<string, string[]>): boolean {
  for (const [key, values] of Object.entries(active)) {
    if (values.length === 0) continue;
    switch (key) {
      case "expertise":
        if (!values.some((v) => user.expertiseAreas.includes(v))) return false; break;
      case "industry":
        if (!values.some((v) => user.projectExperiences.some((p) => p.industry === v))) return false; break;
      case "orientation":
        if (!values.includes(user.careerOrientation)) return false; break;
      case "topic":
        if (!values.some((v) => user.talkTopics.includes(v))) return false; break;
      case "personality":
        if (!values.some((v) => user.personality.includes(v))) return false; break;
      case "ism":
        if (!values.some((v) => user.workIsms.includes(v))) return false; break;
    }
  }
  return true;
}

function matchesQuery(user: User, q: string): boolean {
  if (!q) return true;
  const haystack = [
    user.name, user.department, user.role,
    user.careerOrientation,
    ...user.expertiseAreas, ...user.talkTopics,
    ...user.personality, ...user.workIsms,
    ...user.favoriteFoods, ...user.hobbies,
    user.bio,
    ...user.projectExperiences.flatMap((p) => [p.industry, p.phase, p.tech]),
  ].join(" ").toLowerCase();
  return q.toLowerCase().split(/\s+/).every((word) => haystack.includes(word));
}

export default function ExploreTab() {
  const [query, setQuery]               = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [openGroup, setOpenGroup]       = useState<string | null>(null);
  const [profileUser, setProfileUser]   = useState<User | null>(null);
  const [requestUser, setRequestUser]   = useState<User | null>(null);

  function toggleFilter(key: string, value: string) {
    setActiveFilters((prev) => {
      const cur = prev[key] ?? [];
      return { ...prev, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });
  }

  function clearAll() { setActiveFilters({}); setQuery(""); }

  const totalActive = Object.values(activeFilters).reduce((s, v) => s + v.length, 0);
  const filtered = users.filter((u) => matchesQuery(u, query) && matchesFilters(u, activeFilters));

  function handleRequest(user: User) { setProfileUser(null); setRequestUser(user); }

  return (
    <div className="px-4 md:px-6 pt-4 pb-6 flex flex-col gap-3">
      {/* ── 検索 ── */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="名前・業界・ISM・食べ物など何でも"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-green-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 shadow-sm"
          />
        </div>
        {(totalActive > 0 || query) && (
          <button onClick={clearAll} className="text-xs px-3 py-2 bg-white text-gray-500 rounded-2xl hover:bg-green-50 transition-colors border border-green-100 shadow-sm shrink-0">
            クリア
          </button>
        )}
      </div>

      {/* ── フィルター（横スクロール） ── */}
      <div className="flex flex-col gap-2">
        {/* カテゴリ行 */}
        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {filterGroups.map((group) => {
            const active = activeFilters[group.key] ?? [];
            const isOpen = openGroup === group.key;
            return (
              <button
                key={group.key}
                onClick={() => setOpenGroup(isOpen ? null : group.key)}
                className={`shrink-0 text-sm px-4 py-2 rounded-full border font-semibold transition-all ${
                  isOpen
                    ? "bg-green-500 text-white border-green-500 shadow-sm"
                    : active.length > 0
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-200 hover:text-green-600"
                }`}
              >
                {group.label}{active.length > 0 && !isOpen && ` · ${active.length}`}
              </button>
            );
          })}
        </div>

        {/* 選択肢行 */}
        {openGroup && (
          <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
            {(() => {
              const group = filterGroups.find((g) => g.key === openGroup)!;
              const active = activeFilters[openGroup] ?? [];
              return group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleFilter(openGroup, item)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    active.includes(item) ? chipColors[group.color] : chipBase
                  }`}
                >
                  {item}
                </button>
              ));
            })()}
          </div>
        )}

        {/* アクティブなフィルター */}
        {totalActive > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            {Object.entries(activeFilters).flatMap(([key, values]) =>
              values.map((v) => (
                <button
                  key={`${key}-${v}`}
                  onClick={() => toggleFilter(key, v)}
                  className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full hover:bg-green-200 transition-colors font-medium"
                >
                  {v} <X size={10} />
                </button>
              ))
            )}
            <button onClick={clearAll} className="text-xs text-gray-400 hover:text-green-600 underline underline-offset-2">
              全クリア
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        {filtered.length}人が見つかりました{totalActive > 0 && ` · ${totalActive}件絞り込み中`}
      </p>

      {/* ── ユーザーグリッド ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((u) => {
          const st = STATUS_OPTIONS.find((s) => s.id === u.status);
          const isDnd = u.status === "dnd";
          return (
            <button
              key={u.id}
              onClick={() => setProfileUser(u)}
              className={`bg-white rounded-3xl p-4 text-left hover:shadow-lg transition-all duration-200 active:scale-[0.97] flex flex-col gap-3 border-2 ${
                isDnd ? "border-gray-100 opacity-60" : "border-green-50 hover:border-green-200"
              }`}
            >
              {/* アバター + 名前 + ステータス */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-2xl shrink-0">
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="font-bold text-gray-900">{u.name}</p>
                    {st && (
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-bold ${st.color} ${st.textColor}`}>
                        {st.emoji} {st.label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-green-600 font-semibold">{u.role}</p>
                  <p className="text-xs text-gray-400">{u.yearsAtCompany}年目 · {u.department}</p>
                </div>
              </div>

              {/* ひとこと — 主役 */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                「{u.welcomeMessage}」
              </p>

              {/* 話せるテーマ */}
              <div className="flex flex-wrap gap-1.5">
                {u.talkTopics.slice(0, 2).map((t) => (
                  <span key={t} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* フッター */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-50 mt-auto">
                <span>💬 {u.sessionCount}人と話した</span>
                <span>{u.meetStyle}</span>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-gray-400 text-center py-12">
            該当する人が見つかりませんでした
          </p>
        )}
      </div>

      {profileUser && (
        <ProfileModal user={profileUser} onClose={() => setProfileUser(null)} onRequest={handleRequest} />
      )}
      {requestUser && (
        <RequestModal user={requestUser} onClose={() => setRequestUser(null)} onSubmit={() => setRequestUser(null)} />
      )}
    </div>
  );
}
