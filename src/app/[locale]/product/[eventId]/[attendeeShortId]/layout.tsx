import React from 'react';
import { initialData } from '../../../../../data/initialData';

export function generateStaticParams() {
  return initialData.attendees.map((att) => ({
    eventId: att.event_id,
    attendeeShortId: att.short_id,
  }));
}

export default function ProductPassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
