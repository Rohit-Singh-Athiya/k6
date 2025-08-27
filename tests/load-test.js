import http from 'k6/http'
import { urls } from '../data/urls/urls.js'
import { headers } from '../helpers/config.js'
import { check } from 'k6';
import { randomId } from '../helpers/helper-functions.js';
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '30s', target: 20 },  // Ramp up to 20 under 30s
        { duration: '20s', target: 20 },  // Stays 20s with 20 users
        { duration: '10s', target: 0  }   // Ramp down 
    ],
    thresholds: {
        http_req_duration: ['p(95) < 1000'] // 95% requests under 1000ms = 1sec
    }

    }
    
    export default function() {
        const usersLoadResponse = http.get(urls.users, headers);
        check(usersLoadResponse, {'Fetching All User In Load':(usersLoadResponse) => usersLoadResponse.status === 200})
        
        let specificUserLoadResponse = http.get((urls.usersById(randomId())), headers);
        check(specificUserLoadResponse, {'Fetching Random User In Load':(specificUserLoadResponse) => specificUserLoadResponse.status === 200})

        let cart = http.get((urls.cart), headers);
        check(cart, {'Fetching Cart In Load':(cart) => cart.status === 200})

        let fetchProducts = http.get(urls.products, headers); 
        check(fetchProducts, { 'Products Fetched Response In Load': (fetchProducts) => fetchProducts.status === 200 });

        let fetchProductById = http.get(urls.productById(randomId()), headers); 
        check(fetchProductById, { 'Products Fetched Response': (fetchProductById) => fetchProductById.status === 200 });

        let fetchPosts = http.get(urls.posts, headers);
        check(fetchPosts, { 'Posts Fetched Response In Load': (fetchPosts) => fetchPosts.status === 200 });
}

export function handleSummary(data) {
  return {
    "stdout": textSummary(data, { indent: " ", enableColors: true }),
    "index.html": htmlReport(data),
  };
}
