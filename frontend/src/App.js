import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    const user = true

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Register />} />
                <Route path="/login" element={user ? <Home /> : <Login />} />
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default App
