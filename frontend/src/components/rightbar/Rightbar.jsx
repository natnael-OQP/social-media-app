import './rightbar.css'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react'
import instance from '../../lib/axios'
import { context } from '../../context/context.js'
import { Link, useParams } from 'react-router-dom'
import { Add, Remove } from '@material-ui/icons'

export default function Rightbar({ users }) {
    const [friends, setFriends] = useState()
    const [followed, setFollowed] = useState(users.follower)
    const { user: authUser } = useContext(context)
    useEffect(() => {
        const fetcher = async () => {
            try {
                const { data } = await instance.get(
                    `users/friends/${authUser._id}`
                )
                setFriends(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetcher()
    }, [])

    useEffect(() => {
        setFollowed(authUser.following.includes(users?._id))
    }, [users?._id, authUser])

    const handelClick = async () => {
        try {
            if (followed) {
                await instance.put(`users/follow/${users._id}`, {
                    userId: authUser._id,
                })
            } else {
                await instance.put(`users/unfollow/${users._id}`, {
                    userId: authUser._id,
                })
            }
        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed)
    }
    console.log(followed)

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    {/*
            
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a
                        birhday today.
                    </span>
                    */}
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {friends?.map((u) => (
                        <Online key={u._id} user={u} />
                    ))}
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
                {authUser._id !== users._id && (
                    <button
                        onClick={handelClick}
                        className="rightBarFollowButton"
                        style={{ backgroundColor: '#1872f2', color: '#fff' }}
                    >
                        {followed ? 'UnFollow' : 'Follow'}
                        {followed ? (
                            <Remove style={{ marginLeft: '6px' }} />
                        ) : (
                            <Add style={{ marginLeft: '6px' }} />
                        )}
                    </button>
                )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Ethiopia</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{users?.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Education:</span>
                        <span className="rightbarInfoValue">
                            {users?.education}
                        </span>
                    </div>
                </div>
                {/* ---- user friends  ---- */}
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends?.map((user) => (
                        <div className="rightbarFollowing" key={user?._id}>
                            <Link to={`/profile/${user?._id}`}>
                                <img
                                    src={
                                        user?.profilePicture ||
                                        'http://localhost:3000/assets/person/noAvatar.png'
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                            </Link>
                            <span className="rightbarFollowingName">
                                {user?.username}
                            </span>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {users ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
