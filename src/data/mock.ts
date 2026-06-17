// ─── 型定義 ──────────────────────────────────────────────

export type ProjectExp = {
  industry: string;
  phase: string;
  tech: string;
  description?: string;
};

export type PrevJob = {
  company: string;
  role: string;
  years: string;
  note?: string;
};

export type UserStatusId = "drink" | "talk" | "lunch" | "dnd" | null;

export const STATUS_OPTIONS: { id: UserStatusId; label: string; emoji: string; color: string; textColor: string }[] = [
  { id: "talk",  label: "話したい",      emoji: "💬", color: "bg-green-100",  textColor: "text-green-700" },
  { id: "drink", label: "飲みたい",      emoji: "🍺", color: "bg-amber-100",  textColor: "text-amber-700" },
  { id: "lunch", label: "ランチしたい",  emoji: "🍜", color: "bg-orange-100", textColor: "text-orange-700" },
  { id: "dnd",   label: "話しかけるな",  emoji: "🙅", color: "bg-gray-100",   textColor: "text-gray-500" },
];

export type User = {
  id: string;
  name: string;
  department: string;
  role: string;
  yearsAtCompany: number;
  avatar: string;

  // キャリア
  careerPath: { role: string; years: string }[];
  careerOrientation: string;

  // 仕事軸
  expertiseAreas: string[];
  projectExperiences: ProjectExp[];
  talkTopics: string[];

  // 人柄軸
  personality: string[];
  workIsms: string[];
  mbti?: string;
  ffs?: string;

  // アイスブレイク
  favoriteFoods: string[];
  hobbies: string[];
  meetStyle: string;

  prevJobs?: PrevJob[];

  // その他
  bio: string;
  welcomeMessage: string;
  sessionCount: number;
  status?: UserStatusId;
};

export type SessionStatus = "pending_sent" | "pending_received" | "confirmed" | "completed";

export type Session = {
  id: string;
  fromUserId: string;
  toUserId: string;
  purpose: string;
  proposedDate: string;
  status: SessionStatus;
  createdAt: string;
};

export type ProjectPosting = {
  id: string;
  managerId: string;
  projectName: string;
  overview: string;
  industry: string;
  phase: string;
  duration: string;
  headcount: number;
  requirements: string[];
  createdAt: string;
  status: "open" | "closed";
};

export type Boshuu = {
  id: string;
  authorId: string;
  title: string;
  tags: string[];
  body: string;
  timePreference: string;
  createdAt: string;
  respondentCount: number;
  status: "open" | "closed";
};

// ─── 選択肢マスター ───────────────────────────────────────

export const CAREER_ORIENTATIONS = [
  "マネージャー・リーダー志向",
  "スペシャリスト・エキスパート志向",
  "独立・起業志向",
  "社内異動・キャリアチェンジ志向",
  "まだ模索中",
];

export const EXPERTISE_AREAS = [
  "DX戦略立案", "クラウド移行(AWS)", "クラウド移行(Azure)", "クラウド移行(GCP)",
  "SAP導入・運用", "Salesforce導入", "ServiceNow", "データ分析・BI",
  "AI・機械学習活用", "セキュリティ", "PMO・プロジェクト管理",
  "業務改革・BPR", "組織変革・チェンジマネジメント", "提案・プリセールス",
];

export const INDUSTRIES = ["金融・保険", "製造", "小売・EC", "医療・ヘルスケア", "公共・官公庁", "通信", "エネルギー", "物流・運輸"];
export const PHASES = ["戦略立案", "要件定義", "設計・開発", "PMO", "テスト・移行", "運用・保守"];
export const TECHS = ["AWS", "Azure", "GCP", "Salesforce", "SAP", "ServiceNow", "Tableau", "Power BI", "Python", "その他"];

export const PERSONALITIES = [
  "論理・分析派", "共感・傾聴型", "直感・アイデア型",
  "実行・スピード重視", "丁寧・完璧主義", "フラット・気さく",
];

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export const FFS_TYPES = [
  "凝集性（A）", "受容性（B）", "弁別性（C）", "拡散性（D）", "保全性（E）",
];

export const WORK_ISMS = [
  "スピード重視", "品質・完成度重視", "仮説ドリブン", "データドリブン",
  "ドキュメント大事派", "口頭・議論派", "顧客第一主義", "チーム協調派",
];

