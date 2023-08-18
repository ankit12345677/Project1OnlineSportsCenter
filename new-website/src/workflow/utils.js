export const url = {
    home: () => '/',

    catalog: () => '/shop/catalog',

    category: (category) => `/shop/catalog/${category.slug || category.name } `,

    product: (product) => `/shop/products/${product.ProductId}/${product.slug || product.name }`,
};

export function getCategoryParents(category) {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : [];
}
