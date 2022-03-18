import './register.css'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigation = useNavigate()
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
                        <input placeholder="Username" className="loginInput" />
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <input
                            placeholder="Password Again"
                            className="loginInput"
                        />
                        <button className="loginButton">Sign Up</button>
                        <button
                            onClick={() => navigation('/login')}
                            className="loginRegisterButton"
                        >
                            Log into Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
