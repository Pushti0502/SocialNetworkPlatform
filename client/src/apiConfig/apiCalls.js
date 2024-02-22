import BASE_URL from "./api";
import axios from 'axios'
import React from 'react'


export const posts={
    createpost:(data)=>axios.post(`${BASE_URL}/createPost`,data),
    getposts:(data)=>axios.get(`/getPosts`,data),
    getpostById:(data)=>axios.post(`${BASE_URL}/getPostById`,data)
}
