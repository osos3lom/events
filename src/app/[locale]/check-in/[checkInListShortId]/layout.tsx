import React from 'react';
import { initialData } from '../../../../data/initialData';

export function generateStaticParams() {
  return initialData.checkInLists.map((list) => ({
    checkInListShortId: list.short_id,
  }));
}

export default function CheckInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
