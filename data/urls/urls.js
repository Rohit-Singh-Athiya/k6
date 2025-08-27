export const urls  = {
    // Users
    users: 'https://dummyjson.com/users',
    usersById: (id) => `https://dummyjson.com/users/${id}`,

    // Cart
    cart: 'https://dummyjson.com/carts',
    cartById: (id) => `https://dummyjson.com/carts/${id}`,
    userCart: (userId) => `https://dummyjson.com/carts/user/${userId}`,

    // Products
    products: 'https://dummyjson.com/products',
    productById: (id) => `https://dummyjson.com/products/${id}`,
    searchProducts: (query) => `https://dummyjson.com/products/search?q=${query}`,

    // Posts
    posts: 'https://dummyjson.com/posts',
    postById: (id) => `https://dummyjson.com/posts/${id}`,
}