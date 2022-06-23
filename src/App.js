import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';


function App() {
  const [startShipSearch, setStartShipSearch] = useState('');
  const [startShipFound, setStartShipFound] = useState([]);

  const [starShipList, setStarShipList] = useState([])

  const [starShipListSearch, setStarShipListSearch] = useState('')
  const [filteredStartShip, setFilteredStartShip] = useState(starShipList)

  

  const handleChange = (e) => {
    e.preventDefault();
    setStartShipSearch(e.target.value);
  }

  const handleAdd = (e) => {
    setStarShipList([...starShipList, e]);
    setStartShipSearch('')
  }

  const handleDelete = (e) => {
    setStarShipList(starShipList.filter(i => i !== e))
  }

  const handleListChange = (e) => {
    e.preventDefault();
    setStarShipListSearch(e.target.value);
  }

  const submission = () => {
    fetch('https://reqbin.com/echo/post/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredStartShip),
    })
    .then(response => response.json())
    .then((result) => console.log(result))
    .catch((err) =>console.log('error :'+err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submission()
  }

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/?search=${startShipSearch}`)
    .then(response => response.json())
    .then(res => setStartShipFound(res.results))
  }, [startShipSearch])

  useEffect(() => {
    const newFilteredStarShips = starShipList.filter((ship) => {
      return ship.includes(starShipListSearch)
    })
    setFilteredStartShip(newFilteredStarShips)
  }, [starShipListSearch, starShipList])
  

  return (
    <div className="App">
      <input 
        onChange={handleChange}
        value={startShipSearch}
      /> 
      <div >
        {startShipSearch.length > 0? 
        startShipFound.map((i) => {
          return(
            <div> 
              <p>{i.name} </p>
              
              <button onClick={() => {handleAdd(i.name)}}>Add</button>
              
            </div>)
        })
        :'loading...'}
      </div>
      <div>
      <form method="post" onSubmit = {handleSubmit}>
        <input
          onChange={handleListChange}
          value={starShipListSearch}
          />
          {filteredStartShip.length > 0? 
            filteredStartShip.map((i) => {
            return ( <div>
              <p>{i}</p>
              <button onClick={() => {handleDelete(i)}}>Delete</button>
            </div>)
          }):
          'loading...'}
        

          <button type="submit" >Submit</button>
        </form>

      </div>
      
    </div>
  );
}

export default App;
