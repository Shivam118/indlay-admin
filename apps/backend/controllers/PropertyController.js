// controllers/propertyController.js

const Property = require("../models/PropertyModel");
const Amenity = require("../models/AmenitiesModel");
const { validateProperty } = require("../utils/validation");

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { isValid, errors } = validateProperty(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const user = req.user;
    const {
      title,
      description,
      price,
      propertyType,
      location,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      amenities,
      generalInfo,
      mainImage,
      images,
      listedBy,
      isReadyToPublish = user?.role === "admin",
    } = req.body;

    // Check if all provided amenities exist
    const amenityRecords = await Amenity.find({ _id: { $in: amenities } });
    if (amenityRecords.length !== amenities.length) {
      return res
        .status(400)
        .json({ error: "One or more amenities do not exist" });
    }

    const property = new Property({
      title,
      description,
      price,
      propertyType,
      location,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      amenities,
      generalInfo,
      mainImage,
      images,
      listedBy,
      isReadyToPublish,
    });

    await property.save();
    res
      .status(201)
      .json({ message: "Property created successfully", property });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating property", details: error.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const { isValid, errors } = validateProperty(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const properties = await Property.find()
      .populate("amenities")
      .populate("listedBy", "name email");
    res.status(200).json(properties);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching properties", details: error.message });
  }
};

// Get a single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const { isValid, errors } = validateProperty(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const property = await Property.findById(req.params.id)
      .populate("amenities")
      .populate("listedBy", "name email");
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching property", details: error.message });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const { isValid, errors } = validateProperty(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const {
      title,
      description,
      price,
      propertyType,
      location,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      amenities,
      generalInfo,
      images,
      isReadyForPublish,
    } = req.body;

    // Validate amenities if provided
    if (amenities) {
      const amenityRecords = await Amenity.find({ _id: { $in: amenities } });
      if (amenityRecords.length !== amenities.length) {
        return res
          .status(400)
          .json({ error: "One or more amenities do not exist" });
      }
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        propertyType,
        location,
        size,
        bedrooms,
        bathrooms,
        yearBuilt,
        amenities,
        generalInfo,
        images,
        isReadyForPublish,
      },
      { new: true }
    );

    if (!property) return res.status(404).json({ error: "Property not found" });
    res
      .status(200)
      .json({ message: "Property updated successfully", property });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating property", details: error.message });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const { isValid, errors } = validateProperty(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting property", details: error.message });
  }
};
