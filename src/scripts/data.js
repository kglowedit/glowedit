/**
 * Core Data Layer for Seoul Glow Edit
 * Handles Seed Data, LocalStorage sync, and Outbound Affiliate Click tracking
 */

export const INITIAL_PRODUCTS = [
  {
    id: "round-lab-birch-sunscreen",
    brand: "Round Lab",
    name: {
      en: "Birch Juice Moisturizing Sunscreen SPF50+ PA++++ (50ml)",
      zh: "桦树汁保湿防晒霜 SPF50+ PA++++ (50ml)",
      ja: "白樺水分サンクリーム SPF50+ PA++++ (50ml)"
    },
    category: "sun-care",
    skinTypes: ["dry", "sensitive", "combination"],
    priceUSD: 19.90,
    originalPriceUSD: 28.00,
    rating: 4.9,
    reviewsCount: 28450,
    badge: {
      en: "Olive Young #1 Sunscreen 4 Years in a Row",
      zh: "Olive Young 连续4年防晒销量总冠军",
      ja: "オリーブヤング 4年連続日焼け止め第1位"
    },
    image: "/assets/images/sunscreen-guide.jpg",
    oliveYoungUrl: "https://global.oliveyoung.com/product/detail?prdtNo=GA210611293&aff_id=glowseoul&sub_id=editorial_sun",
    inStock: true,
    clicks: 1420
  },
  {
    id: "anua-heartleaf-toner",
    brand: "Anua",
    name: {
      en: "Heartleaf 77% Soothing Toner (250ml)",
      zh: "鱼腥草77%舒缓镇静爽肤水 (250ml)",
      ja: "ドクダミ77%スージングトナー (250ml)"
    },
    category: "glass-skin",
    skinTypes: ["sensitive", "oily", "acne"],
    priceUSD: 16.50,
    originalPriceUSD: 21.00,
    rating: 4.8,
    reviewsCount: 34120,
    badge: {
      en: "Olive Young Toner Awards Grand Winner",
      zh: "Olive Young 爽肤水部门年度大奖",
      ja: "オリーブヤング 化粧水部門 年間大賞"
    },
    image: "/assets/images/anua-torriden.jpg",
    oliveYoungUrl: "https://global.oliveyoung.com/product/detail?prdtNo=GA210912185&aff_id=glowseoul&sub_id=editorial_anua",
    inStock: true,
    clicks: 1890
  },
  {
    id: "torriden-dive-in-serum",
    brand: "Torriden",
    name: {
      en: "DIVE-IN Low Molecular Hyaluronic Acid Serum (50ml)",
      zh: "微分子玻尿酸深层补水精华液 (50ml)",
      ja: "ダイブイン 低分子ヒアルロン酸セラム (50ml)"
    },
    category: "glass-skin",
    skinTypes: ["dry", "combination", "sensitive"],
    priceUSD: 18.20,
    originalPriceUSD: 24.00,
    rating: 4.9,
    reviewsCount: 22890,
    badge: {
      en: "Korea Consumer Choice Best Hydration Serum",
      zh: "韩国美妆测评榜补水精华 No.1",
      ja: "ファへ・オリヤン 美容液部門 1位獲得"
    },
    image: "/assets/images/anua-torriden.jpg",
    oliveYoungUrl: "https://global.oliveyoung.com/product/detail?prdtNo=GA210410427&aff_id=glowseoul&sub_id=editorial_torriden",
    inStock: true,
    clicks: 1640
  },
  {
    id: "beauty-of-joseon-sunscreen",
    brand: "Beauty of Joseon",
    name: {
      en: "Relief Sun: Rice + Probiotics SPF50+ PA++++ (50ml)",
      zh: "大米益生菌水润防晒乳 SPF50+ PA++++ (50ml)",
      ja: "米＆プロバイオティクス日焼け止め SPF50+ PA++++ (50ml)"
    },
    category: "sun-care",
    skinTypes: ["dry", "sensitive", "aging"],
    priceUSD: 14.80,
    originalPriceUSD: 18.00,
    rating: 4.9,
    reviewsCount: 41200,
    badge: {
      en: "Global Viral Sensation · Clean Beauty",
      zh: "全球海淘现象级爆款 · 纯净美妆",
      ja: "世界中でメガヒット · クリーン処方"
    },
    image: "/assets/images/sunscreen-guide.jpg",
    oliveYoungUrl: "https://global.oliveyoung.com/product/detail?prdtNo=GA220314482&aff_id=glowseoul&sub_id=editorial_boj",
    inStock: true,
    clicks: 2150
  },
  {
    id: "cosrx-snail-mucin-essence",
    brand: "COSRX",
    name: {
      en: "Advanced Snail 96 Mucin Power Essence (100ml)",
      zh: "高浓度蜗牛原液精华 (100ml)",
      ja: "アドバンスド スネイル96 ムチンパワーエッセンス (100ml)"
    },
    category: "glass-skin",
    skinTypes: ["dry", "sensitive", "aging"],
    priceUSD: 17.50,
    originalPriceUSD: 25.00,
    rating: 4.8,
    reviewsCount: 52000,
    badge: {
      en: "Olive Young Global Hall of Fame",
      zh: "Olive Young 全球殿堂级热销单品",
      ja: "オリーブヤング グローバル殿堂入りコスメ"
    },
    image: "/assets/images/glass-skin.jpg",
    oliveYoungUrl: "https://global.oliveyoung.com/product/detail?prdtNo=GA180800311&aff_id=glowseoul&sub_id=editorial_cosrx",
    inStock: true,
    clicks: 1980
  },
  {
    id: "mediheal-madecassoside-pad",
    brand: "Mediheal",
    name: {
      en: "Madecassoside Blemish Toner Pad (100 pads)",
      zh: "积雪草修护舒缓爽肤棉片 (100片大容量)",
      ja: "マデカソサイド ブレミッシュ トナーパッド (100枚入)"
    },
    category: "trouble",
    skinTypes: ["sensitive", "acne", "combination"],
    priceUSD: 17.90,
    originalPriceUSD: 22.00,
    rating: 4.9,
    reviewsCount: 19300,
    badge: {
      en: "Olive Young Toner Pad Category #1",
      zh: "Olive Young 棉片类目销量榜第1名",
      ja: "オリーブヤング トナーパッド部門 1位"
    },
    image: "/assets/images/oliveyoung-awards.jpg",
    oliveYoungUrl: "https://global.oliveyoung.com/product/detail?prdtNo=GA220916682&aff_id=glowseoul&sub_id=editorial_mediheal",
    inStock: true,
    clicks: 1120
  }
];

