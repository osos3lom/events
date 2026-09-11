import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { DataProvider } from '../../context/DataContext';
import { BookingProvider } from '../../lib/bookingStore';
import { ThemeProvider } from '../../components/providers/ThemeProvider';
import '../globals.css';
import { asset } from '@/lib/basePath';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const bukra = localFont({
  src: [
    {
      path: '../../fonts/29ltbukralight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../fonts/29ltbukraregular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/29ltbukrabold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-bukra',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'jeddah Events | Calm • Coastal • Voyages',
  description: 'Premier Jeddah Red Sea luxury coastal experiences, ticketed events, private beach day passes, and yacht charters.',
  icons: {
    icon: [
      { url: asset('/favicon.ico') },
      { url: asset('/brand/logo-icon.png'), sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: asset('/brand/logo-icon.png'), sizes: '180x180', type: 'image/png' },
    ],
    shortcut: asset('/favicon.ico'),
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className={`${outfit.variable} ${bukra.variable}`} suppressHydrationWarning>
      <body className={`antialiased bg-background text-foreground min-h-screen ${isRtl ? 'font-arabic text-right' : 'font-sans text-left'}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <DataProvider>
              <BookingProvider>
                {children}
              </BookingProvider>
            </DataProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
