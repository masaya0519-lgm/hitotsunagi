import { useState } from "react";
import { Heart, X, Star, MessageCircle } from "lucide-react";
import { users, currentUser } from "../data/mock";
import type { User } from "../data/mock";

function commonTags(a: User, b: User): string[] {
  return a.hobbies.filter((h) => b.hobbies.includes(h));
}

export default function DiscoverTab() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [passed, setPassed] = useState<string[]>([]);
  const [matched, setMatched] = useState<string | null>(null);

  const queue = users.filter((u) => !liked.includes(u.id) && !passed.includes(u.id));
  const user = queue[index % queue.length];

  function handleLike() {
    setLiked((prev) => [...prev, user.id]);
    setMatched(user.id);
    setTimeout(() => {
      setMatched(null);
      setIndex((i) => i + 1);
    }, 1800);
  }

  function handlePass() {
    setPassed((prev) => [...prev, user.id]);
    setIndex((i) => i + 1);
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
        <span className="text-4xl">🎉</span>
        <p className="text-sm">今日のおすすめは以上です</p>
      </div>
    );
  }

  const common = commonTags(currentUser, user);

  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-2 pb-6">
      {matched && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-bounce-once">
            <p className="text-4xl mb-2">🎉</p>
            <p className="text-xl font-bold text-pink-500">マッチング！</p>
            <p className="text-sm text-gray-600 mt-1">
              {users.find((u) => u.id === matched)?.name}さんと繋がりました
            </p>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-48 flex items-center justify-center">
          <span className="text-8xl">{user.avatar}</span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              {user.yearsAtCompany}年目
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            {user.department} · {user.role}
          </p>

          {common.length > 0 && (
            <div className="flex items-center gap-1 mb-3 bg-pink-50 rounded-xl px-3 py-2">
              <Star size={14} className="text-pink-400" />
              <span className="text-xs text-pink-600 font-medium">
                共通点：{common.join("・")}
              </span>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {user.hobbies.map((h) => (
              <span
                key={h}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="border-t pt-3">
            <p className="text-xs text-gray-400 mb-1">相談できること</p>
            <div className="flex flex-wrap gap-1">
              {user.consultTopics.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-1">こんな人と繋がりたい</p>
            <p className="text-xs text-gray-600">{user.wantsToMeet}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={handlePass}
          className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:scale-105 transition-all"
        >
          <X size={24} />
        </button>
        <button
          onClick={handleLike}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all"
        >
          <Heart size={26} />
        </button>
        <button className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-indigo-400 hover:bg-indigo-50 hover:scale-105 transition-all">
          <MessageCircle size={22} />
        </button>
      </div>

      <p className="text-xs text-gray-400">
        残り {queue.length} 人 · マッチング済み {liked.length} 人
      </p>
    </div>
  );
}
