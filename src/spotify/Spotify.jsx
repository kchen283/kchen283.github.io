import React, { useState, useEffect } from 'react';
import { Col, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './spotify.scss';
import Navbar from '../components/navbar/Navbar';

const Spotify = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    if (code) {
      // Fetch the access token using the authorization code
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://localhost:5173/#/Spotify%20API'
        })
      })
      .then(response => response.json())
      .then(data => {
        setAccessToken(data.access_token);

        // Remove the code from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      })
      .catch(error => console.error("Error fetching access token:", error));
    } else {
      // Fetch client credentials token (as a fallback if no code is provided)
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
      })
      .then(response => response.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error("Error fetching client credentials token:", error));
    }
  }, [code]);

  const search = async () => {
    console.log("Search for " + searchInput);

    const searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    const artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParam)
      .then(response => response.json())
      .then(data => data.artists.items[0]?.id);

    console.log("Artist ID is " + artistID);

    if (artistID) {
      const returnedAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParam)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAlbums(data.items);
        })
        .catch(error => console.error("Error fetching albums:", error));
    }
  };

  return (
    <div className="Spotify">
      <Navbar />
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
            className="custom-form-control"
          />
          <Button onClick={search} className="custom-button">
            Search
          </Button>
        </InputGroup>
      </div>

      <div className="albums-container">
        <Row className="custom-row">
          {albums.map((album, i) => (
            <Col key={i} className="custom-col">
              <Card className="custom-card">
                <Card.Img src={album.images[0].url} className="custom-card-img" />
                <Card.Body>
                  <Card.Title className="custom-card-title">{album.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Spotify;
