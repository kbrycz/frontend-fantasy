import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerTable.css';
import { server } from '../server';
import AddPlayerModal from './AddPlayerModal';

const PlayerTable = ({ players: initialPlayers, filter, setFilter, editAll, refreshPlayers }) => {
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({});
  const [players, setPlayers] = useState(initialPlayers);
  const [sortConfig, setSortConfig] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleAddPlayer = () => {
    setShowModal(true);
  };

  const closeModal = (newPlayerAdded) => {
    setShowModal(false);
    if (newPlayerAdded) {
      refreshPlayers();
    }
  };

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers]);

  const handleEdit = (id, data) => {
    setEditingId(id);
    setTempData(data);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempData({});
  };

  const handleSave = async (id) => {
    try {
      await axios.put(server + `/players/${id}`, tempData);
      setPlayers(players.map((player) => (player._id === id ? { ...player, ...tempData } : player)));
      setEditingId(null);
      setTempData({});
    } catch (error) {
      console.error('Could not update player:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await axios.delete(server + `/players/${id}`);
        setPlayers(players.filter((player) => player._id !== id));
      } catch (error) {
        console.error('Could not delete player:', error);
      }
    }
  };

  const handleSort = (fieldName) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.field === fieldName && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ field: fieldName, direction });
    setPlayers(
      [...players].sort((a, b) => {
        if (a[fieldName] < b[fieldName]) return direction === 'ascending' ? -1 : 1;
        if (a[fieldName] > b[fieldName]) return direction === 'ascending' ? 1 : -1;
        return 0;
      })
    );
  };

  return (
    <div className="table-wrapper">
      {showModal && <AddPlayerModal closeModal={closeModal} />}
      <table>
        <thead>
          <tr>
            {['firstName', 'lastName', 'team', 'position', 'value'].map((field) => (
              <th key={field}>
                <div>
                  {field}
                  <span onClick={() => handleSort(field)}>
                    {sortConfig?.field === field ? (sortConfig.direction === 'ascending' ? '↓' : '↑') : '↕'}
                  </span>
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
          <tr>
            {['firstName', 'lastName', 'team', 'position', 'value'].map((field) => (
              <th key={field}>
                <input
                  type="text"
                  placeholder={`Filter by ${field}`}
                  value={filter[field] || ''}
                  onChange={(e) => setFilter({ ...filter, [field]: e.target.value })}
                />
              </th>
            ))}
            <th>
                <td>
                    <button className="btn2 save" onClick={handleAddPlayer}>Add Player</button>
                </td>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player._id}>
              {['firstName', 'lastName', 'team', 'position', 'value'].map((field) => (
                <td key={field}>
                  {editAll || editingId === player._id ? (
                    <input
                      type="text"
                      value={tempData[field] || ''}
                      onChange={(e) => setTempData({ ...tempData, [field]: e.target.value })}
                    />
                  ) : (
                    player[field]
                  )}
                </td>
              ))}
              <td>
                {editingId === player._id ? (
                  <>
                    <button className="btn save" onClick={() => handleSave(player._id)}>Save</button>
                    <button className="btn cancel" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn edit" onClick={() => handleEdit(player._id, player)}>Edit</button>
                    <button className="btn delete" onClick={() => handleDelete(player._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
