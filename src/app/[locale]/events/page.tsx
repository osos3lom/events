import React from 'react';
import { CategoryListingView } from '../../../components/category/CategoryListingView';

interface EventsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function EventsCategoryPage({ params }: EventsPageProps) {
  const { locale } = await params;
  return <CategoryListingView locale={locale} category="events" />;
}
