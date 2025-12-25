export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";
import { Container } from "@/components/shared/container";

export default async function AdminPanel() {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <div className="p-6 text-center text-red-500">
                Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить.
            </div>
        );
    }

    if (!user.isAdmin) {
        return (
            <div className="p-6 text-center text-yellow-600">
                У вас нет доступа. Только администраторы могут открыть панель.
            </div>
        );
    }

    return (
        <Container className="p-8 mx-auto">
            <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
            <p className="text-gray-500 mb-8">
                Управление товарами и контентом магазина
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                <Link
                    href="/admin-panel/jeans"
                    className="border rounded-xl p-6 hover:bg-gray-50 transition cursor-pointer"
                >
                    <h2 className="text-xl font-semibold mb-2">Джинсы</h2>
                    <p className="text-gray-600 text-sm">
                        Добавление, редактирование и удаление джинсов
                    </p>
                </Link>

                <Link
                    href="/admin-panel/hoodies"
                    className="border rounded-xl p-6 hover:bg-gray-50 transition cursor-pointer"
                >
                    <h2 className="text-xl font-semibold mb-2">Кофты</h2>
                    <p className="text-gray-600 text-sm">
                        Добавление, редактирование и удаление кофт
                    </p>
                </Link>

                <Link
                    href="/admin-panel/cases"
                    className="border rounded-xl p-6 hover:bg-gray-50 transition cursor-pointer"
                >
                    <h2 className="text-xl font-semibold mb-2">Чехлы</h2>
                    <p className="text-gray-600 text-sm">
                        Добавление, редактирование и удаление чехлов
                    </p>
                </Link>
            </div>
        </Container>
    );
}
