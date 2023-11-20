# API

This project is a simple API that uses gRPC and MongoDB.

## Description

This API receives GPS data (latitude and longitude) through a REST endpoint, then sends this data to a gRPC server. The gRPC server saves the GPS data to a MongoDB database.

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Navigate to the project directory.
3. Install the dependencies.
4. Start the MongoDB service. This step may vary depending on your operating system.
5. Run the server in watch mode (npm run start:server).
6. In a new terminal, run the client in watch mode (npm run start:client).

## Usage

Send a POST request to `http://localhost:3000/gps` with a JSON body containing `latitude` and `longitude` fields. For example:

{ "latitude": 40.712776, "longitude": -74.005974 }

The API will respond with a message indicating that the GPS data has been saved.

## License

This project is licensed under the ISC License.



