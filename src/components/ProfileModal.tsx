import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { STATUS_OPTIONS } from "../data/mock";
import type { User } from "../data/mock";

type Props = { user: User; onClose: () => void; onRequest: (user: User) => void; };

function Chip({ label, color }: { label: string; color: string }) {
  return <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${color}`}>{label}</span>;
}

export default function ProfileModal({ user, onClose, onRequest }: Props) {
  const st = STATUS_OPTIONS.find((s) => s.id === user.status);
  const isDnd = user.status === "dnd";
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div
        className="bg-white w-full md:max-w-xl md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── ヘッダー ── */}
        <div className="sticky top-0 z-10 bg-white rounded-t-3xl pt-3 px-5 pb-4 border-b border-gray-100">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3 md:hidden" />
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-4xl shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h2>
                {st && (
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${st.color} ${st.textColor}`}>
                    {st.emoji} {st.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600 font-semibold mt-0.5">{user.role}</p>
              <p className="text-xs text-gray-400">{user.department} · {user.yearsAtCompany}年目</p>
            </div>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 shrink-0">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-5 py-5 flex flex-col gap-6">

          {/* ── メッセージ — 主役 ── */}
          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl px-5 py-4">
            <p className="text-base text-gray-700 leading-relaxed">
              「{user.welcomeMessage}」
            </p>
          </div>

          {/* ── 自己紹介 ── */}
          <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>

          {/* ── キャリア ── */}
          <div className="flex flex-col gap-2">
            {/* 前職 */}
            {user.prevJobs && user.prevJobs.length > 0 && (
              <div className="flex flex-col gap-1.5 mb-1">
                {user.prevJobs.map((job, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-500">
                    <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" />
                    <span>
                      <span className="font-medium text-gray-600">{job.company}</span>
                      <span className="mx-1 text-gray-300">·</span>
                      {job.role}
                      <span className="mx-1 text-gray-300">·</span>
                      {job.years}
                      {job.note && (
                        <span className="block text-gray-400 mt-0.5 leading-relaxed">{job.note}</span>
                      )}
                    </span>
                  </div>
                ))}
                <div className="ml-[7px] w-0.5 h-3 bg-gray-200" />
              </div>
            )}
            {/* 現職キャリアパス */}
            <div className="flex flex-wrap items-center gap-1.5">
              {user.careerPath.map((step, i) => (
                <>
                  {i > 0 && <span key={`arrow-${i}`} className="text-gray-300 text-sm">›</span>}
                  <span
                    key={step.role + i}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      i === user.careerPath.length - 1
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {step.role}
                    <span className="font-normal text-[10px] ml-1 opacity-70">{step.years}</span>
                  </span>
                </>
              ))}
            </div>
            <div>
              <Chip label={user.careerOrientation} color="bg-amber-50 text-amber-600" />
            </div>
          </div>

          {/* ── こんなこと話せます ── */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2.5">💬 こんなこと話せます</p>
            <div className="flex flex-wrap gap-1.5">
              {user.talkTopics.map((t) => (
                <Chip key={t} label={t} color="bg-green-50 text-green-700" />
              ))}
            </div>
          </div>

          {/* ── 経験した仕事（クリックで詳細展開） ── */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2.5">💼 経験した仕事</p>
            <div className="flex flex-col gap-1.5">
              {user.projectExperiences.map((exp, i) => {
                const isOpen = expandedProject === i;
                const hasDesc = !!exp.description;
                return (
                  <div key={i}>
                    <button
                      onClick={() => hasDesc && setExpandedProject(isOpen ? null : i)}
                      className={`w-full bg-gray-50 rounded-xl px-3 py-2 text-xs text-gray-600 text-left transition-colors ${
                        hasDesc ? "hover:bg-green-50 cursor-pointer" : "cursor-default"
                      } ${isOpen ? "bg-green-50 rounded-b-none" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>
                          {exp.industry} · {exp.phase} · <span className="text-emerald-600 font-medium">{exp.tech}</span>
                        </span>
                        {hasDesc && (
                          <ChevronDown
                            size={14}
                            className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </button>
                    {isOpen && exp.description && (
                      <div className="bg-green-50 rounded-b-xl px-3 pb-3 pt-1.5 text-xs text-gray-600 leading-relaxed border-t border-green-100">
                        {exp.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {user.expertiseAreas.map((t) => (
                <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* ── 人柄 ── */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-2.5">🙋 こんな人です</p>
            <div className="flex flex-wrap gap-1.5">
              {user.personality.map((t) => (
                <Chip key={t} label={t} color="bg-pink-50 text-pink-600" />
              ))}
              {user.workIsms.map((t) => (
                <Chip key={t} label={t} color="bg-amber-50 text-amber-600" />
              ))}
            </div>
            {(user.mbti || user.ffs) && (
              <div className="flex gap-2 mt-2.5">
                {user.mbti && (
                  <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-bold tracking-wide">
                    MBTI: {user.mbti}
                  </span>
                )}
                {user.ffs && (
                  <span className="text-xs bg-teal-50 text-teal-600 px-3 py-1.5 rounded-full font-medium">
                    FFS: {user.ffs}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── 好きなもの ── */}
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <p className="text-xs text-gray-500 mb-2">🍜 好きなもの · 趣味</p>
            <div className="flex flex-wrap gap-1.5">
              {[...user.favoriteFoods, ...user.hobbies].map((t) => (
                <span key={t} className="text-xs bg-white text-gray-600 px-2.5 py-1 rounded-full border border-gray-100">{t}</span>
              ))}
            </div>
          </div>

          {/* ── 実績 + 会いやすい時間帯 ── */}
          <p className="text-sm text-gray-500">
            💬 これまで <strong className="text-green-600">{user.sessionCount}人</strong> と話しました
            <span className="mx-2 text-gray-300">·</span>
            {user.meetStyle}
          </p>
        </div>

        <div className="px-5 pb-8 pt-1">
          {isDnd ? (
            <div className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl text-base text-center">
              🙅 今はそっとしておきましょう
            </div>
          ) : (
            <button
              onClick={() => onRequest(user)}
              className="btn-ac w-full bg-green-500 text-white font-extrabold py-4 rounded-2xl hover:bg-green-600 text-base"
            >
              {st ? `${st.emoji} 声をかけてみる` : "👋 声をかけてみる"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
