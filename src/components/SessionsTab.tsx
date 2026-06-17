import { useState } from "react";
import { Clock, CheckCircle2, ExternalLink, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { sessions, users, ME } from "../data/mock";
import type { User } from "../data/mock";
import SlackMock from "./SlackMock";

type SlackContext = { fromUser: User; toUser: User; purpose: string };

function getUserById(id: string) {
  if (id === "me") return ME;
  return users.find((u) => u.id === id);
}

export default function SessionsTab() {
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const [declinedIds, setDeclinedIds] = useState<string[]>([]);
  const [slackContext, setSlackContext] = useState<SlackContext | null>(null);

  const pendingReceived = sessions.filter(
    (s) => s.toUserId === "me" && s.status === "pending_received" && !declinedIds.includes(s.id) && !acceptedIds.includes(s.id)
  );
  const confirmed = sessions.filter(
    (s) => s.status === "confirmed" || acceptedIds.includes(s.id)
  );
  const pendingSent = sessions.filter(
    (s) => s.fromUserId === "me" && s.status === "pending_sent"
  );

  const groups = [
    { label: "返信が必要", emoji: "📬", sessions: pendingReceived, color: "text-amber-700 bg-amber-50" },
    { label: "確定済み",   emoji: "✅", sessions: confirmed,       color: "text-green-700 bg-green-50" },
    { label: "返信待ち",   emoji: "📤", sessions: pendingSent,     color: "text-blue-700 bg-blue-50" },
  ].filter((g) => g.sessions.length > 0);

  const total = pendingReceived.length + confirmed.length + pendingSent.length;

  return (
    <div className="px-4 md:px-6 pt-4 pb-6 flex flex-col gap-4 max-w-2xl w-full mx-auto">

      {/* 要確認バナー */}
      {pendingReceived.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2">
          <span className="text-lg">📬</span>
          <p className="text-sm font-semibold text-amber-800">
            {pendingReceived.length}件の声かけに返信しましょう
          </p>
        </div>
      )}

      {total === 0 && (
        <div className="py-16 text-center text-gray-400">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-sm">まだやりとりはありません</p>
          <p className="text-xs mt-1">「さがす」から声をかけてみましょう</p>
        </div>
      )}

      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${group.color}`}>
              {group.emoji} {group.label} · {group.sessions.length}件
            </span>
          </div>

          {group.sessions.map((s) => {
            const isReceived = s.toUserId === "me";
            const otherUser = getUserById(isReceived ? s.fromUserId : s.toUserId);
            if (!otherUser) return null;
            const effectiveStatus = acceptedIds.includes(s.id) ? "confirmed" : s.status;
            const isConfirmed = effectiveStatus === "confirmed";

            return (
              <div key={s.id} className={`bg-white rounded-2xl p-4 flex flex-col gap-3 border ${isConfirmed ? "border-green-100" : "border-gray-100"}`}>
                {/* ヘッダー */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-xl shrink-0">
                    {otherUser.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-sm text-gray-900">{otherUser.name}</span>
                      <span className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                        isReceived ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                      }`}>
                        {isReceived
                          ? <><ArrowDownLeft size={9} /> もらった</>
                          : <><ArrowUpRight size={9} /> した</>
                        }
                      </span>
                      {isConfirmed && (
                        <span className="flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-50 text-green-700">
                          <CheckCircle2 size={9} /> 確定
                        </span>
                      )}
                      {effectiveStatus === "pending_sent" && (
                        <span className="flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
                          <Clock size={9} /> 返信待ち
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{s.createdAt} · 🗓 {s.proposedDate}</p>
                  </div>
                </div>

                {/* 目的 */}
                <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-sm text-gray-700 leading-relaxed">{s.purpose}</p>
                </div>

                {/* アクション */}
                {isReceived && s.status === "pending_received" && !acceptedIds.includes(s.id) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeclinedIds((p) => [...p, s.id])}
                      className="flex-1 text-sm py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-medium"
                    >
                      今回は難しい
                    </button>
                    <button
                      onClick={() => setAcceptedIds((p) => [...p, s.id])}
                      className="flex-1 text-sm py-2.5 rounded-xl btn-ac bg-green-500 text-white font-bold"
                    >
                      承諾する ✓
                    </button>
                  </div>
                )}

                {isConfirmed && (
                  <button
                    onClick={() => setSlackContext({
                      fromUser: isReceived ? otherUser : ME,
                      toUser: isReceived ? ME : otherUser,
                      purpose: s.purpose,
                    })}
                    className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl bg-[#4A154B] text-white hover:bg-[#3a0f3c] transition-colors font-medium"
                  >
                    <span className="font-bold text-base leading-none">S</span>
                    Slackで日程を調整する
                    <ExternalLink size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {slackContext && (
        <SlackMock
          fromUser={slackContext.fromUser}
          toUser={slackContext.toUser}
          purpose={slackContext.purpose}
          onClose={() => setSlackContext(null)}
        />
      )}
    </div>
  );
}
