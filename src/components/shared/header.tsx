'use client';
import React, { useState, useEffect } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import cartIcon from "@/images/icons/header-cart.svg";
import userPic from "@/images/icons/header-user.svg";
import { MdOutlineClose } from "react-icons/md";
import Cart from "@/app/Cart";

import { useCart } from "@/lib/useCart";

type Props = {
    user: {
        id: string;
        email: string;
        username: string;
        isAdmin?: boolean;
    } | null;
    logout: () => void;
};

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface SearchResult {
    id: number;
    title: string;
}

export const Header: React.FC<Props> = ({ user, logout }) => {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const { cart } = useCart();
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleOutside = () => {
            setOpen(false);
            setCartOpen(false);
            setUserMenuOpen(false);
        };
        if (open || cartOpen || userMenuOpen) document.addEventListener("click", handleOutside);
        return () => document.removeEventListener("click", handleOutside);
    }, [open, cartOpen, userMenuOpen]);

    const handleSearch = async (q: string) => {
        setQuery(q);
        if (q.length < 2) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/products?search=${encodeURIComponent(q)}`);
            if (!res.ok) {
                setResults([]);
                return;
            }
            const text = await res.text();
            const data = text ? JSON.parse(text) : [];
            setResults(data);
        } catch (err) {
            console.error("Ошибка поиска:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="text-black relative h-[60px] select-none border-b">
                <Container>
                    <div className="flex items-center justify-between py-4">
                        <button
                            className="relative z-30 w-10 h-8 flex flex-col gap-[5px] group pt-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(!open);
                            }}
                        >
                            <span
                                className={`block h-1 w-9 bg-black transition-all duration-300 ${open ? "rotate-45 translate-y-3 bg-white" : ""}`}
                            ></span>
                            <span
                                className={`block h-1 bg-black transition-all duration-300 ${open ? "opacity-0 w-0" : "w-[30px] group-hover:w-9"}`}
                            ></span>
                            <span
                                className={`block h-1 w-9 bg-black transition-all duration-300 ${open ? "-rotate-45 -translate-y-2 bg-white" : ""}`}
                            ></span>
                        </button>

                        <Link href="/" className="text-xl font-bold absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer">
                            LOGO
                        </Link>

                        <div className="flex items-center gap-4 relative">
                            <button className="relative" onClick={(e) => {
                                e.stopPropagation();
                                setCartOpen(true);
                            }}>
                                <Image src={cartIcon} alt="cart" width={24} height={24} />

                                {/* бейдж с количеством */}
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {totalQuantity}
                                    </span>
                                )}
                            </button>

                            <div className="relative">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                                    <Image src={userPic} alt="user" width={24} height={24} />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
                                        <ul className="flex flex-col text-sm">
                                            <li>
                                                {user ? (
                                                    <button
                                                        onClick={logout}
                                                        className="block px-4 py-2 hover:bg-gray-100 rounded-lg w-full cursor-pointer"
                                                    >
                                                        Выйти ({user.username})
                                                    </button>
                                                ) : (
                                                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 rounded-lg text-center">
                                                        Войти
                                                    </Link>
                                                )}
                                            </li>
                                            {user?.isAdmin && (
                                                <Link href="/admin-panel" className="block px-4 py-2 hover:bg-gray-100 rounded-lg text-center">
                                                    Админ панель
                                                </Link>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </header>

            <div className="w-full text-white h-[30px] select-none bg-[#575757] justify-center text-[13px] flex items-center">
                НОВАЯ КОЛЛЕКЦИЯ 2025
            </div>

            {open && <div className="fixed inset-0 bg-black/50 z-40"></div>}
            <div
                className={`fixed top-0 left-0 h-full bg-black text-white z-50 transition-all duration-300 overflow-hidden ${open ? "w-[30%] p-6" : "w-0 p-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <nav className="flex flex-col gap-4">
                    <Link href="/" onClick={() => setOpen(false)}>Главная</Link>
                    <Link href="/products" onClick={() => setOpen(false)}>Каталог</Link>
                    <Link href="/contacts" onClick={() => setOpen(false)}>Контакты</Link>
                </nav>
            </div>


            {cartOpen && <Cart onClose={() => setCartOpen(false)} />}


            {searchOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    onClick={() => setSearchOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-[90%] max-w-md relative shadow-lg transition-all duration-300 scale-100 opacity-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
                        >
                            <MdOutlineClose />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Поиск товаров</h2>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Введите название товара..."
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <div className="mt-4 max-h-60 overflow-y-auto">
                            {loading && <p className="text-gray-500">Загрузка...</p>}
                            {!loading && results.length === 0 && query.length > 1 && (
                                <p className="text-gray-500">Ничего не найдено</p>
                            )}
                            <ul className="divide-y">
                                {results.map((p) => (
                                    <li key={p.id} className="py-2">
                                        <Link
                                            href={`/product/${p.id}`}
                                            className="hover:underline"
                                            onClick={() => setSearchOpen(false)}
                                        >
                                            {p.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
