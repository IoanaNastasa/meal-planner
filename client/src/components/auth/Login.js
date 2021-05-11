import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    try {
      const registerData = {
        email,
        password,
      };
      await axios.post('http://localhost:5000/auth/login', registerData);
      history.push('/');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
