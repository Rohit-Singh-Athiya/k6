      
export function randomId(){  // Fetches random number from 0 to 9  
    let randomUserId = Math.floor(Math.random() * 10) + 1;
    return randomUserId;
}