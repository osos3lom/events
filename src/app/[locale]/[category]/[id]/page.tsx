import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, ArrowLeft, ShieldCheck, Compass, Share2, Heart } from 'lucide-react';
import { luxuryCatalog } from '../../../../data/luxuryCatalog';
import { LuxuryNavbar } from '../../../../components/luxury/LuxuryNavbar';
import { LuxuryFooter } from '../../../../components/luxury/LuxuryFooter';
import { UnifiedCheckoutModal } from '../../../../components/checkout/UnifiedCheckoutModal';
import { EventTierPurchase } from '../../../../components/detail/EventTierPurchase';
import { DayPassPurchase } from '../../../../components/detail/DayPassPurchase';
import { SeaVoyagePurchase } from '../../../../components/detail/SeaVoyagePurchase';
import { RealEstatePurchase } from '../../../../components/detail/RealEstatePurchase';

interface PageProps {
  params: Promise<{
    locale: string;
    category: string;
    id: string;
  }>;
}

export function generateStaticParams() {
  const params: { category: string; id: string }[] = [];
  luxuryCatalog.forEach((product) => {
    params.push({ category: product.category, id: product.id });
    if (product.slug && product.slug !== product.id) {
      params.push({ category: product.category, id: product.slug });
    }
  });
  return params;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, category, id } = await params;
  const isArabic = locale === 'ar';

  const product = luxuryCatalog.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040C0E] text-slate-900 dark:text-white flex flex-col selection:bg-[#D4AF37] selection:text-slate-950 transition-colors">
      <LuxuryNavbar locale={locale} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-8 w-full">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 hover:text-[#b8860b] dark:hover:text-[#D4AF37] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isArabic ? 'العودة لجميع التجارب' : 'Back to All Experiences'}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 shadow-md">
          <div className="md:col-span-2 relative h-80 sm:h-96 md:h-[460px]">
            <img
              src={product.coverImage}
              alt={product.title[isArabic ? 'ar' : 'en']}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {product.badge && (
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-xl bg-[#D4AF37] text-slate-950 font-extrabold text-xs shadow-lg">
                {product.badge[isArabic ? 'ar' : 'en']}
              </span>
            )}
          </div>

          <div className="hidden md:flex flex-col gap-4">
            {product.galleryImages.slice(0, 2).map((imgUrl, idx) => (
              <div key={idx} className="relative flex-1 overflow-hidden">
                <img
                  src={imgUrl}
                  alt="Gallery"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Title, Location, and Header Details */}
        <div className="space-y-3 border-b border-slate-200 dark:border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-[#b8860b] dark:text-[#D4AF37] border border-amber-500/30">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300 font-semibold bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">({product.reviewsCount} verified VIP reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {product.title[isArabic ? 'ar' : 'en']}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <MapPin className="w-4 h-4 text-[#b8860b] dark:text-[#D4AF37] shrink-0" />
            <span>{product.locationName[isArabic ? 'ar' : 'en']}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl pt-2">
            {product.description[isArabic ? 'ar' : 'en']}
          </p>
        </div>

        {/* Adaptive Dynamic Purchase Controller */}
        <div className="pt-2">
          {product.category === 'events' && (
            <EventTierPurchase product={product} locale={locale} />
          )}
          {product.category === 'day-passes' && (
            <DayPassPurchase product={product} locale={locale} />
          )}
          {product.category === 'voyages' && (
            <SeaVoyagePurchase product={product} locale={locale} />
          )}
          {product.category === 'real-estate' && (
            <RealEstatePurchase product={product} locale={locale} />
          )}
        </div>
      </main>

      <UnifiedCheckoutModal locale={locale} />
      <LuxuryFooter locale={locale} />
    </div>
  );
}