export const MEET_STYLES = ["ランチ派", "夕方コーヒー派", "朝活派", "オンライン歓迎", "対面推奨"];

// ─── 自分のデータ ─────────────────────────────────────────

export const ME: User = {
  id: "me",
  name: "山本 颯太",
  department: "デジタル戦略部",
  role: "アナリスト",
  yearsAtCompany: 1,
  avatar: "🙋",
  careerPath: [{ role: "アナリスト", years: "2025〜" }],
  careerOrientation: "まだ模索中",
  expertiseAreas: ["DX戦略立案"],
  projectExperiences: [
    { industry: "製造", phase: "要件定義", tech: "その他", description: "入社半年後の最初のアサイン。クライアントへの初ヒアリングで頭が真っ白になった。先輩にメモの整理方法を教わりながら、なんとか要件定義書をまとめた。" },
  ],
  talkTopics: ["コンサル1年目の働き方", "提案書の作り方"],
  personality: ["直感・アイデア型", "フラット・気さく"],
  workIsms: ["仮説ドリブン", "スピード重視"],
  mbti: "ENFP",
  ffs: "拡散性（D）",
  favoriteFoods: ["ラーメン", "コーヒー"],
  hobbies: ["登山", "読書"],
  meetStyle: "ランチ派",
  bio: "入社1年目のアナリスト。先輩のプロジェクト経験や動き方を聞いてみたいです。",
  welcomeMessage: "気軽に声かけてください！",
  sessionCount: 2,
  status: "talk",
};

// ─── ユーザーデータ ───────────────────────────────────────

