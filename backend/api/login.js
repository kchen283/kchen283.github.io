export default function handler(req, res) {
    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirect_uri = 'https://spotifycolorring-kchen283-kchen283s-projects.vercel.app/api/callback'; // Your redirect URI
  
    // Validate environment variables
    if (!client_id) {
      return res.status(500).json({ error: 'Spotify client ID is not configured.' });
    }
  
    // Function to generate a random string
    function generateRandomString(length) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
  
    // Construct the Spotify authorization URL
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    const spotifyAuthURL = `https://accounts.spotify.com/authorize?` +
      new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }).toString();
  
    // Redirect to Spotify
    res.writeHead(307, { Location: spotifyAuthURL });
    res.end();
  }
  