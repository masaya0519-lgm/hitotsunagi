import { X, Hash, ChevronDown, Plus, Smile, Paperclip, Send } from "lucide-react";
import type { User } from "../data/mock";

type Props = {
  fromUser: User;
  toUser: User;
  purpose: string;
  onClose: () => void;
};

type Message = {
  userId: string;
  time: string;
  text: string;
  isBot?: boolean;
};

export default function SlackMock({ fromUser, toUser, purpose, onClose }: Props) {
  const messages: Message[] = [
    {
      userId: "bot",
      time: "10:31",
      isBot: true,
      text: `✅ *社内OB訪問アプリ* より\n\n*${toUser.name}さん*が依頼を承諾しました！\n\n> 📋 ${purpose}\n\nSlackで直接連絡して、日程を決めましょう。`,
    },
    {
      userId: fromUser.id,
      time: "10:35",
      text: `${toUser.name}さん、承諾いただきありがとうございます！\nご都合の良い日程を教えていただけますか？`,
    },
    {
      userId: toUser.id,
      time: "10:52",
      text: `こちらこそよろしくお願いします！\n来週水曜日の12:00〜13:00はいかがでしょうか？ランチがてらどうぞ 🍱`,
    },
    {
      userId: fromUser.id,
      time: "10:55",
      text: `ありがとうございます！\n来週水曜12時、承知しました 🙌\nZoomのURLを後ほど送ります！`,
    },
    {
      userId: toUser.id,
      time: "10:56",
      text: `了解です！楽しみにしています 😊`,
    },
  ];

  const allUsers: Record<string, User & { color: string }> = {
    [fromUser.id]: { ...fromUser, color: "bg-indigo-500" },
    [toUser.id]: { ...toUser, color: "bg-emerald-500" },
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 md:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

        {/* ── Slack chrome ── */}
        <div className="flex h-full overflow-hidden" style={{ fontFamily: "'Lato', system-ui, sans-serif" }}>

          {/* Sidebar */}
          <div className="w-48 md:w-56 bg-[#3f0f40] flex flex-col shrink-0">
            <div className="px-3 py-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm truncate">株式会社サンプル</span>
                <ChevronDown size={14} className="text-white/60 shrink-0" />
              </div>
              <p className="text-white/50 text-xs mt-0.5">{fromUser.name}</p>
            </div>

            <div className="px-2 py-3 flex flex-col gap-0.5 text-sm">
              <p className="text-white/40 text-xs px-2 mb-1 font-semibold uppercase tracking-wide">チャンネル</p>
              {["general", "random", "times-yamamoto"].map((ch) => (
                <button key={ch} className="flex items-center gap-1.5 px-2 py-1 rounded text-white/60 hover:bg-white/10 text-xs text-left">
                  <Hash size={13} /> {ch}
                </button>
              ))}

              <p className="text-white/40 text-xs px-2 mt-3 mb-1 font-semibold uppercase tracking-wide">ダイレクトメッセージ</p>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded bg-white/20 text-white text-xs text-left">
                <span className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-[11px] shrink-0">
                  {toUser.avatar}
                </span>
                <span className="truncate font-semibold">{toUser.name}</span>
              </button>
              <button className="flex items-center gap-1.5 px-2 py-1 rounded text-white/40 hover:bg-white/10 text-xs">
                <Plus size={13} /> DM を追加
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* DM header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-emerald-500 flex items-center justify-center text-sm">
                  {toUser.avatar}
                </div>
                <div>
                  <span className="font-bold text-sm text-gray-900">{toUser.name}</span>
                  <span className="ml-2 text-xs text-green-500">● オンライン</span>
                </div>
              </div>
              <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-white">
              {messages.map((msg, i) => {
                if (msg.isBot) {
                  return (
                    <div key={i} className="flex gap-2.5">
                      <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center shrink-0 text-xs text-white font-bold mt-0.5">
                        OB
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-900">社内OB訪問アプリ</span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 rounded font-medium">APP</span>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 leading-relaxed">
                          {msg.text.split("\n").map((line, j) => {
                            if (line.startsWith("> ")) {
                              return (
                                <div key={j} className="border-l-4 border-indigo-400 pl-2 my-1 text-gray-600 italic">
                                  {line.slice(2)}
                                </div>
                              );
                            }
                            if (line.startsWith("*") && line.endsWith("*")) {
                              return <p key={j} className="font-bold">{line.slice(1, -1)}</p>;
                            }
                            return <p key={j}>{line}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                const user = allUsers[msg.userId];
                if (!user) return null;
                const isMe = msg.userId === fromUser.id;

                return (
                  <div key={i} className="flex gap-2.5">
                    <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 text-base mt-0.5 ${user.color}`}>
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">{user.name}</span>
                        {isMe && <span className="text-[10px] text-gray-400">（自分）</span>}
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white shrink-0">
              <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-white">
                <Plus size={16} className="text-gray-400 shrink-0" />
                <input
                  readOnly
                  placeholder={`${toUser.name}さんにメッセージを送る`}
                  className="flex-1 text-sm text-gray-400 bg-transparent outline-none cursor-default"
                />
                <div className="flex items-center gap-2 text-gray-400">
                  <Paperclip size={15} />
                  <Smile size={15} />
                  <Send size={15} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        イメージ：承諾後のSlack DM
      </div>
    </div>
  );
}