export const users: User[] = [
  {
    id: "1",
    name: "田中 一郎",
    department: "クラウドソリューション部",
    role: "シニアコンサルタント",
    yearsAtCompany: 6,
    avatar: "👨‍💻",
    careerPath: [
      { role: "アナリスト", years: "2019〜2021" },
      { role: "コンサルタント", years: "2021〜2023" },
      { role: "シニアコンサルタント", years: "2023〜" },
    ],
    careerOrientation: "スペシャリスト・エキスパート志向",
    expertiseAreas: ["クラウド移行(AWS)", "クラウド移行(GCP)", "セキュリティ"],
    prevJobs: [
      { company: "大手SIer（NTT系）", role: "システムエンジニア", years: "2015〜2019", note: "オンプレ基盤の設計・開発が中心。クラウドを武器にしたくてコンサルへ転職" },
    ],
    projectExperiences: [
      { industry: "金融・保険", phase: "設計・開発", tech: "AWS", description: "メガバンク勘定系のAWS移行。オンプレOracleをRDSに切り替えるアーキ設計を担当。セキュリティ要件の厳しさが想定以上で、ネットワーク分離設計に3ヶ月かけた。" },
      { industry: "製造", phase: "PMO", tech: "Azure", description: "自動車部品メーカーのDX推進PMO。5社ベンダーをまとめながら進捗・課題を管理。初めてPMとしてクライアントに向き合った案件。" },
      { industry: "通信", phase: "移行・テスト", tech: "GCP", description: "大手通信キャリアの基盤GCP移行。移行・テストフェーズを担当。膨大なテストケース管理と並行して本番切替計画を策定した。" },
    ],
    talkTopics: ["AWS・クラウド移行の実務", "技術提案の進め方", "エンジニア出身のコンサルキャリア", "副業・資格取得"],
    personality: ["論理・分析派", "丁寧・完璧主義"],
    workIsms: ["品質・完成度重視", "データドリブン", "ドキュメント大事派"],
    mbti: "ISTJ",
    ffs: "弁別性（C）",
    favoriteFoods: ["寿司", "コーヒー（ブラック）"],
    hobbies: ["個人開発", "登山", "AWS資格収集"],
    meetStyle: "夕方コーヒー派",
    bio: "SIer出身のクラウド専門コンサル。技術と提案の両立に試行錯誤してきた経験を話せます。",
    welcomeMessage: "技術の話も、キャリアの話も気軽にどうぞ！",
    sessionCount: 22,
    status: "drink",
  },
  {
    id: "2",
    name: "佐藤 花子",
    department: "デジタル戦略部",
    role: "マネージャー",
    yearsAtCompany: 8,
    avatar: "👩‍💼",
    careerPath: [
      { role: "アナリスト", years: "2017〜2019" },
      { role: "コンサルタント", years: "2019〜2021" },
      { role: "シニアコンサルタント", years: "2021〜2023" },
      { role: "マネージャー", years: "2023〜" },
    ],
    careerOrientation: "マネージャー・リーダー志向",
    expertiseAreas: ["DX戦略立案", "組織変革・チェンジマネジメント", "業務改革・BPR"],
    projectExperiences: [
      { industry: "製造", phase: "戦略立案", tech: "その他", description: "老舗メーカーのDX中期戦略策定。現場ヒアリング100件超をもとにロードマップを作成。経営層プレゼンを担当し、承認を得た。" },
      { industry: "小売・EC", phase: "要件定義", tech: "Salesforce", description: "大手小売のCRM刷新プロジェクト。業務要件定義から画面設計まで一気通貫で担当。Salesforce独特の制約に苦しんだ案件。" },
      { industry: "金融・保険", phase: "PMO", tech: "その他", description: "保険会社の基幹システム刷新PMO。マネージャーへの昇格後、初めてリードしたプロジェクト。チームメンバー15名のマネジメントを経験。" },
    ],
    talkTopics: ["DX推進・変革管理", "クライアントとの関係構築", "マネージャーへの道", "女性のキャリア"],
    personality: ["共感・傾聴型", "フラット・気さく"],
    workIsms: ["顧客第一主義", "チーム協調派", "仮説ドリブン"],
    mbti: "ENFJ",
    ffs: "凝集性（A）",
    favoriteFoods: ["パスタ", "ワイン", "チョコレート"],
    hobbies: ["ヨガ", "料理", "美術館巡り"],
    meetStyle: "ランチ派",
    bio: "製造業・小売業のDXを中心に担当。プロジェクトをリードする立場になって見えてきたことを話せます。",
    welcomeMessage: "マネージャーへのキャリアや、DXプロジェクトの実態を聞きたい方ぜひ。",
    sessionCount: 34,
    status: "lunch",
  },
  {
    id: "3",
    name: "山田 健太",
    department: "ERPソリューション部",
    role: "シニアマネージャー",
    yearsAtCompany: 12,
    avatar: "👔",
    careerPath: [
      { role: "アナリスト", years: "2013〜2015" },
      { role: "コンサルタント", years: "2015〜2018" },
      { role: "マネージャー", years: "2018〜2022" },
      { role: "シニアマネージャー", years: "2022〜" },
    ],
    careerOrientation: "マネージャー・リーダー志向",
    expertiseAreas: ["SAP導入・運用", "PMO・プロジェクト管理", "業務改革・BPR"],
    projectExperiences: [
      { industry: "製造", phase: "設計・開発", tech: "SAP", description: "自動車部品メーカーのSAP S/4HANA導入。設計・開発フェーズで在庫管理モジュールを担当。SAP特有の設定地獄に最初は苦しんだが今では得意分野になった。" },
      { industry: "物流・運輸", phase: "PMO", tech: "SAP", description: "大手物流会社のSAP導入PMO。東南アジア拠点を含むグローバル展開で、時差とベンダー調整に奔走した4年間。" },
      { industry: "小売・EC", phase: "移行・テスト", tech: "SAP", description: "百貨店グループのSAP移行プロジェクト。本番切替直前に仕様変更が発生し、徹夜で対応したのは今でも語り草。" },
    ],
    talkTopics: ["SAP導入の実務", "大規模PJ管理", "チームビルディング", "提案〜デリバリーの全体設計"],
    personality: ["論理・分析派", "実行・スピード重視"],
    workIsms: ["ドキュメント大事派", "品質・完成度重視", "データドリブン"],
    mbti: "ENTJ",
    ffs: "保全性（E）",
    favoriteFoods: ["焼肉", "ラーメン", "ビール"],
    hobbies: ["ゴルフ", "ランニング", "読書"],
    meetStyle: "夕方コーヒー派",
    bio: "SAP一筋12年。大型プロジェクトの提案からデリバリーまで経験してきた。何でも聞いてください。",
    welcomeMessage: "ERPや大規模PJに興味がある人、ぜひ話しましょう。",
    sessionCount: 47,
    status: null,
  },
  {
    id: "4",
    name: "鈴木 美咲",
    department: "データ＆AI部",
    role: "コンサルタント",
    yearsAtCompany: 3,
    avatar: "👩‍🔬",
    careerPath: [
      { role: "アナリスト", years: "2022〜2023" },
      { role: "コンサルタント", years: "2023〜" },
    ],
    careerOrientation: "スペシャリスト・エキスパート志向",
    expertiseAreas: ["データ分析・BI", "AI・機械学習活用"],
    projectExperiences: [
      { industry: "小売・EC", phase: "設計・開発", tech: "Python", description: "大手ECモールの購買データ分析基盤の設計・開発。PythonでETLを組みBIまで担当。文系で最初のPythonプロジェクト。夜中に独学した記憶しかない。" },
      { industry: "製造", phase: "戦略立案", tech: "Tableau", description: "部品メーカーのデータ活用戦略立案。Tableauでダッシュボード設計を提案側で担当。「データがあっても使われない」問題の根深さを体感した案件。" },
    ],
    talkTopics: ["データ分析・可視化の実務", "AI活用提案", "文系出身のデータキャリア", "社内勉強会の作り方"],
    personality: ["直感・アイデア型", "共感・傾聴型"],
    workIsms: ["データドリブン", "仮説ドリブン", "スピード重視"],
    mbti: "ENFP",
    ffs: "拡散性（D）",
    favoriteFoods: ["タコス", "抹茶スイーツ"],
    hobbies: ["Kaggle", "カフェ巡り", "ポッドキャスト"],
    meetStyle: "オンライン歓迎",
    bio: "文系出身でデータコンサルへ。Pythonは入社後に独学。同じ境遇の人の相談に乗れます。",
    welcomeMessage: "文系でデータ・AIに興味ある人、気軽に話しましょう！",
    sessionCount: 11,
    status: "talk",
  },
  {
    id: "5",
    name: "中村 大輔",
    department: "デジタル戦略部",
    role: "パートナー",
    yearsAtCompany: 15,
    avatar: "🧑‍💼",
    careerPath: [
      { role: "アナリスト", years: "2010〜2012" },
      { role: "コンサルタント", years: "2012〜2015" },
      { role: "マネージャー", years: "2015〜2019" },
      { role: "シニアマネージャー", years: "2019〜2022" },
      { role: "パートナー", years: "2022〜" },
    ],
    careerOrientation: "マネージャー・リーダー志向",
    expertiseAreas: ["DX戦略立案", "提案・プリセールス", "組織変革・チェンジマネジメント"],
    projectExperiences: [
      { industry: "金融・保険", phase: "戦略立案", tech: "その他", description: "メガバンクのDX戦略策定。コンサルタント時代に初めてクライアントCIOにプレゼンした案件。準備で3徹したが、承認を得たときの達成感は今でも忘れない。" },
      { industry: "製造", phase: "PMO", tech: "SAP", description: "グローバル製造業の基幹システム刷新PMO。マネージャーとして30名超のチームをリード。「人を動かす」ことの難しさと面白さをここで学んだ。" },
      { industry: "公共・官公庁", phase: "要件定義", tech: "その他", description: "省庁の行政デジタル化プロジェクト。官民の文化の違いに最初は戸惑ったが、パブリックセクターを動かすやりがいは民間とは別物だった。" },
    ],
    talkTopics: ["パートナーへのキャリア", "事業会社への転職 vs コンサル残留", "金融業界のDX", "人材育成"],
    personality: ["論理・分析派", "実行・スピード重視"],
    workIsms: ["顧客第一主義", "仮説ドリブン", "口頭・議論派"],
    mbti: "INTJ",
    ffs: "弁別性（C）",
    favoriteFoods: ["鮨", "ウイスキー", "ラーメン（豚骨）"],
    hobbies: ["テニス", "読書", "旅行"],
    meetStyle: "ランチ派",
    bio: "15年間コンサル一筋。パートナーになって見えた景色や、コンサルの歩き方を話せます。",
    welcomeMessage: "長期のキャリアについて話したい人はぜひ。転職相談も歓迎。",
    sessionCount: 58,
    status: "dnd",
  },
  {
    id: "6",
    name: "高橋 さくら",
    department: "セキュリティ＆リスク部",
    role: "コンサルタント",
    yearsAtCompany: 2,
    avatar: "🌸",
    careerPath: [
      { role: "アナリスト", years: "2023〜2024" },
      { role: "コンサルタント", years: "2024〜" },
    ],
    careerOrientation: "スペシャリスト・エキスパート志向",
    expertiseAreas: ["セキュリティ", "業務改革・BPR"],
    prevJobs: [
      { company: "中堅SIer", role: "システムエンジニア", years: "2022〜2023", note: "インフラ・セキュリティ領域のSE。手を動かす仕事は好きだったけど、上流から関わりたくてコンサルへ転職" },
    ],
    projectExperiences: [
      { industry: "金融・保険", phase: "要件定義", tech: "ServiceNow", description: "地方銀行のセキュリティ運用効率化。ServiceNow導入の要件定義を担当。入社後初の単独案件で、要件定義の難しさをしみじみ体感した。" },
      { industry: "通信", phase: "運用・保守", tech: "その他", description: "通信キャリアのセキュリティ監視体制の運保サポート。前職のインフラ経験が活きた案件。「コンサルなのに手を動かしすぎ」と先輩に言われた。" },
    ],
    talkTopics: ["セキュリティコンサルの仕事", "他社からの転職経験", "コンサル2年目の壁", "仕事の効率化・ツール活用"],
    personality: ["フラット・気さく", "実行・スピード重視"],
    workIsms: ["スピード重視", "チーム協調派", "口頭・議論派"],
    mbti: "ESTP",
    ffs: "受容性（B）",
    favoriteFoods: ["カレー", "クラフトビール", "スパイス料理"],
    hobbies: ["バスケットボール", "映画鑑賞", "料理"],
    meetStyle: "朝活派",
    bio: "前職はSIer。コンサルに転職して変わったこと・大変だったことをリアルに話せます。",
    welcomeMessage: "転職してきた同世代の方、ぜひ話しましょう！",
    sessionCount: 8,
    status: "drink",
  },
];

