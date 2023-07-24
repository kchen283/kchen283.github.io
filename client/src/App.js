import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CLIENT_ID = "5ff1d06892a8474ca53ee46f014aff9d";
const CLIENT_SECRET = "27298f5b56a041d0b22e363dd45384f7";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(()=> {
    //API Access Token 
    var authParam = {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token',authParam)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  // Search
  async function search() {
    console.log("Search for "+ searchInput);

    //GET request to get artist ID
    var searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=artist',searchParam)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

    console.log("Artist ID is " + artistID);
    // get request using artist ID to grab albums 
    var returnedalbums = await fetch('https://api.spotify.com/v1/artists/'+artistID+'/albums'+'?include_groups=album&market=US&limit=50', searchParam)
      .then(response => response.json())
      .then (data => {
        console.log(data);
        setAlbums(data.items)
      })
    //display
  }
  console.log(albums);

  return (
    <div className="App">
     <Container className="p-3">
      <InputGroup size="lg" >
        <FormControl
          placeholder="Search for Artist"
          type="input"
          onKeyDown={event=> {
            if (event.key=="Enter") {
              search();
            }
          }}
          onChange= {event => setSearchInput(event.target.value)}
        />
        < Button onClick={search}>
          Search
        </Button>
      </InputGroup>
     </Container>

     <Container >  
      <Row className="row row-cols-4 gap-4" >
        {albums.map( (album,i) => {
          return (
            <Card className="gap-2" size="sm">
            <Card.Img src ={album.images[0].url} />
            <Card.Title>{album.name}</Card.Title>
          </Card>
          )
        })}
      </Row>
     </Container>
    </div>
  );
}

export default App;
