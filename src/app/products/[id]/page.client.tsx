'use client';
import { useState, useEffect } from "react";
import { Header } from "@/components/shared/header";
import ProductClient from "./frontPage";

import { useCallback } from 'react';

type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
};

type Product = {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    material?: string;
    polup?: string;
    polub?: string;
    shirinab?: string;
    koleno?: string;
    dlina?: string;
    vihod?: string;
    price: number;
    images: { id: number; url: string }[];
};

type User = {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
} | null;


export default function ProductPageWrapper({
    product,
    user
}: {
    product: Product;
    user: User;
}) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const fetchCart = useCallback(async () => {
        if (!user) {
            const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartItems(localCart);
        } else {
            const res = await fetch(`/api/cart?userId=${user.id}`);
            const data = await res.json();
            setCartItems(data);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <>
            <Header user={user ? { ...user, id: user.id.toString() } : null} logout={() => { }} />
            <ProductClient product={product} user={user} />
        </>
    );
}

