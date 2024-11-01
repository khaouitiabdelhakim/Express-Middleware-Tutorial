const axios = require('axios');

async function getAudioStream() {
    try {
        const response = await axios.post('http://localhost:3000/api/audio-stream', {
            videoID: 'JmwNkdoAQJs'
        });
        console.log('Best Audio URL:', response.data.bestAudioUrl);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

getAudioStream();
