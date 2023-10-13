import './App.css';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function App() {

  const [characters, setCharacters] = useState([]);
  const [charactersLoaded, setCharactersLoaded] = useState(false);

  const [progress, setProgress] = useState(0);
  const [randomIDs, setRandomIDs] = useState([]);
  const [randomIDsLoaded, setRandomIDsLoaded] = useState(false);

  const [randomCharacter, setRandomCharacter] = useState(Math.floor(Math.random() * 4) + 1);

  useEffect(() => {
    const createRandomIDs = () => {
      const updateRandomIDs = [...randomIDs];
      const randomID = Math.floor(Math.random() * 826) + 1;
      if (!randomIDs.includes(randomID)){
        updateRandomIDs.push(randomID);
        setRandomIDs(updateRandomIDs);
      }
      }
    if (randomIDs.length < 5) {createRandomIDs();} else {setRandomIDsLoaded(true)};
  }, [randomIDs]);
  

  useEffect(() => {
    const fetchData = async () => {
      const URL = "https://rickandmortyapi.com/api/character/" + randomIDs.join(',');
      const response = await fetch(URL);
      const data = await response.json();
      setCharacters(data);
      setCharactersLoaded(true);
      console.log(data);
    };
  
    if (!charactersLoaded && randomIDsLoaded) {fetchData()};
  }, [charactersLoaded, randomIDs, randomIDsLoaded]);
      
  const handleClick = (index) => {
    if (0 <= progress) {
      if (index === randomCharacter){
        setRandomIDs([]);
        setRandomCharacter(Math.floor(Math.random() * 4) + 1)
        setRandomIDsLoaded(false);
        setCharactersLoaded(false);
        setProgress(progress+10)
      }
      else {
        alert("Try again!")
      }
    }
  }

  const handleAgain = () => {
    setProgress(0);    
  }

  return (
    <div>
      <h2 style={{textAlign:"center", marginTop:"3vmin"}}>Guess 10 characters and win something!</h2>
      <div className="center-content">
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%`}}></div>
        </div>
      </div>
      <table className="table" style={{textAlign:"center", marginTop:"3vmin"}}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Species</th>
            <th>Type</th>
            <th>Gender</th>
          </tr>
        </thead>
        {charactersLoaded && progress < 100 && 
        <tbody>
          <tr>
            <td>{characters[randomCharacter].status}</td>
            <td>{characters[randomCharacter].species}</td>
            <td>{characters[randomCharacter].type}</td>
            <td>{characters[randomCharacter].gender}</td>
          </tr>
        </tbody>}
      </table>
      <div className="characters">
        {charactersLoaded && progress < 100 && characters.map((character, index) => (
          <Card style={{ margin: "3vmin" }} key={character.id}>
            <Card.Img style={{ cursor: "pointer" }} src={character.image} onClick={() => handleClick(index)} alt={character.name} />
          </Card>
        ))}
      </div>
      <div className="center-content">
        {progress === 100 && <div><Button onClick={handleAgain}>Again!</Button></div>}
      </div>
         
    
    </div>
  );
}

export default App;
