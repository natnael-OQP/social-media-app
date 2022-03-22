import { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './profile.css'
import instance from '../../lib/axios'
import { useParams } from 'react-router'
export default function Profile() {
    const [user, setUser] = useState([])
    const { userId } = useParams()
    useEffect(() => {
        const fetcher = async () => {
            const { data } = await instance.get(`users/${userId}`)
            setUser(data)
        }
        fetcher()
    }, [userId])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user?.coverPicture ||
                                    'http://localhost:3000/assets/person/th.jpg'
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    user?.profilePic ||
                                    'http://localhost:3000/assets/person/noAvatar.png'
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">
                                {user?.username}
                            </h4>
                            <span className="profileInfoDesc">
                                {user?.desc}
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userId={userId} />
                        <Rightbar users={user} />
                    </div>
                </div>
            </div>
        </>
    )
}
