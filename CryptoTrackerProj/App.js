import React, { useState, useEffect } from 'react';
import axios from 'axios';
import app from './App.css';
import Coin from './Coin';



function App() {
  // Coins: is the reactive data/current state || setCoins: is the setter Function
  const [coins, setCoins] = useState([]);  //Handles reactive data (any data that changes in the app is called state and when the state changes you want react to change the UI)
  const [search, setSearch] = useState('');

  //useEffect lets us implemnt react lifesycles with a single function
  //Takes in a function as its first argumnet and the second argument is an array for dependacies
  useEffect(() => {
    //This returns a resolved promise and the value already has parsed JSON data to an object literal
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {  //After the promise above is resolved
        setCoins(res.data); //Set the setter of the useState to the resloved data from the axios get request
        console.log(res.data);
        //This is used for the error handling from the above axios get request
      }).catch(error => console.log(error));

  }, []);

  const handleChange = e => {
    setSearch(e.target.value);  //This gets the value of whatever the user is typing
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className="coin-text">Search for a Currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coint-input" onChange={handleChange} />
        </form>
      </div>
      {/* Creates a populated array and sets the vars in coin.js equal to the Coin data that the user is looking for */}
      {filteredCoins.map(coin => {
        return <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.market_cap}
          price={coin.current_price}

        />;

      })}
    </div>

  );
}

export default App;
