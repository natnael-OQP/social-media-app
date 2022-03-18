import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://piper-chats-api.herokuapp.com/api/',
})

export default instance
