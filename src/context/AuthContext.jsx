import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [{username: 'admin', password: 'password'}]
    }); 

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const login = (username, password) => {
        const foundUsername = users.find((u) => (u.username === username));
        if(!foundUsername) {
            return {success: false, message: "Username not found"};
        }
        
        const found = users.find((u) => (u.username === username && u.password === password));
        
        if(found) {
            setUser({username});
            return {success: true};
        }
        return {success: false, message: "Password is incorrect"};;
    }

    const signup = (username, password) => {
        const exist = users.some((u) => u.username === username);
        if(exist) return {success: false, message: 'Username already taken'};
        const newUser = {username, password};
        setUsers((prev) => [...prev, newUser]);
        setUser({username});
        return {success: true}; 
    }

    const logout = () => setUser(null);

    
  return (
    <AuthContext.Provider value={{user, login, signup, logout}}>
        {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext);
