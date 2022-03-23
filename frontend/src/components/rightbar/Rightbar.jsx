import './rightbar.css'
import Online from '../online/Online'
import { useContext, useEffect, useState } from 'react'
import instance from '../../lib/axios'
import { context } from '../../context/context.js'
import { Link } from 'react-router-dom'
import { Add, Remove } from '@material-ui/icons'

export default function Rightbar({ users }) {
    const { user: authUser, dispatch } = useContext(context)
    const [friends, setFriends] = useState()
    const [followed, setFollowed] = useState(
        authUser.following.includes(users?._id)
    )

    useEffect(() => {
        const fetcher = async () => {
            try {
                const { data } = await instance.get(
                    `users/friends/${authUser?._id}`
                )
                setFriends(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetcher()
    }, [])

    const handelClick = async () => {
        try {
            if (followed) {
                await instance.put(`users/unfollow/${users._id}`, {
                    userId: authUser._id,
                })
                dispatch({ type: 'unFollow', payload: users?._id })
            } else {
                await instance.put(`users/follow/${users._id}`, {
                    userId: authUser._id,
                })
                dispatch({ type: 'Follow', payload: users?._id })
            }
            setFollowed(!followed)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(authUser)

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer"></div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {friends?.map((u, i) => (
                        <Online key={u._id + i} user={u} />
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
                    {friends?.map((user, i) => (
                        <div className="rightbarFollowing" key={user?._id + i}>
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
