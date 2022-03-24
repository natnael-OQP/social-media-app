import { useEffect, useState } from 'react'
import instance from '../../lib/axios'
import './conversation.css'

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null)
    const friends = conversation.members.filter(
        (member) => member !== currentUser._id
    )
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await instance.get('users/' + friends)
                setUser(data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [])
    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.profilePic ||
                    'http://localhost:3000/assets/person/noAvatar.png'
                }
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}
