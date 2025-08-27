import http from 'k6/http'
import { check } from 'k6'
import { urls } from '../data/urls/urls.js';
import { headers } from '../helpers/config.js';
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = { 
    vus: 1,
    duration: '5s'
};

export default function() {
    const requestHeaders =  headers;

    // Fetch Users
    let fetchUsers = http.get(urls.users, requestHeaders); 
    check(fetchUsers, { 'Users Fetched Response': (fetchUsers) => fetchUsers.status === 200 });
    check(fetchUsers, { 'Users Fetched': (fetchUsers) => fetchUsers.body.includes('Emily') });
    check(fetchUsers, { 'Users Fetched Duration': (fetchUsers) => fetchUsers.timings.duration < 2000 });

    // Fetch Cart
    let fetchCart = http.get(urls.cart, requestHeaders); 
    check(fetchCart, { 'Cart Fetched Response': (fetchCart) => fetchCart.status === 200 });
    check(fetchCart, { 'Cart Fetched': (fetchCart) => fetchCart.body.includes('Charger') });
    check(fetchCart, { 'Cart Fetched Duration': (fetchCart) => fetchCart.timings.duration < 2000 });
    
    // Fetch Products 
    let fetchProducts = http.get(urls.products, requestHeaders); 
    check(fetchProducts, { 'Products Fetched Response': (fetchProducts) => fetchProducts.status === 200 });
    check(fetchProducts, { 'Products Fetched': (fetchProducts) => fetchProducts.body.includes('products') });
    check(fetchProducts, { 'Products Fetched Duration': (fetchProducts) => fetchProducts.timings.duration < 2000 });

    // Fetch Posts
    let fetchPosts = http.get(urls.posts, headers);
    check(fetchPosts, { 'Posts Fetched Response': (fetchPosts) => fetchPosts.status === 200 });
    check(fetchPosts, { 'Posts Fetched': (fetchPosts) => fetchPosts.body.includes('products') });
    check(fetchPosts, { 'Posts Fetched Duration': (fetchPosts) => fetchPosts.timings.duration < 2000 });
}

export function handleSummary(data) {
  return {
    "stdout": textSummary(data, { indent: " ", enableColors: true }),
    "index.html": htmlReport(data),
  };
}