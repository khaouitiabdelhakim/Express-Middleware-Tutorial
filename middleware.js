// middleware.js
function addDefaultVideoID(req, res, next) {
    if (!req.body.videoID) {
        req.body.videoID = 'TaohY-9S1IQ';  // Default YouTube video ID
    }
    next();  // Continue to the next middleware or route handler
}

module.exports = addDefaultVideoID;
