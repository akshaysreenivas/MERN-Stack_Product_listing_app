import axios from "axios"
// instance for making apis
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

//  login service  
export function addProduct(body) {
    //   calling api
    return instance.post("/add_product",body);
}
//  login service  
export function addCategory(data) {
    //   calling api
    return instance.post("/add_category",data);
}


// fetch Products 
export function getProducts(page,search,filter) {
    // const url=`?page=${page}&department=${filter}&search=${search}`
    return instance.get(`/get_products`);
}

// fetch Categories 
export function getCategories(page,search,filter) {
    // const url=`?page=${page}&department=${filter}&search=${search}`
    return instance.get(`/get_categories`);
}
