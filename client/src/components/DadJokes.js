import React from 'react';
import axios from 'axios';
import RequireAuth from './auth/RequireAuth';

class DadJokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
  }
  componentDidMount() {
    // Checking for token handled by RequireAuth HOC.
    axios
      .get('http://localhost:3300/api/jokes')
      .then(res => this.setState({ jokes: res.data }))
      .catch(err => {
        this.props.setError(
          err.response
            ? err.response.data.message
            : 'There was an error while retrieving dad jokes.'
        );
        this.props.history.push('/signin');
      });
  }
  render() {
    return (
      <ul>
        {this.state.jokes.map((item, index) => (
          <li key={item.id}>
            {index + 1}. {item.joke}
          </li>
        ))}
      </ul>
    );
  }
}

export default RequireAuth(DadJokes);
