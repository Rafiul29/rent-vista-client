import {BASE_URL} from "./baseUrl.js"
const userId=localStorage.getItem('userId')

const loadUserProfile=()=>{
    fetch(`${BASE_URL}/users/${userId}/`)
    .then(res=>res.json())
    .then(data=>console.log(data))
}

loadUserProfile()