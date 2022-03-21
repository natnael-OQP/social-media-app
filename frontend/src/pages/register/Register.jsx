import './register.css'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import instance from '../../lib/axios'

export default function Register() {
    const [input, setInput] = useState()
    const passwordRef = useRef()
    const navigation = useNavigate()

    const changeHandler = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        if (input.password !== input.confirmPassword) {
            alert("Password dos't match!")
        } else {
            const user = {
                email: input.email,
                username: input.username,
                password: input.password,
            }
            try {
                await instance.post('auth/register', user)
                navigation('/login')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Piper-chat </h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on
                        Piper-chat.
                    </span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handelSubmit} className="loginBox">
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="loginInput"
                            required={true}
                            onChange={changeHandler}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="loginInput"
                            required={true}
                            onChange={changeHandler}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="loginInput"
                            ref={passwordRef}
                            required={true}
                            onChange={changeHandler}
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Password Again"
                            className="loginInput"
                            required={true}
                            onChange={changeHandler}
                        />
                        <button type="submit" className="loginButton">
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigation('/login')}
                            className="loginRegisterButton"
                        >
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
