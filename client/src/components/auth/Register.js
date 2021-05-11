import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const history = useHistory();

  async function register(e) {
    e.preventDefault();
    try {
      const registerData = {
        email,
        password,
        passwordVerify
      };

      await axios.post('http://localhost:5000/auth', registerData);
      history.push('/');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Register new account</h2>
      <form onSubmit={register}>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" placeholder="Repeat password" onChange={(e) => setPasswordVerify(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Register
