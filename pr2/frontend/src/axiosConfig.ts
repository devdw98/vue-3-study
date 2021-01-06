import axios from 'axios';

const myAxios = axios.create({ baseURL: 'http://localhost:3000' })

export {myAxios}