import React from 'react';
import { EventLayout } from '../../../../../components/layouts/EventLayout';
import { initialData } from '../../../../../data/initialData';

export function generateStaticParams() {
  return initialData.events.map((event) => ({
    eventId: event.id,
  }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return <EventLayout eventId={eventId || '1'}>{children}</EventLayout>;
}
