/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review } from './types';

// Let's create gorgeous high-quality products
export const PRODUCTS: Product[] = [
  {
    id: '1',
    nameAr: 'تي شيرت غرافيك أوفرسايز باللون الأسود الملكي',
    nameEn: 'Signature Royal Black Oversized Graphic Tee',
    category: 'shirts',
    price: 390,
    originalPrice: 490,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'تي شيرت غرافيك أوفرسايز شبابي فاخر مصنوع من قطن جيرسي المصري الثقيل 100٪ الممتاز بنعومة فائقة وجودة خياطة عصرية لا تضاهى.',
    descriptionEn: 'Premium heavy 100% Egyptian cotton graphic oversized tee, offering unmatched streetstyle coolness and extreme luxury softness with dropped-shoulder design.',
    isBestSeller: true,
    isNewArrival: true,
    isOffer: true,
    detailsAr: [
      'قطن مصري مبروم ممتاز 100٪ منسوج بكثافة عالية لمتانة تدوم طويلاً',
      'قصة أوفرسايز (Oversized) شبابية عصرية تعبر عن الثقة المطلقة',
      'طباعة كينج رويال ذهبية وناعمة الملمس مقاومة للغسيل المتكرر ولا تتشقق',
      'ياقة مضلعة دائرية مدعومة بشكل مزدوج للمحافظة على شكلها المتناسق دائماً'
    ],
    detailsEn: [
      '100% premium double-knitted Egyptian cotton for luxurious weight and wear',
      'Modern streetwear oversized loose fit with dropped-shoulder style',
      'Heavy-duty elegant gold foil ink print that remains pristine wash after wash',
      'Reinforced double-ribbed crew neckline keeping a crisp structure all day'
    ]
  },
  {
    id: '2',
    nameAr: 'تي شيرت بولو كاجوال كلاسيك باللون الكحلي',
    nameEn: 'Classic Navy Blue Casual Polo',
    category: 'shirts',
    price: 490,
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'تي شيرت بولو كلاسيكي بأكمام قصيرة للرجال والشباب، مصنوع من قماش قطني بيكيه مسامي فائق النعومة، مثالي للإطلالات اليومية والعملية الأنيقة والذكية.',
    descriptionEn: 'An curated high-end micro-pique men polo shirt. Beautifully crafted, matching regular details with golden crest accent. Perfect for smart-casual wear.',
    isBestSeller: true,
    detailsAr: [
      'نسيج قطن بيكيه ناعم ومسامي يطرد العرق ويمنحك انتعاشاً دائماً في الأجواء الحارة',
      'ياقة محبوكة كلاسيكية مريحة مع حافة أزرار ذهبية رقيقة',
      'قصة مريحة (Regular Fit) تناسب مختلف البنيات الجسدية بأنوثة ذكورية متوازنة',
      'تطريز شعار دوما ستور الملكي الفاخر بأرقى خيوط الحرير على الصدر'
    ],
    detailsEn: [
      'Breathable micro-knit cotton piqué with premium stretch and airiness',
      'Classic knit collar and three-button placket with subtle gold metallic detailing',
      'Standard regular fit guaranteeing comfortable, elegant body contouring',
      'Distinctive golden crest embroidery detailed at the left chest line'
    ]
  },
  {
    id: '3',
    nameAr: 'تي شيرت متبل بلمسة مغسولة (أسيد واش) - أبيض ثلجي',
    nameEn: 'Snow White Premium Acid-Wash Tee',
    category: 'shirts',
    price: 420,
    originalPrice: 520,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'تي شيرت شبابي متميز بتأثير الملمس المغسول (Acid-Wash) المدهش، بقصة مريحة وأكتاف ساقطة تمنحه طابعاً شبابياً مستقلاً. ناعم جداً ومقاوم للانكماش.',
    descriptionEn: 'Fashioned from organic cotton, this vintage-look acid wash tee features custom drop shoulders, a distressed aesthetic, and extreme luxury comfort.',
    isBestSeller: true,
    isOffer: true,
    detailsAr: [
      'قطن طبيعي معالج حرارياً بنسبة 100% يمنحك ملمس غسيل الشارع الأصيل',
      'صبغة غسيل فريدة تختلف تفاصيلها من تي شيرت لآخر لإضفاء هوية مستقلة',
      'قماش ناعم وخفيف الوزن وذو تهوية كاملة ممتازة لموجات الصيف',
      'قصة تريند عصرية تلائم الجينز، والبنطلون المتناسق، والملابس الكاجوال في كل الأوقات'
    ],
    detailsEn: [
      '100% soft organic cotton subjected to vintage mineral washing for a rich touch',
      'One-of-a-kind washed pattern details guaranteeing distinct standalone personality',
      'Superb light weight with complete breathability ideal for summer days and evenings',
      'Relaxed straight silhouette matching effortlessly with denim or casual shorts'
    ]
  },
  {
    id: '4',
    nameAr: 'تي شيرت قطن سليم فيت - أبيض كلاسيكي ناصع',
    nameEn: 'Supreme Daily Slim-Fit White Tee',
    category: 'shirts',
    price: 350,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'التي شيرت الأساسي المريح للشباب والرجال للارتداء اليومي. منسوج من القطن المشطوب المزدوج المطاطي لمقاومة التمدد والبهتان مع ياقة مدعومة متناسقة تحافظ على هيكلها الأنيق.',
    descriptionEn: 'The ultimate daily essential for men and youth. Crafted from double-knit combed cotton yarn that resists stretching and color fading, with a sleek slim layout.',
    isBestSeller: true,
    detailsAr: [
      'خامة قطنية حريرية فائقة النعومة ومضادة للحساسية ومريحة للبشرة',
      'لون أبيض ناصع وثابت لا يتحول للأصفر ومضمون خلال الغسيل المتكرر',
      'معالج بالكامل حرارياً لمنع ظهور النمش الكشميري والوبر الكربوني',
      'قصة سليم فيت محكمة تعزز قوامك الرياضي بلمسة عصرية جذابة'
    ],
    detailsEn: [
      'Hypoallergenic combed cotton optimized for daily wear under sweaters or standalone',
      'Azo-free pure white dyes retaining deep rich white tones endlessly',
      'Eco-enzyme bio-wash pre-shrunk finish preventing any micro-pilling',
      'Tailor-grade slim fit silhouette fitting athletic profiles perfectly'
    ]
  },
  {
    id: '5',
    nameAr: 'تي شيرت شبابي غرافيك ريجولر بطباعة ريترو',
    nameEn: 'Retro Streetwear Graphic Tee',
    category: 'shirts',
    price: 450,
    originalPrice: 550,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'تي شيرت غرافيك شبابي مستوحى من خطوط الفن وموسيقى الشارع الكلاسيكية الفاخرة. يجمع بين ثقل النسيج الممتاز والرسومات الراقية على الصدر لإعطاء هيبة وإطلالة متميزة وملفتة.',
    descriptionEn: 'A retro aesthetic typography masterpiece. Features a medium-heavy 100% cotton base with a screen-printed artistic emblem on the chest for ultimate streetstyle vibe.',
    isNewArrival: true,
    isOffer: true,
    detailsAr: [
      'تصميم مذهل وملئ بالحيوية يناسب الخروجات الشبابية والأمسيات الصيفية والرحلات',
      'نسيج ميكرو جيرسي مسامي يمتص الرطوبة بامتياز ويسمح للبشرة بالتنفس',
      'رسم غرافيك ناعم ممتزج بالخيوط ولا يصدر صوتاً صلباً ومضمون مئة بالمئة ضد التقشر',
      'حواف مزدوجة مخيطة بمتانة بالغة تضمن عدم ارتخاء القصة مع مرور الشهور'
    ],
    detailsEn: [
      'Show-stopping urban profile ideal for college, hangouts, and summer music events',
      'Thermo-regulating micro-weave cotton blend suitable and comfortable all year round',
      'Soft-feel water-based screen printing that remains flexible and will never crack',
      'Double-lock stitch flat hems securing structure longevity and form'
    ]
  },
  {
    id: '6',
    nameAr: 'طقم التي شيرت الأساسي الفاخر (قطعتين - أبيض وأسود)',
    nameEn: 'Supreme T-Shirt Dual Pack',
    category: 'sets',
    price: 690,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop'
    ],
    descriptionAr: 'احصل على القيمة القصوى مع حزمة قطعتين متميزتين تمنحانك الأساس المثالي: تي شيرت كلاسيكي أسود وآخر أبيض ناصع من أجود أنواع القطن المصري لتنسيق مريح ومثالي مع كافة إطلالاتك.',
    descriptionEn: 'Get maximum wardrobe essentials for less with our luxury 2-pack consisting of one midnight black and one cloud white premium Egyptian cotton tee. Perfect capsule wear.',
    isBestSeller: true,
    detailsAr: [
      'توفير مادي حقيقي مع اقتناء قطعتين هما العمود الفقري لأي إطلالة رجالية ناجحة',
      'قطن مشطوب 100% مصري ناعم يحافظ على لونه الأسود الداكن والأبيض المشع غسلة بعد غسلة',
      'قصة متوازنة كلاسيكية (Modern Fit) تمنحك الثقة والراحة وحرية الحركة في صالة الألعاب أو المكتب',
      'خيوط مدعومة عند الأكتاف والرقبة لمقاومة الاهتراء والشد اليومي'
    ],
    detailsEn: [
      'Includes one essential solid midnight black and one pure white crew neck shirts',
      '100% long-staple combed cotton from Egypt, keeping its tight knit after multiple wash cycles',
      'Modern versatile silhouette optimizing body movement and layering flexibility',
      'Shoulder-to-shoulder taped seams for extreme durability under severe daily stress'
    ]
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev1',
    authorAr: 'أحمد م.',
    authorEn: 'Ahmed M.',
    rating: 5,
    commentAr: 'خامات قطنية ممتازة تفوق التوقعات بحق! مقاسات التيشرتات مظبوطة تماماً والألوان ثابتة ومبتتأثرش بالغسيل والطباعة ناعمة جداً ولا تتقشر. الشراء مريح وسريع جداً عبر الواتساب والدعم محترم.',
    commentEn: 'Exceptional Egyptian cotton quality beyond expectation! The t-shirt fit is absolute perfection. Colors stay immaculate and prints do not peel even after multiple washes. Excellent WhatsApp service.',
    date: '2026-05-15'
  },
  {
    id: 'rev2',
    authorAr: 'يوسف ك.',
    authorEn: 'Youssef K.',
    rating: 5,
    commentAr: 'اشتريت التي شيرت الأوفرسايز والريترو غرافيك، الخامة ثقيلة ومحترمة والقصة غاية في الأناقة كأنها ماركة براند عالمي فاخر بل وأفضل بكثير! التوصيل سريع جداً في ٢٤ ساعة في القاهرة.',
    commentEn: 'Incredibly pleased with the oversized graphic tee and retro look. The fabric feels premium and heavy, matching high-end global streetwear labels at a fraction of the cost. Delivered within 24h in Cairo.',
    date: '2026-05-28'
  },
  {
    id: 'rev3',
    authorAr: 'كريم ح.',
    authorEn: 'Karim H.',
    rating: 5,
    commentAr: 'أصبح متجر دوما هو المحل المفضل الأول لي لشراء التيشرتات الرجالي والشبابية الفاخرة في مصر. يقدم قفزة هائلة في جودة القطن والراحة بسعر عادل جداً مقارنة بأسعار السوق المبالغ فيها.',
    commentEn: 'Doma Store is officially my preferred menswear destination for premium t-shirts in Egypt. They provide a massive leap in cotton comfort at highly justifiable, honest pricing levels.',
    date: '2026-06-02'
  }
];
