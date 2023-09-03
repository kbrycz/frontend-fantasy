// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await axios.get("http://localhost:3001/players"); // Replace with your actual API URL
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchPlayers();
  }, []);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  const filteredPlayers = players.filter(player =>
    player.firstName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Fantasy Football App</h1>
      <input
        type="text"
        placeholder="Filter by first name"
        value={filter}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player._id}>
              <td>{player.firstName}</td>
              <td>{player.lastName}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
