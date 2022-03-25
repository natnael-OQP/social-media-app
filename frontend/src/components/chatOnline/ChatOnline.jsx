import axios from 'axios'
import { useEffect, useState } from 'react'
import './chatOnline.css'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {}
        getFriends()
    }, [])

    useEffect(() => {}, [])

    const handleClick = async (user) => {}

    return (
        <div className="chatOnline">
            {onlineFriends.map((o, i) => (
                <div
                    key={o + i}
                    className="chatOnlineFriend"
                    onClick={() => handleClick(o)}
                >
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={o?.profilePicture}
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    )
}
