import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';


function App() {
  const [startShipSearch, setStartShipSearch] = useState('')
  const [startShipFound, setStartShipFound] = useState([])

  const [starShipList, setStarShipList] = useState([])

  const [starShipListSearch, setStarShipListSearch] = useState('')
  const [starShipListFound, setStarShipListFound] = useState([])
  

  const handleChange = (e) => {
    e.preventDefault();
    setStartShipSearch(e.target.value);
  }

  const handleAdd = (e) => {
    setStarShipList([...starShipList, e]);
    setStartShipSearch('')
  }

  const handleDelete = (e) => {
    setStarShipList(starShipList.filter(i => i !==e))
  }

  const handleListChange = (e) => {
    e.preventDefault();
    setStarShipListSearch(e.target.value);
  }

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/?search=${startShipSearch}`)
    .then(response => response.json())
    .then(res => setStartShipFound(res.results))
  }, [startShipSearch])

  useEffect(() => {
    setStarShipListFound(starShipList)
  }, [starShipListSearch])
  console.log(starShipListFound)


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
      <input
        onChange={handleListChange}
        value={starShipListSearch}
        />
        {starShipList.length > 0? 
          starShipList.map((i) => {
           return ( <div>
            <p>{i}</p>
            <button onClick={() => {handleDelete(i)}}>Delete</button>
           </div>)
        }):
        'loading...'}
        <button>Submit</button>

      </div>
      
    </div>
  );
}

export default App;
