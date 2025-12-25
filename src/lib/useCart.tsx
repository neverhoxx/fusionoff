'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ProductType = 'JEANS' | 'HOODIE' | 'CASE';

type CartItem = {
    id: number;
    productType: ProductType;
    title: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number, productType: ProductType) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addItem = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(
                (p) => p.id === item.id && p.productType === item.productType
            );

            if (existing) {
                return prev.map((p) =>
                    p.id === item.id && p.productType === item.productType
                        ? { ...p, quantity: p.quantity + item.quantity }
                        : p
                );
            }

            return [...prev, item];
        });
    };

    const removeItem = (id: number, productType: ProductType) => {
        setCart((prev) =>
            prev.filter((p) => !(p.id === id && p.productType === productType))
        );
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
