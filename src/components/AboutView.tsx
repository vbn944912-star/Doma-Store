/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { Award, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutViewProps {
  language: Language;
}

export default function AboutView({ language }: AboutViewProps) {
  const isRtl = language === 'ar';

  return (
    <div id="about-view-root" className="min-h-screen bg-neutral-50/50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Banner header hero-like style */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] block">
            {isRtl ? 'قصة نجاح مصرية أصيلة' : 'AUTHENTIC EGYPTIAN LEGACY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cairo text-neutral-900 tracking-tight">
            {isRtl ? 'حول متجر دوما للأطفال' : 'About Doma Premium'}
          </h2>
          <div className="h-1 w-20 gold-gradient mx-auto my-4 rounded-full" />
        </div>

        {/* Narrative columns blocks with imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-xs">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-cairo text-neutral-900 leading-snug">
              {isRtl ? 'أناقة الأطفال تبدأ من سن مبكرة' : 'Elegance Starts From Young Age'}
            </h3>
            
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              {isRtl
                ? 'متجر دوما هو علامة تجارية مصرية رائدة مكرسة حصرياً لتقديم ملابس الأولاد الأنيقة والمريحة وعالية الجودة للأسر الحديثة في مصر. تأسس المتجر لملء فجوة حقيقية في سوق ملابس الأطفال المصري: الحاجة لملابس تمزج الفخامة المعاصرة مع المتانة الحقيقية والراحة المطلقة للتنقل واللعب.'
                : 'Doma Store is a leading Egyptian children fashion atelier dedicated entirely to presenting stylish, comfortable, and top-tier outfits for boys. Founded to fill a vital void: the necessity for childrenswear pairing contemporary premium luxury styling with real, everyday durability.'}
            </p>

            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              {isRtl
                ? 'يتم اختيار كل خيط وبكرة قماش وفحصها يدوياً مع الاهتمام بأدق التفاصيل والرسومات والخياطة لضمان مظهر ملكي أنيق يشعر فيه طفلكم بالثقة اللامتناهية والسعادة كل يوم.'
                : 'Every single cotton fiber, button, and color theme is handpicked and monitored meticulously. This ensures your little prince enjoys a stately, pristine visual identity wrapped around utmost flexible comfort.'}
            </p>
          </div>

          {/* Luxury illustration or vector container */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 text-white relative p-8 flex flex-col justify-between border border-neutral-800">
            <div className="absolute inset-0 bg-cover bg-center brightness-40 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800&auto=format&fit=crop')" }} />
            
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                DOMA STORE COUTURE
              </span>
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            <div className="relative z-10 space-y-2">
              <blockquote className="text-base sm:text-lg font-cairo font-semibold leading-relaxed italic text-zinc-100">
                {isRtl ? '"الراحة الفائقة، الأناقة الحديثة، الجودة التي تدوم طويلاً"' : '"Premium Quality, Modern Outline, Unyielding Durability."'}
              </blockquote>
              <span className="text-xs text-neutral-400 block">{isRtl ? '— منير دوما، المؤسس' : '— Mounir Doma, Founder'}</span>
            </div>
          </div>
        </div>

        {/* Brand Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xs space-y-4">
            <h4 className="text-lg font-bold font-cairo text-neutral-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-[#C8A96A]">
                <Star className="w-4 h-4 fill-amber-500 stroke-none" />
              </span>
              <span>{isRtl ? 'رؤيتنا البلاتينية' : 'Our Corporate Vision'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {isRtl
                ? 'أن نصبح الوجهة الأولى والمفضلة لعائلات النخبة والطبقة المتوسطة والعليا في مصر لملابس الأولاد، من خلال إرساء معايير جديدة تماماً تدمج التصنيع المصري فائق الجودة بالخطوط العالمية الحديثة للموضة.'
                : 'To establish ourselves as the single most favorite fashion playground for modern Egyptian families, setting unprecedented high benchmarks that marry exquisite local fabrics with international luxury aesthetics.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xs space-y-4">
            <h4 className="text-lg font-bold font-cairo text-neutral-900 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-neutral-950 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              </span>
              <span>{isRtl ? 'رسالتنا النبيلة' : 'Our Corporate Mission'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {isRtl
                ? 'تمكين أولادكم الصغار من التحرك بثقة واعتزاز عبر توفير قطع ملابس فائقة النعومة ومضادة الحساسية، مصنوعة بأيدٍ وخيوط مصرية حريصة واهتمام خاص بكل أسرة ترغب بالأفضل لأبنائها.'
                : 'To empower active young souls to enjoy childrenhood securely, utilizing premium-brushed hypoallergenic fibers. Celebrating fine local craftsmanship and personalized support to parents.'}
            </p>
          </div>

        </div>

        {/* Dynamic Trust Badges Values Section */}
        <div className="text-center pt-8 space-y-8">
          <h4 className="text-xl font-bold font-cairo text-neutral-950">
            {isRtl ? 'ركائز متجر دوما الأربعة' : 'Our Four Stately Pillars'}
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h5 className="font-cairo font-bold text-xs sm:text-sm text-neutral-900">{isRtl ? 'جودة مصرية ممتازة' : 'Premium Cotton'}</h5>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                {isRtl ? 'أفضل قطن جيرسي مصري منتقى لحماية بشرتهم الناعمة.' : 'Finest long-staple Egyptian yarns ensuring unmatched softness.'}
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h5 className="font-cairo font-bold text-xs sm:text-sm text-neutral-900">{isRtl ? 'تصاميم حديثة' : 'Avant-Garde Ideas'}</h5>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                {isRtl ? 'خطوط تتماشى مع صيحات الموضة الأوروبية والعالمية.' : 'Clean tailoring inspired by global kids haute couture trends.'}
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h5 className="font-cairo font-bold text-xs sm:text-sm text-neutral-900">{isRtl ? 'فخامة بأسعار مقبولة' : 'Honest Luxury'}</h5>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                {isRtl ? 'مظهر ثري وراقٍ بأسعار في متناول العائلات المصرية.' : 'Stately presentation made fully accessible for modern families.'}
              </p>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                <Star className="w-5 h-5" />
              </div>
              <h5 className="font-cairo font-bold text-xs sm:text-sm text-neutral-900">{isRtl ? 'توصيل معزز وسريع' : 'Elite Logistics'}</h5>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                {isRtl ? 'شحن مميز لكافة محافظات مصر بالتواصل على مدار الساعة.' : 'Prompt delivery service to Cairo, Giza and all governorates.'}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