// ─── 募集データ ───────────────────────────────────────────

export const boshuuList: Boshuu[] = [
  {
    id: "b1",
    authorId: "2",
    title: "若手アナリスト・コンサルタント、気軽に相談してください",
    tags: ["DX戦略立案", "組織変革・チェンジマネジメント", "業務改革・BPR"],
    body: "マネージャーになってから「若手のころこういう人に話を聞きたかった」と思うことが増えました。キャリアの悩み、プロジェクトでしんどいこと、なんでも聞きます。特に女性のキャリアについても話せます。",
    timePreference: "ランチ派",
    createdAt: "2026-06-08",
    respondentCount: 5,
    status: "open",
  },
  {
    id: "b2",
    authorId: "3",
    title: "初めてSAPプロジェクトにアサインされた方、話しましょう",
    tags: ["SAP導入・運用", "PMO・プロジェクト管理"],
    body: "「SAP右も左もわからない」状態でアサインされる気持ち、よくわかります。最初の3ヶ月でやっておくべきこと、抑えておくべき基礎知識を一緒に整理します。過去の自分に伝えたいことをお話しします。",
    timePreference: "夕方コーヒー派",
    createdAt: "2026-06-07",
    respondentCount: 8,
    status: "open",
  },
  {
    id: "b3",
    authorId: "1",
    title: "SIer出身でコンサルに転職した方・検討中の方へ",
    tags: ["クラウド移行(AWS)", "クラウド移行(GCP)", "セキュリティ"],
    body: "SIerからコンサルへの転職は「想像と違った」ことが多かったです。技術をどう武器にするか、提案の作り方の違い、カルチャーギャップなどリアルに話せます。転職検討中の方の相談にも乗ります。",
    timePreference: "夕方コーヒー派",
    createdAt: "2026-06-06",
    respondentCount: 3,
    status: "open",
  },
  {
    id: "b4",
    authorId: "4",
    title: "文系出身でデータ・AIに挑戦している方と話したい",
    tags: ["データ分析・BI", "AI・機械学習活用"],
    body: "文系出身でPythonを独学してデータコンサルになりました。「どうやって身につけたか」「クライアントへの説明どうしてる」など同じ境遇の方と話したいです。勉強会の立ち上げも興味あれば一緒に考えましょう。",
    timePreference: "オンライン歓迎",
    createdAt: "2026-06-05",
    respondentCount: 12,
    status: "open",
  },
  {
    id: "b5",
    authorId: "6",
    title: "コンサル転職組のあるある、共有しませんか",
    tags: ["業務改革・BPR", "セキュリティ"],
    body: "SIerからコンサルに来て2年。慣れてきたようで「あれ、これって普通？」と感じる瞬間がまだあります。同じく転職組の方と「あるある」を話したい。特に前職との文化・スピード感の違いが気になる方歓迎。",
    timePreference: "朝活派",
    createdAt: "2026-06-04",
    respondentCount: 6,
    status: "open",
  },
  {
    id: "b6",
    authorId: "me",
    title: "初めてのPL、心構えを教えてください",
    tags: ["PMO・プロジェクト管理", "提案・プリセールス"],
    body: "来月から小規模ですがプロジェクトリードを任されることになりました。チームメンバーへの指示出し、クライアントとのコミュニケーション、タスク管理…何から準備すればいいか不安です。経験談を聞かせてください！",
    timePreference: "ランチ派",
    createdAt: "2026-06-09",
    respondentCount: 2,
    status: "open",
  },
];

