import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=7311656353e9483bbc471f86c5c721f6&response_type=code&redirect_uri=https://keri-chen.com&scope=user-top-read%20user-read-recently-played";

const Login = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    if (code) {
      // Redirect to the Spotify App route with the code in the state
      navigate('/Spotify API', { state: { code } });
    }
  }, [code, navigate]);

  return (
    <div className="login-container">
      <a className="login-button" href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default Login;
