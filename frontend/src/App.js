import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { useContext } from 'react'
import { context } from './context/context'
import Messenger from './pages/messenger/Messenger'

function App() {
    const { user } = useContext(context)
    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Register />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/message" element={<Messenger />} />
            </Routes>
        </Router>
    )
}

export default App