export const INITIAL_ARTICLES = [
  {
    id: "olive-young-awards-2026-guide",
    slug: "olive-young-awards-2026-guide",
    status: "published",
    featured: true,
    category: "awards",
    skinType: "all",
    coverImage: "/assets/images/oliveyoung-awards.jpg",
    readTime: 6,
    views: 38400,
    publishDate: "2026-10-12",
    author: {
      name: "Min-Ji Kang",
      role: "Senior Beauty Editor, Seoul Glow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
    },
    title: {
      en: "The 2026 Olive Young Award Winners: What's Actually Worth Buying?",
      zh: "2026 韩国 Olive Young 年度大赏揭晓：到底哪些断货王最值得海淘？",
      ja: "【2026年最新】オリーブヤングアワード受賞コスメ総まとめ！本当に買うべき名品7選"
    },
    excerpt: {
      en: "We analyzed 2.4 million verified Olive Young customer reviews in Seoul to pinpoint the genuine holy grails that transform skin textures, reduce acne, and provide glass skin radiance.",
      zh: "深度拆解首尔 Olive Young 240万真实买家评价，剔除营销滤镜，为您盘点真正能改善粗糙、平复痘痘、打造通透水光肌的断货王护肤榜单。",
      ja: "ソウル現地のオリーブヤングで240万件のリアルレビューを分析！SNSで話題のコスメの中から、プロが本当に推す実力派スキンケアを厳選レビュー。"
    },
    content: {
      en: `
### Why the Olive Young Awards Matter for Global Skincare Enthusiasts

If you have ever stepped foot inside an Olive Young in Myeongdong or Seongsu-dong, you know the sensory overload: walls of minimalist serums, stacks of soothing toner pads, and glowing display pedestals. Olive Young is not just Korea's largest health and beauty drugstore—it is the ultimate proving ground for clinical skincare efficacy.

Unlike vanity awards decided by marketing sponsors, the annual **Olive Young Awards** are calculated strictly from millions of barcode scans, repeat purchase rates, and verified in-app buyer feedback across Korea.

### 1. The Undisputed Sunscreen Champion: Round Lab Birch Juice

Sun protection in Korea is treated not merely as beach gear, but as daily anti-aging healthcare. **Round Lab's Birch Juice Moisturizing Sunscreen** has held the #1 spot for consecutive years because it feels identical to a lightweight emulsion. Formulated with Inje birch tree sap and hyaluronic acid, it leaves zero white cast and no greasy film under cushion foundations.

### 2. Soothing Irritation Overnight: Anua Heartleaf 77%

With rising pollution and sensitivity, Heartleaf (*Houttuynia Cordata*) has dethroned classic Centella Asiatica in Seoul dermatologists' offices. Anua's formulation features a 77% sub-acidic heartleaf extract tested for non-comedogenic safety. It cools heated facial temperature by 3.2°C upon application.

### How to Order Directly with Worldwide Delivery

Through Olive Young Global, international shoppers receive verified genuine products directly from CJ's central logistics hub in Incheon, with express DHL/FedEx delivery to over 150 countries. Use promo code **GLOW10** at checkout for an additional 10% discount on orders over $60.
      `,
      zh: `
### 为什么 Olive Young 年度大赏是全球韩系护肤的风向标？

如果你曾走进首尔明洞或圣水洞的 Olive Young 旗舰店，一定会被那面震撼的面膜墙和一排排极简设计的小白瓶、积雪草棉片所吸引。Olive Young 作为韩国最具代表性的综合美妆个护零售巨头，其年度大奖并非由商业广告评定，而是根据每年数千万笔真实收银机条码扫描、回购率和 App 实名买家评分综合产生。

### 1. 蝉联多年的防晒断货王：Round Lab 独岛白桦汁水润防晒

在韩国，防晒早已超越了海滩度假的概念，被视为抵御光老化的日常必修护肤品。**Round Lab 独岛白桦汁防晒**之所以能常年霸榜，在于其宛如清爽乳液般的丝滑质地。添加韩国江原道麟蹄郡的白桦树汁精华与微分子透明质酸，成膜迅速，完全不泛白、不搓泥，上妆前打底服帖透亮。

### 2. 痘痘泛红急救救星：Anua 77% 鱼腥草舒缓爽肤水

首尔皮肤科诊所近年来力推的抗炎镇静核心成分非“鱼腥草”莫属。Anua 采用黄金配比的 77% 弱酸性鱼腥草提取物，通过非致痘性临床测试。在泛红或换季敏感时，用它湿敷 5 分钟，面部肌肤温度可迅速降低，消退浮红效果肉眼可见。

### 全球直邮购买技巧与专享折扣

海外用户无需寻找代购，直接访问 Olive Young Global 官方海淘商城，由仁川保税中心直邮至全球 150 多个国家与地区。结算时输入专属优惠码 **GLOW10**，即可在折上折的基础上再享 10% 优惠。
      `,
      ja: `
### 世界中の韓国コスメファンが注目する「オリーブヤングアワード」とは？

明洞や聖水（ソンス）のオリーブヤングに足を踏み入れたことがある人なら、壁一面に並ぶシートマスクやトナーパッドの熱気に圧倒された経験があるはず。オリーブヤングは韓国No.1のヘルス＆ビューティーストアであり、韓国コスメのトレンド発信地そのものです。

「オリーブヤングアワード」は、スポンサーの宣伝ではなく、年間数千万件に及ぶリアルなレジ通過データとリピート率、購入者レビューに基づいて厳正に選定されるため、現地の韓国女子が本当に自腹買いしている名品だけが残ります。

### 1. 不動のUVケア部門1位：ROUND LAB 白樺水分サンクリーム

韓国では「日焼け止め＝毎日のスキンケア最後の保湿クリーム」という意識が定着しています。ラウンドラボの白樺サンクリームは、みずみずしいジェル乳液のようなテクスチャーで白浮きやベタつきが一切なく、メイク前の下地としても極めて優秀です。

### 2. ゆらぎ肌・肌荒れレスキュー：Anua ドクダミ77% スージングトナー

近年、韓国の美容皮膚科でも推奨される鎮静成分「ドクダミエキス」を77%贅沢に配合。さらっとしたテクスチャーでありながら肌の奥（角質層）まで素早く浸透し、ほてった肌温度をスーッと落ち着かせます。トナーパッドに含ませて部分パックする使い方がソウルでも大流行中。

### 公式通販 Olive Young Global から日本へ直配送

日本への配送は佐川急便やヤマト便等で追跡可能・通常3〜5営業日で到着します。お会計時に限定プロモコード **GLOW10** を入力すると、さらに10%OFFが適用されます。
      `
    },
    products: [
      "round-lab-birch-sunscreen",
      "anua-heartleaf-toner",
      "torriden-dive-in-serum",
      "mediheal-madecassoside-pad"
    ]
  },
  {
    id: "korean-glass-skin-routine-step-by-step",
    slug: "korean-glass-skin-routine-step-by-step",
    featured: false,
    category: "glass-skin",
    skinType: "dry",
    coverImage: "/assets/images/glass-skin.jpg",
    readTime: 5,
    views: 29150,
    publishDate: "2026-10-10",
    author: {
      name: "Chloe Dupont",
      role: "Global K-Beauty Contributor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
    },
    title: {
      en: "The Modern Korean 5-Step Glass Skin Routine: Ditch the 10-Step Myth",
      zh: "新一代韩系 5 步水光肌极简公式：告别繁琐的 10 步过度护肤",
      ja: "【新常識】10ステップはもう古い！新世代・韓国5ステップ水光肌スキンケアルーティン"
    },
    excerpt: {
      en: "Learn how Seoul's top dermatologists evolved from heavy 10-step regimens to targeted micro-layering using barrier-friendly toners, snail mucin, and hyaluronic drops.",
      zh: "首尔知名皮肤科专家联合推荐：告别给皮肤造成负担的繁杂步骤，掌握“轻薄微叠涂”秘诀，仅需5步即可唤醒皮肤自发光的水光质感。",
      ja: "厚塗りや過剰ケアを卒業！韓国の現役皮膚科医が提唱する「マイクロレイヤリング（薄膜重ね）」で、内側から発光する水光肌を作るデイリールーティン。"
    },
    content: {
      en: `
### Redefining 'Glass Skin' for 2026

The classic Western perception of K-Beauty often involves a daunting 10 or 12-step ritual. But talk to any skincare formulator in Gangnam today, and they will tell you the trend has decisively shifted toward **Skinimalism** and **Barrier Optimization**.

Glass skin (*Yuri-Pibu*) does not mean coating the face in heavy oils. It is the visual result of an ultra-hydrated stratum corneum with optimal cellular turnover.

### The Essential 5-Step Micro-Layering Routine:

1. **Gentle Low-pH Cleanser**: Protect your natural lipid barrier without squeaky tightness.
2. **Hydrating Toner Layer**: Patting **Anua 77% Heartleaf Toner** or **Torriden DIVE-IN** into clean skin prepares cellular channels.
3. **Targeted Repair Essence**: Apply 2 pumps of **COSRX Snail Mucin 96** onto damp skin to stimulate collagen and smooth textured pores.
4. **Ceramide Barrier Moisture Lock**: Seal in hydration with a lightweight lipid cream.
5. **Fluid Hybrid SPF**: Finish every morning with **Beauty of Joseon Relief Sun** for that signature non-greasy glow.

All these formulas can be added to your cart in one bundle on Olive Young Global, with worldwide free shipping thresholds.
      `,
      zh: `
### 重新定义 2026 “水光肌”

在欧美社交网络上，K-Beauty 曾一度被等同于繁琐的 10 至 12 步护肤流程。但若你走访首尔江南区的皮肤科与抗衰诊所，医生们如今普遍倡导的是“**精简护肤 (Skinimalism)**”与“**强韧屏障保护**”。

真正的韩系水光肌（Yuri-Pibu）绝不是堆砌厚重的油分，而是角质层饱水、光线均匀折射产生的自然通透光泽。

### 科学 5 步微叠涂护肤法：

1. **弱酸性温和洁面**：保护皮脂膜，洗后柔嫩不紧绷。
2. **水光水导引**：使用 **Anua 鱼腥草爽肤水** 拍打按压两次，打开皮肤吸收通道。
3. **高浓精粹修护**：在皮肤微湿状态下涂抹 **COSRX 蜗牛原液**，紧致弹润并平滑毛孔。
4. **神经酰胺锁水面霜**：薄涂轻锁水分，修护屏障。
5. **空气感防晒**：晨间收尾使用 **Beauty of Joseon 大米防晒**，自然修饰素颜光泽。

上述整套水光肌装备均可在 Olive Young Global 一站式加购，海外直邮省心便捷。
      `,
      ja: `
### 2026年版「水光肌（ムルグァンピブ）」の再定義

従来の韓国コスメといえば「10ステップの丁寧なケア」というイメージが強かったかもしれません。しかし現在のソウル・江南（カンナム）の美容皮膚科医たちが口を揃えて提唱しているのは、「**スキニマリズム（最小限ケア）**」と「**肌バリア機能の強化**」です。

本物の水光肌とは、オイルでギトギトにしたツヤではなく、角質層のすみずみまで水分が満ち足りて光を反射する「素肌本来の透明感」を指します。

### 朝晩できる超浸透5ステップ：

1. **弱酸性クレンジング**：肌のうるおいを守りながら不要な汚れだけをオフ。
2. **導入トナー（化粧水）**：**Anua ドクダミトナー** で水分補給と肌温度のクーリング。
3. **修復エッセンス**：濡れた肌に **COSRX スネイルムチン** または **Torriden セラム** を馴染ませてモチモチ肌へ。
4. **セラミド保湿クリーム**：水分が逃げないよう薄膜でシールド。
5. **水光UVケア**：朝は **Beauty of Joseon 日焼け止め** で紫外線から完璧にガード。

すべてのアイテムはオリーブヤンググローバルでまとめ買い可能です。
      `
    },
    products: [
      "anua-heartleaf-toner",
      "torriden-dive-in-serum",
      "cosrx-snail-mucin-essence",
      "beauty-of-joseon-sunscreen"
    ]
  },
  {
    id: "korean-sunscreen-comparison-round-lab-vs-boj",
    slug: "korean-sunscreen-comparison-round-lab-vs-boj",
    featured: false,
    category: "sun-care",
    skinType: "sensitive",
    coverImage: "/assets/images/sunscreen-guide.jpg",
    readTime: 4,
    views: 18720,
    publishDate: "2026-10-08",
    author: {
      name: "Min-Ji Kang",
      role: "Senior Beauty Editor, Seoul Glow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
    },
    title: {
      en: "Round Lab Birch Juice vs Beauty of Joseon Relief Sun: Which Should You Buy?",
      zh: "独岛白桦汁 VS 朝鲜美人大米防晒：Olive Young 两大断货王实测对比",
      ja: "【徹底比較】ROUND LAB vs Beauty of Joseon！オリーブヤング売上TOP2の日焼け止めはどっちを買うべき？"
    },
    excerpt: {
      en: "We compared texture, finish, makeup friendliness, and white-cast levels between the two most viral Korean sunscreens on Olive Young Global.",
      zh: "质地、成膜速度、持妆服帖度与泛白程度全方位横评！揭秘为什么海外博主与韩国本土消费者会各自偏爱这两款神级防晒。",
      ja: "テクスチャー、仕上がりのツヤ感、白浮きの有無、メイク崩れにくさを徹底比較。あなたの肌質に本当に合うのはどちらかズバリ判定します。"
    },
    content: {
      en: `
### The Battle of Korean Chemical Sunscreens

Korean sunscreens have earned worldwide acclaim due to cutting-edge UV filters approved in Asia and Europe (such as Uvinul A Plus and Tinosorb S) paired with soothing skincare actives. Two formulas stand above the rest on Olive Young Global:

- **Round Lab Birch Juice Moisturizing Sunscreen**: Thinner, fluid emulsion texture with a natural skin-like satin sheen. Ideal for oily, combination, or sensitive skin living in humid climates.
- **Beauty of Joseon Relief Sun (Rice + Probiotics)**: Slightly richer cream texture enriched with 30% fermented rice bran extract. Leaves an instant nourishing dewy radiance. Best for dry, mature, or dehydrated complexions.

Both pass stringent independent SPF testing in Korea and Europe with flying colors.
      `,
      zh: `
### 韩国两大王牌防晒巅峰对决

韩系防晒之所以在全球市场风靡，关键在于采用了新一代高稳定紫外线防护剂（如 Uvinul A Plus 与 Tinosorb S），并将高浓度护肤精华融入防晒基底。而在 Olive Young Global 上常年霸占榜首的正是这两款：

- **Round Lab 独岛白桦汁防晒**：质地更清润轻薄，水感极强，成膜后呈现哑光缎光效果。特别推荐油皮、混油皮以及夏季日常通勤使用。
- **Beauty of Joseon 朝鲜美人大米防晒**：质地如丝绒般柔滑润泽，添加 30% 发酵大米提取物，上脸呈现韩剧女主般的通透水光感。极度适合干皮、混干皮以及秋冬季节。

两款均通过韩国与欧盟权威机构独立 SPF50+ 严苛测试，无任何致敏负担。
      `,
      ja: `
### 韓国日焼け止めの頂上決戦

韓国のUVケアが世界中で高く評価されている最大の理由は、アジアや欧州で認可された最新の紫外線吸収剤を採用し、まるで美容乳液のように肌に優しい処方を実現しているからです。その二大巨頭を比較しました：

- **ROUND LAB 白樺水分サンクリーム**：みずみずしい水分エマルジョンタイプ。すっと馴染んでサラリとしたセミツヤ肌に仕上がるため、脂性肌・混合肌や夏場の使用にベスト。
- **Beauty of Joseon 米＆プロバイオティクス日焼け止め**：こっくりとしたリッチなクリーム状。30%の米ぬか発酵エキス配合で、自然なツヤ感としっとり感が長時間持続。乾燥肌や秋・冬の乾燥対策に最適。

どちらもオリーブヤンググローバルの人気セール対象アイテムです。
      `
    },
    products: [
      "round-lab-birch-sunscreen",
      "beauty-of-joseon-sunscreen"
    ]
  },
  {
    id: "heartleaf-vs-cica-korean-calming-ingredients",
    slug: "heartleaf-vs-cica-korean-calming-ingredients",
    featured: false,
    category: "trouble",
    skinType: "sensitive",
    coverImage: "/assets/images/hero-editorial.jpg",
    readTime: 5,
    views: 22400,
    publishDate: "2026-10-18",
    author: {
      name: "Min-Ji Kang",
      role: "Senior Beauty Editor, Seoul Glow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
    },
    title: {
      en: "Heartleaf vs Centella (Cica): Which Calming Active Does Your Skin Barrier Need?",
      zh: "鱼腥草 VS 积雪草（Cica）：你的受损屏障到底需要哪种韩系舒缓王牌？",
      ja: "【徹底解剖】ドクダミ vs CICA（シカ）！赤み・ゆらぎ肌にはどちらの鎮静成分が効果的？"
    },
    excerpt: {
      en: "Both botanical extracts claim to extinguish redness and acne flare-ups. We break down the clinical pharmacology to help you pick the right formula for your barrier.",
      zh: "两者皆号称能消退痘痘泛红。我们从皮肤药理学角度拆解两者的分子机制差异，助你精准选对适合自己受损屏障的修护配方。",
      ja: "どちらも肌荒れや赤みの救世主として名高いハーブ成分。それぞれの臨床メカニズムを皮膚科学視点で比較し、あなたの肌悩みにマッチする選び方を解説します。"
    },
    content: {
      en: `
### The Korean Fascination with Plant-Derived Soothers

Walk down Garosu-gil in Seoul, and practically every dermatologist clinic window features either **Heartleaf (*Houttuynia Cordata*)** or **Centella Asiatica (*Cica*)**. While Western skincare often relies heavily on harsh salicylic acids or benzoyl peroxides to fight breakouts, Korean skincare focuses on reducing **surface inflammation and facial skin temperature** first.

### When to Choose Heartleaf (Houttuynia Cordata)

Heartleaf is naturally packed with **quercitrin**, a bioflavonoid known for inhibiting mast cell degranulation. In simple terms: it stops histamine-related allergic flushing and heat spikes in their tracks.

- **Best For**: Acute redness, hot inflamed cystic acne, heated skin from sun exposure, and fungal acne sensitivity.
- **Top Formula Pick**: **Anua Heartleaf 77% Soothing Toner** cools facial surface temperature by over 3°C on contact.

### When to Choose Centella Asiatica & Madecassoside

Centella Asiatica stimulates fibroblast proliferation and boosts Type I collagen synthesis via its primary triterpenoid active, **Madecassoside**.

- **Best For**: Compromised lipid moisture barriers, peeling from retinol, raw skin post-chemical peel, and deep acne mark recovery.
- **Top Formula Pick**: **Mediheal Madecassoside Blemish Pad** delivers concentrated wound-healing botanicals in a dual-sided gauze pad.

### The Verdict

If your skin is currently hot, red, and angry with active breakouts, start with **Heartleaf**. If your skin is rough, peeling, and stinging from barrier damage, reach for **Centella/Cica**. Both are readily accessible through Olive Young Global with international tracked shipping.
      `,
      zh: `
### 韩系护肤对草本舒缓的执着追求

漫步首尔新沙洞林荫道，几乎所有知名皮肤科诊所的橱窗里都会重点展示“鱼腥草”或“积雪草（Cica）”。欧美护肤体系在应对痘痘时多倾向于高浓度水杨酸或过氧化苯甲酰等强效剥脱手段，而韩系皮肤学则更主张优先通过降温、抗炎来保护健康的角质屏障。

### 什么时候选择鱼腥草（Heartleaf）？

鱼腥草富含高浓度“栎皮苷（Quercitrin）”与黄酮类化合物，能够有效抑制肥大细胞脱颗粒，从根源阻断组胺引起的过敏泛红与发热。

- **适用场景**：突发性大面积红肿、脓疱型痘痘、晒后发热以及换季易受刺激的微炎症状态。
- **代表单品**：**Anua 鱼腥草 77% 爽肤水**，上脸湿敷 5 分钟即可显著降低面部皮肤表面温度。

### 什么时候选择积雪草与积雪草苷（Cica / Madecassoside）？

积雪草的核心三萜类活性成分（积雪草苷与羟基积雪草酸）能够刺激成纤维细胞生成，促进 I 型胶原蛋白重构，加速微小创口的物理性愈合。

- **适用场景**：刷酸过度造成的屏障受损、脱皮刺痛、医美微创后修护以及深色陈旧痘印。
- **代表单品**：**Mediheal 积雪草舒缓修护棉片**，双面纱布设计，兼顾角质调理与高浓湿敷。

### 总结选购指南

当皮肤处于“发烫、泛红、正在爆发活跃痘痘”时，优先选用**鱼腥草**；当皮肤表现为“干燥脱屑、刺痛、屏障受损”时，请选择**积雪草（Cica）**。
      `,
      ja: `
### 韓国スキンケアが植物性鎮静成分にこだわる理由

ソウルの新沙洞（シンサドン）や江南の美容皮膚科を歩くと、クリニックで必ず目にするのが「ドクダミ」と「CICA（ツボクサエキス）」です。欧米のニキビケアがサリチル酸などによる強いピーリングを好むのに対し、韓国の皮膚科学はまず「肌温度の上昇と急性炎症を抑えること」を最優先にします。

### ドクダミ（Heartleaf）を選ぶべきケース

ドクダミにはフラボノイドの一種である「ケルセチン」が豊富に含まれており、アレルギー性のかゆみや赤みを引き起こすヒスタミンの放出を素早くブロックします。

- **おすすめ肌状態**：急な肌荒れ、赤く腫れたニキビ、紫外線によるほてり、マスク擦れによる赤み。
- **代表的処方**：**Anua ドクダミ77% スージングトナー**。塗布した瞬間に肌温度を約3℃クールダウンさせます。

### CICA・マデカッソシドを選ぶべきケース

ツボクサに含まれる「マデカッソシド」は、コラーゲン線維の合成を促し、ダメージを受けた角質層のバリア機能を根本から再構築します。

- **おすすめ肌状態**：レチノールによる皮むけ、乾燥によるヒリヒリ感、ピーリング後の敏感状態、ニキビ跡のケア。
- **代表的処方**：**Mediheal マデカソサイド ブレミッシュパッド**。集中パックとしても拭き取りとしても高い修復力を発揮。

### まとめ

肌が「赤くほてり、今まさにニキビが炎症している」ときは**ドクダミ**。「皮むけや乾燥でバリアが壊れている」ときは**CICA**を選ぶのが正解です。
      `
    },
    products: [
      "anua-heartleaf-toner",
      "mediheal-madecassoside-pad"
    ]
  },
  {
    id: "snail-mucin-benefits-korean-dermatology",
    slug: "snail-mucin-benefits-korean-dermatology",
    featured: false,
    category: "glass-skin",
    skinType: "dry",
    coverImage: "/assets/images/anua-torriden.jpg",
    readTime: 4,
    views: 31200,
    publishDate: "2026-10-15",
    author: {
      name: "Chloe Dupont",
      role: "Global K-Beauty Contributor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
    },
    title: {
      en: "The Science of Snail Mucin: Why Seoul Dermatologists Still Prescribe It for Elasticity & Glow",
      zh: "高浓蜗牛原液的皮肤科学：为何首尔专家至今仍将其奉为弹润水光肌经典？",
      ja: "カタツムリ美容の真実：なぜソウルの皮膚科医は今もスネイルムチンを推奨するのか？"
    },
    excerpt: {
      en: "Beyond the viral TikTok hype, snail secretion filtrate contains a clinically validated cocktail of glycoproteins, glycolic acid, and zinc.",
      zh: "跳出社交媒体营销滤镜，深入分析蜗牛分泌物滤液中真实起效的糖蛋白、微量果酸与甘油三酯复合成分，探寻紧致饱满的科学逻辑。",
      ja: "SNSのバズだけでは終わらない！カタツムリ分泌液に含まれる天然ヒアルロン酸、糖タンパク質、微量グリコール酸がもたらす肌再生のメカニズムを解説。"
    },
    content: {
      en: `
### De-mystifying the World's Most Famous K-Beauty Texture

Few skincare ingredients have captivated global audiences quite like **Snail Secretion Filtrate**. While the concept initially elicited skepticism in Western markets, Korean formulation chemists recognized its unique dual capability: simultaneous wound regeneration and non-greasy moisture delivery.

### The Key Bioactive Components:

1. **Natural Glycosaminoglycans (GAGs)**: Similar to hyaluronic acid, these water-binding polymers plump inter-cellular matrix voids without causing pore clogging.
2. **Allantoin**: A proven soothing agent that accelerates cellular turnover, aiding in the gentle fading of post-inflammatory erythema (acne marks).
3. **Trace Glycolic Acid**: Helps maintain smooth micro-texture across bumpy or textured foreheads and cheeks.

### How to Layer Snail Mucin Correctly

To maximize absorption, always apply snail mucin (such as **COSRX Advanced Snail 96 Mucin Power Essence**) onto damp skin right after your hydrating toner. Pat vigorously until absorbed, then seal with a light moisturizer.
      `,
      zh: `
### 揭开全球最出圈韩系成分的科学面纱

在所有 K-Beauty 明星成分中，几乎没有哪个比“蜗牛原液（Snail Secretion Filtrate）”更具话题性。虽然这一概念初入欧美时曾饱受猎奇目光，但首尔的配方师们很早就从严谨的生物实验中确认了其独特的双重功效：深层角质修护与轻盈无负担的持续锁水。

### 三大生物活性基石：

1. **天然糖胺聚糖（GAGs）**：与透明质酸同源的超强水合分子，能瞬间充盈角质细胞间隙，丰盈肌肤。
2. **尿囊素（Allantoin）**：经过多年临床验证的舒缓抗炎因子，加速角质更新并温和淡化红色新生痘印。
3. **天然微量甘醇酸（Glycolic Acid）**：轻柔平滑面部粗糙颗粒感，呈现细腻的无瑕肌底。

### 专业的正确叠涂手法

想要最大化发挥蜗牛原液的功效，请务必在洁面、拍完爽肤水后，趁面部**微湿状态**下按压上脸，轻拍至拉丝感吸收，随后薄涂乳液锁水。
      `,
      ja: `
### 世界を驚かせた韓国発「カタツムリ成分」の科学

韓国スキンケアの代名詞とも言える「スネイルムチン（カタツムリ分泌液）」。一見奇抜に見えるこの成分ですが、韓国の化粧品研究者たちは古くからその「傷修復能力」と「オイルフリーな深層保湿力」に着目していました。

### 肌を変える3つの天然バイオ成分：

1. **グリコサミノグリカン（GAGs）**：ヒアルロン酸に類似した保水ポリマー。毛穴を塞ぐことなく、細胞の隙間を水分で満たします。
2. **アラントイン**：ニキビの炎症を鎮静し、健やかなターンオーバーをサポートする整肌成分。
3. **微量グリコール酸**：ごわつきがちな肌のキメを優しくなめらかに整えます。

### 効果を最大化するレイヤリング法

**COSRX スネイル96 エッセンス**は、化粧水で肌が十分に湿った状態で2〜3プッシュ手に取り、優しくハンドプレスして馴染ませるのが鉄則です。
      `
    },
    products: [
      "cosrx-snail-mucin-essence",
      "torriden-dive-in-serum"
    ]
  }
];

