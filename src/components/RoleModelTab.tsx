import { useState } from "react";
import { ChevronRight, Briefcase, ArrowRight } from "lucide-react";
import { roleModels } from "../data/mock";
import type { User } from "../data/mock";

const goals = ["マネージャー", "スペシャリスト", "テックリード", "デザインマネージャー", "CHO（人事責任者）", "CPO"];

function CareerPathBadges({ path }: { path: string[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {path.map((step, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {step}
          </span>
          {i < path.length - 1 && <ArrowRight size={10} className="text-gray-400" />}
        </div>
      ))}
    </div>
  );
}

function UserCard({ user, onSelect }: { user: User; onSelect: (u: User) => void }) {
  return (
    <button
      onClick={() => onSelect(user)}
      className="w-full bg-white rounded-2xl shadow-sm p-4 text-left hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl shrink-0">
          {user.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="font-semibold text-sm text-gray-800">{user.name}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {user.role} · {user.yearsAtCompany}年目
          </p>
          <CareerPathBadges path={user.careerPath} />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3 line-clamp-2">{user.bio}</p>
    </button>
  );
}

function DetailModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={onClose}>
      <div
        className="bg-white w-full rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-4xl">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.department} · {user.role}</p>
            <p className="text-xs text-gray-400">{user.yearsAtCompany}年目</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">キャリアパス</p>
          <div className="flex items-center gap-2 flex-wrap">
            {user.careerPath.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-1.5 rounded-lg">
                  <Briefcase size={11} />
                  {step}
                </div>
                {i < user.careerPath.length - 1 && (
                  <ArrowRight size={12} className="text-gray-400" />
                )}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <ArrowRight size={12} className="text-gray-400" />
              <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-3 py-1.5 rounded-lg font-semibold">
                ⭐ 目指す姿：{user.careerGoal}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">相談できること</p>
          <div className="flex flex-wrap gap-1">
            {user.consultTopics.map((t) => (
              <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">一言</p>
          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-3">{user.bio}</p>
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all">
          話を聞かせてもらう
        </button>
      </div>
    </div>
  );
}

export default function RoleModelTab() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = roleModels.filter((u) =>
    selectedGoal ? u.careerGoal === selectedGoal || u.careerPath.includes(selectedGoal) : true
  );

  return (
    <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">目指したいキャリアは？</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedGoal(null)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
              selectedGoal === null
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            すべて
          </button>
          {goals.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGoal(g === selectedGoal ? null : g)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
                selectedGoal === g
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((u) => (
          <UserCard key={u.id} user={u} onSelect={setSelected} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            該当するロールモデルが見つかりませんでした
          </p>
        )}
      </div>

      {selected && (
        <DetailModal user={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
