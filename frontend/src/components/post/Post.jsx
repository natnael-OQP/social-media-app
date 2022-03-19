import './post.css'
import { MoreVert } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import instance from '../../lib/axios'

export default function Post({ post }) {
    console.log(post)
    const [like, setLike] = useState(post?.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState()
    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        const fetcher = async () => {
            const { data } = await instance.get(`users/${post.userId}`)
            setUser(data)
        }
        fetcher()
    }, [post.userId])
    console.log(user)

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={
                                user.profilePic
                                    ? user.profilePic
                                    : 'http://localhost:3000/assets/person/noAvatar.png'
                            }
                            alt=""
                        />
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">
                            {new Date(user.createdAt).toDateString()}
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
