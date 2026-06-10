import { useState, useEffect } from "react";
import { X, ChevronRight, RefreshCw, Calendar } from "lucide-react";
import type { User } from "../data/mock";

type Props = { user: User; onClose: () => void; onSubmit: () => void; };

const suggestedPurposes = [
  "キャリアパスについて話を聞きたい",
  "転職・異動を考えていて相談したい",
  "スキルアップの方向性を聞きたい",
  "日々の仕事の悩みを相談したい",
  "マネジメントについて学びたい",
];

type Slot = { id: string; label: string; date: string; time: string; type: "lunch" | "evening" };

function generateOutlookSlots(): { week: string; slots: Slot[] }[] {
  return [
    { week: "今週 (6/10–6/13)", slots: [
      { id: "w1_1", label: "6/11 (木)", date: "6月11日（木）", time: "12:00–13:00", type: "lunch" },
      { id: "w1_2", label: "6/12 (金)", date: "6月12日（金）", time: "18:30–19:30", type: "evening" },
    ]},
    { week: "来週 (6/15–6/19)", slots: [
      { id: "w2_1", label: "6/15 (月)", date: "6月15日（月）", time: "12:00–13:00", type: "lunch" },
      { id: "w2_2", label: "6/17 (水)", date: "6月17日（水）", time: "18:00–19:00", type: "evening" },
      { id: "w2_3", label: "6/18 (木)", date: "6月18日（木）", time: "12:15–13:00", type: "lunch" },
      { id: "w2_4", label: "6/19 (金)", date: "6月19日（金）", time: "18:30–19:30", type: "evening" },
    ]},
    { week: "再来週以降", slots: [
      { id: "w3_1", label: "6/22 (月)", date: "6月22日（月）", time: "12:00–13:00", type: "lunch" },
      { id: "w3_2", label: "6/24 (水)", date: "6月24日（水）", time: "18:00–19:00", type: "evening" },
    ]},
  ];
}

function OutlookPanel({ userName, selectedId, onSelect }: {
  userName: string; selectedId: string; onSelect: (slot: Slot) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  function refresh() { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); }

  const groups = generateOutlookSlots();

  return (
    <div className="rounded-2xl border border-orange-100 overflow-hidden">
      <div className="bg-[#0078d4] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Calendar size={14} />
          <span className="text-xs font-semibold">Outlook 予定表</span>
          <span className="text-xs text-blue-200 ml-1">· {userName}さんの空き時間</span>
        </div>
        <button onClick={refresh} className={`text-blue-200 hover:text-white transition-all ${refreshing ? "animate-spin" : ""}`}>
          <RefreshCw size={12} />
        </button>
      </div>

      {loading ? (
        <div className="py-8 flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-400">{userName}さんの予定を確認しています…</p>
        </div>
      ) : (
        <div className="divide-y divide-rose-50">
          {groups.map((group) => (
            <div key={group.week} className="px-4 py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">{group.week}</p>
              <div className="flex flex-col gap-1.5">
                {group.slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => onSelect(slot)}
                    className={`flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border transition-all ${
                      selectedId === slot.id
                        ? "border-[#0078d4] bg-blue-50"
                        : "border-rose-50 bg-gray-50 hover:border-green-100"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${slot.type === "lunch" ? "bg-emerald-400" : "bg-orange-400"}`} />
                    <div className="flex-1">
                      <span className={`text-sm font-medium ${selectedId === slot.id ? "text-[#0078d4]" : "text-gray-700"}`}>
                        {slot.date}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{slot.time}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${slot.type === "lunch" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
                      {slot.type === "lunch" ? "ランチ" : "夕方"}
                    </span>
                    {selectedId === slot.id && (
                      <div className="w-4 h-4 rounded-full bg-[#0078d4] flex items-center justify-center shrink-0">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="px-4 py-3">
            <button
              onClick={() => onSelect({ id: "slack", label: "Slackで相談", date: "", time: "", type: "lunch" })}
              className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl border transition-all ${
                selectedId === "slack" ? "border-[#4A154B] bg-purple-50" : "border-rose-50 bg-gray-50 hover:border-green-100"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4A154B] shrink-0" />
              <span className={`text-sm ${selectedId === "slack" ? "text-[#4A154B] font-medium" : "text-gray-600"}`}>
                日程はSlackで相談する
              </span>
              {selectedId === "slack" && (
                <div className="w-4 h-4 rounded-full bg-[#4A154B] flex items-center justify-center shrink-0 ml-auto">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          </div>
          <div className="px-4 py-2">
            <p className="text-[10px] text-gray-300">空き時間はOutlookの予定表から自動取得しています</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RequestModal({ user, onClose, onSubmit }: Props) {
  const [purpose, setPurpose]       = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep]             = useState<"form" | "done">("form");

  function handleSubmit() {
    if (!purpose.trim() || !selectedSlot) return;
    setStep("done");
    setTimeout(() => { onSubmit(); }, 2000);
  }

  if (step === "done") {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-xl max-w-xs w-full">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">送りました！</h3>
          <p className="text-sm text-gray-500">
            {user.name}さんから返信が届いたら<br />通知でお知らせします
          </p>
          {selectedSlot && selectedSlot.id !== "slack" && (
            <p className="mt-3 text-xs text-gray-400 bg-rose-50 rounded-xl p-2">
              候補日: {selectedSlot.date} {selectedSlot.time}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div
        className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white pt-4 px-5 pb-3 border-b border-rose-50">
          <div className="w-10 h-1 bg-rose-200 rounded-full mx-auto mb-4 md:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">声をかけてみる ✉</h2>
              <p className="text-xs text-gray-400">{user.name}さんへ</p>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
          </div>
        </div>

        <div className="px-5 py-4 flex flex-col gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              どんなことを話したい？ <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="例：PMキャリアについて聞きたい、SAP導入プロジェクトの進め方を教えてほしいです"
              rows={4}
              className="w-full border border-green-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 resize-none"
            />
            <div className="mt-2 flex flex-col gap-1.5">
              <p className="text-xs text-gray-400">テンプレートから選ぶ</p>
              {suggestedPurposes.map((s) => (
                <button
                  key={s}
                  onClick={() => setPurpose(s)}
                  className="flex items-center justify-between text-left text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                >
                  {s}
                  <ChevronRight size={12} className="shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              候補日を選んでください <span className="text-rose-400">*</span>
            </label>
            <OutlookPanel
              userName={user.name}
              selectedId={selectedSlot?.id ?? ""}
              onSelect={setSelectedSlot}
            />
          </div>

          <p className="text-xs text-gray-400 bg-rose-50/60 rounded-xl p-3 leading-relaxed">
            💡 承認されたら、Slack DMで日程の詳細を調整できます。
          </p>
        </div>

        <div className="px-5 pb-8 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!purpose.trim() || !selectedSlot}
            className="btn-ac w-full bg-green-500 text-white font-extrabold py-4 rounded-2xl hover:bg-green-600 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            送ってみる ✉
          </button>
        </div>
      </div>
    </div>
  );
}
