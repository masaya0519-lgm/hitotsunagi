import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import {
  ME,
  CAREER_ORIENTATIONS, EXPERTISE_AREAS, PERSONALITIES, WORK_ISMS, MEET_STYLES,
  INDUSTRIES, PHASES, TECHS, MBTI_TYPES, FFS_TYPES, STATUS_OPTIONS,
} from "../data/mock";
import type { User, ProjectExp, UserStatusId } from "../data/mock";

// ─── 汎用UIパーツ ─────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{children}</p>;
}

function TagToggle({
  items, selected, onToggle, color = "rose",
}: {
  items: string[]; selected: string[]; onToggle: (v: string) => void; color?: string;
}) {
  const active: Record<string, string> = {
    rose: "bg-green-600 text-white border-green-600",
    rose:   "bg-green-500 text-white border-green-500",
    amber:  "bg-yellow-400 text-white border-yellow-400",
    emerald:"bg-emerald-600 text-white border-emerald-600",
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${
            selected.includes(item) ? (active[color] ?? active.rose) : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          {selected.includes(item) ? <Check size={10} /> : <Plus size={10} />}
          {item}
        </button>
      ))}
    </div>
  );
}

// ─── 案件経験の追加フォーム ───────────────────────────────

function ProjectExpEditor({
  experiences, onChange,
}: {
  experiences: ProjectExp[];
  onChange: (v: ProjectExp[]) => void;
}) {
  const [draft, setDraft] = useState<ProjectExp>({ industry: "", phase: "", tech: "" });

  function addExp() {
    if (!draft.industry || !draft.phase || !draft.tech) return;
    onChange([...experiences, draft]);
    setDraft({ industry: "", phase: "", tech: "" });
  }

  return (
    <div className="flex flex-col gap-2">
      {experiences.map((exp, i) => (
        <div key={i} className="flex items-center gap-1.5 flex-wrap bg-gray-50 rounded-xl px-3 py-2">
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">{exp.industry}</span>
          <span className="text-xs text-gray-400">×</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{exp.phase}</span>
          <span className="text-xs text-gray-400">×</span>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">{exp.tech}</span>
          <button
            onClick={() => onChange(experiences.filter((_, j) => j !== i))}
            className="ml-auto text-gray-300 hover:text-red-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <div className="grid grid-cols-3 gap-2">
        {([
          { key: "industry" as const, label: "業界", opts: INDUSTRIES },
          { key: "phase" as const,    label: "フェーズ", opts: PHASES },
          { key: "tech" as const,     label: "技術", opts: TECHS },
        ]).map(({ key, label, opts }) => (
          <select
            key={key}
            value={draft[key]}
            onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
            className="text-xs border border-gray-200 rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="">{label}</option>
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <button
        onClick={addExp}
        disabled={!draft.industry || !draft.phase || !draft.tech}
        className="text-xs flex items-center gap-1 text-rose-600 hover:text-rose-800 disabled:opacity-40 disabled:cursor-not-allowed self-start"
      >
        <Plus size={12} /> 案件経験を追加
      </button>
    </div>
  );
}

// ─── フリータグ入力 ───────────────────────────────────────

function FreeTagInput({
  tags, onChange, placeholder,
}: {
  tags: string[]; onChange: (v: string[]) => void; placeholder: string;
}) {
  const [input, setInput] = useState("");

  function add() {
    const val = input.trim();
    if (!val || tags.includes(val)) return;
    onChange([...tags, val]);
    setInput("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="flex items-center gap-1 text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full">
            {t}
            <button onClick={() => onChange(tags.filter((x) => x !== t))} className="text-rose-300 hover:text-rose-600">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder}
          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          onClick={add}
          className="text-xs px-3 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors"
        >
          追加
        </button>
      </div>
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────────

export default function MyPageTab() {
  const [form, setForm] = useState<User>({ ...ME });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof User>(key: K, value: User[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function toggleArr(key: keyof User, value: string) {
    const arr = form[key] as string[];
    set(key, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-4 md:px-6 pt-4 pb-12 flex flex-col gap-6 max-w-2xl mx-auto">

      {/* ── いまのきもち（ステータス） ── */}
      <div className="bg-white rounded-3xl shadow-sm p-5">
        <p className="text-sm font-bold text-gray-700 mb-3">🌿 いまのきもち</p>
        <div className="grid grid-cols-2 gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.id ?? "none"}
              onClick={() => set("status", (form.status === s.id ? null : s.id) as UserStatusId)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 text-sm font-bold transition-all ${
                form.status === s.id
                  ? `${s.color} ${s.textColor} border-current shadow-sm`
                  : "bg-gray-50 text-gray-500 border-transparent hover:bg-green-50"
              }`}
            >
              <span className="text-xl">{s.emoji}</span>
              {s.label}
            </button>
          ))}
          <button
            onClick={() => set("status", null)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 text-sm font-bold transition-all col-span-2 ${
              !form.status
                ? "bg-gray-100 text-gray-600 border-gray-200"
                : "bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">😶</span>
            なにもなし
          </button>
        </div>
      </div>

      {/* ── 基本情報（HRシステム連携・読み取り専用） ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-4xl ring-4 ring-white shadow-sm">
          {ME.avatar}
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-900 text-lg">{ME.name}</h2>
          <p className="text-sm text-gray-500">{ME.department} · {ME.role}</p>
          <p className="text-xs text-gray-400 mt-0.5">{ME.yearsAtCompany}年目 · {ME.sessionCount}人と話しました</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-lg">HRシステム連携</span>
      </div>

      {/* ── キャリア志向 ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <SectionLabel>キャリア志向</SectionLabel>
        <div className="flex flex-col gap-2">
          {CAREER_ORIENTATIONS.map((o) => (
            <button
              key={o}
              onClick={() => set("careerOrientation", o)}
              className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border text-left transition-all ${
                form.careerOrientation === o
                  ? "border-green-500 bg-green-50 text-green-700 font-medium"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {form.careerOrientation === o && <Check size={14} className="shrink-0" />}
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* ── 案件経験 ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <SectionLabel>案件経験（業界 × フェーズ × 技術）</SectionLabel>
        <ProjectExpEditor
          experiences={form.projectExperiences}
          onChange={(v) => set("projectExperiences", v)}
        />
      </div>

      {/* ── 得意分野 ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <SectionLabel>得意分野</SectionLabel>
        <TagToggle
          items={EXPERTISE_AREAS}
          selected={form.expertiseAreas}
          onToggle={(v) => toggleArr("expertiseAreas", v)}
          color="rose"
        />
      </div>

      {/* ── 話せるテーマ（自由入力） ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <SectionLabel>話せるテーマ</SectionLabel>
        <FreeTagInput
          tags={form.talkTopics}
          onChange={(v) => set("talkTopics", v)}
          placeholder="例：提案書の作り方、PMOの立ち上げ方"
        />
      </div>

      {/* ── 性格・ISM ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4">
        <div>
          <SectionLabel>性格タイプ</SectionLabel>
          <TagToggle
            items={PERSONALITIES}
            selected={form.personality}
            onToggle={(v) => toggleArr("personality", v)}
            color="rose"
          />
        </div>
        <div>
          <SectionLabel>好きなISM</SectionLabel>
          <TagToggle
            items={WORK_ISMS}
            selected={form.workIsms}
            onToggle={(v) => toggleArr("workIsms", v)}
            color="amber"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <SectionLabel>MBTI</SectionLabel>
            <select
              value={form.mbti ?? ""}
              onChange={(e) => set("mbti", e.target.value || undefined)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">未設定</option>
              {MBTI_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <SectionLabel>FFS 第一因子</SectionLabel>
            <select
              value={form.ffs ?? ""}
              onChange={(e) => set("ffs", e.target.value || undefined)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">未設定</option>
              {FFS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── アイスブレイク ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4">
        <div>
          <SectionLabel>好きな食べ物</SectionLabel>
          <FreeTagInput
            tags={form.favoriteFoods}
            onChange={(v) => set("favoriteFoods", v)}
            placeholder="例：ラーメン、コーヒー"
          />
        </div>
        <div>
          <SectionLabel>趣味</SectionLabel>
          <FreeTagInput
            tags={form.hobbies}
            onChange={(v) => set("hobbies", v)}
            placeholder="例：登山、個人開発"
          />
        </div>
      </div>

      {/* ── 会いやすい時間帯 ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <SectionLabel>会いやすい時間帯</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {MEET_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => set("meetStyle", s)}
              className={`text-sm px-4 py-2 rounded-full border transition-all ${
                form.meetStyle === s
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── テキスト入力 ── */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4">
        <div>
          <SectionLabel>依頼者へのメッセージ</SectionLabel>
          <textarea
            value={form.welcomeMessage}
            onChange={(e) => set("welcomeMessage", e.target.value)}
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
          />
        </div>
        <div>
          <SectionLabel>自己紹介</SectionLabel>
          <textarea
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
          />
        </div>
      </div>

      {/* ── 保存 ── */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-2xl font-semibold text-base transition-all ${
          saved ? "bg-green-500 text-white" : "btn-ac bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {saved ? "✓ 保存しました" : "プロフィールを保存"}
      </button>
    </div>
  );
}
