"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { produtos } from '@/data/produtos';

export type CartItem = {
  titulo: string;
  preco: number;
  cor: string;
  tamanho: string;
  quantidade: number;
};

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (titulo: string, cor: string, tamanho: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItemsBrutos, setCartItemsBrutos] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Recupera do Cache do Navegador
  useEffect(() => {
    const saved = localStorage.getItem('bskw_cart');
    if (saved) {
      try { setCartItemsBrutos(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  // Salva no Cache do Navegador
  useEffect(() => {
    localStorage.setItem('bskw_cart', JSON.stringify(cartItemsBrutos));
  }, [cartItemsBrutos]);

  const addToCart = (newItem: CartItem) => {
    setCartItemsBrutos(prev => {
      const exists = prev.find(i => i.titulo === newItem.titulo && i.cor === newItem.cor && i.tamanho === newItem.tamanho);
      if (exists) {
        return prev.map(i => i.titulo === newItem.titulo && i.cor === newItem.cor && i.tamanho === newItem.tamanho 
          ? { ...i, quantidade: i.quantidade + newItem.quantidade } 
          : i);
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (titulo: string, cor: string, tamanho: string) => {
    setCartItemsBrutos(prev => prev.filter(i => !(i.titulo === titulo && i.cor === cor && i.tamanho === tamanho)));
  };

  // ========================================================
  // A MÁGICA: DESCONTO AUTOMÁTICO DE KIT NO CARRINHO GLOBAL
  // ========================================================
  const cartItemsComDesconto = cartItemsBrutos.map(item => {
    const produtoBanco = produtos.find(p => p.nome === item.titulo);
    
    if (produtoBanco && produtoBanco.precoKit) {
       // Procura no carrinho quantas camisas existem da mesma categoria e faixa de preço (O mesmo Grupo/Linha)
       const itensDoMesmoGrupo = cartItemsBrutos.filter(i => {
           const pBanco = produtos.find(p => p.nome === i.titulo);
           return pBanco && pBanco.categoria === produtoBanco.categoria && pBanco.preco === produtoBanco.preco;
       });
       
       // Soma a quantidade total de camisas desse grupo
       const qtdTotalGrupo = itensDoMesmoGrupo.reduce((acc, i) => acc + i.quantidade, 0);
       
       const p1 = produtoBanco.preco;
       const p3 = produtoBanco.precoKit;
       const p2 = Math.floor(p1 - ((p1 - p3) / 2)) + 0.90;
       
       let precoAtual = p1; // Preço Cheio
       if (qtdTotalGrupo >= 3) precoAtual = p3; // Desconto Máximo!
       else if (qtdTotalGrupo === 2) precoAtual = p2; // Desconto Médio!
       
       return { ...item, preco: precoAtual };
    }
    return item;
  });

  const cartCount = cartItemsComDesconto.reduce((acc, item) => acc + item.quantidade, 0);
  const cartTotal = cartItemsComDesconto.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ 
        cartItems: cartItemsComDesconto, 
        cartCount, 
        cartTotal, 
        isCartOpen, 
        setIsCartOpen, 
        addToCart, 
        removeFromCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro do CartProvider');
  return context;
};
