import { Container } from "@/components/shared/container";
import JeansAdminProductsWrapper from "./AdminProductsWrapper";
import JeansProductForm from "./ProductForm";

export default function AdminPanelJeans() {
    return (
        <Container className='py-20'>
            <h1 className="text-3xl font-bold mb-2">Удаление, добавление и редактирование джинс</h1>


            <h2 className="text-xl font-semibold mt-6 mb-2">Добавить товар</h2> <JeansProductForm />

            <h2 className="text-xl font-semibold mt-6 mb-2">Список товаров</h2> <JeansAdminProductsWrapper />


        </Container>
    );
}