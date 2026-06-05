/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Language } from '../types';
import { ShoppingBag, ChevronLeft, ChevronRight, Phone, Ruler, Star, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onClose: () => void;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetail({
  product,
  language,
  onAddToCart,
  onClose,
  relatedProducts,
  onSelectProduct,
}: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isRtl = language === 'ar';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center',
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInstantWhatsApp = () => {
    if (!selectedSize) {
      alert(isRtl ? 'يرجى اختيار المقاس أولاً!' : 'Please select a size first!');
      return;
    }
    const message = isRtl
      ? `مرحباً متجر دوما، أود طلب المنتج التالي:\n- المنتج: ${product.nameAr}\n- المقاس: ${selectedSize}\n- الكمية: ${quantity}\n- السعر الإجمالي: ${product.price * quantity} ج.م`
      : `Hello Doma Store, I would like to order:\n- Product: ${product.nameEn}\n- Size: ${selectedSize}\n- Quantity: ${quantity}\n- Total Price: ${product.price * quantity} EGP`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/201144118289?text=${encodedMessage}`;
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert(isRtl ? 'يرجى اختيار المقاس أولاً!' : 'Please select a size first!');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div id="product-detail" className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back button */}
        <button
          id="btn-back-to-shop"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-8 cursor-pointer group"
        >
          {isRtl ? (
            <>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>العودة إلى المتجر</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Shop</span>
            </>
          )}
        </button>

        {/* Product presentation grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-neutral-100">
          
          {/* Gallery - 7 cols on lg */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              id="product-gallery-viewer"
              className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-100 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.images[activeImageIndex]}
                alt={isRtl ? product.nameAr : product.nameEn}
                style={zoomStyle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
              />
              <div id="image-badge-overlay" className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
                {product.isBestSeller && (
                  <span className="bg-luxury-black text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {isRtl ? 'الأكثر مبيعاً' : 'Best Seller'}
                  </span>
                )}
                {product.isOffer && (
                  <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {isRtl ? 'عرض خاص' : 'Offer'}
                  </span>
                )}
              </div>

              {/* Prev / Next controls */}
              <button
                id="gallery-prev"
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white text-neutral-900 transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </button>
              <button
                id="gallery-next"
                onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white text-neutral-900 transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Thumbnail dots */}
            <div id="gallery-thumbnails" className="flex items-center gap-3 justify-center">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === i ? 'border-amber-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details - 5 cols on lg */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-xs uppercase tracking-widest text-[#C8A96A] font-semibold mb-2 block">
                {isRtl ? 'ملابس وتيشرتات رجالي شبابية' : 'Premium Menswear & Tees'}
              </span>

              {/* Title */}
              <h1 id="product-title" className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-900 tracking-tight leading-snug mb-3">
                {isRtl ? product.nameAr : product.nameEn}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-6 mb-6">
                <div id="product-pricing" className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                    {product.price} <span className="text-sm font-medium">{isRtl ? 'جنيه' : 'EGP'}</span>
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      {product.originalPrice} {isRtl ? 'جنيه' : 'EGP'}
                    </span>
                  )}
                </div>
                <div id="product-rating" className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full text-amber-700">
                  <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                  <span className="text-sm font-bold">5.0</span>
                  <span className="text-xs text-neutral-400">({isRtl ? '١٢ تقييم' : '12 reviews'})</span>
                </div>
              </div>

              {/* Short description */}
              <p id="product-description" className="text-neutral-600 text-sm leading-relaxed mb-6 font-light">
                {isRtl ? product.descriptionAr : product.descriptionEn}
              </p>

              {/* Sizes Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="font-semibold text-neutral-800">{isRtl ? 'المقاس المتاح' : 'Available Size'}</span>
                  <button
                    id="btn-size-guide"
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C8A96A] font-semibold hover:underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'دليل المقاسات' : 'Size Guide'}</span>
                  </button>
                </div>
                <div id="size-options-container" className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      id={`size-${size}`}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[54px] h-[44px] px-3 py-2 text-xs font-semibold rounded-lg border-2 transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <span className="block text-sm font-semibold text-neutral-800 mb-3">{isRtl ? 'الكمية' : 'Quantity'}</span>
                <div id="quantity-picker" className="inline-flex items-center border border-neutral-200 rounded-lg bg-neutral-50/50 p-1">
                  <button
                    id="btn-qty-dec"
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center font-bold text-neutral-600 hover:text-neutral-950 transition-colors pointer-events-auto"
                  >
                    -
                  </button>
                  <span id="quantity-value" className="w-12 text-center text-sm font-bold text-neutral-800 bg-white py-2 rounded-md shadow-xs border border-neutral-100">
                    {quantity}
                  </span>
                  <button
                    id="btn-qty-inc"
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center font-bold text-neutral-600 hover:text-neutral-950 transition-colors pointer-events-auto"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {/* Add to Bag Button */}
              <button
                id="btn-product-add-cart"
                onClick={handleAddToCartClick}
                className="w-full h-12 bg-[#0B0B0B] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#202020] transition-colors relative cursor-pointer shadow-sm overflow-hidden"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {addedAnimation
                    ? (isRtl ? 'تم الإضافة بنجاح!' : 'Added Successfully!')
                    : (isRtl ? 'إضافة إلى سلة المشتريات' : 'Add to Shopping Bag')}
                </span>
                {addedAnimation && (
                  <motion.div
                    layoutId="added-success"
                    className="absolute inset-0 bg-emerald-600 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check className="w-5 h-4 text-white" />
                    <span className="font-semibold text-white">{isRtl ? 'تمت الإضافة وبانتظارك بسلتك' : 'Added to Bag!'}</span>
                  </motion.div>
                )}
              </button>

              {/* Direct WhatsApp Order */}
              <button
                id="btn-product-whatsapp-order"
                onClick={handleInstantWhatsApp}
                className="w-full h-12 bg-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm shadow-emerald-100"
              >
                <Phone className="w-5 h-5 fill-white stroke-none" />
                <span>{isRtl ? 'طلب فوري ومباشر عبر واتساب' : 'Order Instantly via WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic details, instructions tabs */}
        <div id="product-extra-tabs" className="mt-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-neutral-100">
          <div className="flex border-b border-neutral-100 pb-5 gap-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-base font-bold font-cairo pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'details' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {isRtl ? 'مواصفات القطعة الفاخرة' : 'Luxury Fabric Details'}
              {activeTab === 'details' && (
                <motion.div layoutId="active-tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8A96A] rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`text-base font-bold font-cairo pb-3 transition-colors relative cursor-pointer ${
                activeTab === 'care' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {isRtl ? 'ارشادات الغسيل والعناية' : 'Laundering & Care'}
              {activeTab === 'care' && (
                <motion.div layoutId="active-tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8A96A] rounded-full" />
              )}
            </button>
          </div>

          <div className="pt-6">
            <AnimatePresence mode="wait">
              {activeTab === 'details' ? (
                <motion.ul
                  key="details-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 text-sm text-neutral-600 leading-relaxed font-light"
                >
                  {(isRtl ? product.detailsAr : product.detailsEn).map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#C8A96A] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="care-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3 text-sm text-neutral-600 leading-relaxed font-light"
                >
                  <p className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C8A96A] mt-1.5 shrink-0" />
                    <span>
                      {isRtl
                        ? 'يُغسل مقلوباً مع ألوان مماثلة على درجة حرارة مياه باردة لا تزيد عن ٣٠ درجة مئوية.'
                        : 'Wash garment inside out with similar colors on cool delicate wash program under 30°C.'}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C8A96A] mt-1.5 shrink-0" />
                    <span>
                      {isRtl
                        ? 'تجنب استخدام المبيضات الكيميائية القوية للحفاظ على رونق الألوان وثنائية الخيوط والطباعة الذهبية.'
                        : 'Avoid aggressive non-chlorine bleaching products ensuring color retention of gold embellishments.'}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C8A96A] mt-1.5 shrink-0" />
                    <span>
                      {isRtl
                        ? 'يُكوى بدرجة حرارة خفيفة من الداخل وتجنب تمرير المكواة مباشرة فوق الطبعة الشعارية.'
                        : 'Iron inside out using low temperature heat. Avoid touch iron contact over premium graphic prints.'}
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div id="related-products-section" className="mt-16">
            <h2 className="text-xl sm:text-2xl font-bold font-cairo text-neutral-900 tracking-tight leading-snug mb-8 text-center">
              {isRtl ? 'منتجات فاخرة قد تعجبك أيضاً' : 'You May Also Highly Royal Appreciate'}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  id={`related-product-${p.id}`}
                  onClick={() => onSelectProduct(p)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-100 p-3 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-100 mb-3">
                    <img
                      src={p.images[0]}
                      alt={isRtl ? p.nameAr : p.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-cairo font-semibold text-xs sm:text-sm text-neutral-800 line-clamp-1 mb-1 group-hover:text-amber-600 transition-colors">
                    {isRtl ? p.nameAr : p.nameEn}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm sm:text-base text-neutral-900">
                      {p.price} {isRtl ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal Popup Dialog */}
      {showSizeGuide && (
        <div id="size-guide-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            id="size-guide-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full relative border border-neutral-100 shadow-xl"
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold font-cairo mb-4 text-neutral-900">
              {isRtl ? 'دليل مقاسات ملابس متجر دوما للرجال والشباب' : 'Doma Menswear Size Guide'}
            </h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              {isRtl
                ? 'مقاساتنا مصممة بدقة لتلائم جسدك بشكل مريح ومطابقة للمعايير الدولية للراحة والتحرك الرياضي أو الكاجوال.'
                : 'All our sizes are designed to fit your body comfortably, matching standard menswear measurements.'}
            </p>

            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100">
                  <th className="p-2 py-3 font-semibold text-neutral-700 text-center">{isRtl ? 'المقاس' : 'Size'}</th>
                  <th className="p-2 py-3 font-semibold text-neutral-700 text-center">{isRtl ? 'الصدر (سم)' : 'Chest (cm)'}</th>
                  <th className="p-2 py-3 font-semibold text-neutral-700 text-center">{isRtl ? 'الطول (سم)' : 'Length (cm)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-center">
                <tr>
                  <td className="p-2 py-3 font-bold">S</td>
                  <td className="p-2 py-3 text-neutral-500">96 - 100</td>
                  <td className="p-2 py-3 text-neutral-500">68 - 70</td>
                </tr>
                <tr>
                  <td className="p-2 py-3 font-bold">M</td>
                  <td className="p-2 py-3 text-neutral-500">100 - 104</td>
                  <td className="p-2 py-3 text-neutral-500">70 - 72</td>
                </tr>
                <tr>
                  <td className="p-2 py-3 font-bold">L</td>
                  <td className="p-2 py-3 text-neutral-500">104 - 108</td>
                  <td className="p-2 py-3 text-neutral-500">72 - 74</td>
                </tr>
                <tr>
                  <td className="p-2 py-3 font-bold">XL</td>
                  <td className="p-2 py-3 text-neutral-500">108 - 114</td>
                  <td className="p-2 py-3 text-neutral-500">74 - 76</td>
                </tr>
                <tr>
                  <td className="p-2 py-3 font-bold">XXL</td>
                  <td className="p-2 py-3 text-neutral-500">114 - 120</td>
                  <td className="p-2 py-3 text-neutral-500">76 - 78</td>
                </tr>
              </tbody>
            </table>

            <button
              id="btn-size-guide-close"
              onClick={() => setShowSizeGuide(false)}
              className="mt-6 w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {isRtl ? 'موافق، أغلق' : 'Understand, Close'}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
