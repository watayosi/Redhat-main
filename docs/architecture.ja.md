# プロジェクトアーキテクチャ

このモノレポには二つのサブプロジェクトが含まれています:

- **frontend** – Next.js + TypeScript で構築されたアプリケーション。Vercel にデプロイされます。
- **server** – TypeScript で書かれた Express API。Render にデプロイされ、Supabase をバックエンドとして利用します。

## フロントエンド

`frontend` フォルダーには v0.dev の Next.js プロジェクトが格納されています。`package.json` には開発と本番用のスクリプトが記述されています。アプリでは環境変数 `NEXT_PUBLIC_API_URL` に API のベース URL を設定する必要があります。

```
cd frontend
pnpm install
pnpm dev
```

## サーバー

`server` ディレクトリには Supabase を利用する Express アプリケーションがあります。環境変数は `.env` (「.env.example」を参照) から読み込まれます。

スクリプト:

```
cd server
pnpm install
pnpm dev      # ts-node-dev で実行
pnpm build    # dist/ にコンパイル
```

### 主なエンドポイント

- `GET /api/jobs` – Supabase の `jobs` テーブルの一覧を取得
- `POST /api/jobs` – 新しいジョブを追加
- `GET /api/carriers` – キャリアの一覧を取得
- `POST /api/carriers` – キャリアを作成
- `POST /api/quotes` – `calculate_quote` 関数を使って見積もりを計算
- `GET /api/messages` – メッセージを一覧取得
- `POST /api/messages` – メッセージを投稿

## 環境変数

```
SUPABASE_URL          Supabase プロジェクトの URL
SUPABASE_SERVICE_KEY  Supabase のサービスロールキー
PORT                  Express サーバーのポート(デフォルト 3001)
```

## デプロイ

1. **frontend** フォルダーを Vercel にデプロイします。
2. **server** フォルダーを Render にデプロイし、上記の環境変数を設定します。
3. Vercel 側で `NEXT_PUBLIC_API_URL` を Render のデプロイ URL に設定します。

UI と API を独立してデプロイとスケールでき、Supabase にデータ保存と認証を任せる構成となっています。

