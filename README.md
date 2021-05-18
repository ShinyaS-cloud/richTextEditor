# フロントエンド

## 利用技術

- TypeScript
- React
- Redux Toolkit
- Draft.js
- DraftJS Plugins
- Material-UI

## 構成

- aws Amplify

# バックエンド

## 利用技術

- TypeScript
- Express
- TypeORM
- Passport.js
- routing-controller

## 構成

- aws EC2
- Nginx - リバースプロキシ
- Docker,Docker-Compose

# DB

- MySQL

## 構成

- aws RDS

# 機能詳細

- email:admin@email/password:password でテストユーザーにログインできます。

- 認証は google の OAuth2 認証を利用しています。Basic 認証も追加していますがこれは確認用です。
- Qiita をイメージして作りました。お気に入りができてフォローができて、記事に対してコメントができます。
- DraftJS を利用しています。ブラウザ上で太文字、イタリック文字、取り消し線など DOM 操作ができます。また色を付けることもできます。
- DraftJS plugin を使用しています。
- ハッシュタグをつけると自動で色や書体が変わる仕組みになっています。
- http://example.com などとリンクを入力すると自動でリンクを貼る仕組みになっています。
- 画像を記事の上にドラッグアンドドロップで追加できます。
- 記事編集中は 5 秒毎に自動で保存される仕組みにしました。また編集画面でブラウザの更新ボタンを押しても内容が消えないようにしています。
- お気に入り一覧、書いた記事一覧など記事はカテゴリごとに表示できます。
