import { Container } from "@/components/shared/container";
import CasesAdminProductsWrapper from "./AdminProductsWrapper";
import CasesProductForm from "./ProductForm";

export default function AdminPanelCases() {
    return (
        <Container className='py-20'>
            <h1 className="text-3xl font-bold mb-2">Удаление, добавление и редактирование чехлов</h1>


            <h2 className="text-xl font-semibold mt-6 mb-2">Добавить товар</h2> <CasesProductForm />

            <h2 className="text-xl font-semibold mt-6 mb-2">Список товаров</h2> <CasesAdminProductsWrapper />


        </Container>
    );
}