import React from 'react';
import { initialData } from '../../../../data/initialData';

export function generateStaticParams() {
  return initialData.events.map((event) => ({
    eventId: event.id,
  }));
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
