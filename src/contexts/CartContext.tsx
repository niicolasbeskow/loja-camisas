"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  titulo: string;
  preco: number;
  cor: string;
  tamanho: string;
  quantidade: number;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (titulo: string, cor: string, tamanho: string) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('@bskw-cart');
    if (savedCart) { try { setCartItems(JSON.parse(savedCart)); } catch (e) {} }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('@bskw-cart', JSON.stringify(cartItems));
  }, [cartItems, isInitialized]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.titulo === newItem.titulo && item.cor === newItem.cor && item.tamanho === newItem.tamanho);
      if (exists) return prev.map(item => item === exists ? { ...item, quantidade: item.quantidade + 1 } : item);
      return [...prev, newItem];
    });
    // REMOVIDO: setIsCartOpen(true); -> O "Silent Add" agora é real!
  };

  const removeFromCart = (titulo: string, cor: string, tamanho: string) => {
    setCartItems(prev => prev.filter(item => !(item.titulo === titulo && item.cor === cor && item.tamanho === tamanho)));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, cartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
