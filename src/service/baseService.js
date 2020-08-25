import axios from 'axios'
export const baseURL="http://localhost:3000/";

const baseService=axios.create({
    baseURL:baseURL+"Course_udemy"
})

export default baseService;