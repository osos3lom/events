import React from 'react';
import { CategoryListingView } from '../../../components/category/CategoryListingView';

interface VoyagesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function VoyagesCategoryPage({ params }: VoyagesPageProps) {
  const { locale } = await params;
  return <CategoryListingView locale={locale} category="voyages" />;
}
