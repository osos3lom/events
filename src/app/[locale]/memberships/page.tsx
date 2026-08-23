import React from 'react';
import { CategoryListingView } from '../../../components/category/CategoryListingView';

interface MembershipsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function MembershipsCategoryPage({ params }: MembershipsPageProps) {
  const { locale } = await params;
  return <CategoryListingView locale={locale} category="memberships" />;
}
