import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { useContext, useEffect, useState } from 'react'
import instance from '../../lib/axios'
import Spinner from '../spinner/Spinner'
import { context } from '../../context/context'

export default function Feed({ userId }) {
    const [posts, setPosts] = useState()
    const { user } = useContext(context)

    useEffect(() => {
        const fetcher = async () => {
            const { data } = userId
                ? await instance.get('posts/profile/' + userId)
                : await instance.get('posts/timeline/' + user._id)
            setPosts(data)
        }
        fetcher()
    }, [userId])
    if (!posts) return <Spinner />
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share user={user} />
                {posts?.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}
