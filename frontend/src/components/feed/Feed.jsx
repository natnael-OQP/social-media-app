import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { useEffect, useState } from 'react'
import instance from '../../lib/axios'
import Spinner from '../spinner/Spinner'

export default function Feed() {
    const [posts, setPosts] = useState()
    useEffect(() => {
        const fetcher = async () => {
            const { data } = await instance.get(
                'posts/timeline/62331709f253d8840ea9b78d'
            )
            setPosts(data)
        }
        fetcher()
    }, [])
    if (!posts) return <Spinner />
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
