import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';

const AuthContext = createContext();
function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  async function getIsLoggedIn() {
    const loggedInRes = await axios.get('http://localhost:5000/auth/loggedIn');
    setIsLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getIsLoggedIn();
  }, [])
  return (
    <AuthContext.Provider value={{ isLoggedIn, getIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
export { AuthContextProvider };
