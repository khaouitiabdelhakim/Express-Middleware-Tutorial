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
