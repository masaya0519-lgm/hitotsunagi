import { Target, AlertCircle, Zap, ArrowRight, CheckCircle2, Smile } from "lucide-react";

// ─── データ定義 ───────────────────────────────────────────

const USER_BENEFITS = [
  {
    emoji: "🤝",
    title: "プロジェクトの壁を越えた繋がりができる",
    body: "普段のPJでは出会えない部門・ロールの人と知り合いになれる。社内に「顔見知り」が増えると、仕事のしやすさが変わる。",
  },
  {
    emoji: "💬",
    title: "「あの人に聞けばいい」が社内に見つかる",
    body: "困ったときに頼れる人が可視化される。クライアント対応・提案・PJ運営など、経験者から直接話を聞ける。",
  },
  {
    emoji: "🌱",
    title: "キャリアへの不安を話せる先輩に出会える",
    body: "「自分はどこを目指せばいい？」「このままでいいのか」——そんな悩みを安心して話せる場が生まれる。",
  },
  {
    emoji: "🏢",
    title: "社内の壁がなくなっていく",
    body: "部門・年次・ロールの違いを越えて話せる文化が育つ。気軽に声をかけられる関係が、会社全体を少しずつ変えていく。",
  },
];

const GOAL = {
  headline: "離職率の低下",
  description: "コンサルタントが「この会社で成長し続けたい」と思える環境をつくる",
  conditions: [
    "プロジェクト外でも頼れる先輩・相談できる人がいる",
    "困ったとき（クライアント対応・提案・キャリア）に聞ける人を見つけられる",
    "自分の目指すキャリアパスを歩んでいる先輩が近くにいる",
  ],
};

const PROBLEMS = [
  {
    id: "p1",
    title: "誰が何を知っているかわからない",
    detail: "プロジェクトベースの働き方で常にメンバーが変わるため、社内に誰がいてどんな経験・専門知識を持っているか把握しにくい",
    icon: "🔍",
  },
  {
    id: "p2",
    title: "いても話しかけづらい",
    detail: "忙しそう・面識がない・いきなりDMは重い、という心理的ハードルが行動を阻む。特に上位職や別PJの人には声をかけにくい",
    icon: "🚧",
  },
];

const FEATURES = [
  {
    name: "プロフィール検索",
    screen: "話を聞ける人を探す",
    solves: ["p1"],
    how: "仕事以外の顔（キャリア・話せるテーマ・これまでの会話数）を可視化し、「この人に話を聞いてみたい」が生まれる",
    emoji: "🔎",
  },
  {
    name: "依頼フォーム",
    screen: "話を聞かせてください",
    solves: ["p1", "p2"],
    how: "「相手も話したい」という合意を先に取るフローにすることで、話しかける心理的コストを下げる",
    emoji: "📨",
  },
  {
    name: "Slackへのハンドオフ",
    screen: "Slackで連絡する",
    solves: ["p2"],
    how: "承諾後はSlack DMへ誘導。目的と文脈が共有された状態でコミュニケーションが始まるため、最初の一言が楽になる",
    emoji: "💬",
  },
  {
    name: "マイプロフィール設定",
    screen: "マイプロフィール",
    solves: ["p1"],
    how: "話せるテーマや歓迎メッセージを自分で設定することで、依頼する側が「この人なら話を聞いてもらえそう」と感じやすくなる",
    emoji: "✏️",
  },
  {
    name: "募集ボード",
    screen: "募集ボード",
    solves: ["p1", "p2"],
    how: "「こんな経験を持つ人に話を聞いてほしい」を発信することで、向こうから応じてもらえる。探す方向だけでなく、集まってもらう方向のマッチングを実現",
    emoji: "📣",
  },
];

const STEPS = [
  { step: "01", title: "プロフィールを設定する", detail: "話せるテーマと自己紹介を入力。依頼を受ける側としての準備", screen: "マイプロフィール" },
  { step: "02", title: "話を聞きたい人を探す", detail: "キャリアやテーマで絞り込んで、気になる人を見つける", screen: "話を聞ける人を探す" },
  { step: "03", title: "「話を聞かせてください」と依頼する", detail: "何を聞きたいかを書いて送る。相手に合意の機会が生まれる", screen: "依頼フォーム" },
  { step: "04", title: "承諾されたらSlackで連絡", detail: "日程の細かい調整はSlackで。目的と文脈が共有された状態で始められる", screen: "Slackで連絡する" },
];