// ─── PJ公募データ ─────────────────────────────────────────

export const projectPostings: ProjectPosting[] = [
  {
    id: "pj1",
    managerId: "2",
    projectName: "大手食品メーカー DX戦略策定",
    overview: "老舗食品メーカーの中期DX戦略を経営層と一緒につくるPJ。現場ヒアリングから経営層プレゼンまで一気通貫で担当。",
    industry: "製造",
    phase: "戦略立案",
    duration: "2026年7月〜12月（6ヶ月）",
    headcount: 2,
    requirements: ["DX戦略立案", "業務改革・BPR"],
    createdAt: "2026-06-15",
    status: "open",
  },
  {
    id: "pj2",
    managerId: "1",
    projectName: "メガバンク クラウド移行 第2フェーズ",
    overview: "昨年完了したAWS移行に続く第2フェーズ。残存システムのGCP移行とマルチクラウド管理基盤の構築を担当します。",
    industry: "金融・保険",
    phase: "設計・開発",
    duration: "2026年8月〜2027年3月（8ヶ月）",
    headcount: 3,
    requirements: ["クラウド移行(GCP)", "クラウド移行(AWS)", "セキュリティ"],
    createdAt: "2026-06-14",
    status: "open",
  },
  {
    id: "pj3",
    managerId: "3",
    projectName: "グローバル製造業 SAP S/4HANA 導入",
    overview: "東南アジア5拠点を含むグローバルSAP導入。PMOとして全体管理に加え、製造モジュールの設計・テストを担当。",
    industry: "製造",
    phase: "PMO",
    duration: "2026年9月〜2028年3月（18ヶ月）",
    headcount: 4,
    requirements: ["SAP導入・運用", "PMO・プロジェクト管理"],
    createdAt: "2026-06-12",
    status: "open",
  },
  {
    id: "pj4",
    managerId: "5",
    projectName: "大手損保 基幹システム刷新 PMO",
    overview: "業界大手損保の基幹システム刷新PMO支援。クライアントCIOに直接向き合う機会あり。シニア〜マネージャー層歓迎。",
    industry: "金融・保険",
    phase: "PMO",
    duration: "2026年7月〜2027年9月（15ヶ月）",
    headcount: 2,
    requirements: ["PMO・プロジェクト管理", "DX戦略立案"],
    createdAt: "2026-06-10",
    status: "open",
  },
];

// ─── セッションデータ ─────────────────────────────────────

export const sessions: Session[] = [
  {
    id: "s1",
    fromUserId: "me",
    toUserId: "5",
    purpose: "コンサルでパートナーを目指すか、事業会社に転職するか悩んでいます。15年のキャリアから見た視点を聞かせてください。",
    proposedDate: "2026-06-15 12:00",
    status: "confirmed",
    createdAt: "2026-06-05",
  },
  {
    id: "s2",
    fromUserId: "me",
    toUserId: "2",
    purpose: "アナリストからコンサルタントに上がるタイミングや、評価で見られるポイントを教えてもらえますか？",
    proposedDate: "2026-06-18 18:00",
    status: "pending_sent",
    createdAt: "2026-06-08",
  },
  {
    id: "s3",
    fromUserId: "6",
    toUserId: "me",
    purpose: "入社1年目のうちにやっておくべきことを聞きたいです！先輩として教えてもらえると助かります。",
    proposedDate: "2026-06-14 19:00",
    status: "pending_received",
    createdAt: "2026-06-07",
  },
];