// Initialize and manage localStorage persistence
export function getArticles() {
  const saved = localStorage.getItem('kbeauty_articles');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      let changed = false;
      parsed.forEach(a => {
        if (!a.status) {
          a.status = 'published';
          changed = true;
        }
      });
      INITIAL_ARTICLES.forEach(initArt => {
        if (!parsed.some(a => a.id === initArt.id)) {
          parsed.push(initArt);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('kbeauty_articles', JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      console.error("Error reading saved articles", e);
    }
  }
  const seeded = INITIAL_ARTICLES.map(a => ({ ...a, status: a.status || 'published' }));
  localStorage.setItem('kbeauty_articles', JSON.stringify(seeded));
  return seeded;
}

export function getPublishedArticles() {
  return getArticles().filter(a => (a.status || 'published') === 'published');
}

export function getDraftArticles() {
  return getArticles().filter(a => a.status === 'draft');
}

export function toggleArticleStatus(id, targetStatus) {
  const articles = getArticles();
  const art = articles.find(a => a.id === id);
  if (art) {
    art.status = targetStatus || (art.status === 'draft' ? 'published' : 'draft');
    localStorage.setItem('kbeauty_articles', JSON.stringify(articles));
  }
  return articles;
}

export function saveArticle(article) {
  const articles = getArticles();
  const cleanArticle = {
    ...article,
    status: article.status || 'published'
  };
  const index = articles.findIndex(a => a.id === cleanArticle.id);
  if (index >= 0) {
    articles[index] = cleanArticle;
  } else {
    articles.unshift(cleanArticle);
  }
  localStorage.setItem('kbeauty_articles', JSON.stringify(articles));
  return articles;
}

export function deleteArticle(id) {
  let articles = getArticles();
  articles = articles.filter(a => a.id !== id);
  localStorage.setItem('kbeauty_articles', JSON.stringify(articles));
  return articles;
}

export function getProducts() {
  const saved = localStorage.getItem('kbeauty_products');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading saved products", e);
    }
  }
  localStorage.setItem('kbeauty_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
}

export function saveProduct(product) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem('kbeauty_products', JSON.stringify(products));
  return products;
}

