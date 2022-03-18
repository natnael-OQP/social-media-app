import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
    const navigation = useNavigate()
    const [input, setInput] = useState()
    const changeHandler = (e) => {
        setInput(() => ({}))
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
                    <div className="loginBox">
                        <input
                            placeholder="Email"
                            className="loginInput"
                            name="email"
                            onChange={changeHandler}
                        />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            name="password"
                            onChange={changeHandler}
                        />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button
                            onClick={() => navigation('/login')}
                            className="loginRegisterButton"
                        >
                            Create a New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
