'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '../../../../../i18n/routing';

export default function EventIndexPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = String(params?.eventId || '1');

  useEffect(() => {
    router.replace(`/manage/event/${eventId}/dashboard`);
  }, [router, eventId]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}
