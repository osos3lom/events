'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AppDataState,
  Event,
  TicketProduct,
  Order,
  Attendee,
  PromoCode,
  Question,
  CheckInList,
  BroadcastMessage,
  Organization,
  User
} from '../types';
import { initialData } from '../data/initialData';

const STORAGE_KEY = 'hi_events_redsea_jeddah_v3';

interface DataContextType {
  data: AppDataState;
  isLoaded: boolean;
  createEvent: (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => Event;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  createTicket: (ticket: Omit<TicketProduct, 'id'>) => TicketProduct;
  updateTicket: (id: string, updates: Partial<TicketProduct>) => void;
  deleteTicket: (id: string) => void;
  createOrder: (
    order: Omit<Order, 'id' | 'short_id' | 'created_at'>,
    attendees: Array<Omit<Attendee, 'id' | 'short_id' | 'order_id' | 'created_at' | 'checked_in' | 'barcode'>>
  ) => { order: Order; attendees: Attendee[] };
  refundOrder: (id: string) => void;
  checkInAttendee: (attendeeId: string, checkedIn: boolean) => void;
  createPromoCode: (promo: Omit<PromoCode, 'id' | 'current_uses'>) => PromoCode;
  updatePromoCode: (id: string, updates: Partial<PromoCode>) => void;
  deletePromoCode: (id: string) => void;
  createQuestion: (question: Omit<Question, 'id'>) => Question;
  deleteQuestion: (id: string) => void;
  createCheckInList: (list: Omit<CheckInList, 'id' | 'short_id'>) => CheckInList;
  updateCheckInList: (id: string, updates: Partial<CheckInList>) => void;
  deleteCheckInList: (id: string) => void;
  sendBroadcastMessage: (msg: Omit<BroadcastMessage, 'id' | 'sent_at'>) => BroadcastMessage;
  updateOrganization: (updates: Partial<Organization>) => void;
  updateUser: (updates: Partial<User>) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppDataState>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: AppDataState = JSON.parse(stored);
        // Migrate any outdated image URLs
        const migratedEvents = parsed.events.map((ev) => {
          if (ev.id === '1' || ev.cover_image_url?.includes('photo-1569263979104-865ab7cd8d17')) {
            return { ...ev, cover_image_url: '/images/obhur-sunset-yacht-dj.jpg' };
          }
          if (ev.id === '3' || ev.cover_image_url?.includes('photo-1510812431401-41d2bd2722f3')) {
            return { ...ev, cover_image_url: '/images/oia-beach-sunbed-cover.jpg' };
          }
          return ev;
        });
        const migratedData = { ...parsed, events: migratedEvents };
        setData(migratedData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedData));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupt, using memory store', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage helper
  const saveState = (newState: AppDataState) => {
    setData(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const createEvent = (eventInput: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Event => {
    const newId = String(Date.now());
    const newEvent: Event = {
      ...eventInput,
      id: newId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    saveState({
      ...data,
      events: [newEvent, ...data.events]
    });
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    saveState({
      ...data,
      events: data.events.map((ev) =>
        ev.id === id ? { ...ev, ...updates, updated_at: new Date().toISOString() } : ev
      )
    });
  };

  const deleteEvent = (id: string) => {
    saveState({
      ...data,
      events: data.events.filter((ev) => ev.id !== id),
      tickets: data.tickets.filter((t) => t.event_id !== id),
      orders: data.orders.filter((o) => o.event_id !== id),
      attendees: data.attendees.filter((a) => a.event_id !== id),
      promoCodes: data.promoCodes.filter((p) => p.event_id !== id),
      questions: data.questions.filter((q) => q.event_id !== id),
      checkInLists: data.checkInLists.filter((c) => c.event_id !== id),
      messages: data.messages.filter((m) => m.event_id !== id)
    });
  };

  const createTicket = (ticketInput: Omit<TicketProduct, 'id'>): TicketProduct => {
    const newId = `t-${Date.now()}`;
    const newTicket: TicketProduct = {
      ...ticketInput,
      id: newId
    };
    saveState({
      ...data,
      tickets: [...data.tickets, newTicket]
    });
    return newTicket;
  };

  const updateTicket = (id: string, updates: Partial<TicketProduct>) => {
    saveState({
      ...data,
      tickets: data.tickets.map((t) => (t.id === id ? { ...t, ...updates } : t))
    });
  };

  const deleteTicket = (id: string) => {
    saveState({
      ...data,
      tickets: data.tickets.filter((t) => t.id !== id)
    });
  };

  const createOrder = (
    orderInput: Omit<Order, 'id' | 'short_id' | 'created_at'>,
    attendeesInput: Array<Omit<Attendee, 'id' | 'short_id' | 'order_id' | 'created_at' | 'checked_in' | 'barcode'>>
  ) => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ord-${Date.now()}`;
    const shortId = `ORD-${orderNum}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderInput,
      id: orderId,
      short_id: shortId,
      created_at: now
    };

    const newAttendees: Attendee[] = attendeesInput.map((att, idx) => {
      const attId = `att-${Date.now()}-${idx}`;
      const suffix = String.fromCharCode(65 + (idx % 26));
      return {
        ...att,
        id: attId,
        short_id: `ATT-${orderNum}${suffix}`,
        order_id: orderId,
        checked_in: false,
        checked_in_at: null,
        barcode: `${orderNum}-${orderId.slice(-4)}-${idx + 10}`,
        created_at: now
      };
    });

    // Update tickets sold quantity
    const updatedTickets = data.tickets.map((ticket) => {
      const item = orderInput.items.find((i) => i.ticket_id === ticket.id);
      if (item) {
        return {
          ...ticket,
          quantity_sold: ticket.quantity_sold + item.quantity
        };
      }
      return ticket;
    });

    // Update promo code usage if applied
    let updatedPromoCodes = data.promoCodes;
    if (orderInput.promo_code) {
      updatedPromoCodes = data.promoCodes.map((p) =>
        p.code.toUpperCase() === orderInput.promo_code?.toUpperCase()
          ? { ...p, current_uses: p.current_uses + 1 }
          : p
      );
    }

    saveState({
      ...data,
      orders: [newOrder, ...data.orders],
      attendees: [...newAttendees, ...data.attendees],
      tickets: updatedTickets,
      promoCodes: updatedPromoCodes
    });

    return { order: newOrder, attendees: newAttendees };
  };

  const refundOrder = (id: string) => {
    const order = data.orders.find((o) => o.id === id);
    if (!order) return;

    // Refund items: decrement ticket sold counts
    const updatedTickets = data.tickets.map((ticket) => {
      const item = order.items.find((i) => i.ticket_id === ticket.id);
      if (item) {
        return {
          ...ticket,
          quantity_sold: Math.max(0, ticket.quantity_sold - item.quantity)
        };
      }
      return ticket;
    });

    saveState({
      ...data,
      orders: data.orders.map((o) => (o.id === id ? { ...o, status: 'REFUNDED' } : o)),
      attendees: data.attendees.map((a) => (a.order_id === id ? { ...a, status: 'CANCELLED' } : a)),
      tickets: updatedTickets
    });
  };

  const checkInAttendee = (attendeeId: string, checkedIn: boolean) => {
    saveState({
      ...data,
      attendees: data.attendees.map((a) =>
        a.id === attendeeId
          ? {
              ...a,
              checked_in: checkedIn,
              checked_in_at: checkedIn ? new Date().toISOString() : null
            }
          : a
      )
    });
  };

  const createPromoCode = (promoInput: Omit<PromoCode, 'id' | 'current_uses'>): PromoCode => {
    const newPromo: PromoCode = {
      ...promoInput,
      id: `p-${Date.now()}`,
      current_uses: 0
    };
    saveState({
      ...data,
      promoCodes: [...data.promoCodes, newPromo]
    });
    return newPromo;
  };

  const updatePromoCode = (id: string, updates: Partial<PromoCode>) => {
    saveState({
      ...data,
      promoCodes: data.promoCodes.map((p) => (p.id === id ? { ...p, ...updates } : p))
    });
  };

  const deletePromoCode = (id: string) => {
    saveState({
      ...data,
      promoCodes: data.promoCodes.filter((p) => p.id !== id)
    });
  };

  const createQuestion = (questionInput: Omit<Question, 'id'>): Question => {
    const newQuestion: Question = {
      ...questionInput,
      id: `q-${Date.now()}`
    };
    saveState({
      ...data,
      questions: [...data.questions, newQuestion]
    });
    return newQuestion;
  };

  const deleteQuestion = (id: string) => {
    saveState({
      ...data,
      questions: data.questions.filter((q) => q.id !== id)
    });
  };

  const createCheckInList = (listInput: Omit<CheckInList, 'id' | 'short_id'>): CheckInList => {
    const newList: CheckInList = {
      ...listInput,
      id: `ck-${Date.now()}`,
      short_id: `list-${Date.now().toString().slice(-4)}`
    };
    saveState({
      ...data,
      checkInLists: [...data.checkInLists, newList]
    });
    return newList;
  };

  const updateCheckInList = (id: string, updates: Partial<CheckInList>) => {
    saveState({
      ...data,
      checkInLists: data.checkInLists.map((c) => (c.id === id ? { ...c, ...updates } : c))
    });
  };

  const deleteCheckInList = (id: string) => {
    saveState({
      ...data,
      checkInLists: data.checkInLists.filter((c) => c.id !== id)
    });
  };

  const sendBroadcastMessage = (msgInput: Omit<BroadcastMessage, 'id' | 'sent_at'>): BroadcastMessage => {
    const newMsg: BroadcastMessage = {
      ...msgInput,
      id: `msg-${Date.now()}`,
      sent_at: new Date().toISOString()
    };
    saveState({
      ...data,
      messages: [newMsg, ...data.messages]
    });
    return newMsg;
  };

  const updateOrganization = (updates: Partial<Organization>) => {
    saveState({
      ...data,
      organization: { ...data.organization, ...updates }
    });
  };

  const updateUser = (updates: Partial<User>) => {
    saveState({
      ...data,
      user: { ...data.user, ...updates }
    });
  };

  const resetData = () => {
    saveState(initialData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoaded,
        createEvent,
        updateEvent,
        deleteEvent,
        createTicket,
        updateTicket,
        deleteTicket,
        createOrder,
        refundOrder,
        checkInAttendee,
        createPromoCode,
        updatePromoCode,
        deletePromoCode,
        createQuestion,
        deleteQuestion,
        createCheckInList,
        updateCheckInList,
        deleteCheckInList,
        sendBroadcastMessage,
        updateOrganization,
        updateUser,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
