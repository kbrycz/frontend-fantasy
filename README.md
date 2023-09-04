# Fantasy Football Player Management Frontend

## Overview

This is a React app designed to help a fantasy football blog manage player values for trade calculations and rankings. The app features a clean interface that allows the blog team to create, read, update, and delete player data, and it sorts and filters players based on specific fields.

## Features

- CRUD Functionality: Easily add, update, delete, and read player data.
- Sorting: Sort players based on fields like 'firstName', 'lastName', 'team', 'position', and 'value'.
- Filtering: Find players quickly using the filter options.
- Validation: Ensures all fields are filled before submitting the form.
- Error Alerts: Notifies users of failed requests.

## Technologies Used

- React.js
- Axios for API requests
- CSS for styling
- API

# Api
The app interacts with a RESTful API for player data. The API has the following endpoints:

- GET /players: Fetch all players
- POST /players: Add a new player
- PUT /players/:id: Update a player
- DELETE /players/:id: Remove a player