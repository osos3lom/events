'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { getLocalizedText, formatCurrency } from '../../../../../../lib/localeUtils';
import { Printer } from 'lucide-react';

export default function PrintOrderReceiptPage() {
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const orderShortId = String(params?.orderShortId || '');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { data } = useData();

  const event = data.events.find((e) => e.id === eventId) || data.events[0];
  const order = useMemo(
    () =>
      data.orders.find(
        (o) => o.short_id.toUpperCase() === orderShortId.toUpperCase() || o.id === orderShortId
      ) || data.orders[0],
    [data.orders, orderShortId]
  );

  if (!order) {
    return <div className="p-8 text-center text-sm">Order receipt not found.</div>;
  }

  const orgName = getLocalizedText(data.organization.name, locale);
  const eventTitle = getLocalizedText(event.title, locale);
  const venueName = getLocalizedText(event.location_venue_name, locale) || (isRtl ? 'عبر الإنترنت' : 'Online');

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-8 flex flex-col items-center">
      {/* Print Action Bar (Hidden in print mode) */}
      <div className="w-full max-w-3xl mb-6 flex justify-between items-center print:hidden">
        <span className="text-xs text-slate-500 font-medium">
          {isRtl ? 'معاينة الإيصال للطباعة' : 'Receipt Preview'}
        </span>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <Printer className="w-4 h-4" />
          <span>{isRtl ? 'طباعة الإيصال' : 'Print Receipt'}</span>
        </button>
      </div>

      {/* Invoice Sheet */}
      <div className="w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 space-y-8 border border-slate-200">
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl mb-2">
              H
            </div>
            <h2 className="font-bold text-lg text-slate-900">{orgName}</h2>
            <p className="text-xs text-slate-500">{data.organization.email}</p>
            <p className="text-xs text-slate-500">{data.organization.website}</p>
          </div>

          <div className="text-right space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {isRtl ? 'إيصال رسمي معتمد' : 'Official Receipt'}
            </span>
            <h1 className="text-xl font-black text-slate-900" dir="ltr">{order.short_id}</h1>
            <p className="text-xs text-slate-500">
              {isRtl ? 'التاريخ: ' : 'Date: '}{new Date(order.created_at).toLocaleDateString()}
            </p>
            <p className="text-xs text-slate-500">
              {isRtl ? 'الحالة: ' : 'Status: '}{order.status}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {isRtl ? 'بيانات المشتري:' : 'Billed To:'}
            </span>
            <p className="font-bold text-sm text-slate-900">
              {order.first_name} {order.last_name}
            </p>
            <p className="text-slate-600">{order.email}</p>
            <p className="text-slate-600">{order.payment_method}</p>
          </div>

          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              {isRtl ? 'تفاصيل الفعالية:' : 'Event Details:'}
            </span>
            <p className="font-bold text-sm text-slate-900">{eventTitle}</p>
            <p className="text-slate-600">{new Date(event.start_date).toLocaleDateString()}</p>
            <p className="text-slate-600">{venueName}</p>
          </div>
        </div>

        {/* Line items table */}
        <div>
          <table className="w-full text-left rtl:text-right text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-400 font-bold">
                <th className="py-3 px-2">{isRtl ? 'وصف البند / الفئة' : 'Item Description'}</th>
                <th className="py-3 px-2 text-center">{isRtl ? 'الكمية' : 'Qty'}</th>
                <th className="py-3 px-2 text-right rtl:text-left">{isRtl ? 'السعر' : 'Price'}</th>
                <th className="py-3 px-2 text-right rtl:text-left">{isRtl ? 'الإجمالي' : 'Total'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item, i) => {
                const itemTitle = getLocalizedText(item.ticket_title, locale);
                return (
                  <tr key={i}>
                    <td className="py-3.5 px-2 font-semibold text-slate-900">{itemTitle}</td>
                    <td className="py-3.5 px-2 text-center text-slate-600">{item.quantity}</td>
                    <td className="py-3.5 px-2 text-right rtl:text-left text-slate-600">${item.unit_price}</td>
                    <td className="py-3.5 px-2 text-right rtl:text-left font-bold text-slate-900">${item.total_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Calculation summary */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-64 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>{isRtl ? 'الضرائب:' : 'Taxes:'}</span>
              <span>${order.total_tax}</span>
            </div>
            <div className="flex justify-between">
              <span>{isRtl ? 'رسوم الخدمة:' : 'Fees:'}</span>
              <span>${order.total_fee}</span>
            </div>
            {order.discount_amount && order.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>{isRtl ? `الخصم (${order.promo_code}):` : `Discount (${order.promo_code}):`}</span>
                <span>-${order.discount_amount}</span>
              </div>
            )}
            <div className="pt-2 border-t-2 border-slate-900 flex justify-between font-black text-slate-900 text-sm">
              <span>{isRtl ? 'المبلغ الإجمالي المدفوع:' : 'Total Paid:'}</span>
              <span>${order.total_gross} {order.currency}</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 text-center text-[11px] text-slate-400">
          {isRtl
            ? `شكراً لتعاملكم مع ${orgName}. للاستفسارات والدعم، يرجى التواصل عبر ${data.organization.email}.`
            : `Thank you for your purchase with ${orgName}. For questions, contact ${data.organization.email}.`}
        </div>
      </div>
    </div>
  );
}
