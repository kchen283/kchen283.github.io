import React, { useState, useEffect } from 'react';
import { Col, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './spotify.scss';
import Navbar from '../components/navbar/Navbar';

const Spotify = () => {
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Extract access token from URL hash
    const urlParams = new URLSearchParams(window.location.hash.replace('#', '').replace('?', '&'));
    const token = urlParams.get('access_token');
    if (token) {
      setAccessToken(token);
    } else {
      console.error("No access token found in URL");
    }
  }, []);

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
      const artistData = await artistResponse.json();
      const artistID = artistData.artists.items[0]?.id;

      console.log("Artist ID is " + artistID);

      if (artistID) {
        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParam);
        const albumsData = await albumsResponse.json();
        console.log(albumsData);
        setAlbums(albumsData.items);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
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
                <Card.Img src={album.images[0]?.url} className="custom-card-img" alt={album.name} />
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
