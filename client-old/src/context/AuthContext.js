// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Validate token and set user state
//             validateToken(token);
//         }
//     }, []);

//     const validateToken = async (token) => {
//         try {
//             // Assuming you have an endpoint to validate the token
//             const response = await axios.get('/api/validateToken', { headers: { Authorization: `Bearer ${token}` } });
//             if (response.data.isValid) {
//                 setUser({ token }); // Set user as authenticated
//             }
//         } catch (error) {
//             console.log(error);
//             localStorage.removeItem('token'); // Clear token if invalid
//         }
//     };

//     const login = (userData) => {
//         localStorage.setItem('token', userData.token);
//         setUser(userData);
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
