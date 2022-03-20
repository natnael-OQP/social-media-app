import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from '../../context/context'
import Spinner from '../../components/spinner/Spinner'
import instance from '../../lib/axios'
import './login.css'

export default function Login() {
    const { isLoading, isError, user, dispatch } = useContext(context)
    const [input, setInput] = useState()
    const navigation = useNavigate()

    const changeHandler = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: 'Login_Start' })
        try {
            const { data } = await instance.post('auth/login', input)
            dispatch({ type: 'Login_Success', payload: data })
        } catch (error) {
            dispatch({ type: 'Login_Failure' })
        }
    }
    if (isLoading) return <Spinner />

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
                            type="text"
                            placeholder="username"
                            className="loginInput"
                            name="username"
                            required={true}
                            onChange={changeHandler}
                        />
                        <input
                            type="password"
                            required={true}
                            placeholder="Password"
                            className="loginInput"
                            name="password"
                            onChange={changeHandler}
                        />
                        <button type="submit" className="loginButton">
                            Log In
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button
                            onClick={() => navigation('/login')}
                            className="loginRegisterButton"
                        >
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
