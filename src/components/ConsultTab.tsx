import { useState } from "react";
import { Search, MessageCircle, Calendar } from "lucide-react";
import { users } from "../data/mock";

const allTopics = Array.from(new Set(users.flatMap((u) => u.consultTopics)));

export default function ConsultTab() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [requested, setRequested] = useState<string[]>([]);

  const filtered = users.filter((u) => {
    const matchTopic = selectedTopic
      ? u.consultTopics.includes(selectedTopic)
      : true;
    const matchQuery =
      query === "" ||
      u.name.includes(query) ||
      u.consultTopics.some((t) => t.includes(query)) ||
      u.skills.some((s) => s.includes(query));
    return matchTopic && matchQuery;
  });

  return (
    <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="名前・スキル・相談内容で検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Topic filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => setSelectedTopic(null)}
          className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
            selectedTopic === null
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-200"
          }`}
        >
          すべて
        </button>
        {allTopics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t === selectedTopic ? null : t)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
              selectedTopic === t
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-3">
        {filtered.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl shrink-0">
              {u.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm text-gray-800">{u.name}</span>
                <span className="text-xs text-gray-400">{u.yearsAtCompany}年目</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {u.department} · {u.role}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {u.consultTopics.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setRequested((prev) =>
                      prev.includes(u.id)
                        ? prev.filter((id) => id !== u.id)
                        : [...prev, u.id]
                    )
                  }
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all ${
                    requested.includes(u.id)
                      ? "bg-green-100 text-green-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <Calendar size={12} />
                  {requested.includes(u.id) ? "依頼済み" : "相談を依頼"}
                </button>
                <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                  <MessageCircle size={12} />
                  メッセージ
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            該当する人が見つかりませんでした
          </p>
        )}
      </div>
    </div>
  );
}
