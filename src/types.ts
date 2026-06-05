/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'shirts' | 'sets' | 'new_arrivals' | 'offers' | 'seasonal' | 'best_sellers';
  price: number; // in EGP
  originalPrice?: number; // for offers/discounts
  sizes: string[];
  images: string[];
  descriptionAr: string;
  descriptionEn: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isOffer?: boolean;
  detailsAr: string[];
  detailsEn: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface Review {
  id: string;
  authorAr: string;
  authorEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  date: string;
}

export type ViewType = 'home' | 'shop' | 'offers' | 'about' | 'contact' | 'product-detail';
export type Language = 'ar' | 'en';
