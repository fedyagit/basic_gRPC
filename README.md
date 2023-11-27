# Project Name

This API receives GPS data (latitude and longitude) through a REST endpoint, then sends this data to a gRPC server. The gRPC server saves the GPS data to a MongoDB database.

## Setup

### Prerequisites

- Node.js
- Docker
- MongoDB

### Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies with `npm install`.
4. Start the Dockerized database with `npm run start-db`.
5. Generate the necessary gRPC files with `npm run protoc`.
6. Run the server in watch mode with `npm run start:server`.
7. In a new terminal, run the client in watch mode with `npm run start:client`.

## Usage

Send a POST request to `http://localhost:3000/gps` with a JSON body containing `latitude` and `longitude` fields. For example:

```json
{ "latitude": 40.712776, "longitude": -74.005974 }