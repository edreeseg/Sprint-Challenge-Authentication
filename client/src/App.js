import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Register, DadJokes, NavBar } from './components';
import './App.css';

function App(props) {
  const [error, setError] = useState(null);
  return (
    <div className="App">
      {error ? (
        <span className="error" onClick={ev => setError(null)}>
          {error}
        </span>
      ) : null}
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route
        path="/signin"
        render={props => <Login {...props} setError={setError} />}
      />
      <Route
        path="/signup"
        render={props => <Register {...props} setError={setError} />}
      />
      <Route
        path="/jokes"
        render={props => <DadJokes {...props} setError={setError} />}
      />
    </div>
  );
}

export default App;
