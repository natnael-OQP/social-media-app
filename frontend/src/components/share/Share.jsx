import { useContext, useRef, useState } from 'react'
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'
import './share.css'
import { context } from '../../context/context.js'
import instance from '../../lib/axios'
import axios from 'axios'
import Spinner from '../../components/spinner/Spinner'

export default function Share({ user }) {
    const { user: authUser } = useContext(context)
    const [file, setFile] = useState()
    const descRef = useRef()

    const handelSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'uploads')

        try {
            if (file) {
                const upload = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_ID}/image/upload`,
                    data
                )
                const { url } = upload.data
                const newPost = {
                    userId: authUser._id,
                    desc: descRef.current.value,
                    img: url,
                }
                await instance.post('posts', newPost)
                window.location.reload()
            } else {
                const newPost = {
                    userId: authUser._id,
                    desc: descRef.current.value,
                }
                await instance.post('posts', newPost)
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user?.profilePic ||
                            'http://localhost:3000/assets/person/noAvatar.png'
                        }
                        alt="avatar"
                    />
                    <input
                        type="text"
                        ref={descRef}
                        placeholder={`What's in your mind ${authUser?.username}?`}
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />
                <form onSubmit={handelSubmit} className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <label htmlFor="file" className="shareOptionText">
                                <PermMedia
                                    htmlColor="tomato"
                                    className="shareIcon"
                                />
                                Photo or Video
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions
                                htmlColor="goldenrod"
                                className="shareIcon"
                            />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">
                        Share
                    </button>
                </form>
            </div>
        </div>
    )
}
