"use client";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { useCart } from "@/lib/useCart";

import Link from "next/link";

interface Props {
    onClose: () => void;
}

export default function Cart({ onClose }: Props) {
    const { cart, removeItem } = useCart();

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-xl z-50 flex flex-col"
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-semibold">Корзина</h2>
                <button onClick={onClose}>
                    <MdOutlineClose className="text-2xl" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <p className="text-gray-500">Корзина пуста</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} × €{item.price}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">€{item.price * item.quantity}</p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-600 text-sm hover:underline"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                    <span className="font-medium">Итого:</span>
                    <span className="font-semibold">€{total}</span>
                </div>
                <Link href="pay" className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                    Перейти к оплате
                </Link>
            </div>
        </motion.div>
    );
}