export function recordAffiliateClick(productId, source = "product_card") {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    product.clicks = (product.clicks || 0) + 1;
    saveProduct(product);
  }

  // Log to click stream
  const rawClicks = localStorage.getItem('kbeauty_affiliate_click_log');
  const clickLog = rawClicks ? JSON.parse(rawClicks) : [];
  clickLog.unshift({
    timestamp: new Date().toISOString(),
    productId,
    source,
    country: localStorage.getItem('kbeauty_geo_country') || 'US',
    lang: localStorage.getItem('kbeauty_lang') || 'en',
    commissionEstimateUSD: +(Math.random() * 1.5 + 1.2).toFixed(2)
  });
  // Keep last 100 entries
  if (clickLog.length > 100) clickLog.pop();
  localStorage.setItem('kbeauty_affiliate_click_log', JSON.stringify(clickLog));
}

export function getAffiliateClicks() {
  const raw = localStorage.getItem('kbeauty_affiliate_click_log');
  return raw ? JSON.parse(raw) : [];
}

// Currencies and rates
export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  JPY: { symbol: '¥', rate: 154.5, label: 'JPY (¥)' },
  CNY: { symbol: '¥', rate: 7.24, label: 'CNY (¥)' },
  KRW: { symbol: '₩', rate: 1390.0, label: 'KRW (₩)' },
  EUR: { symbol: '€', rate: 0.94, label: 'EUR (€)' }
};

