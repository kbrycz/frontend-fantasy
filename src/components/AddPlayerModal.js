import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../server';
import './AddPlayerModal.css';


const AddPlayerModal = ({ closeModal }) => {
  const [newPlayer, setNewPlayer] = useState({
    firstName: '',
    lastName: '',
    team: '',
    position: '',
    value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({
      ...newPlayer,
      [name]: value
    });
  };

  const handleSave = async () => {
    // Validate all fields
    if (Object.values(newPlayer).some((value) => value === '')) {
      alert('All fields are required.');
      return;
    }
    try {
      const response = await axios.post(server + '/players', newPlayer);
      console.log('New player added:', response.data);
      closeModal(true); // Close modal and indicate that a new player has been added
    } catch (error) {
      console.error('Could not add new player:', error);
      alert('Invalid request. Please try again.');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        {['firstName', 'lastName', 'team', 'position', 'value'].map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              type="text"
              name={field}
              value={newPlayer[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div>
          <button className="btn save" onClick={handleSave}>Save Player</button>
          <button className="btn cancel" onClick={() => closeModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerModal;
