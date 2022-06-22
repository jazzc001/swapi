import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';


function App() {
  const [startShipSearch, setStartShipSearch] = useState('')
  const [startShipFound, setStartShipFound] = useState([])

  const [startShipList, setStartShipList] = useState([])
  

  const handleChange = (e) => {
    e.preventDefault();
    setStartShipSearch(e.target.value);
  }

  const handleAdd = (e) => {
    setStartShipList([...startShipList, e]);
    setStartShipSearch('')
  }

  const handleDelete = (e) => {
    setStartShipList(startShipList.filter(i => i !==e))
  }

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/?search=${startShipSearch}`)
    .then(response => response.json())
    .then(res => setStartShipFound(res.results))
  }, [startShipSearch])

  


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
        {startShipList.length > 0? 
          startShipList.map((i) => {
           return ( <div>
            <p>{i}</p>
            <button onClick={() => {handleDelete(i)}}>Delete</button>
           </div>)
        }):
        'loading...'}

      </div>
      
    </div>
  );
}

export default App;
