import React from 'react';
import { initialData } from '../../../../../data/initialData';

export function generateStaticParams() {
  return initialData.events.map((event) => ({
    eventId: event.id,
    eventSlug: event.slug,
  }));
}

export default function PublicEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
