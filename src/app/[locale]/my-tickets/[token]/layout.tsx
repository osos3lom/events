import React from 'react';

export function generateStaticParams() {
  const tokens = ['demo-token', 'sample-token', 'vip-pass', 'my-ticket'];
  return tokens.map((token) => ({
    token,
  }));
}

export default function MyTicketsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
