const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGODO_URI || 'mongodb://127.0.0.1:27017/socialmedia');

// Export connection
module.exports = mongoose.connection;