export function formatPrice(priceUSD, currencyCode = 'USD') {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = priceUSD * curr.rate;
  if (currencyCode === 'KRW' || currencyCode === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
}

export function getArticleBySlug(slug) {
  const articles = getArticles();
  return articles.find(a => a.slug === slug || a.id === slug) || null;
}

// Categories Management
export const INITIAL_CATEGORIES = [
  { id: "glass-skin", name: { en: "Glass Skin Guides", zh: "水光肌指南", ja: "水光肌ガイド" }, count: 2 },
  { id: "sun-care", name: { en: "Sun Care & SPF", zh: "防晒科学", ja: "UVケア科学" }, count: 1 },
  { id: "awards", name: { en: "Seoul Trends & Awards", zh: "首尔趋势与大赏", ja: "現地トレンド・受賞作" }, count: 1 },
  { id: "trouble", name: { en: "Barrier Repair & Calming", zh: "屏障修护与舒缓", ja: "鎮静・バリア修復" }, count: 1 }
];

export function getCategories() {
  const saved = localStorage.getItem('kbeauty_categories');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem('kbeauty_categories', JSON.stringify(INITIAL_CATEGORIES));
  return INITIAL_CATEGORIES;
}

export function saveCategory(cat) {
  const cats = getCategories();
  const index = cats.findIndex(c => c.id === cat.id);
  if (index >= 0) cats[index] = cat;
  else cats.push(cat);
  localStorage.setItem('kbeauty_categories', JSON.stringify(cats));
  return cats;
}

export function deleteCategory(id) {
  let cats = getCategories().filter(c => c.id !== id);
  localStorage.setItem('kbeauty_categories', JSON.stringify(cats));
  return cats;
}

// Tags Management
export const INITIAL_TAGS = [
  "#GlassSkin",
  "#Sunscreen",
  "#Heartleaf",
  "#Cica",
  "#SnailMucin",
  "#BarrierRepair",
  "#OliveYoungAwards",
  "#Hydration"
];

export function getTags() {
  const saved = localStorage.getItem('kbeauty_tags');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem('kbeauty_tags', JSON.stringify(INITIAL_TAGS));
  return INITIAL_TAGS;
}

export function saveTag(tag) {
  const tags = getTags();
  const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
  if (!tags.includes(cleanTag)) {
    tags.push(cleanTag);
    localStorage.setItem('kbeauty_tags', JSON.stringify(tags));
  }
  return tags;
}

export function deleteTag(tag) {
  let tags = getTags().filter(t => t !== tag);
  localStorage.setItem('kbeauty_tags', JSON.stringify(tags));
  return tags;
}

// Community Forum Management
export const INITIAL_COMMUNITY_POSTS = [
  {
    id: "post-notice-1",
    postNo: 101,
    title: "📢 [NOTICE] K-Beauty Glow Community Guidelines & Clean Discussion Policy",
    author: "K-Beauty Glow Editorial",
    country: "🇰🇷 Seoul (Admin)",
    category: "Notice",
    date: "1 day ago",
    createdAt: "2026-10-21T08:00:00Z",
    views: 1840,
    likes: 128,
    isPinned: true,
    isNotice: true,
    status: "published",
    password: "admin",
    tags: ["#CommunityRules", "#CleanBeauty", "#Notice"],
    content: "Welcome to The K-Glow Edit Global Community!\n\n1. Be respectful to fellow skincare enthusiasts worldwide.\n2. When asking routine advice, please share your skin type, climate, and current products.\n3. Honest holy grail reviews and Olive Young hauls are always celebrated!\n4. No hate speech, spam affiliate links, or harassment. Let's keep this space radiant and helpful.",
    replies: [
      {
        id: "reply-n1",
        author: "Sarah J.",
        country: "🇺🇸 USA",
        date: "20 hours ago",
        createdAt: "2026-10-21T12:00:00Z",
        content: "Love this community! So happy to have a dedicated space for real K-beauty talk without marketing fluff.",
        likes: 14,
        password: "user123"
      },
      {
        id: "reply-n2",
        author: "Yuki Tanaka",
        country: "🇯🇵 Japan",
        date: "18 hours ago",
        createdAt: "2026-10-21T14:30:00Z",
        content: "韓国現地の最新オリーブヤング情報がとても参考になります。いつもありがとうございます！",
        likes: 9,
        password: "user123"
      }
    ]
  },
  {
    id: "post-notice-2",
    postNo: 102,
    title: "💡 [TIPS] Olive Young Global Shipping, Customs & Promo Code Guide (Updated 2026)",
    author: "Min-Ji (Seoul Editor)",
    country: "🇰🇷 Seoul (Admin)",
    category: "Olive Young Haul",
    date: "2 days ago",
    createdAt: "2026-10-20T10:00:00Z",
    views: 3410,
    likes: 215,
    isPinned: true,
    isNotice: false,
    status: "published",
    password: "admin",
    tags: ["#OliveYoungGlobal", "#PromoCode", "#ShippingTips"],
    content: "Essential tips when ordering directly from Olive Young Global:\n\n• Free shipping threshold: $60+ USD globally via DHL Express.\n• UK / EU Customs: Keep cart under £135 / €150 to avoid extra import procedures at your doorstep.\n• Promo code GLOW10 gives an extra 10% off storewide during seasonal big sale weeks!\n• Delivery usually takes 3 to 5 business days from Incheon Airport.",
    replies: [
      {
        id: "reply-n3",
        author: "Charlotte Davies",
        country: "🇬🇧 UK",
        date: "1 day ago",
        createdAt: "2026-10-21T09:15:00Z",
        content: "Can confirm DHL to London took literally 4 days! Such a lifesaver.",
        likes: 18,
        password: "user123"
      }
    ]
  },
  {
    id: "post-1",
    postNo: 103,
    title: "Anyone tried layering COSRX Snail Mucin with Torriden Hyaluronic Acid?",
    author: "Elena Vance",
    country: "🇺🇸 USA",
    category: "Routine Advice",
    date: "2 hours ago",
    createdAt: "2026-10-22T15:30:00Z",
    views: 620,
    likes: 34,
    isPinned: false,
    isNotice: false,
    status: "published",
    password: "1234",
    tags: ["#SnailMucin", "#HyaluronicAcid", "#GlassSkin"],
    content: "I have dehydrated combination skin and love both of these products. Should I apply Torriden first or COSRX? Any tips on absorption time between layers?",
    replies: [
      {
        id: "reply-1-1",
        author: "Kenji Sato",
        country: "🇯🇵 Japan",
        date: "1 hour ago",
        createdAt: "2026-10-22T16:20:00Z",
        content: "Yes! Apply Torriden DIVE-IN first on slightly damp skin because of its ultra-low molecular weight, then pat COSRX snail essence on top. It locks in moisture amazingly without sticky residue.",
        likes: 12,
        password: "1234"
      },
      {
        id: "reply-1-2",
        author: "Min-Ji (Editor)",
        country: "🇰🇷 Seoul",
        date: "45 mins ago",
        createdAt: "2026-10-22T16:45:00Z",
        content: "Great question! That's actually the classic Seoul 2-step hydration sandwich. Just wait about 30-40 seconds for the hyaluronic acid to sink in before applying the snail mucin.",
        likes: 8,
        password: "admin"
      }
    ]
  },
  {
    id: "post-2",
    postNo: 104,
    title: "Round Lab Birch Juice vs BOJ Rice Sunscreen under matte cushion?",
    author: "Sophie Chen",
    country: "🇨🇦 Canada",
    category: "Holy Grail Reviews",
    date: "5 hours ago",
    createdAt: "2026-10-22T12:00:00Z",
    views: 940,
    likes: 56,
    isPinned: false,
    isNotice: false,
    status: "published",
    password: "1234",
    tags: ["#Sunscreen", "#RoundLab", "#BeautyOfJoseon", "#MakeupBase"],
    content: "Need advice for my everyday makeup base. I use the Clio Kill Cover cushion and want zero pilling around the nose and jawline area.\n\nWhich one sits better under semi-matte cushion foundation?",
    replies: [
      {
        id: "reply-2-1",
        author: "Chloe D.",
        country: "🇫🇷 France",
        date: "3 hours ago",
        createdAt: "2026-10-22T14:10:00Z",
        content: "Round Lab works much better under matte cushion because of its lightweight essence texture. BOJ is a touch more nourishing/dewy which can make matte foundation slip if you have oily T-zone.",
        likes: 16,
        password: "1234"
      }
    ]
  },
  {
    id: "post-3",
    postNo: 105,
    title: "Anua Heartleaf 77% vs Centella (Cica) Toner for calming hormonal breakouts?",
    author: "Jessica Wong",
    country: "🇦🇺 Australia",
    category: "Ingredient Q&A",
    date: "8 hours ago",
    createdAt: "2026-10-22T09:30:00Z",
    views: 780,
    likes: 41,
    isPinned: false,
    isNotice: false,
    status: "published",
    password: "1234",
    tags: ["#Heartleaf", "#Centella", "#AcneCare", "#Calming"],
    content: "I get inflamed red bumps along my jawline every month. Should I go with Anua 77% Heartleaf or Skin1004 Centella Ampoule? Which one works faster for active flare-ups?",
    replies: [
      {
        id: "reply-3-1",
        author: "Hana K.",
        country: "🇰🇷 Seoul",
        date: "6 hours ago",
        createdAt: "2026-10-22T11:00:00Z",
        content: "Anua Heartleaf is superior for active heat and redness relief (try doing a 5-minute toner pad mask!). Centella is great for rebuilding barrier after the bump dries down.",
        likes: 22,
        password: "1234"
      }
    ]
  },
  {
    id: "post-4",
    postNo: 106,
    title: "What is your current holy grail night cream for winter barrier repair?",
    author: "Marcus Lindqvist",
    country: "🇸🇪 Sweden",
    category: "Free Chat",
    date: "1 day ago",
    createdAt: "2026-10-21T18:00:00Z",
    views: 1120,
    likes: 63,
    isPinned: false,
    isNotice: false,
    status: "published",
    password: "1234",
    tags: ["#BarrierRepair", "#Ceramide", "#WinterSkincare"],
    content: "Nordic winter is brutal on my skin barrier with indoor heating. Looking for heavy ceramides that won't clog pores. Currently eyeing Aestura Atobarrier 365 Cream vs Illiyoon Ceramide Ato Concentrate. Drop your recommendations!",
    replies: [
      {
        id: "reply-4-1",
        author: "Emily Watson",
        country: "🇩🇪 Germany",
        date: "22 hours ago",
        createdAt: "2026-10-21T19:30:00Z",
        content: "Aestura Atobarrier 365 is 100% worth every penny. The micro-capsules melt right into the skin and fix irritation overnight.",
        likes: 19,
        password: "1234"
      }
    ]
  }
];

function normalizePost(p, index) {
  return {
    id: p.id || `post-${Date.now()}-${index}`,
    postNo: p.postNo || (100 + index + 1),
    title: p.title || "Untitled Discussion",
    content: p.content || "",
    category: p.category || "Routine Advice",
    author: p.author || "Anonymous",
    country: p.country || "🌍 Global",
    password: p.password || "1234",
    date: p.date || "Recently",
    createdAt: p.createdAt || new Date().toISOString(),
    views: typeof p.views === 'number' ? p.views : Math.floor(Math.random() * 200) + 40,
    likes: typeof p.likes === 'number' ? p.likes : 0,
    isPinned: !!p.isPinned,
    isNotice: p.category === 'Notice' || !!p.isNotice,
    status: p.status || "published",
    tags: Array.isArray(p.tags) ? p.tags : [],
    replies: Array.isArray(p.replies) ? p.replies.map((r, rIdx) => ({
      id: r.id || `reply-${Date.now()}-${rIdx}`,
      author: r.author || "Reader",
      country: r.country || "🌍 Global",
      date: r.date || "Recently",
      createdAt: r.createdAt || new Date().toISOString(),
      content: r.content || "",
      password: r.password || "1234",
      likes: typeof r.likes === 'number' ? r.likes : 0
    })) : []
  };
}

export function getCommunityPosts(options = {}) {
  const { includeHidden = false, category = 'all', searchQuery = '', sortBy = 'latest' } = options;
  const saved = localStorage.getItem('kbeauty_community_posts_v3');
  let posts = [];

  if (saved) {
    try {
      posts = JSON.parse(saved);
    } catch (e) {
      posts = INITIAL_COMMUNITY_POSTS;
    }
  } else {
    // Check old key migration if exists
    const legacy = localStorage.getItem('kbeauty_community_posts');
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed) && parsed.length > 0) {
          posts = parsed.map(normalizePost);
          // If legacy doesn't have notices, prepend our rich seed notices
          if (!posts.some(p => p.isPinned)) {
            posts = [...INITIAL_COMMUNITY_POSTS.filter(p => p.isPinned), ...posts];
          }
        } else {
          posts = INITIAL_COMMUNITY_POSTS;
        }
      } catch (e) {
        posts = INITIAL_COMMUNITY_POSTS;
      }
    } else {
      posts = INITIAL_COMMUNITY_POSTS;
    }
    localStorage.setItem('kbeauty_community_posts_v3', JSON.stringify(posts));
  }

  // Ensure all posts are properly normalized
  posts = posts.map(normalizePost);

  // Filter hidden unless admin requests includeHidden
  if (!includeHidden) {
    posts = posts.filter(p => p.status !== 'hidden');
  }

  // Filter category
  if (category && category !== 'all') {
    if (category === 'pinned' || category === 'Notice') {
      posts = posts.filter(p => p.isPinned || p.category === 'Notice');
    } else {
      posts = posts.filter(p => p.category === category);
    }
  }

  // Filter search query
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  // Sort
  if (sortBy === 'likes') {
    posts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else if (sortBy === 'comments') {
    posts.sort((a, b) => ((b.replies || []).length) - ((a.replies || []).length));
  } else if (sortBy === 'views') {
    posts.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else {
    // Latest: sort by createdAt descending, but keep pinned posts at the very top for default listing
    posts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }

  return posts;
}

export function getAllCommunityPostsRaw() {
  const saved = localStorage.getItem('kbeauty_community_posts_v3');
  if (saved) {
    try {
      return JSON.parse(saved).map(normalizePost);
    } catch (e) {}
  }
  return INITIAL_COMMUNITY_POSTS.map(normalizePost);
}

function persistCommunityPosts(posts) {
  localStorage.setItem('kbeauty_community_posts_v3', JSON.stringify(posts));
  localStorage.setItem('kbeauty_community_posts', JSON.stringify(posts)); // backwards compatibility
  return posts;
}

export function saveCommunityPost(postData) {
  const posts = getAllCommunityPostsRaw();
  const maxPostNo = posts.reduce((max, p) => Math.max(max, p.postNo || 0), 100);

  const newPost = normalizePost({
    ...postData,
    id: postData.id || `post-${Date.now()}`,
    postNo: maxPostNo + 1,
    createdAt: new Date().toISOString(),
    date: 'Just now',
    views: 0,
    likes: 1,
    status: postData.status || 'published',
    replies: []
  }, 0);

  // If pinned, insert at top, else insert after pinned posts
  if (newPost.isPinned) {
    posts.unshift(newPost);
  } else {
    const firstNonPinnedIndex = posts.findIndex(p => !p.isPinned);
    if (firstNonPinnedIndex >= 0) {
      posts.splice(firstNonPinnedIndex, 0, newPost);
    } else {
      posts.push(newPost);
    }
  }

  persistCommunityPosts(posts);
  return posts;
}

export function updateCommunityPost(id, updatedFields) {
  const posts = getAllCommunityPostsRaw();
  const idx = posts.findIndex(p => p.id === id);
  if (idx >= 0) {
    posts[idx] = {
      ...posts[idx],
      ...updatedFields
    };
    persistCommunityPosts(posts);
    return posts[idx];
  }
  return null;
}

export function deleteCommunityPost(id) {
  let posts = getAllCommunityPostsRaw().filter(p => p.id !== id);
  persistCommunityPosts(posts);
  return posts;
}

export function batchDeleteCommunityPosts(ids) {
  const idSet = new Set(ids);
  let posts = getAllCommunityPostsRaw().filter(p => !idSet.has(p.id));
  persistCommunityPosts(posts);
  return posts;
}

export function togglePinCommunityPost(id) {
  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === id);
  if (post) {
    post.isPinned = !post.isPinned;
    persistCommunityPosts(posts);
    return post.isPinned;
  }
  return false;
}

