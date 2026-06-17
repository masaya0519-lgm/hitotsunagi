import { useState } from "react";
import { Plus, X, Check, Users, Clock, ChevronRight, Megaphone, Briefcase } from "lucide-react";
import { boshuuList, projectPostings, users, ME, EXPERTISE_AREAS, MEET_STYLES, PROJECT_CATEGORIES, PROJECT_FREQUENCIES } from "../data/mock";
import type { Boshuu, ProjectPosting, User } from "../data/mock";
import SlackMock from "./SlackMock";

type Mode = "boshuu" | "project";

// ─── ユーザー解決 ─────────────────────────────────────────

function resolveUser(id: string): User {
  if (id === "me") return ME;
  return users.find((u) => u.id === id) ?? ME;
}

// ─── OB訪問・相談募集 作成モーダル ───────────────────────

type CreateModalProps = { onClose: () => void; onCreate: (post: Boshuu) => void };

function CreateModal({ onClose, onCreate }: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState("");
  const [time, setTime] = useState("");

  function toggleTag(t: string) {
    setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }

  function handleSubmit() {
    if (!title.trim() || !time) return;
    onCreate({
      id: `b${Date.now()}`,
      authorId: "me",
      title: title.trim(),
      tags,
      body: body.trim(),
      timePreference: time,
      createdAt: new Date().toISOString().slice(0, 10),
      respondentCount: 0,
      status: "open",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white pt-4 px-5 pb-3 border-b border-gray-100">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">相談募集を投稿する</h2>
              <p className="text-xs text-gray-400">こんな人に話を聞いてほしい、を発信しよう</p>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
          </div>
        </div>
        <div className="px-5 py-4 flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">何を話したいですか？ <span className="text-red-400">*</span></label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：初めてのPL、心構えを教えてください" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">どんな経験を持つ人を探していますか？</label>
            <div className="flex flex-wrap gap-1.5">
              {EXPERTISE_AREAS.map((t) => (
                <button key={t} onClick={() => toggleTag(t)} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${tags.includes(t) ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                  {tags.includes(t) ? <Check size={10} /> : <Plus size={10} />}{t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">詳細（任意）</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="背景や聞きたいことをもう少し詳しく書くと応じてもらいやすくなります" rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">希望の時間帯 <span className="text-red-400">*</span></label>
            <div className="flex flex-wrap gap-2">
              {MEET_STYLES.map((s) => (
                <button key={s} onClick={() => setTime(s)} className={`text-sm px-4 py-2 rounded-full border transition-all ${time === s ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 pb-8 pt-2">
          <button onClick={handleSubmit} disabled={!title.trim() || !time} className="btn-ac w-full bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-600 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
            募集を投稿する
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 社内活動・PJ公募 作成モーダル ──────────────────────

type CreateProjectModalProps = { onClose: () => void; onCreate: (p: ProjectPosting) => void };

function CreateProjectModal({ onClose, onCreate }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [overview, setOverview] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("");
  const [headcount, setHeadcount] = useState("5");
  const [requirements, setRequirements] = useState<string[]>([]);

  function toggleReq(t: string) {
    setRequirements((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }

  const canSubmit = projectName.trim() && overview.trim() && category && frequency;

  function handleSubmit() {
    if (!canSubmit) return;
    onCreate({
      id: `pj${Date.now()}`,
      ownerId: "me",
      projectName: projectName.trim(),
      overview: overview.trim(),
      category,
      frequency,
      headcount: Number(headcount),
      requirements,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "open",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white pt-4 px-5 pb-3 border-b border-gray-100">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">活動・PJを登録する</h2>
              <p className="text-xs text-gray-400">勉強会・部活・社内PJなんでもOK</p>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
          </div>
        </div>
        <div className="px-5 py-4 flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">名前 <span className="text-red-400">*</span></label>
            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="例：AWS勉強会、フットサル部、読書会" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">どんな活動？ <span className="text-red-400">*</span></label>
            <textarea value={overview} onChange={(e) => setOverview(e.target.value)} placeholder="活動内容や雰囲気、参加するとどうなるかを書いてください" rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">カテゴリ <span className="text-red-400">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {PROJECT_CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setCategory(c.id)} className={`flex items-center gap-1.5 text-xs px-3 py-2.5 rounded-xl border font-medium transition-all ${category === c.id ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}>
                  <span>{c.emoji}</span>{c.id}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">活動頻度 <span className="text-red-400">*</span></label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_FREQUENCIES.map((f) => (
                <button key={f} onClick={() => setFrequency(f)} className={`text-sm px-4 py-2 rounded-full border transition-all ${frequency === f ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">募集人数（目安）</label>
            <div className="flex gap-2 flex-wrap">
              {["3","5","10","15","20","制限なし"].map((n) => (
                <button key={n} onClick={() => setHeadcount(n)} className={`text-sm px-4 py-2 rounded-full border transition-all ${headcount === n ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>{n === "制限なし" ? n : `${n}名`}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">こんな人に来てほしい（任意）</label>
            <div className="flex flex-wrap gap-1.5">
              {EXPERTISE_AREAS.map((t) => (
                <button key={t} onClick={() => toggleReq(t)} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${requirements.includes(t) ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                  {requirements.includes(t) ? <Check size={10} /> : <Plus size={10} />}{t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 pb-8 pt-2">
          <button onClick={handleSubmit} disabled={!canSubmit} className="btn-ac w-full bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-600 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
            登録する
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── OB訪問 声かけ確認モーダル ───────────────────────────

type RespondModalProps = { post: Boshuu; onClose: () => void; onConfirm: () => void };

function RespondModal({ post, onClose, onConfirm }: RespondModalProps) {
  const author = resolveUser(post.authorId);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div className="bg-white w-full md:max-w-sm md:rounded-3xl rounded-t-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="pt-4 px-5 pb-2 text-center">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-3xl mx-auto mb-3">{author.avatar}</div>
          <h3 className="font-bold text-gray-900 mb-1">「{post.title.length > 20 ? post.title.slice(0, 20) + "…" : post.title}」に声をかける</h3>
          <p className="text-sm text-gray-500 mb-1">{author.name}さんへ</p>
          <p className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 mt-3 text-left leading-relaxed">声をかけると {author.name}さんにSlackで通知が届きます。日程は直接Slackで調整できます。</p>
        </div>
        <div className="px-5 pb-8 pt-4 flex flex-col gap-2">
          <button onClick={onConfirm} className="btn-ac w-full bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-600">声をかける</button>
          <button onClick={onClose} className="w-full text-gray-500 font-medium py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm">キャンセル</button>
        </div>
      </div>
    </div>
  );
}

// ─── PJ参加 手を挙げる確認モーダル ───────────────────────

type RaiseHandModalProps = { post: ProjectPosting; onClose: () => void; onConfirm: () => void };

function RaiseHandModal({ post, onClose, onConfirm }: RaiseHandModalProps) {
  const manager = resolveUser(post.ownerId);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div className="bg-white w-full md:max-w-sm md:rounded-3xl rounded-t-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="pt-4 px-5 pb-2 text-center">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />
          <div className="text-3xl mb-2">🙋</div>
          <h3 className="font-bold text-gray-900 mb-1">「{post.projectName}」に手を挙げる</h3>
          <p className="text-sm text-gray-500 mb-1">PM: {manager.name}さんへ</p>
          <p className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 mt-3 text-left leading-relaxed">{manager.name}さんにSlackで通知が届きます。詳細はSlackで直接確認できます。</p>
        </div>
        <div className="px-5 pb-8 pt-4 flex flex-col gap-2">
          <button onClick={onConfirm} className="btn-ac w-full bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-600">手を挙げる 🙋</button>
          <button onClick={onClose} className="w-full text-gray-500 font-medium py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm">キャンセル</button>
        </div>
      </div>
    </div>
  );
}

// ─── OB訪問カード ─────────────────────────────────────────

type BoshuuCardProps = { post: Boshuu; responded: boolean; onRespond: () => void; onClose?: () => void };

function BoshuuCard({ post, responded, onRespond, onClose }: BoshuuCardProps) {
  const author = resolveUser(post.authorId);
  const isMe = post.authorId === "me";
  return (
    <div className={`bg-white rounded-2xl p-5 flex flex-col gap-3 border ${isMe ? "border-green-200" : "border-gray-100"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-xl shrink-0">{author.avatar}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-gray-900">{author.name}</span>
              {isMe && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md font-medium">自分の募集</span>}
            </div>
            <p className="text-xs text-gray-500">{author.department} · {author.role}</p>
          </div>
        </div>
        {isMe && onClose && (
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 shrink-0 flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1">
            <X size={10} /> 締め切る
          </button>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{post.title}</h3>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => <span key={t} className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">{t}</span>)}
        </div>
      )}
      {post.body && <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{post.body}</p>}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Clock size={11} />{post.timePreference}</span>
          <span className="flex items-center gap-1"><Users size={11} />{post.respondentCount + (responded ? 1 : 0)}人が応じました</span>
        </div>
        {!isMe && (
          responded
            ? <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full"><Check size={11} /> 応じました</span>
            : <button onClick={onRespond} className="flex items-center gap-1 text-xs text-green-700 font-medium bg-green-50 hover:bg-green-100 transition-colors px-3 py-1.5 rounded-full">声をかける <ChevronRight size={11} /></button>
        )}
      </div>
    </div>
  );
}

// ─── 社内活動カード ───────────────────────────────────────

type ProjectCardProps = { post: ProjectPosting; raised: boolean; onRaise: () => void; onClose?: () => void };

function ProjectCard({ post, raised, onRaise, onClose }: ProjectCardProps) {
  const owner = resolveUser(post.ownerId);
  const isMe = post.ownerId === "me";
  const catEmoji = PROJECT_CATEGORIES.find((c) => c.id === post.category)?.emoji ?? "💡";

  return (
    <div className={`bg-white rounded-2xl p-5 flex flex-col gap-3 border ${isMe ? "border-green-200" : "border-gray-100"}`}>
      {/* オーナー */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center text-xl shrink-0">{owner.avatar}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-gray-900">{owner.name}</span>
              {isMe && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md font-medium">自分の投稿</span>}
            </div>
            <p className="text-xs text-gray-500">{owner.role}</p>
          </div>
        </div>
        {isMe && onClose && (
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 shrink-0 flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1">
            <X size={10} /> 締め切る
          </button>
        )}
      </div>

      {/* 活動名 + カテゴリバッジ */}
      <div className="flex items-start gap-2">
        <span className="text-xl shrink-0 mt-0.5">{catEmoji}</span>
        <div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug">{post.projectName}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">{post.category}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1"><Clock size={10} />{post.frequency}</span>
          </div>
        </div>
      </div>

      {/* 概要 */}
      <p className="text-xs text-gray-600 leading-relaxed">{post.overview}</p>

      {/* 求める人 */}
      {post.requirements.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-gray-400">こんな人歓迎 →</span>
          {post.requirements.map((r) => <span key={r} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">{r}</span>)}
        </div>
      )}

      {/* フッター */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Users size={11} />
          {post.headcount === 0 ? "制限なし" : `${post.headcount}名募集中`}
        </span>
        {!isMe && (
          raised
            ? <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full"><Check size={11} /> 参加表明しました</span>
            : <button onClick={onRaise} className="flex items-center gap-1 text-xs text-green-700 font-medium bg-green-50 hover:bg-green-100 transition-colors px-3 py-1.5 rounded-full">参加したい 🙋 <ChevronRight size={11} /></button>
        )}
      </div>
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────────

export default function BoshuuTab() {
  const [mode, setMode] = useState<Mode>("boshuu");

  // OB訪問・相談募集
  const [posts, setPosts] = useState<Boshuu[]>([...boshuuList]);
  const [respondedIds, setRespondedIds] = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [respondTarget, setRespondTarget] = useState<Boshuu | null>(null);
  const [slackTarget, setSlackTarget] = useState<{ post: Boshuu; author: User } | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // PJ公募
  const [projects, setProjects] = useState<ProjectPosting[]>([...projectPostings]);
  const [raisedIds, setRaisedIds] = useState<Set<string>>(new Set());
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [raiseTarget, setRaiseTarget] = useState<ProjectPosting | null>(null);
  const [projectSlackTarget, setProjectSlackTarget] = useState<{ post: ProjectPosting; owner: User } | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const displayedPosts = (filterTag ? posts.filter((p) => p.tags.includes(filterTag) && p.status === "open") : posts.filter((p) => p.status === "open"));
  const displayedProjects = projects.filter((p) => p.status === "open");

  function handleConfirmRespond() {
    if (!respondTarget) return;
    setRespondedIds((prev) => new Set([...prev, respondTarget.id]));
    const author = resolveUser(respondTarget.authorId);
    setSlackTarget({ post: respondTarget, author });
    setRespondTarget(null);
  }

  function handleConfirmRaise() {
    if (!raiseTarget) return;
    setRaisedIds((prev) => new Set([...prev, raiseTarget.id]));
    const owner = resolveUser(raiseTarget.ownerId);
    setProjectSlackTarget({ post: raiseTarget, owner });
    setRaiseTarget(null);
  }

  return (
    <div className="px-4 md:px-6 pt-4 pb-20 flex flex-col gap-4 max-w-2xl mx-auto">

      {/* ── モード切替 ── */}
      <div className="flex bg-green-50/60 rounded-xl p-1 gap-1">
        <button onClick={() => setMode("boshuu")} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === "boshuu" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <Megaphone size={14} /> 相談・OB訪問
        </button>
        <button onClick={() => setMode("project")} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === "project" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          <Briefcase size={14} /> PJメンバー募集
        </button>
      </div>

      {/* ── OB訪問・相談募集 ── */}
      {mode === "boshuu" && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{displayedPosts.length}件の募集</p>
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 text-sm font-semibold btn-ac bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
              <Plus size={15} /> 募集を出す
            </button>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <button onClick={() => setFilterTag(null)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${!filterTag ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>すべて</button>
            {allTags.map((t) => (
              <button key={t} onClick={() => setFilterTag(filterTag === t ? null : t)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filterTag === t ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>{t}</button>
            ))}
          </div>
          {displayedPosts.length === 0 && (
            <div className="py-16 text-center"><Megaphone size={40} className="mx-auto text-gray-200 mb-3" /><p className="text-sm text-gray-400">まだ募集がありません</p></div>
          )}
          <div className="flex flex-col gap-3">
            {displayedPosts.map((post) => (
              <BoshuuCard key={post.id} post={post} responded={respondedIds.has(post.id)} onRespond={() => setRespondTarget(post)} onClose={post.authorId === "me" ? () => setPosts((p) => p.map((x) => x.id === post.id ? { ...x, status: "closed" as const } : x)) : undefined} />
            ))}
          </div>
        </>
      )}

      {/* ── PJメンバー募集 ── */}
      {mode === "project" && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">{displayedProjects.length}件の募集</p>
            <button onClick={() => setShowCreateProject(true)} className="flex items-center gap-1.5 text-sm font-semibold btn-ac bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
              <Plus size={15} /> PJを公募する
            </button>
          </div>
          {displayedProjects.length === 0 && (
            <div className="py-16 text-center"><Briefcase size={40} className="mx-auto text-gray-200 mb-3" /><p className="text-sm text-gray-400">現在募集中のPJはありません</p></div>
          )}
          <div className="flex flex-col gap-3">
            {displayedProjects.map((post) => (
              <ProjectCard key={post.id} post={post} raised={raisedIds.has(post.id)} onRaise={() => setRaiseTarget(post)} onClose={post.ownerId === "me" ? () => setProjects((p) => p.map((x) => x.id === post.id ? { ...x, status: "closed" as const } : x)) : undefined} />
            ))}
          </div>
        </>
      )}

      {/* ── モーダル群 ── */}
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} onCreate={(p) => { setPosts((prev) => [p, ...prev]); setShowCreate(false); }} />}
      {showCreateProject && <CreateProjectModal onClose={() => setShowCreateProject(false)} onCreate={(p) => { setProjects((prev) => [p, ...prev]); setShowCreateProject(false); }} />}
      {respondTarget && <RespondModal post={respondTarget} onClose={() => setRespondTarget(null)} onConfirm={handleConfirmRespond} />}
      {raiseTarget && <RaiseHandModal post={raiseTarget} onClose={() => setRaiseTarget(null)} onConfirm={handleConfirmRaise} />}
      {slackTarget && <SlackMock fromUser={ME} toUser={slackTarget.author} purpose={slackTarget.post.title} onClose={() => setSlackTarget(null)} />}
      {projectSlackTarget && <SlackMock fromUser={ME} toUser={projectSlackTarget.owner} purpose={`「${projectSlackTarget.post.projectName}」への参加希望`} onClose={() => setProjectSlackTarget(null)} />}
    </div>
  );
}
