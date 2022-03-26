import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext, useEffect, useRef, useState } from 'react'
import { context } from '../../context/context'
import instance from '../../lib/axios.js'
import { io } from 'socket.io-client'

export default function Messenger() {
    const { user } = useContext(context)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    // add user to socket server
    useEffect(() => {
        socket.current.emit('addUser', user?._id)
        socket.current.on('getUsers', (message) => console.log(message))
    }, [user])

    // get conversations
    useEffect(() => {
        const getConversation = async () => {
            const { data } = await instance.get(`conversation/${user._id}`)
            setConversations(data)
        }
        getConversation()
    }, [user._id])

    // get messages
    useEffect(() => {
        const getMessages = async () => {
            const { data } = await instance.get('message/' + currentChat?._id)
            setMessages(data)
        }
        getMessages()
    }, [currentChat?._id])
    //  scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // handel submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newMessage) return
        const message = {
            conversationId: currentChat?._id,
            sender: user?._id,
            text: newMessage,
        }
        socket.current.emit('sendMessage', {
            senderId: user?._id,
            receiverId: currentChat.members.filter(
                (member) => member !== user._id
            ),
            text: newMessage,
        })
        try {
            const { data } = await instance.post('message', message)
            setNewMessage('')
            setMessages([...messages, data])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                        {conversations.map((c, i) => (
                            <div
                                kry={c._id + i}
                                onClick={() => setCurrentChat(c)}
                            >
                                <Conversation
                                    conversation={c}
                                    currentUser={user}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m, i) => (
                                        <div ref={scrollRef} key={m._id + i}>
                                            <Message
                                                message={m}
                                                own={m.sender === user._id}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        value={newMessage}
                                    ></textarea>
                                    <button
                                        className="chatSubmitButton"
                                        onClick={handleSubmit}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
