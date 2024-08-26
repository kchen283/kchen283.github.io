import React, { useState, useEffect } from 'react';
import {Col, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import './spotify.scss';
import Navbar from '../components/navbar/Navbar';

const Spotify = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;

  useEffect(() => {
    // API Access Token
    var authParameters = {
      url: `https://accounts.spotify.com/api/token`,
      method: 'POST',
      headers: {
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    };
    console.log(CLIENT_ID);
    
    fetch('https://accounts.spotify.com/api/token',authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

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
      <Navbar/>
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
