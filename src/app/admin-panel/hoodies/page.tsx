import { Container } from "@/components/shared/container";
import HoodiesAdminProductsWrapper from "./AdminProductsWrapper";
import HoodiesProductForm from "./ProductForm";

export default function AdminPanelHoodies() {
    return (
        <Container className='py-20'>
            <h1 className="text-3xl font-bold mb-2">Удаление, добавление и редактирование кофт</h1>


            <h2 className="text-xl font-semibold mt-6 mb-2">Добавить товар</h2> <HoodiesProductForm />

            <h2 className="text-xl font-semibold mt-6 mb-2">Список товаров</h2> <HoodiesAdminProductsWrapper />


        </Container>
    );
}