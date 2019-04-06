import React, { useState } from 'react';
import axios from 'axios';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = ev => {
    ev.preventDefault();
    if (!username || !password)
      return props.setError('Please enter username and password.');
    const credentials = { username, password };
    setUsername('');
    setPassword('');
    axios
      .post('http://localhost:3300/api/register', credentials)
      .then(res => {
        props.setError(null);
        localStorage.setItem('jwt', res.data.token);
        props.history.push('/jokes');
      })
      .catch(err =>
        props.setError(
          err.response
            ? err.response.data.error
            : 'There was an error while attempting registration.'
        )
      );
  };
  return (
    <form className="register auth" onSubmit={handleRegister}>
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
      <button>Register</button>
    </form>
  );
}
