import React from 'react';
import axios from 'axios';

axios.interceptors.request.use(
  options => {
    options.headers.authorization = localStorage.getItem('jwt');
    return options;
  },
  error => Promise.reject(error)
);

export default Component =>
  class Auth extends React.Component {
    componentDidMount() {
      const token = localStorage.getItem('jwt');
      if (!token) this.props.history.push('/signin');
    }
    render() {
      return <Component {...this.props} />;
    }
  };
