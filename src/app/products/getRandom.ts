type Product = {
    id: number;
    title: string;
    price: number;
    images: { id: number; url: string }[];
};

export function getRandomProducts(
    allProducts: Product[],
    currentProductId: number,
    count: number = 5
): Product[] {
    const filtered = allProducts.filter((p) => p.id !== currentProductId);

    for (let i = filtered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered.slice(0, count);
}
