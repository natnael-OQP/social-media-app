import axios from 'axios'
import { useEffect, useState } from 'react'
import './conversation.css'

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            try {
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [])

    return (
        <div className="conversation">
            <img className="conversationImg" src="" alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}
