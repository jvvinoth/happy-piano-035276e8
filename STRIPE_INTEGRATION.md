# Stripe月額サブスクリプション統合ガイド

このドキュメントでは、Happy Pianoのレッスンプラン用にStripe月額サブスクリプションを実装する手順を説明します。

## 概要

4つのレッスンコースがあり、それぞれ月額課金として設定されています：

1. **入門** - ¥8,000/月 (月3回45分)
2. **初級** - ¥10,000/月 (月3回45分)
3. **中級** - ¥12,000/月 (月3回45分)
4. **上級** - ¥16,000/月 (月3回45分)

## セットアップ手順

### 1. Stripeアカウントの設定

1. [Stripe Dashboard](https://dashboard.stripe.com/)にログイン
2. 本番環境とテスト環境の両方のAPIキーを取得

### 2. Stripeダッシュボードで商品と価格を作成

各レッスンコースの商品と月額課金価格を作成します：

#### 商品1: 入門コース
- 商品名: `入門コース`
- 説明: `ピアノに触れるのが初めての方向け - 月3回45分`
- 価格: `¥8,000 JPY`
- 課金タイプ: `定期課金 (Recurring)`
- 課金間隔: `毎月 (Monthly)`

#### 商品2: 初級コース
- 商品名: `初級コース`
- 説明: `基礎を固めながらステップアップ - 月3回45分`
- 価格: `¥10,000 JPY`
- 課金タイプ: `定期課金 (Recurring)`
- 課金間隔: `毎月 (Monthly)`

#### 商品3: 中級コース
- 商品名: `中級コース`
- 説明: `より高度な演奏技術を磨く - 月3回45分`
- 価格: `¥12,000 JPY`
- 課金タイプ: `定期課金 (Recurring)`
- 課金間隔: `毎月 (Monthly)`

#### 商品4: 上級コース
- 商品名: `上級コース`
- 説明: `高度な演奏技術を目指す - 月3回45分`
- 価格: `¥16,000 JPY`
- 課金タイプ: `定期課金 (Recurring)`
- 課金間隔: `毎月 (Monthly)`

### 3. Price IDの取得と更新

各価格を作成したら、Price IDをコピーして `src/lib/siteContent.ts` を更新します：

```typescript
plans: [
  {
    name: "入門",
    // ...
    stripePriceId: "price_1234567890abcdef", // ← ここを実際のPrice IDに置き換え
  },
  // 他のコースも同様に更新
]
```

### 4. バックエンドAPIの実装

#### Node.js/Expressの例

```bash
npm install stripe express cors
```

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Checkout Session作成エンドポイント
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, planName, successUrl, cancelUrl } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'required',
      locale: 'ja',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhookエンドポイント（サブスクリプションイベントを処理）
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // イベントタイプに応じた処理
  switch (event.type) {
    case 'checkout.session.completed':
      // 新規サブスクリプション開始
      const session = event.data.object;
      console.log('Subscription started:', session);
      // ここでデータベースにユーザー情報を保存
      break;
    
    case 'customer.subscription.updated':
      // サブスクリプション更新
      const subscription = event.data.object;
      console.log('Subscription updated:', subscription);
      break;
    
    case 'customer.subscription.deleted':
      // サブスクリプションキャンセル
      const canceledSubscription = event.data.object;
      console.log('Subscription canceled:', canceledSubscription);
      break;
    
    case 'invoice.payment_succeeded':
      // 月額支払い成功
      const invoice = event.data.object;
      console.log('Payment succeeded:', invoice);
      break;
    
    case 'invoice.payment_failed':
      // 支払い失敗
      const failedInvoice = event.data.object;
      console.log('Payment failed:', failedInvoice);
      break;
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 5. 環境変数の設定

`.env` ファイルを作成：

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 6. フロントエンドの更新

`src/components/LessonPlansSection.tsx` の `handleStripeCheckout` 関数のコメントアウトを解除し、実際のAPIエンドポイントを設定します：

```typescript
const handleStripeCheckout = async (priceId: string, planName: string) => {
  try {
    const response = await fetch('https://your-backend.com/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        planName,
        mode: 'subscription',
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href,
      })
    });
    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Checkout error:', error);
    alert('エラーが発生しました。もう一度お試しください。');
  }
};
```

### 7. Webhookの設定

1. Stripeダッシュボードで「Developers」→「Webhooks」に移動
2. 「Add endpoint」をクリック
3. エンドポイントURL: `https://your-backend.com/api/webhook`
4. 監視するイベントを選択：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Webhook署名シークレットをコピーして環境変数に設定

### 8. 成功/キャンセルページの作成（オプション）

ユーザーが支払いを完了した後の成功ページ、またはキャンセルした場合のページを作成します。

## テスト

### テストカード番号

- 成功: `4242 4242 4242 4242`
- 支払い失敗: `4000 0000 0000 0002`
- 3Dセキュア認証が必要: `4000 0027 6000 3184`

有効期限: 任意の将来の日付
CVC: 任意の3桁
郵便番号: 任意

## 本番環境へのデプロイ

1. Stripeのテストモードから本番モードに切り替え
2. 本番環境のAPIキーとWebhookシークレットを設定
3. HTTPSを使用していることを確認
4. 実際の決済テストを実施

## サポート

- [Stripe公式ドキュメント](https://stripe.com/docs)
- [Stripe Checkoutガイド](https://stripe.com/docs/payments/checkout)
- [サブスクリプションガイド](https://stripe.com/docs/billing/subscriptions/overview)

## セキュリティチェックリスト

- [ ] APIキーは環境変数に保存（コードにハードコードしない）
- [ ] Webhook署名を検証
- [ ] HTTPS通信のみ
- [ ] 価格IDは動的に設定（ハードコードしない）
- [ ] ユーザー入力のサニタイズ
- [ ] エラーハンドリングの実装
- [ ] ログの記録（個人情報は除外）
