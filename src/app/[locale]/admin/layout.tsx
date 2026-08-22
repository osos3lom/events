'use client';

import React from 'react';
import { DefaultLayout } from '../../../components/layouts/DefaultLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
