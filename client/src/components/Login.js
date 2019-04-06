import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = ev => {
    ev.preventDefault();
    if (!username || !password)
      return props.setError('Please enter username and password.');
    const credentials = { username, password };
    axios
      .post('http://localhost:3300/api/login', credentials)
      .then(res => {
        props.setError(null);
        localStorage.setItem('jwt', res.data.token);
        props.history.push('/jokes');
      })
      .catch(err =>
        props.setError(
          err.response
            ? err.response.data.error
            : 'There was an error while attempting login.'
        )
      );
  };
  return (
    <form className="login auth" onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        onChange={ev => setUsername(ev.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={ev => setPassword(ev.target.value)}
        value={password}
      />
      <button>Login</button>
    </form>
  );
}
