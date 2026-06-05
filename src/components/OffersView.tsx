/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, Language } from '../types';
import { BadgePercent, Clock, ArrowRight, Phone, Sparkles, Flame, Check, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface OffersViewProps {
  products: Product[];
  language: Language;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function OffersView({
  products,
  language,
  onProductClick,
  onAddToCart,
}: OffersViewProps) {
  const isRtl = language === 'ar';

  // State for real-time promotional countdown timer:
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to count down from 24 again
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const offerProducts = products.filter((p) => p.isOffer);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Direct WhatsApp support custom package
  const handleOrderSpecialPackage = (bundleName: string, price: string) => {
    const text = isRtl
      ? `مرحباً متجر دوما! أود الاستفسار وطلب العرض الخاص لملابس الأطفال:\n- العرض: ${bundleName}\n- السعر: ${price}`
      : `Hello Doma Store! I would like to order the promotional bundle:\n- Package: ${bundleName}\n- Price: ${price}`;
    
    window.location.href = `https://wa.me/201144118289?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="offers-view-root" className="min-h-screen bg-neutral-50/50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 inline-flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
            <span>{isRtl ? 'عروض لفترة محدودة للغاية' : 'HIGHLY LIMITED PROMOTIONS'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cairo text-neutral-900 tracking-tight">
            {isRtl ? 'مهرجان عروض أزياء الأولاد' : 'Boys Couture Offers Hub'}
          </h2>
          <p className="text-sm text-neutral-500 font-light leading-relaxed">
            {isRtl
              ? 'احصل على إطلالات العيد والمصيف الفاخرة بأوفر الأسعار من متجر دوما. عروض مصممة لتمنح طفلك البهجة والأناقة دون المساومة على الجودة الممتازة.'
              : 'Secure festive high-grade ensembles & poolside coordinates at supreme deals. Experience uncompromising craftsmanship at accessible values.'}
          </p>
        </div>

        {/* Dynamic Flash Sale Countdown Card */}
        <div id="flash-sale-countdown-banner" className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-neutral-850 shadow-xl">
          {/* Accent light elements */}
          <div className="absolute right-0 top-0 w-64 h-64 gold-gradient opacity-10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-48 h-48 bg-amber-500 opacity-5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="bg-[#C8A96A]/20 text-[#C8A96A] text-xs font-bold px-3 py-1.5 rounded-full inline-block uppercase tracking-wider">
                {isRtl ? 'عرض فلاش الصيفي اليومي' : 'DAILY SUMMER FLASH SALE'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cairo leading-snug">
                {isRtl ? 'خصومات تصل إلى ٢٠٪ على الأطقم الصيفية الكتان والقطن' : 'Up to 20% Off Natural Linen & Cotton Sets'}
              </h3>
              <p className="text-sm text-neutral-400 font-light max-w-lg leading-relaxed">
                {isRtl
                  ? 'شحن مجاني لكافة طلبات الكوبونات والأحجام الصيفية لليوم فقط بحد أدنى ١٠٠٠ جنيه مصري للطلب في جميع محافظات مصر.'
                  : 'Free nationwide shipping included on all premium summer apparel. Applies automatically for active baskets over 1000 EGP to any governorate.'}
              </p>
            </div>

            {/* Countdown timer components */}
            <div className="flex flex-col items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 shrink-0">
              <span className="text-xs text-neutral-300 font-semibold tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'ينتهي العرض البلاتيني خلال:' : 'PLATINUM OFFER EXPIRES IN:'}</span>
              </span>
              <div id="countdown-timer-values" className="flex items-center gap-3 sm:gap-4 font-mono">
                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white block bg-[#0B0B0B] p-2.5 sm:p-3 rounded-lg border border-neutral-800 min-w-[50px] sm:min-w-[62px]">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">{isRtl ? 'ساعة' : 'Hrs'}</span>
                </div>
                <span className="text-2xl font-bold text-neutral-500">:</span>
                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white block bg-[#0B0B0B] p-2.5 sm:p-3 rounded-lg border border-neutral-800 min-w-[50px] sm:min-w-[62px]">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">{isRtl ? 'دقيقة' : 'Mins'}</span>
                </div>
                <span className="text-2xl font-bold text-neutral-500">:</span>
                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white block bg-[#0B0B0B] p-2.5 sm:p-3 rounded-lg border border-neutral-800 min-w-[50px] sm:min-w-[62px]">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-1 block">{isRtl ? 'ثانية' : 'Secs'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Special Offers Grid */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold font-cairo text-neutral-900 tracking-tight leading-snug">
            {isRtl ? 'القطع الصيفية المشمولة بالتخفيض' : 'Discounted Luxury Garments'}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map((p) => {
              const saveAmount = p.originalPrice ? p.originalPrice - p.price : 0;
              const discountPercent = p.originalPrice ? Math.round((saveAmount / p.originalPrice) * 100) : 0;

              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => onProductClick(p)}>
                    <img src={p.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-sm">
                      {isRtl ? `وفر ${discountPercent}٪` : `SAVE ${discountPercent}%`}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 onClick={() => onProductClick(p)} className="font-cairo font-bold text-xs sm:text-sm text-neutral-800 line-clamp-2 hover:text-[#C8A96A] transition-colors cursor-pointer leading-relaxed mb-3">
                        {isRtl ? p.nameAr : p.nameEn}
                      </h4>
                    </div>

                    <div className="border-t border-neutral-50 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-extrabold text-[#0B0B0B] text-base">
                          {p.price} <span className="text-[10px]">{isRtl ? 'ج.م' : 'EGP'}</span>
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            {p.originalPrice} EGP
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onAddToCart(p, p.sizes[0] || '4-5Y')}
                        className="text-[11px] font-semibold text-[#C8A96A] hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer pointer-events-auto"
                      >
                        <span>{isRtl ? 'إضافة سريعة' : 'Quick Add'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Bundles Packages Card Layout */}
        <div id="promotional-bundles-section" className="space-y-6 pt-6">
          <h3 className="text-2xl font-bold font-cairo text-neutral-900 tracking-tight leading-snug">
            {isRtl ? 'باقات ترويجية وعروض التوفير الذكية' : 'Signature Smart Budget Bundles'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Offer 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/60 shadow-xs relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-[#C8A96A] text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-wider rounded-bl-xl shadow-xs">
                {isRtl ? 'الأعلى مبيعاً' : 'BEST VALUE'}
              </span>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#C8A96A]">
                  <BadgePercent className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-cairo text-neutral-900">
                  {isRtl ? 'باقة الأطقم الصيفية المزدوجة' : 'Double Outfits Holiday Pack'}
                </h4>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {isRtl
                    ? 'اشتري أي طقمين متكاملين من اختيارك للأولاد، واحصل على قميص قطني أساسي ناصع مجاناً تماماً بقيمة ٣٥٠ جنيه مصري لدعم الصيف.'
                    : 'Purchase any two complete boy sets of your style choice, and obtain a daily classic crew cotton tee completely free (valued at 350 EGP).'}
                </p>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-2xl font-bold text-neutral-900">
                    1,600 <span className="text-xs font-semibold">{isRtl ? 'جنيه فقط بدلاً من ٢٠٥٠' : 'EGP instead of 2050'}</span>
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-600 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'طقمين اختيار كامل كلاسيكي/كتان/حضري' : '2 Complete selected premium sets'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'تي شيرت قطني مجاني مائة بالمائة' : '1 Free 100% Cotton Supreme Daily Tee'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'شحن فوري ومجاني لباب المنزل بمصر' : 'Free quick shipping to your address'}</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleOrderSpecialPackage(isRtl ? 'باقة الأطقم الصيفية المزدوجة' : 'Double Outfits Holiday Pack', '1600 EGP')}
                  className="w-full h-11 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors pointer-events-auto cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-white stroke-none" />
                  <span>{isRtl ? 'اطلب باقة التوفير المزدوجة عبر واتساب' : 'Order Holiday Pack on WhatsApp'}</span>
                </button>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900">
                  <Sparkles className="w-6 h-6 text-[#C8A96A]" />
                </div>
                <h4 className="text-xl font-bold font-cairo text-neutral-900">
                  {isRtl ? 'عرض العيد الفاخر لرباعية القمصان' : 'Modern Luxury Shirts Combo'}
                </h4>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {isRtl
                    ? 'باقة خاصة تضم ٤ قمصان وتيشرتات قطنية غرافيك ذات جودة عالية باللون الفحمي والذهبي وغيرها لتوفير خيارات غسل وتناوب أسبوعية مريحة للأم.'
                    : 'A select pack of any 4 signature graphic or daily combed shirts. Ensures seamless daily rotations with durable elegant wear resistance.'}
                </p>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-2xl font-bold text-neutral-900">
                    1,100 <span className="text-xs font-semibold">{isRtl ? 'جنيه فقط بدلاً من ١٤٠٠' : 'EGP instead of 1400'}</span>
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-600 font-light">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? '٤ قمصان وتيشرتات من اختيارك الكامل' : '4 Shirts & Tees of your choice'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'خصم فوري مضمون بقيمة ٣٠٠ جنيه مصري' : 'Instant 300 EGP discount included'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{isRtl ? 'مؤهل للشحن الوطني المجاني الفوري بكافة المحافظات' : 'Eligible for 100% free home shipping'}</span>
                  </li>
                </ul>

                <button
                  onClick={() => handleOrderSpecialPackage(isRtl ? 'عرض القمصان الرباعي المميز' : 'Modern Luxury Shirts Combo', '1100 EGP')}
                  className="w-full h-11 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors pointer-events-auto cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-white stroke-none" />
                  <span>{isRtl ? 'اطلب باقة القمصان عبر واتساب' : 'Order Shirts Pack on WhatsApp'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
