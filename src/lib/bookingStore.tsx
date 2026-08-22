'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  BookingState,
  CartItem,
  GuestManifestEntry,
  BookingCustomer,
  SaudiIdentityType,
} from '../types/booking';

const STORAGE_KEY = 'jeddah_luxury_red_sea_session_v2';

const initialBookingState: BookingState = {
  cart: [],
  customer: {
    fullName: '',
    email: '',
    phone: '+966 ',
    idType: 'national_id',
    idNumber: '',
  },
  maritimeManifest: [],
  paymentMethod: 'mada',
  appliedPromoCode: undefined,
  discountAmount: 0,
  vatRate: 0.15, // 15% Saudi ZATCA VAT
};

/**
 * Builds the booking session. Called exactly once, by BookingProvider — every
 * consumer reads the result through context so that cart contents and the
 * checkout-open flag are shared rather than duplicated per component.
 */
function useBookingStoreState() {
  const [state, setState] = useState<BookingState>(initialBookingState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Hydrate from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not load booking state from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  const saveState = useCallback((newState: BookingState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to persist booking session:', e);
    }
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => {
      setState((prev) => {
        const existingIndex = prev.cart.findIndex(
          (c) => c.productId === item.productId && c.tier?.id === item.tier?.id && c.selectedDate === item.selectedDate
        );

        let updatedCart: CartItem[];
        if (existingIndex > -1) {
          updatedCart = [...prev.cart];
          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity: updatedCart[existingIndex].quantity + item.quantity,
            addOns: [...item.addOns],
          };
        } else {
          updatedCart = [...prev.cart, item];
        }

        const next = { ...prev, cart: updatedCart };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
      setIsCheckoutOpen(true);
    },
    []
  );

  const updateCartItemQuantity = useCallback((cartItemId: string, delta: number) => {
    setState((prev) => {
      const updatedCart = prev.cart
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      const next = { ...prev, cart: updatedCart };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setState((prev) => {
      const updatedCart = prev.cart.filter((item) => item.id !== cartItemId);
      const next = { ...prev, cart: updatedCart };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateCustomer = useCallback((customerUpdates: Partial<BookingCustomer>) => {
    setState((prev) => {
      const next = {
        ...prev,
        customer: {
          ...prev.customer,
          ...customerUpdates,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addMaritimeGuest = useCallback((guest: Omit<GuestManifestEntry, 'id'>) => {
    setState((prev) => {
      const newGuest: GuestManifestEntry = {
        ...guest,
        id: 'gst-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      };
      const next = {
        ...prev,
        maritimeManifest: [...prev.maritimeManifest, newGuest],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeMaritimeGuest = useCallback((guestId: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        maritimeManifest: prev.maritimeManifest.filter((g) => g.id !== guestId),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleCartAddOn = useCallback(
    (cartItemId: string, addOn: { id: string; title: { en: string; ar: string }; price: number }) => {
      setState((prev) => {
        const updatedCart = prev.cart.map((item) => {
          if (item.id !== cartItemId) return item;
          const exists = item.addOns.some((a) => a.id === addOn.id);
          const newAddOns = exists
            ? item.addOns.filter((a) => a.id !== addOn.id)
            : [...item.addOns, { ...addOn, quantity: 1 }];
          return { ...item, addOns: newAddOns };
        });
        const next = { ...prev, cart: updatedCart };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const applyPromoCode = useCallback((code: string, discount: number) => {
    setState((prev) => {
      const next = { ...prev, appliedPromoCode: code, discountAmount: discount };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removePromoCode = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, appliedPromoCode: undefined, discountAmount: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const syncLeadBookerToManifest = useCallback(() => {
    setState((prev) => {
      if (!prev.customer.fullName || !prev.customer.idNumber) return prev;
      const alreadyInManifest = prev.maritimeManifest.some(
        (g) => g.idNumber === prev.customer.idNumber
      );
      if (alreadyInManifest) return prev;

      const leadGuest: GuestManifestEntry = {
        id: 'gst-lead-' + Date.now(),
        fullName: prev.customer.fullName,
        idType: prev.customer.idType,
        idNumber: prev.customer.idNumber,
        nationality: 'Saudi',
      };
      const next = {
        ...prev,
        maritimeManifest: [leadGuest, ...prev.maritimeManifest],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setPaymentMethod = useCallback((method: BookingState['paymentMethod']) => {
    setState((prev) => {
      const next = { ...prev, paymentMethod: method };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    saveState({
      ...initialBookingState,
      customer: state.customer, // preserve user info for convenience
    });
  }, [saveState, state.customer]);

  // Pricing calculations
  const subtotal = state.cart.reduce((total, item) => {
    const baseItemPrice = item.unitPrice * item.quantity;
    const addOnsPrice = item.addOns.reduce((sum, add) => sum + add.price * (add.quantity || 1), 0);
    return total + baseItemPrice + addOnsPrice;
  }, 0);

  const discountAmount = state.discountAmount;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const vatAmount = taxableAmount * state.vatRate;
  const grandTotal = taxableAmount + vatAmount;
  const totalItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const hasVoyages = state.cart.some((item) => item.category === 'voyages');

  return {
    state,
    isLoaded,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    toggleCartAddOn,
    applyPromoCode,
    removePromoCode,
    syncLeadBookerToManifest,
    updateCustomer,
    addMaritimeGuest,
    removeMaritimeGuest,
    setPaymentMethod,
    clearCart,
    pricing: {
      subtotal,
      discountAmount,
      taxableAmount,
      vatRate: state.vatRate,
      vatAmount,
      grandTotal,
      currency: 'SAR',
      totalItemCount,
    },
    hasVoyages,
  };
}

type BookingStore = ReturnType<typeof useBookingStoreState>;

const BookingContext = createContext<BookingStore | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useBookingStoreState();
  return <BookingContext.Provider value={store}>{children}</BookingContext.Provider>;
};

/**
 * Access the shared booking session. Must be called under a BookingProvider —
 * without one, opening the checkout from a purchase panel could never reach the
 * modal, because each caller would hold its own isolated copy of the state.
 */
export function useBookingStore(): BookingStore {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBookingStore must be used within a BookingProvider');
  }
  return ctx;
}
