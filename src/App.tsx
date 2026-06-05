/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Language, ViewType } from './types';
import { PRODUCTS, TESTIMONIALS } from './data';
import { 
  ShoppingBag, Phone, Menu, X, Star, Sparkles, AlertCircle, 
  ChevronLeft, ChevronRight, Check, ArrowRight, ArrowLeft, 
  Instagram, Truck, Award, ShieldCheck, Heart, ArrowUpLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import ExitIntentPopup from './components/ExitIntentPopup';
import ShopView from './components/ShopView';
import OffersView from './components/OffersView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';

export default function App() {
  // Client States
  const [language, setLanguage] = useState<Language>('ar');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeArrivalIndex, setActiveArrivalIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedShopCategory, setSelectedShopCategory] = useState<string | null>(null);

  const isRtl = language === 'ar';

  // Persist Cart & Language state with LocalStorage safely
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('doma_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedLang = localStorage.getItem('doma_language');
      if (storedLang) {
        setLanguage(storedLang as Language);
      }
    } catch (e) {
      console.warn('LocalStorage access is blocked or full', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('doma_language', language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  // Handle Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync Hero Banner Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev === 1 ? 0 : 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    const freshCart = [...cart];
    const existingIndex = freshCart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      freshCart[existingIndex].quantity += quantity;
    } else {
      freshCart.push({ product, selectedSize: size, quantity });
    }

    setCart(freshCart);
    localStorage.setItem('doma_cart', JSON.stringify(freshCart));
    showToast(isRtl ? `تمت إضافة ${product.nameAr} للسلة!` : `${product.nameEn} added to your bag!`);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, quantity: number) => {
    const updated = cart.map((item) => {
      if (item.product.id === productId && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem('doma_cart', JSON.stringify(updated));
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    const filtered = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    setCart(filtered);
    localStorage.setItem('doma_cart', JSON.stringify(filtered));
    showToast(isRtl ? 'تمت إزالة القطعة من السلة' : 'Item removed from bag');
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.setItem('doma_cart', JSON.stringify([]));
  };

  // Navigatings
  const navigateTo = (view: ViewType, categoryFilter: string | null = null) => {
    setCurrentView(view);
    setSelectedProduct(null);
    setSelectedShopCategory(categoryFilter);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: string) => {
    navigateTo('shop', cat === 'all' ? null : cat);
  };

  const handleProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hero Banners Data
  const HERO_SLIDES = [
    {
      img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1400&auto=format&fit=crop',
      titleAr: 'أناقة الأطفال تبدأ من هنا',
      titleEn: 'Where Premium Kids Style Begins',
      descAr: 'اكتشف أحدث مجموعات ملابس الأولاد المصممة بعناية لتجمع بين الراحة والأناقة في كل مناسبة بمصر.',
      descEn: 'Discover luxury boys collections crafted meticulously to combine supreme comfort with high daily confidence.',
    },
    {
      img: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=1400&auto=format&fit=crop',
      titleAr: 'أناقة تبدأ من سن مبكرة',
      titleEn: 'A Sophisticated Touch For Little Champs',
      descAr: 'تجمع ملابس الأولاد العصرية بين الخامات القطنية الممتازة والتصميم الفاخر المريح للأم والطفل.',
      descEn: 'Premium clothing designed for active boys, delivering natural Egyptian cotton goodness everywhere in Egypt.',
    }
  ];

  const categories = [
    { id: 'shirts', nameAr: 'قمصان كاجوال', nameEn: 'Casual Shirts', descAr: 'تيشرتات وقمصان قطنية', descEn: 'Tees & Linen Button-ups', count: 2, bg: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=400' },
    { id: 'sets', nameAr: 'مجموعات وأطقم الأولاد', nameEn: 'Boys Outfits', descAr: 'أطقم متناسقة وباقات العيد', descEn: 'Premium Summer & Play Sets', count: 4, bg: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=400' },
    { id: 'new_arrivals', nameAr: 'الوافدين الجدد', nameEn: 'New Arrivals', descAr: 'مجموعات أسبوعية جديدة', descEn: 'Fresh Weekly Curations', count: 'Hot', bg: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=400' },
    { id: 'offers', nameAr: 'عروض خاصة محدودة', nameEn: 'Special Offers', descAr: 'توفير وباقات منسقة', descEn: 'Curated Budget Combos', count: 'Sale', bg: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=400' },
    { id: 'seasonal', nameAr: 'مجموعة موسمية', nameEn: 'Seasonal Outfits', descAr: 'أزياء لكل موسم وحدث', descEn: 'Perfect Holiday Apparel', count: 'New', bg: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=400' },
    { id: 'best_sellers', nameAr: 'المنتجات الأكثر مبيعاً', nameEn: 'Best Sellers', descAr: 'المفضل لدى الأمهات بمصر', descEn: 'Mothers Absolute Favorite', count: 'Top', bg: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=400' },
  ];

  const totalCartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // WhatsApp Static Footer Click
  const handleDirectWhatsAppClick = () => {
    const text = isRtl
      ? 'مرحباً متجر دوما، أود الاستفسار عن المقاسات المتوفرة وأحدث عروض ملابس الأطفال للأولاد.'
      : 'Hello Doma Store, I would like to inquire about kids sizes and current hot promotions on your boys collections.';
    window.location.href = `https://wa.me/201144118289?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="doma-app-root" className="min-h-screen bg-neutral-50/25 flex flex-col font-sans">
      
      {/* 1. TOP PROMOTIONAL ANNOUNCEMENT BAR */}
      <div id="promotional-header-ticker" className="bg-neutral-950 text-white text-[11px] sm:text-xs py-2 px-4 text-center border-b border-neutral-850 relative z-50 overflow-hidden font-cairo">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 mx-auto">
            <Truck className="w-4 h-4 text-[#C8A96A] animate-bounce" />
            <span className="font-light">
              {isRtl 
                ? 'شحن مجاني مميز لكافة محافظات مصر للطلبات بأكثر من ١٠٠٠ جنيه مصرى!' 
                : 'Free nationwide shipping across Egypt on premium orders over 1000 EGP!'}
            </span>
          </div>
          
          {/* Language Toggle Link */}
          <button
            id="btn-language-switcher"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="text-[10px] sm:text-xs font-bold text-[#C8A96A] hover:underline bg-white/10 px-2.5 py-0.5 rounded cursor-pointer leading-none"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>
      </div>

      {/* 2. STICKY LUXURY NAVIGATION NAVBAR */}
      <header
        id="luxury-navbar"
        className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-neutral-150/40' 
            : 'bg-white/70 backdrop-blur-xs py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Menu triggers for mobile */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-900 focus:outline-hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Luxury Minimalist Brand Logo */}
          <div 
            id="brand-logo-container" 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="w-9 h-9 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-extrabold text-sm tracking-tight border border-amber-500/20 shadow-xs">
              D
            </span>
            <div className="text-right">
              <h1 className="text-base sm:text-lg font-black font-cairo text-neutral-950 uppercase tracking-wider leading-none m-0">
                {isRtl ? 'متجر دوما' : 'Doma Store'}
              </h1>
              <span className="text-[9px] text-[#C8A96A] font-bold tracking-widest block leading-none mt-1">
                {isRtl ? 'أزياء الأطفال الفاخرة' : 'PREMIUM KIDS COUTURE'}
              </span>
            </div>
          </div>

          {/* Elegant Navigation Menus for Desktop */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase">
            <button
              id="nav-home"
              onClick={() => navigateTo('home')}
              className={`hover:text-[#C8A96A] transition-colors cursor-pointer ${currentView === 'home' ? 'text-[#C8A96A] border-b-2 border-[#C8A96A] pb-1' : 'text-neutral-700'}`}
            >
              {isRtl ? 'الرئيسية' : 'Home'}
            </button>
            <button
              id="nav-shop"
              onClick={() => navigateTo('shop')}
              className={`hover:text-[#C8A96A] transition-colors cursor-pointer ${currentView === 'shop' ? 'text-[#C8A96A] border-b-2 border-[#C8A96A] pb-1' : 'text-neutral-700'}`}
            >
              {isRtl ? 'المتجر والمنتجات' : 'Shop'}
            </button>
            <button
              id="nav-offers"
              onClick={() => navigateTo('offers')}
              className={`hover:text-[#C8A96A] transition-colors cursor-pointer relative ${currentView === 'offers' ? 'text-[#C8A96A] border-b-2 border-[#C8A96A] pb-1' : 'text-neutral-700'}`}
            >
              {isRtl ? 'أقوى العروض' : 'Offers'}
              <span className="absolute -top-3.5 -right-3.5 h-1.5 w-1.5 bg-[#C8A96A] rounded-full animate-ping" />
            </button>
            <button
              id="nav-about"
              onClick={() => navigateTo('about')}
              className={`hover:text-[#C8A96A] transition-colors cursor-pointer ${currentView === 'about' ? 'text-[#C8A96A] border-b-2 border-[#C8A96A] pb-1' : 'text-neutral-700'}`}
            >
              {isRtl ? 'قصتنا' : 'About Us'}
            </button>
            <button
              id="nav-contact"
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#C8A96A] transition-colors cursor-pointer ${currentView === 'contact' ? 'text-[#C8A96A] border-b-2 border-[#C8A96A] pb-1' : 'text-neutral-700'}`}
            >
              {isRtl ? 'اتصل بنا' : 'Contact Us'}
            </button>
          </nav>

          {/* Right Header Controls (Bag Counter, Free quote placeholder) */}
          <div id="header-right-tools" className="flex items-center gap-4">
            
            {/* Direct WhatsApp Call link */}
            <a
              id="link-header-phone"
              href="https://wa.me/201144118289"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 text-xs font-semibold hover:text-emerald-600 transition-colors bg-neutral-100 text-[#0B0B0B] px-3 py-1.5 rounded-lg border border-neutral-200 font-mono"
            >
              <Phone className="w-3.5 h-3.5 fill-emerald-600 stroke-none" />
              <span>01144118289</span>
            </a>

            {/* Shopping Bag Icon counter */}
            <button
              id="btn-basket-counter"
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-neutral-900 hover:text-[#C8A96A] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-6 h-6 stroke-1.5" />
              {totalCartItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-amber-500 rounded-full text-[10px] font-bold text-neutral-900 flex items-center justify-center border-2 border-white animate-pulse">
                  {totalCartItemsCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Slide */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-28 left-4 right-4 z-40 bg-white rounded-2xl border border-neutral-100 shadow-2xl p-6 md:hidden`}
          >
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider text-center">
              <button onClick={() => navigateTo('home')} className="py-2 hover:bg-neutral-50 rounded-lg">{isRtl ? 'الصفحة الرئيسية' : 'Home'}</button>
              <button onClick={() => navigateTo('shop')} className="py-2 hover:bg-neutral-50 rounded-lg">{isRtl ? 'المتجر والكتالوج لتسوق' : 'Shop Couture'}</button>
              <button onClick={() => navigateTo('offers')} className="py-2 hover:bg-neutral-50 rounded-lg text-rose-600">{isRtl ? 'العروض الترويجية والخصومات' : 'Special Offers'}</button>
              <button onClick={() => navigateTo('about')} className="py-2 hover:bg-neutral-50 rounded-lg">{isRtl ? 'لماذا متجر دوما؟ قصة العلامة' : 'Our Brand Story'}</button>
              <button onClick={() => navigateTo('contact')} className="py-2 hover:bg-neutral-50 rounded-lg">{isRtl ? 'اتصل بنا / طلب الدعم الفني' : 'Contact Us'}</button>
              
              <div className="h-px bg-neutral-100 my-2" />
              
              {/* WhatsApp details on mobile menu */}
              <a
                href="https://wa.me/201144118289"
                className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 fill-white stroke-none" />
                <span>{isRtl ? ' تواصل معنا واتساب: 01144118289' : 'WhatsApp Support'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN LAYOUT AND DYNAMIC FRAME ROUTER */}
      <main className="flex-1">
        
        {/* VIEW: HOME PAGE */}
        {currentView === 'home' && (
          <div id="home-view-sections" className="space-y-16 pb-16">
            
            {/* A. HERO SECTION SLIDER */}
            <section id="hero-slider-section" className="relative h-[80vh] sm:h-[85vh] bg-neutral-900 border-none overflow-hidden pt-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroIndex}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  className="absolute inset-0"
                >
                  {/* Photo background */}
                  <img
                    src={HERO_SLIDES[activeHeroIndex].img}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-40 saturate-110"
                  />
                  {/* Luxury black overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Slider overlays controls */}
              <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative z-10 text-white">
                <div className="max-w-2xl space-y-6">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-[#C8A96A]/20 backdrop-blur-md text-[#C8A96A] border border-[#C8A96A]/30 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest font-cairo"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>
                      {isRtl ? 'الأناقة تبدأ من سن مبكرة' : 'Boys couture designed for active hearts'}
                    </span>
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-cairo tracking-tight leading-tight"
                  >
                    {isRtl ? HERO_SLIDES[activeHeroIndex].titleAr : HERO_SLIDES[activeHeroIndex].titleEn}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm sm:text-base text-neutral-300 font-light max-w-lg leading-relaxed"
                  >
                    {isRtl ? HERO_SLIDES[activeHeroIndex].descAr : HERO_SLIDES[activeHeroIndex].descEn}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4 pt-4"
                  >
                    <button
                      id="hero-shop-now"
                      onClick={() => navigateTo('shop')}
                      className="h-12 px-8 bg-[#C8A96A] hover:bg-[#b09355] text-neutral-950 font-bold rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer pointer-events-auto"
                    >
                      <span>{isRtl ? 'تسوق الآن' : 'Shop Now'}</span>
                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                    <button
                      id="hero-new-arrivals"
                      onClick={() => navigateTo('shop', 'new_arrivals')}
                      className="h-12 px-8 bg-white/10 hover:bg-white/25 text-white font-bold rounded-xl text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md transition-colors cursor-pointer pointer-events-auto border border-white/20"
                    >
                      {isRtl ? 'أحدث الإضافات' : 'New Arrivals'}
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Slide indicators manual controls */}
              <div className="absolute bottom-6 left-4 right-4 max-w-7xl mx-auto flex items-center justify-between z-10">
                <div id="slider-arrows-control" className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveHeroIndex((prev) => (prev === 0 ? 1 : 0))}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveHeroIndex((prev) => (prev === 1 ? 0 : 1))}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer pointer-events-auto transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveHeroIndex(0)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeHeroIndex === 0 ? 'w-6 bg-[#C8A96A]' : 'w-2 bg-white/40'}`}
                  />
                  <button
                    onClick={() => setActiveHeroIndex(1)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeHeroIndex === 1 ? 'w-6 bg-[#C8A96A]' : 'w-2 bg-white/40'}`}
                  />
                </div>
              </div>
            </section>

            {/* B. FEATURED CATEGORIES SECTION */}
            <section id="featured-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
                  {isRtl ? 'التصنيفات المميزة للأولاد' : 'LUXURY CLOTHING DEPARTMENTS'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-900 leading-snug">
                  {isRtl ? 'تسوق فئات متجر دوما الممتازة' : 'Shop Curated Excellence'}
                </h3>
                <div className="h-1 w-12 bg-neutral-300 mx-auto rounded-full mt-3" />
              </div>

              {/* Grid of luxury category cards with counts overlay and quick deep-links */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    id={`category-card-${cat.id}`}
                    onClick={() => handleCategoryNav(cat.id)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-100 p-3 hover:shadow-md transition-all duration-300 text-center flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-50 mb-3">
                      <img
                        src={cat.bg}
                        alt={isRtl ? cat.nameAr : cat.nameEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-2 left-2 bg-[#0B0B0B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {cat.count}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-cairo font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-amber-600 transition-colors">
                        {isRtl ? cat.nameAr : cat.nameEn}
                      </h4>
                      <p className="text-[10px] text-neutral-400 mt-1 line-clamp-1 font-light">
                        {isRtl ? cat.descAr : cat.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* C. WHY CHOOSE DOMA STORE */}
            <section id="why-choose-us" className="bg-neutral-900 text-white py-14 border-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
                    {isRtl ? 'سر التفوق والفخامة' : 'UNCOMPROMISING PILLARS'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-cairo leading-snug">
                    {isRtl ? 'لماذا تختار ملابس متجر دوما؟' : 'Why Egyptian Families Prefer Doma'}
                  </h3>
                  <div className="h-0.5 w-12 bg-amber-500 mx-auto rounded-full mt-3" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
                  
                  {/* Item 1 */}
                  <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="font-cairo font-bold text-xs sm:text-sm">{isRtl ? 'جودة ممتازة مسؤولة' : 'Premium Quality'}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      {isRtl ? 'أقمشة مصرية طويلة التيلة منتقاة بعناية لراحة فائقة في الصيف.' : 'Finest handpicked cotton ensuring secure micro-breathability on child skin.'}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-cairo font-bold text-xs sm:text-sm">{isRtl ? 'تصاميم حديثة ومميزة' : 'Modern Designs'}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      {isRtl ? 'أنماط ملابس تواكب صيحات الموضة العالمية تمنح طفلك الثقة والجمال.' : 'Sleek urban styles keeping your princes ahead of conventional outlines.'}
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-cairo font-bold text-xs sm:text-sm">{isRtl ? 'فخامة بأسعار مقبولة' : 'Affordable Luxury'}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      {isRtl ? 'إطلالة ثرية بأقمشة راقية وبأسعار تناسب كل عائلة تبحث عن الجودة.' : 'Couture feel tailored responsibly at completely reasonable, direct prices.'}
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h4 className="font-cairo font-bold text-xs sm:text-sm">{isRtl ? 'شحن سريع لكافة المحافظات' : 'Nationwide Shipping'}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      {isRtl ? 'توصيل سريع وآمن لأي وجهة في جميع أنحاء مصر وباب البيت.' : 'Rapid 24-48h shipping routes straight inside Cairo, Giza, and governorates.'}
                    </p>
                  </div>

                  {/* Item 5 */}
                  <div className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#C8A96A] mx-auto">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="font-cairo font-bold text-xs sm:text-sm">{isRtl ? 'دعم خدمة عملاء محترف' : 'Elite Customer Care'}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      {isRtl ? 'مساعدتكم في اختيار المقاس المناسب عبر الواتساب والمتابعة فوراً.' : 'Direct support before & after orders over Whatsapp facilitating sizes selections.'}
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* D. BEST SELLERS GRID SECTION */}
            <section id="best-sellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-neutral-100 pb-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] block">
                    {isRtl ? 'أقوى الموديلات مبيعاً وتقييماً' : 'TRUSTED BY THOUSANDS OF MOTHERS'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-cairo text-neutral-900">
                    {isRtl ? 'المنتجات الأكثر مبيعاً ورواجاً' : 'Our Best Sellers Collection'}
                  </h3>
                </div>
                <button
                  id="btn-best-sellers-all"
                  onClick={() => navigateTo('shop', 'best_sellers')}
                  className="text-xs font-bold text-neutral-900 hover:text-amber-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{isRtl ? 'عرض كافة المبيعات' : 'View All Best Sellers'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Best selling dynamic grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.isBestSeller).slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    id={`bestseller-card-${p.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 p-3 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div 
                      onClick={() => handleProductDetail(p)}
                      className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-50 mb-3 cursor-pointer"
                    >
                      <img src={p.images[0]} alt={isRtl ? p.nameAr : p.nameEn} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <span className="absolute top-2 left-2 bg-neutral-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {isRtl ? 'الأعلى مبيعاً' : 'Best'}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating row badge */}
                        <div className="flex items-center gap-1 mb-1 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="text-[10px] font-bold">5.0</span>
                        </div>
                        <h4 
                          onClick={() => handleProductDetail(p)}
                          className="font-cairo font-bold text-xs sm:text-sm text-neutral-800 line-clamp-2 hover:text-[#C8A96A] transition-colors cursor-pointer leading-normal mb-2"
                        >
                          {isRtl ? p.nameAr : p.nameEn}
                        </h4>

                        {/* Sizes list indicators */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {p.sizes.slice(0, 3).map((s) => (
                            <span key={s} className="text-[9px] font-mono bg-neutral-50 border border-neutral-150 py-0.5 px-1.5 rounded text-neutral-500">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-neutral-50 pt-3 flex items-center justify-between mt-auto">
                        <span className="font-extrabold text-[#0B0B0B] text-sm sm:text-base">
                          {p.price} <span className="text-[10px] font-medium">{isRtl ? 'ج.م' : 'EGP'}</span>
                        </span>
                        <button
                          onClick={() => handleAddToCart(p, p.sizes[0] || '4-5Y')}
                          className="text-[10px] font-bold text-[#C8A96A] hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isRtl ? 'إضافة سريعة' : 'Quick Add'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* E. NEW ARRIVALS CAROUSEL SLIDER */}
            <section id="new-arrivals-showcase" className="bg-neutral-50 py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                    {isRtl ? 'مجموعات هذا الأسبوع الحصرية' : 'FRESH FROM OUR CUTTING ATELIERS'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-cairo text-neutral-900">
                    {isRtl ? 'عرض الوافدين الجدد الحصري' : 'The New Arrivals Selection'}
                  </h3>
                  <div className="h-0.5 w-12 bg-amber-500 mx-auto rounded-full mt-3" />
                </div>

                {/* Editorial styled showcase displaying 2 big focus products slider */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {PRODUCTS.filter(p => p.isNewArrival).slice(0, 2).map((p, idx) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm flex flex-col sm:flex-row items-stretch"
                    >
                      {/* Image side */}
                      <div className="sm:w-1/2 relative aspect-square sm:aspect-auto bg-neutral-100 min-h-[250px]">
                        <img src={p.images[0]} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute top-4 left-4 bg-amber-500 text-neutral-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                          {isRtl ? 'جديد أسبوعي' : 'Fresh Weekly'}
                        </span>
                      </div>

                      {/* Content side */}
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-between">
                        <div className="space-y-4">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8A96A] block">
                            {isRtl ? 'مجموعة الموسم الجديد' : 'New Season Collection'}
                          </span>
                          <h4 
                            onClick={() => handleProductDetail(p)}
                            className="font-cairo font-extrabold text-base sm:text-lg text-neutral-950 leading-snug cursor-pointer hover:text-amber-600 transition-colors"
                          >
                            {isRtl ? p.nameAr : p.nameEn}
                          </h4>
                          <p className="text-xs text-neutral-500 leading-relaxed font-light">
                            {isRtl ? p.descriptionAr : p.descriptionEn}
                          </p>
                        </div>

                        <div className="border-t border-neutral-50 pt-5 mt-6 flex items-center justify-between">
                          <span className="text-lg font-black text-neutral-950">
                            {p.price} <span className="text-xs font-semibold">{isRtl ? 'ج.م' : 'EGP'}</span>
                          </span>

                          <button
                            onClick={() => handleProductDetail(p)}
                            className="px-4 py-2 bg-neutral-900 hover:bg-[#C8A96A] text-white hover:text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            {isRtl ? 'تسوق القطعة' : 'Shop Piece'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* F. BRAND STORY CARD */}
            <section id="about-brand-section" className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-100 shadow-md text-center space-y-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 gold-gradient opacity-10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-32 h-32 bg-amber-500 opacity-5 rounded-full blur-2xl pointer-events-none" />

                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] block">
                  {isRtl ? 'قصة علامتنا التجارية' : 'THE DOMA PLEDGE'}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-cairo text-neutral-900 leading-snug max-w-lg mx-auto">
                  {isRtl ? 'عن متجر دوما - أزياء ممتازة للأطفال' : 'About Doma Store Kids Clothing'}
                </h3>

                <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
                  {isRtl
                    ? 'متجر دوما هو علامة تجارية مصرية للأزياء مكرسة لتقديم ملابس الأولاد الأنيقة والمريحة وعالية الجودة للعائلات في جميع أنحاء مصر. يتم اختيار كل قطعة مع الاهتمام المطلق بجودة الخامات والكتان الطبيعي والقطن المريح المتنفس، لضمان مظهر ملكي أنيق وصغير يبدو فيه الأولاد واثقين ويشعرون بالحرية التامة للحركة والتمتع بطفولتهم كل يوم.'
                    : 'Doma Store is an authentic kids brand crafted to deliver absolute aesthetic confidence and lightweight comfort for boys across Egypt. Every clothing element represents unmatched values of breathability and high fiber resilience, so children look incredible and play freely.'}
                </p>

                <button
                  onClick={() => navigateTo('about')}
                  className="px-6 py-3 bg-neutral-900 hover:bg-[#C8A96A] text-white hover:text-black rounded-xl text-xs font-bold transition-colors cursor-pointer pointer-events-auto"
                >
                  {isRtl ? 'اقرأ قصتنا الكاملة' : 'Read Our Full Story'}
                </button>
              </div>
            </section>

            {/* G. CUSTOMER TESTIMONIALS SLIDER */}
            <section id="customer-reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A]">
                  {isRtl ? 'آراء وريد لعملاء متجر دوما' : 'REVIEWS BY CARING MOMS & DADS'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-900 leading-snug">
                  {isRtl ? 'شهادات فخورة نعتز بها' : 'Customer Testimonials'}
                </h3>
                <div className="h-0.5 w-12 bg-neutral-200 mx-auto rounded-full mt-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-neutral-800 font-cairo">
                        {isRtl ? t.authorAr : t.authorEn}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light italic">
                      "{isRtl ? t.commentAr : t.commentEn}"
                    </p>
                    <span className="text-[10px] text-neutral-400 block text-right font-mono">{t.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* H. PROMOTIONAL HOOK FREE SHIPPING BANNER */}
            <section id="free-shipping-hook-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-neutral-850 text-center space-y-6">
                <div className="absolute inset-0 bg-cover bg-center brightness-15 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200')" }} />
                
                <div className="relative z-10 space-y-4">
                  <span className="text-[#C8A96A] text-xs font-bold uppercase tracking-widest block font-cairo">
                    {isRtl ? 'عرض ترويجي محدود للغاية على مستوى مصر' : 'LIMITED GOVERNORATES OUTLET'}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-cairo leading-snug">
                    {isRtl ? 'شحن مجاني لكافة طلبات المحافظات التي تزيد عن ١٠٠٠ جنيه مصري' : 'Free Nationwide Shipping on Orders Over 1000 EGP'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
                    {isRtl
                      ? 'وفر رسوم التوصيل وأتم طلبك الآن واحصل على ملابس طفلك الممتازة مغلفة بعناية بلاتينية وتوصيل لباب البيت.'
                      : 'Laundering convenience, natural materials, and royal designs delivered directly and safely to your primary address.'}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => navigateTo('shop')}
                      className="h-11 px-8 bg-white hover:bg-[#C8A96A] text-neutral-950 hover:text-black font-extrabold rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-colors inline-flex items-center gap-2 cursor-pointer pointer-events-auto"
                    >
                      <span>{isRtl ? 'ابدأ التسوق الآن' : 'Shop Collections Now'}</span>
                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* I. INSTAGRAM INTEGRATION HANDLE BLOCK MOCKUP */}
            <section id="instagram-mockup-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] block">
                  {isRtl ? 'تابعونا على وسائل التواصل الاجتماعي' : 'JOIN OUR STYLISH ECOSYSTEM'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cairo text-neutral-900 tracking-tight flex items-center justify-center gap-2">
                  <Instagram className="w-6 h-6 text-[#C8A96A]" />
                  <span>{isRtl ? 'تابعونا عبر إنستغرام للأطفال' : 'Follow @domastore2025'}</span>
                </h3>
              </div>

              {/* Instagram lifestyle grid mockup */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=400', label: 'Couture 1' },
                  { img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=400', label: 'Play Sets' },
                  { img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=400', label: 'Daily Cotton' },
                  { img: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=400', label: 'Seaside Wear' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-100 shadow-xs cursor-pointer"
                    onClick={() => window.open('https://instagram.com/domastore2025', '_blank')}
                  >
                    <img src={item.img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40" />
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white text-center">
                      <Instagram className="w-5 h-5 mx-auto mb-1 text-pink-400" />
                      <span className="text-[10px] uppercase font-bold tracking-widest block">@domastore2025</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* J. DIRECT WHATSAPP ORDER SECTION BANNER */}
            <section id="whatsapp-direct-checkout-banner" className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10 text-center space-y-6">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Phone className="w-6 h-6 fill-white stroke-none" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-bold font-cairo text-neutral-950 leading-snug">
                    {isRtl ? 'اطلب مباشرة عبر تطبيق الواتساب' : 'Order Direct & Secure via WhatsApp'}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
                    {isRtl
                      ? 'لا داعي للقلق حول خطوات الدفع الإلكتروني المعقدة! تواصل معنا بسهولة لإتمام طلباتك الفاخرة أو الاستفسار عن الأحجام والعروض.'
                      : 'No complex registration required. Chat or send products screenshots now to confirm your boys measurements.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono">
                  <a
                    href="https://wa.me/201144118289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer pointer-events-auto"
                  >
                    <Phone className="w-4 h-4 fill-white stroke-none" />
                    <span>01144118289</span>
                  </a>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW: SHOP MODULE */}
        {currentView === 'shop' && (
          <ShopView
            products={PRODUCTS}
            language={language}
            onProductClick={handleProductDetail}
            onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
            initialCategoryFilter={selectedShopCategory}
          />
        )}

        {/* VIEW: OFFERS MODULE */}
        {currentView === 'offers' && (
          <OffersView
            products={PRODUCTS}
            language={language}
            onProductClick={handleProductDetail}
            onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
          />
        )}

        {/* VIEW: ABOUT BRAND MODULE */}
        {currentView === 'about' && (
          <AboutView language={language} />
        )}

        {/* VIEW: CONTACT SUPPORT MODULE */}
        {currentView === 'contact' && (
          <ContactView language={language} />
        )}

        {/* VIEW: PRODUCT SPECIFIC DETAIL VIEW SCREEN */}
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            language={language}
            onAddToCart={handleAddToCart}
            onClose={() => navigateTo('shop')}
            relatedProducts={PRODUCTS.filter((p) => p.id !== selectedProduct.id).slice(0, 4)}
            onSelectProduct={handleProductDetail}
          />
        )}

      </main>

      {/* 5. FLOATING WhatsApp FIXED CALL BUTTON WIDGET */}
      <a
        id="widget-floating-whatsapp"
        href="https://wa.me/201144118289"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 md:p-4 flex items-center gap-2 group cursor-pointer pointer-events-auto"
        title={isRtl ? 'تواصل معنا واتساب مباشر' : 'Whatsapp support online'}
      >
        <Phone className="w-6 h-6 fill-white stroke-none" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500 ease-out whitespace-nowrap text-xs font-bold font-cairo">
          {isRtl ? 'اتصل بمتجر دوما الآن' : 'Chat with Doma Store'}
        </span>
      </a>

      {/* 6. TOAST SUCCESS NOTIFICATIONS FOR BASKET */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-24 left-6 z-50 bg-[#C8A96A] text-neutral-950 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 font-semibold text-xs sm:text-sm border border-amber-400"
          >
            <Check className="w-4 h-4 text-neutral-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Marketing Activator Modal popup */}
      <ExitIntentPopup language={language} />

      {/* Cart Slider Drawer panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        language={language}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 7. BRANDING GOLD & COAL FOOTER */}
      <footer id="stately-footer" className="bg-[#0B0B0B] text-white pt-14 pb-8 border-t border-neutral-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo Info section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-white text-neutral-950 rounded-lg flex items-center justify-center font-black text-xs">
                  D
                </span>
                <span className="font-bold text-base tracking-widest font-cairo uppercase">
                  {isRtl ? 'متجر دوما' : 'DOMA STORE'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light">
                {isRtl
                  ? 'العلامة التجارية المصرية الرائدة للأزياء الفاخرة والملابس المريحة للأولاد الصغار في جميع أنحاء مصر.'
                  : 'Egyptian kids fashion concept brand leading luxury & pure cotton apparel to stylish Egyptian families.'}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://instagram.com/domastore2025" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C8A96A] hover:text-black text-neutral-400 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#widget-floating-whatsapp" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C8A96A] hover:text-black text-neutral-400 flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4 fill-current stroke-none" />
                </a>
              </div>
            </div>

            {/* Quick Links Nav */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] font-cairo">
                {isRtl ? 'قوائم التصفح' : 'Explorations'}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400 font-light">
                <li>
                  <button onClick={() => navigateTo('home')} className="hover:text-amber-500 cursor-pointer">
                    {isRtl ? 'الصفحة الرئيسية لعالم دوما' : 'Home'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('shop')} className="hover:text-amber-500 cursor-pointer">
                    {isRtl ? 'كتالوج الملابس والأحجام' : 'Shop Collections'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('offers')} className="hover:text-amber-500 cursor-pointer">
                    {isRtl ? 'أقوى كوبونات وعروض التوفير' : 'Offers & Bundles'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Supporting Pillar Badges info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] font-cairo">
                {isRtl ? 'لماذا متجر دوما؟' : 'Our Commitments'}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400 font-light">
                <li>
                  <button onClick={() => navigateTo('about')} className="hover:text-amber-500 cursor-pointer">
                    {isRtl ? 'رسالتنا ومادتنا القطنية الممتازة' : 'Egyptian Fabric Story'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('contact')} className="hover:text-amber-500 cursor-pointer">
                    {isRtl ? 'معلومات الدعم الفني وتوصيل مصر' : 'Governorates Shipping Guidelines'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Geography logistics info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A96A] font-cairo font-mono">
                {isRtl ? 'أوقات العمل والتسليم لمصر' : 'Operating Support Hours'}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-light">
                {isRtl
                  ? 'دعم واتساب وتلقي الاستفسارات متاح ٢٤ ساعة طوال أيام الأسبوع لخدمتكم وضمان القياسات المتوازنة لأولادكم.'
                  : 'WhatsApp concierge and sizes measurements feedback open 24/7. Deliveries dispatched daily to all governorates.'}
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-[#C8A96A] font-bold block">
                  {isRtl ? 'هاتف وواتساب الدعم الرئيسي: 01144118289' : 'Support Hotline: 01144118289'}
                </span>
              </div>
            </div>

          </div>

          <div className="h-px bg-neutral-850" />

          {/* Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-500 font-light">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Doma Store Egypt. {isRtl ? 'جميع الحقوق منسوجة ومحفوظة.' : 'All high-end rights reserved.'}
            </p>
            <div className="flex items-center gap-3">
              <span className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase font-bold text-neural-400 tracking-wider">instapay</span>
              <span className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase font-bold text-neural-400 tracking-wider">vodafone cash</span>
              <span className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Cash on Delivery</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
