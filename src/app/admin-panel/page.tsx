export const dynamic = 'force-dynamic';

import { getCurrentUser } from "@/lib/getCurrentUser";
import ProductForm from "./ProductForm";
import AdminProductsWrapper from "./AdminProductsWrapper";

export default async function AdminPanel() {
    const user = await getCurrentUser();

    if (!user) {
        return <div className="p-6 text-center text-red-500">Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить.</div>;
    }

    if (!user.isAdmin) {
        return <div className="p-6 text-center text-yellow-600">У вас нет доступа. Только администраторы могут открыть панель.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
            <p>Добро пожаловать, {user.username}!</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Добавить товар</h2>
            <ProductForm />

            <h2 className="text-xl font-semibold mt-6 mb-2">Список товаров</h2>
            <AdminProductsWrapper />
        </div>
    );
}

