/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from './types';

// Let's create gorgeous high-quality products
export const PRODUCTS: Product[] = [
  {
    id: '1',
    nameAr: 'تي شيرت غرافيك مميز باللون الفحمي والذهبي',
    nameEn: 'Signature Charcoal & Gold Graphic Tee',
    category: 'shirts',
    price: 350,
    originalPrice: 450,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'تي شيرت غرافيك فاخر مصنوع من قطن جيرسي المصري طويل التيلة بنسبة 100٪. يتميز بتفاصيل ذهبية دقيقة توفر مظهراً ملكياً مع ضمان الراحة طوال اليوم.',
    descriptionEn: 'Premium graphic tee crafted from 100% long-staple Egyptian cotton. Features delicate gold detailing that provides a regal touch while keeping your child snug all day long.',
    isBestSeller: true,
    isNewArrival: true,
    isOffer: true,
    detailsAr: [
      'قطن مصري ممتاز 100٪ لحماية بشرة الطفل الحساسة',
      'طباعة ذهبية ناعمة مقاومة للغسيل والتشقق',
      'ياقة مطاطية مريحة لسهولة الارتداء والخلع',
      'صنع بفخر في مصر بأعلى معايير الجودة الفاخرة'
    ],
    detailsEn: [
      '100% premium Egyptian cotton safeguarding sensitive kid skin',
      'Soft metallic gold print, highly durable through multiple washes',
      'Elastic ribbed collar for easy dress-up convenience',
      'Proudly made in Egypt with the highest luxury standards'
    ]
  },
  {
    id: '2',
    nameAr: 'الباقة الكلاسيكية للأولاد الكاجوال',
    nameEn: 'Classic Casual Boys Set',
    category: 'sets',
    price: 850,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'طقم فاخر من قطعتين للأولاد يتميز بقميص بولو ناعم للغاية مع شورت مريح متناسق برباط خصر ذهبي دافئ. مثالي للمناسبات الصيفية والرحلات العائلية الأنيقة.',
    descriptionEn: 'An curated high-end 2-piece set featuring an ultra-soft polo shirt and matching structured shorts with a classic gold drawcord. Perfect for weekend family outings and chic summer days.',
    isBestSeller: true,
    detailsAr: [
      'طقم كاجوال متكامل وعصري بلمسة فاخرة',
      'قميص بولو قطني منسوج دقيق وشورت متين بخيوط معززة',
      'خصر مطاطي مرن قابل للتعديل للتناسب مع مقاس الطفل',
      'تصاميم مستوحاة من خطوط الموضة الأوروبية الحديثة للأطفال'
    ],
    detailsEn: [
      'Complete coordinated urban look with dual functional pockets',
      'Crafted from micro-knit cotton piqué and stretch-blend chino shorts',
      'Adjustable internal elastic waistband assuring custom ergonomic fit',
      'High luxury aesthetic inspired by European chic silhouettes'
    ]
  },
  {
    id: '3',
    nameAr: 'مجموعة الصيف الممتعة من الكتان',
    nameEn: 'Breezy Linen Summer Outfit Set',
    category: 'sets',
    price: 750,
    originalPrice: 890,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'مجموعة مصنوعة من مزيج الكتان والقطن الطبيعي الخفيف، تتميز بقميص ناصع البياض بأزرار خشبية راقية وشورت بلون كاكاو دافئ. مريحة وجيدة التهوية لأجواء مصر الحارة.',
    descriptionEn: 'Fashioned from organic cotton-linen blend, this set comprises a crisp white button-up with tailored wooden buttons and toasted cocoa shorts. Best lightweight comfort in warm climates.',
    isBestSeller: true,
    isOffer: true,
    detailsAr: [
      'كتان طبيعي 100% ممتاز ممزوج بالقطن لنعومة لا مثيل لها',
      'أزرار أصلية فاخرة وخياطة مبرومة فريدة',
      'شورت أنيق ومثالي للمصايف والشواطئ الفاخرة مثل الساحل الشمالي',
      'خصر مريح يمنح طفلك الحرية الكاملة في الحركة واللعب'
    ],
    detailsEn: [
      'Breathable flax linen merged with organic soft-brushed cotton',
      'Rustic real wooden button details and double-reinforced hems',
      'Incredibly elegant set for premium seaside beach clubs or Sahel resorts',
      'Ergonomic stretch waistband enabling uninterrupted active play'
    ]
  },
  {
    id: '4',
    nameAr: 'تي شيرت قطني كلاسيكي يومي',
    nameEn: 'Supreme Daily Cotton Tee',
    category: 'shirts',
    price: 350,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'القطعة الأساسية اليومية لكل طفل. مصممة من نسيج قطني كثيف ومقاوم للمط والبهتان، مع ياقة مدعومة للمحافظة على شكلها المتناسق حتى بعد عشرات مرات الغسيل.',
    descriptionEn: 'The ultimate daily essential. Crafted from double-knit combed yarn that resists stretching and color fading, with a reinforced neckline ensuring a neat lay wash after wash.',
    isBestSeller: true,
    detailsAr: [
      'خامة قطنية فائقة النعومة وتتحمل كثرة الغسيل',
      'ألوان فاخرة وثابتة لا تبهت مع الاستخدام اليومي',
      'قماش معالج حرارياً مضاد للوبر والانكماش',
      'قصة مريحة تمنح الخفة والراحة طوال اليوم'
    ],
    detailsEn: [
      'Hypoallergenic cotton knit optimized for vigorous daily activewear',
      'Azo-free eco safe dyes retaining rich tones after endless launders',
      'Eco-enzyme bio-wash pre-shrunk and pill-resistant finish',
      'Relaxed straight silhouette providing generous freedom of motion'
    ]
  },
  {
    id: '5',
    nameAr: 'مجموعة تريند الحضرية للأولاد الأنيقين',
    nameEn: 'Trend Collection Streetwear Set',
    category: 'sets',
    price: 950,
    originalPrice: 1100,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'طقم رائد ومستوحى من أزياء الشارع العالمية الفاخرة. يجمع بين هودي صيفي خفيف الوزن ونصف أكمام مع جوغر مطاطي متناسق بخطوط ذهبية فخمة تفافية.',
    descriptionEn: 'A trendsetting streetwear masterpiece. Consists of a short-sleeved lightweight summer hoodie paired with custom joggers sporting detailed gold trim inserts.',
    isNewArrival: true,
    isOffer: true,
    detailsAr: [
      'إطلالة عصرية تلفت الأنظار وتلائم المناسبات المميزة',
      'نسيج حراري مسامي خفيف مثالي للفترة الانتقالية بين الفصول',
      'أربطة ذهبية بلمسات معدنية فاخرة منقوشة',
      'حواف مضلعة مرنة تدوم طويلاً دون ارتخاء'
    ],
    detailsEn: [
      'Show-stopping urban profile ideal for premium gatherings & events',
      'Thermo-regulating micro-weave cotton blend suitable year-round',
      'Gilded tipped drawcords with engraved metallic Doma signature brand',
      'Elasticized flat-lock cuffs retaining shape indefinitely'
    ]
  },
  {
    id: '6',
    nameAr: 'طقم الأولاد الحضري ذو الطراز العصري',
    nameEn: 'Urban Kids Tech-Blend Set',
    category: 'sets',
    price: 890,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'مزيج رائع من الراحة الفائقة والتصميم المعماري الحديث. طقم متناسق يجمع بين توب ياقة دائرية وشورت ذو قصة مستقيمة وجيوب خفية مخفية بعناية لتخزين القطع الثمينة للأطفال.',
    descriptionEn: 'A magnificent blend of superior comfort and architectural kids design. Styled with an overhead crew top and straight shorts with invisible zippered pockets for active safe keepings.',
    isBestSeller: true,
    detailsAr: [
      'جيوب جانبية بسحاب مريح وسلس للألعاب والمنتجات',
      'حماية مدمجة من أشعة الشمس بفضل القماش المعالج',
      'شعار دوما ستور الذهبي المطرز بخيوط الحرير على الصدر والخصر',
      'مقاوم فائق للبقع وسهل التنظيف لراحة الأمهات'
    ],
    detailsEn: [
      'Practical utility side zips optimized for active run-and-collect actions',
      'UPF 50+ fabric shield blocks harmful rays on hot sunny fields',
      'Subtle metallic weave luxury emblem detailed at the upper pocket line',
      'Enriched soil-release cloth finish makes laundering spills effortless'
    ]
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev1',
    authorAr: 'أحمد م.',
    authorEn: 'Ahmed M.',
    rating: 5,
    commentAr: 'خامات قطنية ممتازة تفوق التوقعات بحق! الألوان ذهبية وراقية جداً ولا تتأثر بالغسيل المتكرر. الشراء مريح جداً عبر الواتساب والدعم سريع ومحترم.',
    commentEn: 'Exceptional Egyptian cotton and luxury quality beyond expectation! Colors and gold embellishments stay immaculate through laundry. Excellent customer service over WhatsApp.',
    date: '2026-05-15'
  },
  {
    id: 'rev2',
    authorAr: 'سارة ح.',
    authorEn: 'Sarah H.',
    rating: 5,
    commentAr: 'توصيل مذهل وسريع جداً في غضون ٢٤ ساعة في القاهرة والملابس فخمة وخياطتها متقنة كأنها من ماركة عالمية كبرى. سأعاود الشراء بكل تأكيد لشقيقي وأولادي.',
    commentEn: 'Incredibly lightning-fast delivery within Cairo (delivered in 24h). The tailoring is so premium and precise, matching top-tier European brands. Absolutely buy again.',
    date: '2026-05-28'
  },
  {
    id: 'rev3',
    authorAr: 'ندى ك.',
    authorEn: 'Nada K.',
    rating: 5,
    commentAr: 'أصبح متجر دوما هو المحل المفضل الأول لملابس أطفالي للأولاد في مصر. يقدم قفزة هائلة في الجودة بسعر عادل جداً مقارنة بالموجود بالأسواق.',
    commentEn: 'Doma Store is officially my number one shop for my boys in Egypt. They provide a massive leap in fabric comfort at highly justifiable, honest pricing levels.',
    date: '2026-06-02'
  }
];
