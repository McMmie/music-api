Music Lyrics and Data API
This is a simple API built with Node.js, Express, and MongoDB to manage music lyrics and data. It includes user authentication to ensure only logged-in users can post new content.

#Table of Contents
#Features
#Installation
#Usage
#API Endpoints
#User Registration
#User Login
#Get All Songs
#Get Lyrics
#Post Content
#Technologies Used

#Features
User registration and login with password hashing and JWT-based authentication
Middleware to protect routes and ensure only authenticated users can post content
RESTful API design
#Installation
Clone the repository:

git clone https://github.com/yourusername/music-lyrics-api.git
cd music-lyrics-api
Install dependencies:

npm install
Set up MongoDB:

Ensure MongoDB is installed and running on your machine.
Create a database named your_db_name (replace with your desired database name).
Environment variables:

Create a .env file in the root of the project.
Add the following environment variables:
makefile

SECRET_KEY=your_secret_key
MONGODB_URI=mongodb://localhost:3000
Run the server:

npm start
Server will be running on:

http://localhost:3000
#Usage
API Endpoints
User Registration
URL: /user/register
Method: POST
Request Body:

{
  "username": "testuser",
  "password": "password123"
}
Response:

{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "testuser"
  }
}
User Login
URL: /user/login
Method: POST
Request Body:

{
  "username": "testuser",
  "password": "password123"
}
Response:

{
  "message": "Logged in successfully",
  "token": "jwt_token"
}
Get All Songs
URL: /songs
Method: GET
Response:

{
  "song1": {"song": "Song One", "artist": "Artist One", "album": "this album", "lyrics": "Lyrics of song one..."},
  "song2": {"song": "Song Two", "artist": "Artist Two", "album": "second album", "lyrics": "Lyrics of song two..."}
}
Get Lyrics
URL: /song/:id
Method: GET
Response:

{
  "title": "Song One",
  "artist": "Artist One",
  "lyrics": "Lyrics of song one..."
}
Post Content
URL: /post
Method: POST
Headers:
{
  "Authorization": "Bearer jwt_token"
}
Request Body:

{
  "song1": {"song": "Song One", "artist": "Artist One", "album": "this album", "lyrics": "Lyrics of song one..."}
}
Response:

{
  "message": "Post successful",
}

#Technologies Used
Node.js
Express
MongoDB (Mongoose)
bcryptjs
jsonwebtoken
express-session
