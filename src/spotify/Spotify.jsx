import React, { useState, useEffect } from 'react';
import { Col, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './spotify.scss';
import Navbar from '../components/navbar/Navbar';


// Function to fetch audio features
const fetchAudioFeatures = async (trackIds, token) => {
  const endpoint = `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`;
  const searchParam = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(endpoint, searchParam);
    if (response.ok) {
      const data = await response.json();
      return data.audio_features;
    } else {
      console.error("Error fetching audio features:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching audio features:", error);
    return [];
  }
};

// Function to adjust color based on audio features
const adjustColorBasedOnAudioFeatures = (features) => {
  const {
    acousticness = 0,
    danceability = 0,
    duration_ms = 0,
    energy = 0,
    instrumentalness = 0,
    liveness = 0,
    loudness = 0,
    speechiness = 0,
    tempo = 0
  } = features;

  const hue = Math.max(0, Math.min(360, (acousticness * 240) + (tempo * 0.6) + (speechiness * 60))); // Adjust hue based on features
  const saturation = Math.min(100, danceability * 100);
  const lightness = 50 + (instrumentalness * 20) - (loudness * 10); // Adjust lightness based on features

  // Convert HSL to HEX for color
  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
    else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
    else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
    else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
    else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
    else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

    const rgbToHex = (r, g, b) => {
      return `#${Math.round((r + m) * 255).toString(16).padStart(2, '0')}${Math.round((g + m) * 255).toString(16).padStart(2, '0')}${Math.round((b + m) * 255).toString(16).padStart(2, '0')}`;
    };

    return rgbToHex(r, g, b);
  };

  return hslToHex(hue, saturation * 100, lightness * 100);
};


const Spotify = () => {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
  const [trackAudioFeatures, setTrackAudioFeatures] = useState([]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.replace('#', '').replace('?', '&'));
    const token = urlParams.get('access_token');
    if (token) {
      setAccessToken(token);
      fetchTopItems(token);
      fetchRecentlyPlayedTracks(token);
    } else {
      console.error("No access token found in URL");
      redirectToLogin();
    }
  }, []);

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
      const tracksWithGenres = await Promise.all(recentlyPlayedData.items.map(async (item) => {
        const artistGenres = await fetchArtistGenres(item.track.artists[0].id, token);
        return { ...item, artistGenres };
      }));
      setRecentlyPlayedTracks(tracksWithGenres);
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

  const getColorForGenres = (genres) => {
    for (let genre of genres) {
      const normalizedGenre = genre.replace(/ /g, '_').toLowerCase();
      if (genreColorsMap[normalizedGenre]) {
        return genreColorsMap[normalizedGenre];
      }
    }
    return genreColorsMap.default;
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

  const generateColorFromGenre = (genre) => {
    let hash = 0;
    for (let i = 0; i < genre.length; i++) {
      hash = genre.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360; // Ensure hue is within [0, 360)
    const saturation = 50; // Fixed saturation
    const lightness = 50; // Fixed lightness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const blendColors = (colors) => {
    let totalR = 500, totalG = 500, totalB = 500;

    colors.forEach(color => {
      const { r, g, b } = hexToRgb(color);
      totalR += r;
      totalG += g;
      totalB += b;
    });

    const avgR = Math.round(totalR / colors.length);
    const avgG = Math.round(totalG / colors.length);
    const avgB = Math.round(totalB / colors.length);

    return rgbToHex(avgR, avgG, avgB);
  };

  const getGenreColor = (genres) => {
    if (genres.length === 0) {
      return '#D3D3D3'; // Default color if no genres are found
    }

    const genreColorList = genres.map(genre => generateColorFromGenre(genre));
    if (genres.length === 1) {
      return genreColorList[0];
    }

    return blendColors(genreColorList);
  };

  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  };

  const generateAverageColor = () => {
    const colors = recentlyPlayedTracks.map(track => getGenreColor(track.artistGenres));
    if (colors.length > 0) {
      console.log(colors);
      return blendColors(colors);
    }
    return '#FFFFFF'; // Default color if no tracks are available
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
          className="genre-circle"
          style={{ backgroundColor: generateAverageColor() }}
        />
      </div>

      <div className="top-items-container">
            <h2>Top Artists</h2>
            <Row className="custom-row">
              {topArtists.map((artist, i) => (
                <Col key={i} xs={6} md={4} lg={2} className="custom-col">
                  <Card 
                    className="custom-card"
                    style={{ backgroundColor: getGenreColor(artist.genres) }} // Change background color based on artist genres
                  >
                    <Card.Img src={artist.images[0]?.url} className="custom-card-img" alt={artist.name} />
                    <Card.Body>
                      <Card.Title className="custom-card-title">{artist.name}</Card.Title>
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
            <li
              key={i}
              className="recently-played-item"
              style={{ backgroundColor: adjustColorBasedOnAudioFeatures(audioFeatures) }}>
              <strong>{track.track.name}</strong> - {track.track.artists.map(artist => artist.name).join(', ')}
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
};

export default Spotify;
