// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerTable from "./components/PlayerTable";
import "./App.css";
import { server } from "./server";

function App() {
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchPlayers() {
    try {
      setLoading(true);
      const response = await axios.get(server + "/players");
      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
  Object.keys(filter).every(
    (key) => !filter[key] || String(player[key]).toLowerCase().includes(filter[key].toLowerCase())
    )
  );

  return (
    <div className="App">
      <h1>Fours Up Fantasy Management</h1>
      <PlayerTable players={filteredPlayers} filter={filter} setFilter={setFilter} refreshPlayers={fetchPlayers}/>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
