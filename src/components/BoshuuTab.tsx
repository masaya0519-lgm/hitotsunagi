import { useState } from "react";
import { Plus, X, Check, Users, Clock, ChevronRight, Megaphone } from "lucide-react";
import { boshuuList, users, ME, EXPERTISE_AREAS, MEET_STYLES } from "../data/mock";
import type { Boshuu, User } from "../data/mock";
import SlackMock from "./SlackMock";

// ─── ユーザー解決ヘルパー ────────────────────────────────

function resolveUser(id: string): User {
  if (id === "me") return ME;
  return users.find((u) => u.id === id) ?? ME;
}

// ─── 投稿作成モーダル ────────────────────────────────────

type CreateModalProps = {
  onClose: () => void;
  onCreate: (post: Boshuu) => void;
};

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
      <div
        className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white pt-4 px-5 pb-3 border-b border-gray-100">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">募集を投稿する</h2>
              <p className="text-xs text-gray-400">こんな人に話を聞いてほしい、を発信しよう</p>
            </div>
            <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
          </div>
        </div>

        <div className="px-5 py-4 flex flex-col gap-5">
          {/* タイトル */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              何を話したいですか？ <span className="text-red-400">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：初めてのPL、心構えを教えてください"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          {/* 求めるスキル・経験 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              どんな経験を持つ人を探していますか？
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EXPERTISE_AREAS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${
                    tags.includes(t)
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {tags.includes(t) ? <Check size={10} /> : <Plus size={10} />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 詳細 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              詳細（任意）
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="背景や聞きたいことをもう少し詳しく書くと応じてもらいやすくなります"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
            />
          </div>

          {/* 希望時間帯 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              希望の時間帯 <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {MEET_STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setTime(s)}
                  className={`text-sm px-4 py-2 rounded-full border transition-all ${
                    time === s
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-8 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !time}
            className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-4 rounded-2xl hover:from-rose-600 hover:to-orange-500 transition-all text-base shadow-md shadow-rose-200/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            募集を投稿する
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 声をかける確認モーダル ───────────────────────────────────

type RespondModalProps = {
  post: Boshuu;
  onClose: () => void;
  onConfirm: () => void;
};

function RespondModal({ post, onClose, onConfirm }: RespondModalProps) {
  const author = resolveUser(post.authorId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 md:p-6" onClick={onClose}>
      <div
        className="bg-white w-full md:max-w-sm md:rounded-3xl rounded-t-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-4 px-5 pb-3">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 md:block hidden"><X size={20} /></button>
        </div>
        <div className="px-5 pb-2 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-3xl mx-auto mb-3">
            {author.avatar}
          </div>
          <h3 className="font-bold text-gray-900 mb-1">
            「{post.title.length > 20 ? post.title.slice(0, 20) + "…" : post.title}」に声をかける
          </h3>
          <p className="text-sm text-gray-500 mb-1">{author.name}さんへ</p>
          <p className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 mt-3 text-left leading-relaxed">
            声をかけると {author.name}さんにSlackで通知が届きます。日程は直接Slackで調整できます。
          </p>
        </div>
        <div className="px-5 pb-8 pt-4 flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-rose-500 to-orange-400 text-white font-bold py-4 rounded-2xl hover:from-rose-600 hover:to-orange-500 transition-all shadow-md shadow-rose-200/50"
          >
            声をかける
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-500 font-medium py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 募集カード ───────────────────────────────────────────

type CardProps = {
  post: Boshuu;
  responded: boolean;
  onRespond: () => void;
  onClose?: () => void;
};

function BoshuuCard({ post, responded, onRespond, onClose }: CardProps) {
  const author = resolveUser(post.authorId);
  const isMe = post.authorId === "me";

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3 border ${
      isMe ? "border-rose-200" : "border-transparent"
    }`}>
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-xl shrink-0">
            {author.avatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-gray-900">{author.name}</span>
              {isMe && (
                <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-md font-medium">
                  自分の募集
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{author.department} · {author.role} · {author.yearsAtCompany}年目</p>
          </div>
        </div>
        {isMe && onClose && (
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 shrink-0 flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1"
          >
            <X size={10} /> 締め切る
          </button>
        )}
      </div>

      {/* タイトル */}
      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{post.title}</h3>

      {/* タグ */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
      )}

      {/* 本文 */}
      {post.body && (
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{post.body}</p>
      )}

      {/* フッター */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.timePreference}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {post.respondentCount + (responded ? 1 : 0)}人が応じました
          </span>
        </div>

        {!isMe && (
          responded ? (
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
              <Check size={11} /> 応じました
            </span>
          ) : (
            <button
              onClick={onRespond}
              className="flex items-center gap-1 text-xs text-rose-600 font-medium bg-rose-50 hover:bg-rose-100 transition-colors px-3 py-1.5 rounded-full"
            >
              声をかける <ChevronRight size={11} />
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── メインコンポーネント ─────────────────────────────────

export default function BoshuuTab() {
  const [posts, setPosts]         = useState<Boshuu[]>([...boshuuList]);
  const [respondedIds, setRespondedIds] = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [respondTarget, setRespondTarget] = useState<Boshuu | null>(null);
  const [slackTarget, setSlackTarget] = useState<{ post: Boshuu; author: User } | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const displayed = filterTag
    ? posts.filter((p) => p.tags.includes(filterTag) && p.status === "open")
    : posts.filter((p) => p.status === "open");

  function handleCreate(post: Boshuu) {
    setPosts((prev) => [post, ...prev]);
  }

  function handleClose(id: string) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, status: "closed" as const } : p));
  }

  function handleConfirmRespond() {
    if (!respondTarget) return;
    setRespondedIds((prev) => new Set([...prev, respondTarget.id]));
    const author = resolveUser(respondTarget.authorId);
    setRespondTarget(null);
    setSlackTarget({ post: respondTarget, author });
  }

  return (
    <div className="px-4 md:px-6 pt-4 pb-20 flex flex-col gap-4 max-w-2xl mx-auto">

      {/* ── ヘッダー＋投稿ボタン ── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mt-0.5">{displayed.length}件の募集</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-rose-500 to-orange-400 text-white px-4 py-2 rounded-xl hover:from-rose-600 hover:to-orange-500 transition-all shadow-sm"
        >
          <Plus size={15} /> 募集を出す
        </button>
      </div>

      {/* ── タグフィルター ── */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => setFilterTag(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            !filterTag ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          すべて
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilterTag(filterTag === t ? null : t)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              filterTag === t ? "bg-rose-600 text-white border-rose-600" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── 空の状態 ── */}
      {displayed.length === 0 && (
        <div className="py-16 text-center">
          <Megaphone size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">まだ募集がありません</p>
          <p className="text-xs text-gray-300 mt-1">「募集を出す」からあなたの困りごとを発信してみよう</p>
        </div>
      )}

      {/* ── 募集カード一覧 ── */}
      <div className="flex flex-col gap-3">
        {displayed.map((post) => (
          <BoshuuCard
            key={post.id}
            post={post}
            responded={respondedIds.has(post.id)}
            onRespond={() => setRespondTarget(post)}
            onClose={post.authorId === "me" ? () => handleClose(post.id) : undefined}
          />
        ))}
      </div>

      {/* ── モーダル群 ── */}
      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      {respondTarget && (
        <RespondModal
          post={respondTarget}
          onClose={() => setRespondTarget(null)}
          onConfirm={handleConfirmRespond}
        />
      )}

      {slackTarget && (
        <SlackMock
          fromUser={ME}
          toUser={slackTarget.author}
          purpose={slackTarget.post.title}
          onClose={() => setSlackTarget(null)}
        />
      )}
    </div>
  );
}
