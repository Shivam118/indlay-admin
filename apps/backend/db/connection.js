const mongoose = require("mongoose");
const { MONGO_DB_URI } = require("../utils/env");

// MongoDB connection
mongoose
  .connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

module.exports = mongoose;
