// controllers/amenityController.js

const Amenity = require("../models/AmenitiesModel");
const { validateAmenity } = require("../utils/validation");

// Create a new amenity
exports.createAmenity = async (req, res) => {
  try {
    const { isValid, errors } = validateAmenity(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const { name, description, icon } = req.body;
    const amenity = new Amenity({ name, description, icon });
    await amenity.save();
    res.status(201).json({ message: "Amenity created successfully", amenity });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating amenity", details: error.message });
  }
};

// Get all amenities
exports.getAllAmenities = async (req, res) => {
  try {
    const { isValid, errors } = validateAmenity(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const amenities = await Amenity.find();
    res.status(200).json(amenities);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching amenities", details: error.message });
  }
};

// Get a single amenity by ID
exports.getAmenityById = async (req, res) => {
  try {
    const { isValid, errors } = validateAmenity(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) return res.status(404).json({ error: "Amenity not found" });
    res.status(200).json(amenity);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching amenity", details: error.message });
  }
};

// Update an amenity
exports.updateAmenity = async (req, res) => {
  try {
    const { isValid, errors } = validateAmenity(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const { name, description, icon } = req.body;
    const amenity = await Amenity.findByIdAndUpdate(
      req.params.id,
      { name, description, icon },
      { new: true }
    );
    if (!amenity) return res.status(404).json({ error: "Amenity not found" });
    res.status(200).json({ message: "Amenity updated successfully", amenity });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating amenity", details: error.message });
  }
};

// Delete an amenity
exports.deleteAmenity = async (req, res) => {
  try {
    const { isValid, errors } = validateAmenity(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) return res.status(404).json({ error: "Amenity not found" });
    res.status(200).json({ message: "Amenity deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting amenity", details: error.message });
  }
};
