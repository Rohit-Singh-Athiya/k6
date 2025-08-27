import http from 'k6/http'
import { urls } from '../data/urls/urls.js'
import { headers } from '../helpers/config.js'
import { check } from 'k6';
import { randomId } from '../helpers/helper-functions.js';
export const options = {
    stages: [
        { duration: '2m', target: 100 },  // Ramp up to 100 under 2min
        { duration: '5m', target: 100 }, // Stays 5 min under 100 users
        { duration: '2m', target: 200  }  // Ramp up to 200 users in next 2 min
    ],
    thresholds: {
        http_req_duration: ['p(95) < 1000'] // 95% requests under 1000ms = 1sec
    }

    }
    
    export default function() {
        const usersLoadResponse = http.get(urls.users, headers);
        check(usersLoadResponse, {'Fetching All User In Stress':(usersLoadResponse) => usersLoadResponse.status === 200})
        
        let specificUserLoadResponse = http.get((urls.usersById(randomId())), headers);
        check(specificUserLoadResponse, {'Fetching Random User In Stress':(specificUserLoadResponse) => specificUserLoadResponse.status === 200})

        let cart = http.get((urls.cart), headers);
        check(cart, {'Fetching Cart In Load':(cart) => cart.status === 200})

        let fetchProducts = http.get(urls.products, headers); 
        check(fetchProducts, { 'Products Fetched Response In Stress': (fetchProducts) => fetchProducts.status === 200 });

        let fetchProductById = http.get(urls.productById(randomId()), headers); 
        check(fetchProductById, { 'Products Fetched Stress': (fetchProductById) => fetchProductById.status === 200 });

        let fetchPosts = http.get(urls.posts, headers);
        check(fetchPosts, { 'Posts Fetched Response In Stress': (fetchPosts) => fetchPosts.status === 200 });

}