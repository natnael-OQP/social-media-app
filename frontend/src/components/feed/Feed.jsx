import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { useEffect, useState } from 'react'
import instance from '../../lib/axios'
import Spinner from '../spinner/Spinner'

export default function Feed({ username }) {
    const [posts, setPosts] = useState()
    useEffect(() => {
        const fetcher = async () => {
            const { data } = username
                ? await instance.get('posts/profile/' + username)
                : await instance.get('posts/timeline/62331709f253d8840ea9b78d')
            setPosts(data)
        }
        fetcher()
    }, [username])
    if (!posts) return <Spinner />
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts?.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}
