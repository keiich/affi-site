# つくるノート（tsukuru-note.com）

AI動画制作ツールの使い方・比較・制作記録を発信するアフィリエイトブログです。
[Astro](https://astro.build/) で静的サイトとしてビルドし、Cloudflare Workers（静的アセット）で配信します。

## 必要なもの

- Node.js 22 以上
- Cloudflare アカウント（デプロイ時）

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm install` | 依存パッケージのインストール |
| `npm run dev` | 開発サーバー起動（http://localhost:4321） |
| `npm run build` | `dist/` に本番ビルド |
| `npm run preview` | ビルド結果を Workers と同じ環境（wrangler dev）で確認 |
| `npm run check` | 型・フロントマターのチェック |
| `npm run deploy` | ビルドして Cloudflare Workers へデプロイ |

## ディレクトリ構成

```
src/
├── content/blog/     … 記事（.md / .mdx）
├── assets/blog/      … 記事のアイキャッチ画像（ビルド時に WebP へ自動最適化）
├── components/       … 比較表・アフィリエイトリンク等のコンポーネント
├── layouts/          … 共通レイアウト（BlogPost.astro で広告表記を自動挿入）
├── pages/            … 各ページ（固定ページ・RSS・robots.txt など）
├── styles/global.css … 全体のスタイル
└── consts.ts         … サイト名・運営者情報・メニューなどの設定
public/               … favicon、OGP デフォルト画像、_headers（キャッシュ設定）
wrangler.jsonc        … Cloudflare Workers の設定
```

## 記事の書き方

`src/content/blog/` に `記事のURL名.md`（コンポーネントを使う場合は `.mdx`）を作成します。
ファイル名がそのまま URL になります（例: `runway-howto.md` → `/blog/runway-howto/`）。

```md
---
title: '記事タイトル'
description: '検索結果やSNSに表示される説明文（120文字前後）'
pubDate: 2026-10-01
updatedDate: 2026-10-05          # 任意
tags: ['使い方', 'Runway']        # 任意
heroImage: '../../assets/blog/runway-howto.png'  # 任意（OGP画像にも使われます）
draft: false                     # true にすると本番ビルドで非公開
---

本文を書きます。
```

- 記事冒頭には「本記事はアフィリエイト広告を利用しています」が **自動で表示** されます（書く必要はありません）。
- アイキャッチ画像は `src/assets/blog/` に置き、記事からの相対パスで指定します。1200×675px 以上の横長画像を推奨します。
- ファイル名を `_` で始めると記事として読み込まれません（下書きメモ用）。

### 記事内で使えるコンポーネント（.mdx のみ）

`.mdx` の記事ではフロントマターの下で import して使います。

```mdx
import CompareTable from '../../components/CompareTable.astro';
import AffiliateLink from '../../components/AffiliateLink.astro';
import AffiliateButton from '../../components/AffiliateButton.astro';
import ProductBox from '../../components/ProductBox.astro';
import Callout from '../../components/Callout.astro';
```

| コンポーネント | 用途 |
| --- | --- |
| `CompareTable` | 比較表。スマホでは横スクロール＋項目列固定。`◎ ○ △ ×` は自動で色付け。`badge` 付きの列を強調表示 |
| `AffiliateLink` | 文中のテキストリンク |
| `AffiliateButton` | 目立つ CTA ボタン |
| `ProductBox` | 商品紹介ボックス（評価・価格・良い点／気になる点・複数ボタン） |
| `Callout` | 補足・注意ボックス（`info` / `tip` / `warn`） |

アフィリエイト系のリンクにはすべて `rel="sponsored nofollow noopener"` と `target="_blank"` が自動で付きます。
A8.net などのインプレッション計測用画像（1×1 の `<img>`）は `pixel` に URL を渡してください。

```mdx
<AffiliateLink href="https://px.a8.net/svt/ejp?a8mat=XXXX" pixel="https://www17.a8.net/0.gif?a8mat=XXXX">
  公式サイト
</AffiliateLink>
```

使用例はサンプル記事 `src/content/blog/ai-video-tools-comparison.mdx` を参照してください。
通常の `.md` 記事でも、ASP 発行の広告タグ（HTML）はそのまま貼り付けて使えます。

## 自動生成されるもの

- `sitemap-index.xml` / `sitemap-0.xml`（@astrojs/sitemap。404 と下書きは除外）
- `robots.txt`（サイトマップの場所を記載）
- `rss.xml`
- OGP / X（Twitter）カード / canonical / 記事の構造化データ（JSON-LD）
  - 記事の OGP 画像はアイキャッチから 1200px の JPEG を自動生成。未設定時は `public/og-default.png`

## 初期設定で書き換える箇所

- `src/consts.ts` … 運営者名、問い合わせフォーム URL（Googleフォーム等）、メールアドレス、X アカウント
- `src/pages/privacy.astro` … 参加している ASP 名・アクセス解析ツール名
- サンプル記事（`src/content/blog/` 内の 2 本）と `src/assets/blog/` のサンプル画像は削除して OK

## デプロイ

```sh
npx wrangler login      # 初回のみ。ブラウザで Cloudflare にログイン
npm run deploy          # = astro build && wrangler deploy
```

`wrangler.jsonc` で `workers_dev` / `preview_urls` を無効にしているため、`*.workers.dev` では公開されず、
`routes` に設定したカスタムドメイン `https://tsukuru-note.com` でのみ公開されます（デプロイ前にドメインを Cloudflare に追加しておく必要があります）。

### カスタムドメイン（tsukuru-note.com）の接続

1. Cloudflare ダッシュボード → **ドメインを追加（Add a domain）** で `tsukuru-note.com` を追加（Free プランで可）
2. 表示された 2 つの Cloudflare ネームサーバーを、ドメインを取得したレジストラ（お名前.com など）で設定
3. Cloudflare 側でドメインが「アクティブ」になるまで待つ（数分〜最大 24 時間）
4. `npm run deploy` を実行すると、`wrangler.jsonc` の `routes`（`custom_domain: true`）により `tsukuru-note.com` が自動で接続されます
   - ダッシュボード（Workers & Pages → `affi-site` → 設定 → ドメインとルート）で追加・変更した場合も、次回デプロイ時に `wrangler.jsonc` の内容で上書きされるため、変更は設定ファイル側で行ってください
5. `www.tsukuru-note.com` を使う場合は、重複コンテンツを避けるため apex へリダイレクト
   - ルール → リダイレクトルール → テンプレート「WWW から ルートへのリダイレクト」を使用
   - `www` の DNS レコード（プロキシ有効の `AAAA www 100::` など）が必要です
6. SSL/TLS → 概要 で暗号化モードが「フル」以上、「常に HTTPS を使用」が ON になっていることを確認

公開後は Google Search Console に `https://tsukuru-note.com/sitemap-index.xml` を登録してください。