export function toggleHideCommunityPost(id) {
  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === id);
  if (post) {
    post.status = post.status === 'hidden' ? 'published' : 'hidden';
    persistCommunityPosts(posts);
    return post.status;
  }
  return 'published';
}

export function incrementPostViews(id) {
  const sessionKey = `viewed_post_${id}`;
  if (sessionStorage.getItem(sessionKey)) {
    return; // Already viewed in this session
  }
  sessionStorage.setItem(sessionKey, '1');

  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === id);
  if (post) {
    post.views = (post.views || 0) + 1;
    persistCommunityPosts(posts);
  }
}

export function likeCommunityPost(postId) {
  const likedKey = `comm_liked_${postId}`;
  const alreadyLiked = localStorage.getItem(likedKey) === 'true';

  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === postId);
  if (!post) return { likes: 0, isLiked: false };

  if (alreadyLiked) {
    post.likes = Math.max(0, (post.likes || 1) - 1);
    localStorage.removeItem(likedKey);
  } else {
    post.likes = (post.likes || 0) + 1;
    localStorage.setItem(likedKey, 'true');
  }

  persistCommunityPosts(posts);
  return { likes: post.likes, isLiked: !alreadyLiked };
}

export function isPostLikedByMe(postId) {
  return localStorage.getItem(`comm_liked_${postId}`) === 'true';
}

