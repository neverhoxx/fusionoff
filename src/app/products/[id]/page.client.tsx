'use client';
import { useState, useEffect } from "react";
import { Header } from "@/components/shared/header";
import ProductClient from "./frontPage";

export default function ProductPageWrapper({ product, user }) {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        if (!user) {
            const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartItems(localCart);
        } else {
            const res = await fetch(`/api/cart?userId=${user.id}`);
            const data = await res.json();
            setCartItems(data);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <>
            <Header user={user} logout={() => { }} cartItems={cartItems} fetchCart={fetchCart} />
            <ProductClient product={product} user={user} refreshCart={fetchCart} />
        </>
    );
}
