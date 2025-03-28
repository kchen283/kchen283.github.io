import React, { useState, useEffect } from 'react';
import { Col, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './spotify.scss';
import Navbar from '../components/navbar/Navbar';


const Spotify = () => {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [trackAudioFeatures, setTrackAudioFeatures] = useState([]);
  const[audioToken, setAudioToken] = useState("");
 

  useEffect(() => {
    // Fetch the audio token if it's not already set
    const urlParams = new URLSearchParams(window.location.hash.replace('#', '').replace('?', '&'));
    const token = urlParams.get('access_token');

    if (token) {
      setAccessToken(token);
      fetchTopItems(token); // Fetch your top items with the main token
      fetchRecentlyPlayedTracks(token); 
    } else {
      console.error("No access token found in URL");
      redirectToLogin(); // Redirect to login if no token
    }
  }, [audioToken]); // The effect will run when audioToken changes



  const redirectToLogin = () => {
    window.location.href = '/#/Spotify%20login'; // Adjust this to your login route
  };

  const checkTokenValidity = async (response) => {
    if (response.status === 401) {
      console.error("Token has expired. Redirecting to login.");
      redirectToLogin();
      return false;
    }
    return true;
  };

  const fetchTopItems = async (token) => {
    const searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', searchParam);
      if (!await checkTokenValidity(topArtistsResponse)) return;

      const topArtistsData = await topArtistsResponse.json();
      setTopArtists(topArtistsData.items);

      const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', searchParam);
      if (!await checkTokenValidity(topTracksResponse)) return;

      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData.items);

    } catch (error) {
      console.error("Error fetching top items:", error);
    }
  };
/* deprecated
  function getColorFromAudioFeatures(audioFeatures) {
    const { danceability, energy, acousticness, instrumentalness, loudness, tempo, valence } = audioFeatures;
  
    // Start with a base color (light grey)
    let r = 200, g = 200, b = 200;
  
    // Adjust color based on audio features
    r += energy * 255;  // More energy, more red
    g += acousticness * 255;  // More acoustic, more green
    b += danceability * 255;  // More danceability, more blue
  
    // Adjust color based on instrumentalness (more green for instrumental)
    g += instrumentalness * 255;
  
    // Adjust based on loudness (more loud, more dark)
    r -= loudness * 50;  // Reduce red for louder tracks
    g -= loudness * 50;  // Reduce green for louder tracks
    b -= loudness * 50;  // Reduce blue for louder tracks
  
    // Adjust based on tempo (faster tempo, more red)
    r += tempo / 100 * 255;  // Scale tempo to adjust red
  
    // Adjust based on valence (more positive mood, more yellowish)
    g += valence * 255;  // Increase green for more positive mood
  
    // Ensure color values are within the valid range (0-255)
    r = Math.min(Math.max(r, 0), 255);
    g = Math.min(Math.max(g, 0), 255);
    b = Math.min(Math.max(b, 0), 255);
  
    // Convert to RGB color format
    return `rgb(${r}, ${g}, ${b})`;
  }
  */

  const fetchRecentlyPlayedTracks = async (token) => {
    const searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };


    try {
      const recentlyPlayedResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', searchParam);
      if (!await checkTokenValidity(recentlyPlayedResponse)) return;

      const recentlyPlayedData = await recentlyPlayedResponse.json();
      const tracksWithGenresAndColors = await Promise.all(recentlyPlayedData.items.map(async (item) => {
        const trackId = item.track.id;  // Track ID is here
        const artistGenres = await fetchArtistGenres(item.track.artists[0].id, token);
        
        // Return track with genre and color information
        return { ...item, trackId, artistGenres };
      }));

    setRecentlyPlayedTracks(tracksWithGenresAndColors);
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);
    }
  };

  const fetchArtistGenres = async (artistId, token) => {
    const searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, searchParam);
      const artistData = await artistResponse.json();
      return artistData.genres;
    } catch (error) {
      console.error("Error fetching artist genres:", error);
      return [];
    }
  };



  const search = async () => {
    if (!accessToken) {
      console.error("No access token found.");
      return;
    }

    console.log("Search for " + searchInput);

    const searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    try {
      const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParam);
      if (!await checkTokenValidity(artistResponse)) return;

      const artistData = await artistResponse.json();
      const artistID = artistData.artists.items[0]?.id;

      console.log("Artist ID is " + artistID);

      if (artistID) {
        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParam);
        if (!await checkTokenValidity(albumsResponse)) return;

        const albumsData = await albumsResponse.json();
        console.log(albumsData);
        setAlbums(albumsData.items);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const hashToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += ("00" + ((hash >> (i * 8)) & 0xff).toString(16)).slice(-2);
    }
    return color;
  };

  const blendColors = (colors) => {
    if (colors.length === 0) return '#FFFFFF';

    let r = 0, g = 0, b = 0;
    colors.forEach(color => {
      let hex = color.replace('#', '');
      r += parseInt(hex.substring(0, 2), 16);
      g += parseInt(hex.substring(2, 4), 16);
      b += parseInt(hex.substring(4, 6), 16);
    });

    r = Math.floor(r / colors.length);
    g = Math.floor(g / colors.length);
    b = Math.floor(b / colors.length);

    return `rgb(${r}, ${g}, ${b})`;
  };

   // Compute the average color from track names and artist names
   const generateAverageColor = () => {
    const trackColors = recentlyPlayedTracks.map(track => hashToColor(track.track.name));
    const artistColors = topArtists.map(artist => hashToColor(artist.name));
    const allColors = [...trackColors, ...artistColors];

    return blendColors(allColors);
  };

  return (
    <div className="Spotify">
      <Navbar />

      {/* Uncomment this block if you want to include the search functionality */}
      {/* 
      <div className="search-container">
        <InputGroup size="lg" className="custom-input-group">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyDown={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </div>
      */}

      <div className="circle-container">
        <div
          className="genre-circle" style={{ backgroundColor: generateAverageColor() }}
        />
      </div>

      <div className="top-items-container">
            <h2>Top Artists</h2>
            <Row className="custom-row">
              {topArtists.map((artist, i) => (
                <Col key={i} xs={6} md={4} lg={2} className="custom-col">
                  <Card 
                    className="custom-card"
                    style={{ backgroundColor: hashToColor(artist.name) }}
                  >
                    <Card.Img src={artist.images[0]?.url} className="custom-card-img" alt={artist.name} />
                    <Card.Body>
                        <Card.Title className="custom-card-title" style={{ color: "black" }}>{artist.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
      </div>

      <div className="recent-tracks-container"> 
      <h2>Recently Played Tracks</h2>
      <ul className="recently-played-list">
        {recentlyPlayedTracks.map((track, i) => {
          const audioFeatures = trackAudioFeatures.find(feature => feature.id === track.track.id) || {};
          return (
            <p
              key={i}
              className="recently-played-item">
              <strong>{track.track.name}</strong> - {track.track.artists.map(artist => artist.name).join(', ')}
            </p>
          );
        })}
      </ul>
      </div>
    </div>
  );
};

export default Spotify;
