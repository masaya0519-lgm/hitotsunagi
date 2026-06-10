import { useState } from "react";
import { Check, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { sessions, users, ME } from "../data/mock";
import type { User } from "../data/mock";
import SlackMock from "./SlackMock";

type FilterTab = "received" | "sent" | "past";

type SlackContext = {
  fromUser: User;
  toUser: User;
  purpose: string;
};

function getUserById(id: string) {
  if (id === "me") return ME;
  return users.find((u) => u.id === id);
}

function StatusBadge({ status }: { status: string }) {
  if (status === "pending_received") {
    return (
      <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
        <Clock size={10} /> 返信待ち
      </span>
    );
  }
  if (status === "pending_sent") {
    return (
      <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
        <Clock size={10} /> 承認待ち
      </span>
    );
  }
  if (status === "confirmed") {
    return (
      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
        <CheckCircle2 size={10} /> 確定
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
      <Check size={10} /> 完了
    </span>
  );
}

export default function SessionsTab() {
  const [filter, setFilter] = useState<FilterTab>("received");
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const [declinedIds, setDeclinedIds] = useState<string[]>([]);
  const [slackContext, setSlackContext] = useState<SlackContext | null>(null);

  const receivedSessions = sessions.filter(
    (s) => s.toUserId === "me" && s.status === "pending_received" && !declinedIds.includes(s.id)
  );
  const sentSessions = sessions.filter((s) => s.fromUserId === "me");
  const pastSessions = sessions.filter((s) => s.status === "completed");

  const tabSessions =
    filter === "received" ? receivedSessions :
    filter === "sent" ? sentSessions :
    pastSessions;

  return (
    <div className="px-4 md:px-6 pt-4 pb-6 flex flex-col gap-3 max-w-3xl w-full mx-auto">
      {/* Filter tabs */}
      <div className="flex bg-green-50/60 rounded-xl p-1 gap-1">
        {([
          { id: "received" as const, label: "もらった声かけ", count: receivedSessions.length },
          { id: "sent" as const, label: "した声かけ", count: sentSessions.length },
          { id: "past" as const, label: "話したこと", count: pastSessions.length },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${
              filter === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`text-[10px] rounded-full px-1.5 py-0 ${filter === t.id ? "bg-green-100 text-green-700" : "bg-rose-100/60 text-gray-500"}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tabSessions.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-3xl mb-2">
            {filter === "received" ? "📭" : filter === "sent" ? "📤" : "📋"}
          </p>
          <p className="text-sm">
            {filter === "received" && "依頼はまだありません"}
            {filter === "sent" && "送った依頼はありません"}
            {filter === "past" && "過去の記録はありません"}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {tabSessions.map((s) => {
          const isReceived = s.toUserId === "me";
          const otherUser = getUserById(isReceived ? s.fromUserId : s.toUserId);
          if (!otherUser) return null;
          const isAccepted = acceptedIds.includes(s.id);
          const effectiveStatus = isAccepted ? "confirmed" : s.status;
          const isConfirmed = effectiveStatus === "confirmed";

          return (
            <div key={s.id} className={`bg-white rounded-2xl shadow-sm p-4 ${isConfirmed ? "ring-1 ring-green-200" : ""}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-xl shrink-0">
                  {otherUser.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-semibold text-sm text-gray-900">{otherUser.name}</span>
                    <StatusBadge status={effectiveStatus} />
                  </div>
                  <p className="text-xs text-gray-400">
                    {isReceived ? "からの声かけ" : "への声かけ"} · {s.createdAt}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <p className="text-sm text-gray-700 leading-relaxed">{s.purpose}</p>
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs text-gray-400">🗓 {s.proposedDate}</span>

                {/* 承諾/辞退ボタン（受け取った・未対応） */}
                {isReceived && s.status === "pending_received" && !isAccepted && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeclinedIds((p) => [...p, s.id])}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      今回は難しい
                    </button>
                    <button
                      onClick={() => setAcceptedIds((p) => [...p, s.id])}
                      className="text-xs px-3 py-1.5 rounded-lg btn-ac bg-green-500 text-white hover:bg-green-600 font-bold"
                    >
                      承諾する ✓
                    </button>
                  </div>
                )}

                {/* 確定後：Slackへの導線 */}
                {isConfirmed && (
                  <button
                    onClick={() =>
                      setSlackContext({
                        fromUser: isReceived ? otherUser : ME,
                        toUser: isReceived ? ME : otherUser,
                        purpose: s.purpose,
                      })
                    }
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#4A154B] text-white hover:bg-[#3a0f3c] transition-colors"
                  >
                    <span className="font-bold">S</span>
                    Slackで連絡する
                    <ExternalLink size={11} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
