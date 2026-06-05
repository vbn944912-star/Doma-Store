/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Phone, BadgePercent, Sparkles, Check, Truck } from 'lucide-react';
import { CartItem, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0); // decimal rate e.g. 0.10 for 10%

  const isRtl = language === 'ar';

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscountRate;
  
  // Free Shipping over 1000 EGP
  const shippingThreshold = 1000;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingFee = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : 50); // 50 EGP flat shipping fee
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = () => {
    const cleaned = coupon.trim().toUpperCase();
    if (cleaned === 'DOMA10') {
      setIsCouponApplied(true);
      setAppliedDiscountRate(0.10);
      alert(isRtl ? 'تم تطبيق خصم ١٠٪ للتسجيل الجديد!' : '10% discount successfully applied!');
    } else {
      alert(isRtl ? 'كود غير صحيح!' : 'Invalid coupon code!');
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setAppliedDiscountRate(0);
    setCoupon('');
  };

  const handlesWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = isRtl
      ? `🛍️ *طلب جديد - متجر دوما*\n\nأود إتمام الطلب التالي لملابس الأطفال المميزة:\n`
      : `🛍️ *New Order - Doma Store*\n\nI want to complete the following premium kids-fashion order:\n`;

    cartItems.forEach((item, index) => {
      message += `\n${index + 1}. *${isRtl ? item.product.nameAr : item.product.nameEn}*\n` +
                 `   - ${isRtl ? 'المقاس' : 'Size'}: ${item.selectedSize}\n` +
                 `   - ${isRtl ? 'الكمية' : 'Qty'}: ${item.quantity}\n` +
                 `   - ${isRtl ? 'السعر' : 'Price'}: ${item.product.price * item.quantity} ${isRtl ? 'جنيه' : 'EGP'}\n`;
    });

    message += `\n-------------------------\n`;
    message += `💰 *${isRtl ? 'المجموع الفرعي' : 'Subtotal'}:* ${subtotal} ${isRtl ? 'جنيه' : 'EGP'}\n`;
    
    if (isCouponApplied) {
      message += `🏷️ *${isRtl ? 'الخصم المطبق (١٠٪)' : 'Discount Applied (10%):'}* -${discountAmount} ${isRtl ? 'جنيه' : 'EGP'}\n`;
    }

    message += `🚚 *${isRtl ? 'تكلفة الشحن' : 'Shipping'}:* ${shippingFee === 0 ? (isRtl ? 'شحن مجاني لكافة أنحاء مصر' : 'Free Shipping') : `${shippingFee} ${isRtl ? 'جنيه' : 'EGP'}`}\n`;
    message += `⭐️ *${isRtl ? 'المجموع النهائي الإجمالي' : 'Total Price'}:* ${total} ${isRtl ? 'جنيه' : 'EGP'}\n\n`;
    message += isRtl
      ? `💬 يرجى التواصل لتأكيد العنوان وبيانات التوصيل.`
      : `💬 Please contact me to confirm the physical shipping address and delivery details.`;

    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/201144118289?text=${encoded}`;
  };

  const progressPercent = Math.min((subtotal / shippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            id="cart-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className={`fixed top-0 bottom-0 z-50 w-full max-w-md bg-white border-none shadow-2xl flex flex-col justify-between ${
              isRtl ? 'left-0' : 'right-0'
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-900 text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#C8A96A]" />
                <h3 className="text-lg font-bold font-cairo tracking-tight">
                  {isRtl ? 'سلة المشتريات الفاخرة' : 'Premium Shopping Bag'}
                </h3>
                <span className="bg-amber-500/20 text-[#C8A96A] text-xs font-bold px-2.5 py-1 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                id="btn-close-cart-drawer"
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors bg-white/10 rounded-full p-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shopping Progress Hook / Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div id="cart-shipping-progress" className="bg-neutral-50 p-4 border-b border-neutral-100">
                <div className="flex items-center justify-between text-xs text-neutral-600 mb-2">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Truck className="w-3.5 h-3.5 text-[#C8A96A]" />
                    <span>{isFreeShipping ? (isRtl ? 'شحن مجاني مؤهل لمصر!' : 'Qualified for Free Shipping!') : (isRtl ? 'مؤشر الشحن المجاني' : 'Free Shipping Indicator')}</span>
                  </div>
                  <span className="font-bold">
                    {subtotal} / {shippingThreshold} {isRtl ? 'ج.م' : 'EGP'}
                  </span>
                </div>
                <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full gold-gradient rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {!isFreeShipping && (
                  <p className="text-[11px] text-neutral-500 mt-2 font-light">
                    {isRtl
                      ? `أضف بقيمة ${shippingThreshold - subtotal} جنيه إضافية للحصول على شحن مجاني تماماً لمصر.`
                      : `Add ${shippingThreshold - subtotal} EGP more for a 100% free shipping across Egypt.`}
                  </p>
                )}
              </div>
            )}

            {/* Product list */}
            <div id="cart-items-container" className="flex-1 overflow-y-auto p-6 space-y-5">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300">
                    <ShoppingBag className="w-10 h-10 stroke-1" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-800 font-cairo mb-1">
                      {isRtl ? 'حقيبتك فارغة تماماً' : 'Your bag is entirely empty'}
                    </h4>
                    <p className="text-xs text-neutral-400 font-light max-w-[240px] leading-relaxed">
                      {isRtl
                        ? 'استكشف ملابس الأولاد الراقية والتصاميم المريحة لملء سلة تسوقك.'
                        : 'Explore premium kids couture to fill up your shopping cart with high comfort.'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    {isRtl ? 'ابدأ التسوق الآن' : 'Start Shopping Now'}
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    id={`cart-item-${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 border-b border-neutral-100 pb-5 items-stretch"
                  >
                    {/* Img */}
                    <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-neutral-100">
                      <img src={item.product.images[0]} referrerPolicy="no-referrer" alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* text & controls */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        {/* Title */}
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h4 className="text-xs sm:text-sm font-bold font-cairo text-neutral-900 line-clamp-1">
                            {isRtl ? item.product.nameAr : item.product.nameEn}
                          </h4>
                          <button
                            id={`btn-remove-item-${item.product.id}-${item.selectedSize}`}
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                            className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Selected Size indicator */}
                        <span className="inline-block bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-0.5 rounded-md mb-2">
                          {isRtl ? 'المقاس:' : 'Size:'} {item.selectedSize}
                        </span>
                      </div>

                      {/* Qty & price */}
                      <div className="flex items-center justify-between">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-neutral-200 rounded-md bg-neutral-50/50 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, Math.max(item.quantity - 1, 1))}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-neutral-500 hover:text-neutral-900"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-neutral-800">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-neutral-500 hover:text-neutral-900"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-extrabold text-neutral-900">
                          {item.product.price * item.quantity} {isRtl ? 'جنيه' : 'EGP'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations & Checkout */}
            {cartItems.length > 0 && (
              <div id="cart-footer-billing" className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-4">
                
                {/* Coupon Code Input */}
                <div id="discount-section" className="space-y-2">
                  {!isCouponApplied ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={isRtl ? 'هل لديك كود خصم؟' : 'Have a promo code?'}
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="flex-1 h-9 px-3 rounded-lg border border-neutral-200 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                      />
                      <button
                        id="btn-apply-promo"
                        onClick={handleApplyCoupon}
                        className="px-4 h-9 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
                      >
                        {isRtl ? 'تطبيق' : 'Apply'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-800">
                        <BadgePercent className="w-4 h-4" />
                        <span className="font-semibold">DOMA10</span>
                        <span>{isRtl ? '(خصم ١٠٪ فعال)' : '(10% applied)'}</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-neutral-400 hover:text-rose-600 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Calculation Details */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex justify-between items-center text-xs text-neutral-500">
                    <span>{isRtl ? 'المجموع الفرعي لشرائك' : 'Subtotal'}</span>
                    <span className="font-semibold">{subtotal} {isRtl ? 'جنيه' : 'EGP'}</span>
                  </div>

                  {isCouponApplied && (
                    <div className="flex justify-between items-center text-xs text-amber-700">
                      <span className="flex items-center gap-1">
                        <BadgePercent className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'خصم الكود الترحيبي' : 'Promo discount'}</span>
                      </span>
                      <span>-{discountAmount} {isRtl ? 'جنيه' : 'EGP'}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-neutral-500">
                    <span>{isRtl ? 'رسوم الشحن والتسليم لمصر' : 'Shipping Fee'}</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-[#C8A96A] font-bold">{isRtl ? 'مجاني تماماً' : 'FREE'}</span>
                      ) : (
                        `${shippingFee} ${isRtl ? 'جنيه' : 'EGP'}`
                      )}
                    </span>
                  </div>

                  <div className="h-px bg-neutral-200 my-1" />

                  <div className="flex justify-between items-center text-sm font-extrabold text-neutral-900">
                    <span>{isRtl ? 'السعر الإجمالي النهائي' : 'Order Total'}</span>
                    <span className="text-base sm:text-lg text-neutral-950">
                      {total} {isRtl ? 'جنيه مصرى' : 'EGP'}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Checkout Button */}
                <button
                  id="btn-cart-whatsapp-checkout"
                  onClick={handlesWhatsAppCheckout}
                  className="w-full h-12 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors cursor-pointer shadow-md shadow-emerald-100"
                >
                  <Phone className="w-5 h-5 fill-white stroke-none" />
                  <span>{isRtl ? 'إرسال وتأكيد الطلب عبر واتساب' : 'Submit & Order on WhatsApp'}</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
