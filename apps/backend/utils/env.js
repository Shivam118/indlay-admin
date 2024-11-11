require("dotenv").config();

// Export ENV variables here
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 8000;


module.exports = {
  SECRET_KEY,
  MONGO_DB_URI,
  PORT,
};
