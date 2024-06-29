const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/conferenceDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = db;
