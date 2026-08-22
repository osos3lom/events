import React from 'react';
import { initialData } from '../../../../../../data/initialData';

export function generateStaticParams() {
  return initialData.orders.map((order) => ({
    eventId: order.event_id,
    orderShortId: order.short_id,
  }));
}

export default function SummaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