export function addCommunityComment(postId, commentData) {
  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.replies = post.replies || [];
    const newReply = {
      id: `reply-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      author: commentData.author || "Skincare Lover",
      country: commentData.country || "🌍 Global",
      content: commentData.content || "",
      password: commentData.password || "1234",
      createdAt: new Date().toISOString(),
      date: "Just now",
      likes: 0
    };
    post.replies.push(newReply);
    persistCommunityPosts(posts);
    return newReply;
  }
  return null;
}

export function deleteCommunityComment(postId, commentId, password = '', isAdmin = false) {
  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === postId);
  if (post && post.replies) {
    const commentIndex = post.replies.findIndex(r => r.id === commentId);
    if (commentIndex >= 0) {
      const comment = post.replies[commentIndex];
      if (isAdmin || !comment.password || comment.password === password) {
        post.replies.splice(commentIndex, 1);
        persistCommunityPosts(posts);
        return { success: true };
      } else {
        return { success: false, message: "비밀번호가 일치하지 않습니다." };
      }
    }
  }
  return { success: false, message: "댓글을 찾을 수 없습니다." };
}

export function likeCommunityComment(postId, commentId) {
  const likedKey = `comm_comment_liked_${commentId}`;
  const alreadyLiked = localStorage.getItem(likedKey) === 'true';

  const posts = getAllCommunityPostsRaw();
  const post = posts.find(p => p.id === postId);
  if (post && post.replies) {
    const comment = post.replies.find(r => r.id === commentId);
    if (comment) {
      if (alreadyLiked) {
        comment.likes = Math.max(0, (comment.likes || 1) - 1);
        localStorage.removeItem(likedKey);
      } else {
        comment.likes = (comment.likes || 0) + 1;
        localStorage.setItem(likedKey, 'true');
      }
      persistCommunityPosts(posts);
      return { likes: comment.likes, isLiked: !alreadyLiked };
    }
  }
  return { likes: 0, isLiked: false };
}

// =========================================================
// 8. Promo Bar & Event Coupon Management Settings
// =========================================================
export const DEFAULT_PROMO_SETTINGS = {
  topBanner: {
    enabled: true,
    badge: "READER PRIVILEGE",
    textEn: "THE K-GLOW READERS: Use promo code",
    textZh: "THE K-GLOW 读者专属海淘礼遇：结账输入优惠码",
    textJa: "THE K-GLOW 読者限定特典：Olive Young Global 会計時にコード",
    textKo: "THE K-GLOW 독자 전용 혜택: 결제 시 프로모션 코드",
    promoCode: "GLOW10",
    discountEn: "for an exclusive 10% OFF at Olive Young Global",
    discountZh: "在 Olive Young Global 享全场额外 10% 折扣",
    discountJa: "入力でさらに10%OFF",
    discountKo: "입력 시 올리브영 글로벌 전 품목 10% 추가 할인",
    linkUrl: "https://global.oliveyoung.com",
    bgTheme: "dark" // 'dark' | 'rose' | 'gold' | 'emerald'
  },
  eventCoupon: {
    enabled: true,
    badge: "READER PRIVILEGE",
    title: "Olive Young Global 10% OFF",
    desc: "Exclusive verified reader code valid on authentic Korean skincare & cosmetics shipped worldwide.",
    promoCode: "GLOW10",
    discountTag: "10% OFF",
    targetMallName: "Olive Young Global",
    landingUrl: "https://global.oliveyoung.com",
    copySuccessMessage: "Code \"GLOW10\" copied to clipboard! Paste at Olive Young Global checkout.",
    floatingEnabled: true
  }
};

export function getPromoSettings() {
  const saved = localStorage.getItem('kbeauty_promo_settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        topBanner: { ...DEFAULT_PROMO_SETTINGS.topBanner, ...(parsed.topBanner || {}) },
        eventCoupon: { ...DEFAULT_PROMO_SETTINGS.eventCoupon, ...(parsed.eventCoupon || {}) }
      };
    } catch (e) {
      console.error("Error reading saved promo settings", e);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_PROMO_SETTINGS));
}

export function savePromoSettings(settings) {
  const current = getPromoSettings();
  const merged = {
    topBanner: { ...current.topBanner, ...(settings.topBanner || {}) },
    eventCoupon: { ...current.eventCoupon, ...(settings.eventCoupon || {}) }
  };
  localStorage.setItem('kbeauty_promo_settings', JSON.stringify(merged));
  return merged;
}

export function resetPromoSettings() {
  localStorage.setItem('kbeauty_promo_settings', JSON.stringify(DEFAULT_PROMO_SETTINGS));
  return JSON.parse(JSON.stringify(DEFAULT_PROMO_SETTINGS));
}

// Reset data helper
export function resetDemoData() {
  localStorage.setItem('kbeauty_articles', JSON.stringify(INITIAL_ARTICLES));
  localStorage.setItem('kbeauty_products', JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem('kbeauty_categories', JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem('kbeauty_tags', JSON.stringify(INITIAL_TAGS));
  localStorage.setItem('kbeauty_community_posts', JSON.stringify(INITIAL_COMMUNITY_POSTS));
  localStorage.setItem('kbeauty_community_posts_v3', JSON.stringify(INITIAL_COMMUNITY_POSTS));
  localStorage.removeItem('kbeauty_affiliate_click_log');
  resetPromoSettings();
}

