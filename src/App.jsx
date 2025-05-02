import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AppRouter from './AppRouter';

export const AuthContext = createContext();

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [memberId, setMemberId] = useState(localStorage.getItem('memberId'));
    const [adminId, setAdminId] = useState(localStorage.getItem('adminId'));
    const [role, setRole] = useState(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            try {
                const decoded = jwtDecode(savedToken);
                return decoded.role; // Ambil role dari token
            } catch (error) {
                console.error("Invalid token:", error);
                return null;
            }
        }
        return null;
    });    

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Invalid token:", error);
                setRole(null);
            }
        } else {
            setRole(null);
        }
    }, [token]);    

    return (
        <AuthContext.Provider value={{ token, setToken, role, setRole, memberId, setMemberId, adminId, setAdminId }}>
            <Router>
                <AppRouter />
            </Router>
        </AuthContext.Provider>
    );
}

export default App;

