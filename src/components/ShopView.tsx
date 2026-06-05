/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Product, Language } from '../types';
import { Search, SlidersHorizontal, Grid3X3, Grid2X2, ArrowUpDown, ChevronRight, X, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShopViewProps {
  products: Product[];
  language: Language;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  initialCategoryFilter?: string | null;
}

export default function ShopView({
  products,
  language,
  onProductClick,
  onAddToCart,
  initialCategoryFilter = null,
}: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'popular' | 'newest'>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [viewGrid, setViewGrid] = useState<'dense' | 'wide'>('dense');

  const isRtl = language === 'ar';

  const ALL_SIZES = ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'];

  const categoryOptions = [
    { value: 'all', labelAr: 'كل المنتجات الراقية', labelEn: 'All Premium Couture' },
    { value: 'shirts', labelAr: 'القمصان والتيشرتات', labelEn: 'Premium Shirts & Tees' },
    { value: 'sets', labelAr: 'الأطقم ومجموعات الأولاد', labelEn: 'Complete Outfits & Sets' },
    { value: 'new_arrivals', labelAr: 'الوافدين الجدد حديثاً', labelEn: 'Fresh New Arrivals' },
    { value: 'offers', labelAr: 'أقوى العروض الحصرية', labelEn: 'Exclusive Special Offers' },
    { value: 'seasonal', labelAr: 'المجموعة الموسمية الخاصة', labelEn: 'Seasonal Collections' },
    { value: 'best_sellers', labelAr: 'المنتجات الأكثر مبيعاً ورواجاً', labelEn: 'Best Sellers' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSize('all');
    setMaxPrice(1200);
    setSortBy('default');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query
      const matchesSearch =
        p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new_arrivals') matchesCategory = !!p.isNewArrival;
        else if (selectedCategory === 'offers') matchesCategory = !!p.isOffer;
        else if (selectedCategory === 'best_sellers') matchesCategory = !!p.isBestSeller;
        else matchesCategory = p.category === selectedCategory;
      }

      // 3. Size
      const matchesSize = selectedSize === 'all' || p.sizes.includes(selectedSize);

      // 4. Price
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesSize && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // default unsorted
    });
  }, [products, searchQuery, selectedCategory, selectedSize, maxPrice, sortBy]);

  return (
    <div id="shop-view-root" className="min-h-screen bg-neutral-50/50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page title and narrative banner */}
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
            {isRtl ? 'الأناقة تبدأ منذ الصغر' : 'STYLE STARTS YOUNG'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-cairo text-neutral-900 tracking-tight leading-tight">
            {isRtl ? 'صالة ملابس الأولاد الفاخرة' : 'Premium Boys Closet'}
          </h2>
          <p className="text-sm text-neutral-500 font-light leading-relaxed">
            {isRtl
              ? 'تصفح مجموعتنا الكاملة من قطع الملابس المنسقة خصيصاً لأميرك الصغير. نهتم بكل غرزة، وقماش، وتطريز لراحة قصوى.'
              : 'Browse our signature curated clothing elements tailored elegantly for your little champ. We obsess over every single thread and stitch.'}
          </p>
        </div>

        {/* Toolbar (Search, Filter Button, Layout toggle, Sorter) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Left Side: Search Bar */}
          <div className="relative flex-1 max-w-md">
            <span className={`absolute inset-y-0 left-3 flex items-center text-neutral-400 ${isRtl ? 'right-auto' : 'left-3'}`}>
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder={isRtl ? 'ابحث عن قميص، طقم، أو قطعة مميزة...' : 'Search shirt, set, unique outfits...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 border border-neutral-200 rounded-xl px-10 text-sm focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Side: Options and buttons */}
          <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
            
            {/* Filter Toggle */}
            <button
              id="btn-toggle-filters"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                showFilters || selectedCategory !== 'all' || selectedSize !== 'all'
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                  : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{isRtl ? 'تصفية الفرز والأحجام' : 'Filter Sizes & Sort'}</span>
            </button>

            {/* Sorter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 hidden sm:inline">{isRtl ? 'ترتيب حسب:' : 'Sort By:'}</span>
              <select
                id="select-sort-by"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="h-10 border border-neutral-200 rounded-xl px-3 bg-white text-xs font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="default">{isRtl ? 'الافتراضي الفاخر' : 'Luxury Default'}</option>
                <option value="price-asc">{isRtl ? 'السعر (من الأقل للأعلى)' : 'Price (Low to High)'}</option>
                <option value="price-desc">{isRtl ? 'السعر (من الأعلى للأقل)' : 'Price (High to Low)'}</option>
                <option value="popular">{isRtl ? 'الأكثر طلباً ورواجاً' : 'Most Popular'}</option>
                <option value="newest">{isRtl ? 'المجموعات الأحدث' : 'Newest Arrivals'}</option>
              </select>
            </div>

            {/* Dense / Wide Grid Changer */}
            <div className="hidden sm:flex items-center border border-neutral-200 rounded-xl p-0.5 bg-neutral-50">
              <button
                onClick={() => setViewGrid('dense')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewGrid === 'dense' ? 'bg-white shadow-xs text-[#C8A96A]' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewGrid('wide')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewGrid === 'wide' ? 'bg-white shadow-xs text-[#C8A96A]' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filter Drawer Inline */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              id="expandable-filters-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-xs mb-8"
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold font-cairo text-neutral-800">{isRtl ? 'فئات الملابس' : 'Couture Classification'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedCategory(opt.value)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                          selectedCategory === opt.value
                            ? 'border-amber-500 bg-amber-50/50 text-[#C8A96A] font-bold'
                            : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                        }`}
                      >
                        {isRtl ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Filter */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold font-cairo text-neutral-800">{isRtl ? 'مقاس الأطفال المطلوب' : 'Target Age/Size'}</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSize('all')}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                        selectedSize === 'all'
                          ? 'border-amber-500 bg-amber-50/50 text-[#C8A96A] font-bold'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      }`}
                    >
                      {isRtl ? 'كافة المقاسات' : 'All Sizes'}
                    </button>
                    {ALL_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${
                          selectedSize === size
                            ? 'border-amber-500 bg-amber-50/50 text-[#C8A96A] font-bold'
                            : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold font-cairo text-neutral-800">{isRtl ? 'الحد الأقصى للسعر' : 'Maximum Price Limit'}</h4>
                    <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                      {maxPrice} {isRtl ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>100 {isRtl ? 'ج.م' : 'EGP'}</span>
                    <span>1200 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                </div>

              </div>

              {/* Reset button inside panels */}
              <div className="bg-neutral-50 px-6 py-3.5 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors pointer-events-auto"
                >
                  {isRtl ? 'إعادة تعيين المرشحات' : 'Reset All Filters'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters display indicator */}
        {(selectedCategory !== 'all' || selectedSize !== 'all' || searchQuery || maxPrice < 1200) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-neutral-600">
            <span>{isRtl ? 'المرشحات النشطة:' : 'Active Filters:'}</span>
            {selectedCategory !== 'all' && (
              <span className="bg-neutral-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>{isRtl ? categoryOptions.find(o => o.value === selectedCategory)?.labelAr : categoryOptions.find(o => o.value === selectedCategory)?.labelEn}</span>
                <button onClick={() => setSelectedCategory('all')} className="hover:text-red-600">✕</button>
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="bg-neutral-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>{isRtl ? 'المقاس:' : 'Size:'} {selectedSize}</span>
                <button onClick={() => setSelectedSize('all')} className="hover:text-red-600">✕</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-neutral-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>"{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600">✕</button>
              </span>
            )}
            {maxPrice < 1200 && (
              <span className="bg-neutral-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span>{isRtl ? 'أقل من' : 'Under'} {maxPrice} ج.م</span>
                <button onClick={() => setMaxPrice(1200)} className="hover:text-red-600">✕</button>
              </span>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-neutral-400 mb-6">
          {isRtl
            ? `العثور على ${filteredProducts.length} قطعة ملابس رائعة`
            : `Found ${filteredProducts.length} premium clothing items`}
        </p>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-100 p-16 text-center max-w-sm mx-auto shadow-xs">
            <h4 className="text-base font-bold text-neutral-800 font-cairo mb-2">
              {isRtl ? 'لم نعثر على أي منتجات!' : 'No premium pieces found!'}
            </h4>
            <p className="text-xs text-neutral-400 font-light max-w-[260px] mx-auto leading-relaxed mb-6">
              {isRtl
                ? 'جرب تعديل المرشحات أو تنظيف أحجام البحث والأسعار للعثور على الملابس المطلوبة.'
                : 'Try adjusting filters or expanding sizes research criteria to find the perfect child wear.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors pointer-events-auto"
            >
              {isRtl ? 'عرض كل القطع الفاخرة' : 'Show All Pieces'}
            </button>
          </div>
        ) : (
          <div
            id="products-shop-grid"
            className={`grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${
              viewGrid === 'dense'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            }`}
          >
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                id={`shop-product-card-${p.id}`}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-150/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div 
                  onClick={() => onProductClick(p)}
                  className="relative aspect-[4/5] bg-neutral-100 overflow-hidden"
                >
                  <img
                    src={p.images[0]}
                    alt={isRtl ? p.nameAr : p.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Category Overlays */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                    {p.isBestSeller && (
                      <span className="bg-luxury-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {isRtl ? 'الأكبر مبيعاً' : 'Popular'}
                      </span>
                    )}
                    {p.isNewArrival && (
                      <span className="bg-amber-500 text-neutral-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-xs">
                        {isRtl ? 'حديثاً' : 'New'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info and CTA */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1.5 block">
                      {isRtl ? (p.category === 'shirts' ? 'قميص فاخر' : 'طقم أولاد متكامل') : (p.category === 'shirts' ? 'Signature Shirt' : 'Complete Boys Set')}
                    </span>
                    <h3 
                      onClick={() => onProductClick(p)}
                      className="font-cairo font-semibold text-xs sm:text-sm text-neutral-800 line-clamp-2 leading-relaxed mb-3 group-hover:text-[#C8A96A] transition-colors"
                    >
                      {isRtl ? p.nameAr : p.nameEn}
                    </h3>

                    {/* Sizes chips inline */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.sizes.slice(0, 3).map((size) => (
                        <span key={size} className="text-[9px] font-mono font-bold px-2 py-0.5 bg-neutral-100 rounded text-neutral-500">
                          {size}
                        </span>
                      ))}
                      {p.sizes.length > 3 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-400">
                          +{p.sizes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Cart add */}
                  <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-[#0B0B0B] text-sm sm:text-base">
                        {p.price} <span className="text-[10px] font-semibold">{isRtl ? 'ج.م' : 'EGP'}</span>
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          {p.originalPrice} {isRtl ? 'ج.م' : 'EGP'}
                        </span>
                      )}
                    </div>

                    <button
                      id={`btn-shop-quick-cart-${p.id}`}
                      onClick={() => onAddToCart(p, p.sizes[0] || '4-5Y')}
                      className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#C8A96A] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
                      title={isRtl ? 'إضافة سريعة بمقاس افتراضي' : 'Quick add standard size'}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
