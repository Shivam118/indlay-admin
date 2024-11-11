const mongoose = require("mongoose");

const AmenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensuring amenities are unique
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    // Optionally store an icon or image reference for the amenity
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Amenity", AmenitySchema);