const CHANGELOG = [
  {
    version: "v0.7",
    date: "2026-06-10",
    label: "new",
    changes: [
      "「募集ボード」タブを追加：こんな人に話を聞いてほしい、を発信できるように",
      "経験・スキルタグで絞り込み、「応じる」でSlack連絡へシームレスに繋がる",
      "自分の募集は締め切りボタンで随時クローズ可能",
    ],
  },
  {
    version: "v0.6",
    date: "2026-06-10",
    label: "update",
    changes: [
      "マイプロフィール画面を全面刷新：キャリア志向・案件経験・得意分野・性格・ISM・食べ物・趣味すべて編集可能に",
      "依頼フォームにOutlookカレンダー連携を追加：相手の空き時間を取得して候補日を表示・選択できるように",
    ],
  },
  {
    version: "v0.5",
    date: "2026-06-10",
    label: "update",
    changes: [
      "会社業種をITコンサルティングに変更",
      "ユーザーデータをコンサルキャリア（アナリスト〜パートナー）に更新",
      "課題・コンセプト文をコンサル特有の文脈（PJベース・専門分散）に合わせて修正",
    ],
  },
  {
    version: "v0.4",
    date: "2026-06-10",
    label: "new",
    changes: [
      "コンセプト・使い方・変更履歴画面を追加",
    ],
  },
  {
    version: "v0.3",
    date: "2026-06-09",
    label: "update",
    changes: [
      "PCとスマホのレスポンシブ対応（サイドバーナビ・グリッドレイアウト）",
      "プロフィールモーダルをPC向け中央ダイアログに変更",
    ],
  },
  {
    version: "v0.2",
    date: "2026-06-09",
    label: "update",
    changes: [
      "承諾後に「Slackで連絡する」ボタンを追加",
      "Slack DM のイメージ画面を追加（ボットによる依頼内容通知 → 日程調整の会話例）",
      "アプリとSlackのすみわけを画面上で表現",
    ],
  },
  {
    version: "v0.1",
    date: "2026-06-09",
    label: "new",
    changes: [
      "初期実装：社内OB訪問アプリとして再設計（マッチングアプリから方針転換）",
      "探す・依頼管理・マイプロフィールの3画面",
      "依頼フォーム（目的入力＋テンプレート）",
      "プロフィール詳細モーダル（キャリアパス・話せるテーマ）",
    ],
  },
];

// ─── ラベルバッジ ─────────────────────────────────────────

function LabelBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    new: "bg-green-100 text-green-700",
    update: "bg-blue-100 text-blue-700",
    fix: "bg-amber-100 text-amber-700",
  };
  const text: Record<string, string> = { new: "NEW", update: "UPDATE", fix: "FIX" };
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${styles[label] ?? "bg-gray-100 text-gray-500"}`}>
      {text[label] ?? label}
    </span>
  );
}

// ─── メインコンポーネント ─────────────────────────────────

export default function HelpTab() {
  const problemMap = Object.fromEntries(PROBLEMS.map((p) => [p.id, p]));

  return (
    <div className="px-4 md:px-8 pt-4 pb-12 flex flex-col gap-10 max-w-3xl mx-auto">

      {/* ── 1. ユーザーへの価値（ファーストビュー） ── */}
      <section>
        <SectionHeader icon={<Smile size={16} />} label="ひとつなぎ で変わること" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {USER_BENEFITS.map((b) => (
            <div key={b.title} className="bg-white border-2 border-green-50 rounded-2xl p-4 hover:border-green-200 transition-colors">
              <div className="text-2xl mb-2">{b.emoji}</div>
              <p className="font-semibold text-gray-900 text-sm mb-1.5">{b.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. 解決する課題 ── */}
      <section>
        <SectionHeader icon={<AlertCircle size={16} />} label="解決する課題" />
        <div className="flex flex-col md:flex-row gap-3">
          {PROBLEMS.map((p) => (
            <div key={p.id} className="flex-1 bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-2xl mb-2">{p.icon}</div>
              <p className="font-semibold text-gray-900 text-sm mb-1.5">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. 機能と課題のマッピング ── */}
      <section>
        <SectionHeader icon={<Zap size={16} />} label="機能が課題をどう解決するか" />
        <div className="flex flex-col gap-3">
          {FEATURES.map((f) => (
            <div key={f.name} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{f.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-semibold text-sm text-gray-900">{f.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{f.screen}</span>
                  </div>
                  {/* 解決する課題タグ */}
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    {f.solves.map((pid) => (
                      <span key={pid} className="flex items-center gap-1 text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                        <AlertCircle size={10} />
                        {problemMap[pid]?.title}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.how}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. 経営層・導入担当者向け（管理者向け） ── */}
      <section>
        <SectionHeader icon={<Target size={16} />} label="導入担当者・経営層向け：目指す状態" />
        <div className="bg-indigo-600 rounded-2xl p-5 text-white">
          <p className="text-xl font-bold mb-1">{GOAL.headline}</p>
          <p className="text-indigo-200 text-sm mb-4">{GOAL.description}</p>
          <div className="flex flex-col gap-2">
            {GOAL.conditions.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="text-indigo-300 mt-0.5 shrink-0" />
                <span className="text-sm text-indigo-100">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. 使い方 ── */}
      <section>
        <SectionHeader icon={<ArrowRight size={16} />} label="使い方" />
        <div className="flex flex-col gap-0">
          {STEPS.map((s, i) => (
            <div key={s.step} className="flex gap-4">
              {/* ステップ縦線 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 bg-indigo-200 flex-1 my-1" style={{ minHeight: 24 }} />
                )}
              </div>
              {/* コンテンツ */}
              <div className={`pb-6 flex-1 min-w-0 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-semibold text-sm text-gray-900">{s.title}</span>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{s.screen}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. 変更履歴 ── */}
      <section>
        <SectionHeader icon={<span className="text-sm">📋</span>} label="変更履歴" />
        <div className="flex flex-col gap-4">
          {CHANGELOG.map((entry) => (
            <div key={entry.version} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-sm text-gray-900">{entry.version}</span>
                <LabelBadge label={entry.label} />
                <span className="text-xs text-gray-400 ml-auto">{entry.date}</span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {entry.changes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-gray-300 mt-0.5 shrink-0">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-indigo-500">{icon}</span>
      <h3 className="font-bold text-gray-900 text-sm">{label}</h3>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
