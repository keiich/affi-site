// サイト全体で使う設定値。サイト名や運営者情報はここを書き換えてください。
export const SITE = {
  name: 'つくるノート',
  url: 'https://tsukuru-note.com',
  description:
    'AI動画制作ツールの使い方・比較・制作記録をまとめるブログ。実際に使って分かったことを、初心者にもわかりやすく解説します。',
  locale: 'ja_JP',
  lang: 'ja',
  // OGP のデフォルト画像（public/ 配下）
  defaultOgImage: '/og-default.png',
  // X（旧Twitter）のアカウント（@なし）。未使用なら空文字
  twitter: '',
};

export const OPERATOR = {
  // 運営者名（ハンドルネーム可）
  name: 'つくるノート編集部',
  // お問い合わせフォームのURL（Googleフォーム等）。空文字の場合はメール案内のみ表示
  contactFormUrl: '',
  // 問い合わせ用メールアドレス（スパム対策のため画像化や [at] 表記を推奨）
  email: 'contact[at]tsukuru-note.com',
};

// 1ページあたりの記事数
export const POSTS_PER_PAGE = 10;

export const NAV_LINKS = [
  { href: '/', label: 'ホーム' },
  { href: '/blog/', label: '記事一覧' },
  { href: '/tags/', label: 'タグ' },
  { href: '/about/', label: '運営者情報' },
];

export const FOOTER_LINKS = [
  { href: '/about/', label: '運営者情報' },
  { href: '/privacy/', label: 'プライバシーポリシー' },
  { href: '/disclaimer/', label: '免責事項' },
  { href: '/contact/', label: 'お問い合わせ' },
  { href: '/rss.xml', label: 'RSS' },
];
