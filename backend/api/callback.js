import fetch from 'node-fetch'; // Ensure you have node-fetch installed
import { URLSearchParams } from 'url';

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'https://spotifycolorring-kchen283s-projects.vercel.app/api/callback';

export default async function handler(req, res) {
    const { code } = req.query;

    // Check if the code is present
    if (!code) {
        return res.status(400).json({ error: 'No authorization code provided.' });
    }

    // Exchange authorization code for access token
    const authOptions = {
        method: 'POST',
        headers: {
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
        })
    };

    
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const body = await response.json();

    if (response.ok) {
      const access_token = body.access_token;
      //res.status(200).json({ message: 'Hello World', code: code, access_token });
      // Redirect to your frontend with access token or other necessary information
      // Redirect to Spotify
      res.redirect(`https://keri-chen.com/#/Spotify%20API?access_token=${access_token}`);
    } else {
      res.status(response.status).json({ error: 'Failed to fetch access token' });
    }
  } catch (error) {
    console.error('Error in /callback endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  