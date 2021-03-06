import './post.css'
import { MoreVert } from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react'
import instance from '../../lib/axios'
import { Link } from 'react-router-dom'
import { context } from '../../context/context'

export default function Post({ post }) {
    const [like, setLike] = useState(post?.likes.length)
    const [user, setUser] = useState()
    const { user: authUser } = useContext(context)
    const likeHandler = async () => {
        try {
            await instance.put(`posts/${post._id}/like`, {
                userId: authUser._id,
            })
            setLike(like ? like - 1 : like + 1)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetcher = async () => {
            const { data } = await instance.get(`users/${post.userId}`)
            setUser(data)
        }
        fetcher()
    }, [post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user?._id}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    user?.profilePic ||
                                    'http://localhost:3000/assets/person/noAvatar.png'
                                }
                                alt=""
                            />
                        </Link>
                        <Link
                            to={`/profile/${user?._id}`}
                            className="link"
                            style={{ color: '#333' }}
                        >
                            <span className="postUsername">
                                {user?.username}
                            </span>
                        </Link>
                        <span className="postDate">
                            {new Date(user?.createdAt).toDateString()}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post?.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src="http://localhost:3000/assets/like.png"
                            onClick={likeHandler}
                            alt=""
                        />
                        <img
                            className="likeIcon"
                            src="http://localhost:3000/assets/heart.png"
                            onClick={likeHandler}
                            alt=""
                        />
                        <span className="postLikeCounter">
                            {like} people like it
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
