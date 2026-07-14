'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface QuoteItem {
  product_id: number
  reference: string
  name: string
  slug: string
  image: string | null
  quantity: number
}

interface QuoteCartContextValue {
  items: QuoteItem[]
  count: number
  isOpen: boolean
  setOpen: (open: boolean) => void
  addItem: (item: Omit<QuoteItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clear: () => void
}

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null)

const STORAGE_KEY = 'ameg-quote-cart'

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [isOpen, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // The quote cart is transient UI state (a dev-request draft), not user data —
  // persisting it locally keeps the selection while the visitor browses.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<QuoteItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === item.product_id)
      if (existing) {
        return prev.map((i) =>
          i.product_id === item.product_id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [...prev, { ...item, quantity }]
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product_id === productId ? { ...i, quantity: Math.max(1, quantity) } : i)),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<QuoteCartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      isOpen,
      setOpen,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }),
    [items, isOpen, addItem, removeItem, updateQuantity, clear],
  )

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext)
  if (!ctx) throw new Error('useQuoteCart must be used within QuoteCartProvider')
  return ctx
}
