/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Copy } from 'lucide-react';
import { Language } from '../types';

interface ExitIntentPopupProps {
  language: Language;
}

export default function ExitIntentPopup({ language }: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const isRtl = language === 'ar';

  useEffect(() => {
    // Check if user has already dismissed or completed this discount coupon offer
    const alreadySeen = localStorage.getItem('doma_discount_seen');
    if (alreadySeen) return;

    // Detect mouse leaving the window (standard exit-intent trigger on desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        setShow(true);
      }
    };

    // Fallback timer: Show after 16 seconds if mouse doesn't leave window
    const fallbackTimer = setTimeout(() => {
      setShow(true);
    }, 16000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('doma_discount_seen', 'true');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('DOMA10');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleClose();
    }, 1500);
  };

  if (!show) return null;

  return (
    <div id="exit-intent-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <motion.div
        id="exit-intent-dialog"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="bg-white rounded-3xl overflow-hidden max-w-lg w-full relative border border-neutral-100 shadow-2xl"
      >
        {/* Top Accent Line */}
        <div className="h-2 gold-gradient w-full" />

        {/* Close Button */}
        <button
          id="btn-close-exit-intent"
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors bg-neutral-100 rounded-full p-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-8 sm:p-10 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-[#C8A96A] mb-6">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] mb-2 block">
            {isRtl ? 'باقة ترحيبية فاخرة' : 'EXCLUSIVE WELCOME REWARD'}
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-900 mb-4 leading-tight">
            {isRtl ? 'انتظر! احصل على خصم ١٠٪' : 'Wait! Claim Your 10% Off'}
          </h3>
          
          <p className="text-sm text-neutral-500 font-light mb-8 max-w-md mx-auto leading-relaxed">
            {isRtl
              ? 'انضم إلى عائلة متجر دوما اليوم واستمتع بخصم فوري بقيمة ١٠٪ على طلبك الأول الفاخر للتيشرتات والملابس الحصرية.'
              : 'Join the Doma Store family today and enjoy an instant 10% discount on your first premium menswear order.'}
          </p>

          {/* Coupon Code Box */}
          <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs text-neutral-400 block mb-1">{isRtl ? 'كود الخصم الترحيبي' : 'Your Coupon Code'}</span>
              <span className="text-xl font-bold font-mono tracking-widest text-neutral-900 block bg-amber-50/50 px-3 py-1 rounded">DOMA10</span>
            </div>
            <button
              id="btn-copy-code"
              onClick={handleCopy}
              className="w-full sm:w-auto px-6 py-3 bg-[#0B0B0B] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-900 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#C8A96A]" />
                  <span>{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isRtl ? 'نسخ الكود وتفعيل الخصم' : 'Copy Code & Apply'}</span>
                </>
              )}
            </button>
          </div>

          <button
            id="btn-exit-dismiss"
            onClick={handleClose}
            className="text-xs text-neutral-400 hover:text-neutral-600 underline font-medium cursor-pointer"
          >
            {isRtl ? 'لا شكراً، أفضل فوات الفرصة' : 'No thanks, count me out'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
