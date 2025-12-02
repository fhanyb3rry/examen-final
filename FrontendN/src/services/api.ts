import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.55:3000/api/dsm43', 

    headers: {
        'Content-Type': 'application/json',
    },
});
