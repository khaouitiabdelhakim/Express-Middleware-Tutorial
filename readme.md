# Express Middleware for Default Video ID in Audio Stream API

This project demonstrates how to use **Express** middleware to add a default video ID for audio streaming when a video ID is not provided in the request. It uses the `express` and `you-stream-js` libraries to implement an audio streaming API endpoint that returns the best audio stream URL for a given video ID.

## Project Setup

1. **Dependencies:** Make sure you have Node.js installed on your machine.

2. **Install Required Libraries:**
   ```bash
   npm install express you-stream-js
   ```

3. **File Structure:**

   ```
   ├── app.js               # Main Express server file
   ├── middleware.js        # Custom middleware to add default video ID
   ├── README.md            # Project documentation
   ```

## How It Works

### Overview

The main API endpoint (`/api/audio-stream`) takes a `POST` request with a `videoID` in the request body and returns the URL of the best audio stream. A custom middleware function checks if `videoID` is provided in the request body. If `videoID` is missing, it adds a default value.

### API Workflow

1. **JSON Parsing:** `express.json()` is used to parse JSON bodies from incoming requests.
2. **Middleware Execution:** The `addDefaultVideoID` middleware checks if `videoID` is included in the request. If absent, it automatically sets a default value (`TaohY-9S1IQ`).
3. **Audio Stream Fetching:** The `/api/audio-stream` endpoint uses the `getBestAudio` function from `you-stream-js` to fetch the best available audio stream URL for the provided video ID.
4. **Response:** If successful, the server responds with the audio stream URL. Otherwise, it sends an error message.

## Files

### `app.js`

The main server file, `app.js`, defines and starts the Express server. It includes the following features:

- **Middleware:** Sets up custom middleware (`addDefaultVideoID`) to ensure each request has a video ID.
- **Endpoint:** Defines the `/api/audio-stream` endpoint that accepts a video ID and fetches the best audio stream URL using `you-stream-js`.

Example code for `app.js`:

```javascript
// Import necessary modules
const express = require('express');
const { getBestAudio } = require('you-stream-js');
const addDefaultVideoID = require('./middleware');  // Import the middleware

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Custom middleware to add default video ID if not provided
app.use(addDefaultVideoID);

// POST endpoint to get best audio stream URL by video ID
app.post('/api/audio-stream', async (req, res) => {
    const { videoID } = req.body;  // Extract video ID from request body (after middleware)

    try {
        const bestAudio = await getBestAudio(videoID);  // Fetch best audio stream URL
        if (bestAudio && bestAudio.url) {
            res.json({ url: bestAudio.url });  // Return the URL as JSON
        } else {
            res.status(404).json({ error: 'Best audio stream not found' });
        }
    } catch (error) {
        console.error('Error fetching best audio:', error);
        res.status(500).json({ error: 'An error occurred while fetching the best audio stream' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### `middleware.js`

The custom middleware file, `middleware.js`, defines the `addDefaultVideoID` function, which checks if the `videoID` property is present in the request body. If not, it assigns a default ID and passes the request to the next middleware or route handler.

Example code for `middleware.js`:

```javascript
function addDefaultVideoID(req, res, next) {
    if (!req.body.videoID) {
        req.body.videoID = 'TaohY-9S1IQ';  // Default YouTube video ID
    }
    next();  // Continue to the next middleware or route handler
}

module.exports = addDefaultVideoID;
```

## Usage

1. **Start the Server:**
   ```bash
   node app.js
   ```

2. **Make a Request:**

   - **Endpoint:** `http://localhost:3000/api/audio-stream`
   - **Method:** `POST`
   - **Body:** `{ "videoID": "your_video_id" }`

   If `videoID` is not provided, the server will use the default ID specified in the middleware.

3. **Example Response:**

   ```json
   {
       "url": "https://example.com/best-audio-stream"
   }
   ```

   - If `videoID` is invalid or an error occurs, the server will return an error message.

## Conclusion

This project demonstrates how to use custom middleware in Express to ensure requests have a required property. Middleware is a powerful way to add functionality, enforce defaults, and improve the API’s robustness.