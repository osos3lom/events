'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useData } from '../../../../../../context/DataContext';
import { Order } from '../../../../../../types';
import { Badge } from '../../../../../../components/common/Badge';
import { Modal } from '../../../../../../components/common/Modal';
import { getLocalizedText } from '../../../../../../lib/localeUtils';
import {
  Search,
  Eye,
  RefreshCw,
  XCircle,
  ShoppingBag,
  DollarSign,
  Download
} from 'lucide-react';

export default function OrdersPage() {
  const t = useTranslations('orders');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const params = useParams();
  const eventId = String(params?.eventId || '1');
  const { data, refundOrder } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const eventOrders = useMemo(
    () => data.orders.filter((o) => o.event_id === eventId),
    [data.orders, eventId]
  );

  const filteredOrders = useMemo(() => {
    return eventOrders.filter((order) => {
      const name = `${order.first_name} ${order.last_name}`.toLowerCase();
      const email = order.email.toLowerCase();
      const shortId = order.short_id.toLowerCase();
      const q = searchQuery.toLowerCase();
      return name.includes(q) || email.includes(q) || shortId.includes(q);
    });
  }, [eventOrders, searchQuery]);

  const handleRefund = (orderId: string) => {
    if (confirm('Are you sure you want to refund and cancel this order?')) {
      refundOrder(orderId);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: 'REFUNDED' });
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className={`w-4 h-4 text-slate-400 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
          <input
            type="text"
            placeholder={tCommon('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-hidden dark:text-white`}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3 px-4">{t('orderId')}</th>
                <th className="py-3 px-4">{t('customer')}</th>
                <th className="py-3 px-4">{t('date')}</th>
                <th className="py-3 px-4">{t('status')}</th>
                <th className="py-3 px-4 text-right rtl:text-left">{t('total')}</th>
                <th className="py-3 px-4 text-center">{tCommon('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400" dir="ltr">
                      {order.short_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {order.first_name} {order.last_name}
                      </p>
                      <p className="text-[11px] text-slate-400" dir="ltr">{order.email}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          order.status === 'COMPLETED'
                            ? 'success'
                            : order.status === 'REFUNDED'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right rtl:text-left font-bold text-slate-900 dark:text-white">
                      ${order.total_gross.toLocaleString()} {order.currency}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition"
                          title={tCommon('view')}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.status === 'COMPLETED' && (
                          <button
                            onClick={() => handleRefund(order.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                            title={t('refundOrder')}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order #${selectedOrder.short_id}` : ''}
        maxWidth="lg"
      >
        {selectedOrder && (
          <div className="space-y-6 text-xs">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">
                  {t('customer')}
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedOrder.first_name} {selectedOrder.last_name}
                </p>
                <p className="text-slate-500" dir="ltr">{selectedOrder.email}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-0.5">
                  {t('paymentMethod')}
                </span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {selectedOrder.payment_method}
                </p>
                <p className="text-slate-500">
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Line items */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                {t('itemsPurchased')}
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {selectedOrder.items.map((item, idx) => {
                  const itemTitle = getLocalizedText(item.ticket_title, locale);
                  return (
                    <div key={idx} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {itemTitle}
                        </span>
                        <span className="text-slate-400 mx-2">x{item.quantity}</span>
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        ${item.total_price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing math */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>{t('tax')}:</span>
                <span>${selectedOrder.total_tax}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t('fees')}:</span>
                <span>${selectedOrder.total_fee}</span>
              </div>
              {selectedOrder.discount_amount && selectedOrder.discount_amount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({selectedOrder.promo_code}):</span>
                  <span>-${selectedOrder.discount_amount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                <span>{t('total')}:</span>
                <span>${selectedOrder.total_gross} {selectedOrder.currency}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
