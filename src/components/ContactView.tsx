/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { Phone, Mail, MapPin, Send, HelpCircle, Check, Instagram, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactViewProps {
  language: Language;
}

export default function ContactView({ language }: ContactViewProps) {
  const isRtl = language === 'ar';
  
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.msg) {
      alert(isRtl ? 'يرجى كتابة الاسم والرسالة أولاً!' : 'Please fill out your name and message!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', phone: '', msg: '' });
    }, 4000);
  };

  const FAQS = [
    {
      qAr: 'كم يستغرق الشحن والتسليم داخل مصر؟',
      qEn: 'How long does delivery take across Egypt?',
      aAr: 'تستغرق خدمة التوصيل السريع لمتجر دوما عادة من ٢٤ إلى ٤٨ ساعة داخل القاهرة والجيزة، ومن ٣ إلى ٥ أيام عمل لكافة محافظات ومدن مصر الأخرى.',
      aEn: 'Fast delivery usually takes 24 to 48 hours within Cairo and Giza. For other Egyptian governorates, it takes between 3 to 5 business days.'
    },
    {
      qAr: 'ما هي خيارات وسياسة الاستبدال أو الاسترجاع؟',
      qEn: 'What is your refund & exchange policy?',
      aAr: 'نحن نضمن راحتكم الكاملة! يمكنكم طلب استبدال أو استرجاع أي قطعة خلال ١٤ يوماً من الاستلام بشرط أن تكون في حالتها الأصلية غير مستخدمة وبغلافها الأصلي.',
      aEn: 'We support 100% peace of mind! You can request an exchange or return within 14 days of delivery, provided clothes are unused in original packaging.'
    },
    {
      qAr: 'كيف يمكنني الدفع لطلبات متجر دوما؟',
      qEn: 'What payment options do you support?',
      aAr: 'ندعم الدفع نقدًا عند الاستلام (COD) في جميع محافظات مصر، بالإضافة إلى الدفع عبر فودافون كاش أو إنستا باي لتسهيل المعاملات الإلكترونية.',
      aEn: 'We support Cash on Delivery (COD) everywhere in Egypt, alongside secure transfers over Vodafone Cash or Instapay for digital ease.'
    }
  ];

  return (
    <div id="contact-view-root" className="min-h-screen bg-neutral-50/50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] block">
            {isRtl ? 'تواصل معنا على مدار الساعة' : 'WE ARE ALWAYS READY FOR YOU'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cairo text-neutral-900 tracking-tight">
            {isRtl ? 'اتصل بمتجر دوما الفاخر' : 'Contact Doma Support'}
          </h2>
          <p className="text-sm text-neutral-500 font-light leading-relaxed">
            {isRtl
              ? 'لديك سؤال حول المقاسات أو ترغب في إتمام طلب خاص؟ الدعم المتميز متواجد لخدمتكم وتوجيه خياراتكم فوراً.'
              : 'Have styling queries about custom baby sizes, or want assistance completing a batch order? We are here for you.'}
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold font-cairo text-neutral-900 mb-4">{isRtl ? 'معلومات التواصل المباشرة' : 'Direct Contacts'}</h3>
            
            <div className="space-y-4">
              {/* WhatsApp Row */}
              <div id="contact-info-whatsapp" className="flex gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 fill-emerald-600 stroke-none" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">{isRtl ? 'طلب واتساب السريع والخاص' : 'WhatsApp Instant Ordering'}</span>
                  <a href="https://wa.me/201144118289" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-900 hover:text-[#C8A96A] transition-colors font-mono">
                    01144118289
                  </a>
                </div>
              </div>

              {/* Instagram Row */}
              <div id="contact-info-instagram" className="flex gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">{isRtl ? 'حساب إنستغرام الرسمي' : 'Official Instagram'}</span>
                  <a href="https://instagram.com/domastore2025" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-900 hover:text-[#C8A96A] transition-colors font-mono">
                    @domastore2025
                  </a>
                </div>
              </div>

              {/* Email */}
              <div id="contact-info-email" className="flex gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">{isRtl ? 'البريد الإلكتروني للدعم' : 'Email Address'}</span>
                  <a href="mailto:support@domastore.com" className="text-sm font-bold text-neutral-900 hover:text-[#C8A96A] font-mono">
                    info@domastore.com
                  </a>
                </div>
              </div>

              {/* Shipping geography */}
              <div id="contact-info-shipping" className="flex gap-4 p-5 bg-white rounded-2xl border border-neutral-100 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8A96A]" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">{isRtl ? 'منطقة خدمات التوصيل والشحن' : 'Shipping Coverage Area'}</span>
                  <p className="text-sm font-bold text-neutral-900">
                    {isRtl ? 'نشحن لجميع محافظات جمهورية مصر العربية' : 'Delivering Nationwide across all of Egypt'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-md">
            <h3 className="text-lg font-bold font-cairo text-neutral-950 mb-6">
              {isRtl ? 'أرسل لنا رسالة ترحيبية أو استفسار' : 'Send a Friendly Inquiry'}
            </h3>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-700">{isRtl ? 'الاسم بالكامل' : 'Full Name'}</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        className="w-full h-10 border border-neutral-200 rounded-xl px-3 text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-700">{isRtl ? 'رقم الهاتف (اختياري)' : 'Phone (Optional)'}</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full h-10 border border-neutral-200 rounded-xl px-3 text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full h-10 border border-neutral-200 rounded-xl px-3 text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700">{isRtl ? 'تفاصيل الرسالة أو الاستفسار' : 'Message Details'}</label>
                    <textarea
                      rows={4}
                      value={formState.msg}
                      onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                      required
                      className="w-full border border-neutral-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <button
                    id="btn-submit-contact-form"
                    type="submit"
                    className="w-full h-11 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer pointer-events-auto"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isRtl ? 'إرسال الرسالة إلى الدعم' : 'Send Message to Customer Care'}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 sm:p-10 text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-800 font-cairo">
                    {isRtl ? 'تم إرسال رسالتك بنجاح وسرور!' : 'Your Message Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-emerald-600 font-light leading-relaxed max-w-sm mx-auto">
                    {isRtl
                      ? 'نشكرك على تواصلك مع متجر دوما الراقي. سيقوم قادة خدمة العملاء بالتواصل معك عبر الهاتف أو البريد الإلكتروني في غضون بضع ساعات.'
                      : 'Thank you for contacting Doma Premium Support. Our representatives will get back to your inquiry shortly.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* FAQ Section */}
        <div id="faq-section" className="pt-8 space-y-8">
          <h3 className="text-xl sm:text-2xl font-bold font-cairo text-neutral-900 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#C8A96A]" />
            <span>{isRtl ? 'الأسئلة المتكررة والشائعة' : 'Frequently Asked Questions'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-xs space-y-3">
                <span className="text-[#C8A96A] text-xs font-extrabold uppercase tracking-widest block font-mono">FAQ 0{i + 1}</span>
                <h4 className="text-xs sm:text-sm font-bold font-cairo text-neutral-900/90 leading-snug">
                  {isRtl ? faq.qAr : faq.qEn}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-light leading-relaxed">
                  {isRtl ? faq.aAr : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
