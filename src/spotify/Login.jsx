import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const AUTH_URL = "https:/accounts.spotify.com/authorize?client_id=7311656353e9483bbc471f86c5c721f6&response_type=code&redirect_uri=https://spotifycolorring-kchen283s-projects.vercel.app/api/callback&scope=user-top-read%20user-read-recently-played";

const Login = () => {
  return (
    <div className="login-container">
      <a className="login-button" href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default Login;