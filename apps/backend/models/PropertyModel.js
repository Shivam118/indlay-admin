// models/Property.js

const mongoose = require("mongoose");
const Amenity = require("./AmenitiesModel");

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  price: {
    type: String,
    required: true,
    min: 0,
  },
  propertyType: {
    type: String,
    enum: ["apartment", "house", "villa", "condo", "studio"],
    required: true,
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  size: {
    type: String, // square feet or square meters
    required: true,
    min: 0,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  yearBuilt: {
    type: Number,
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
      required: true, // ensuring at least one amenity is attached
    },
  ],
  generalInfo: {
    listingType: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      default: "available",
    },
    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  mainImage: {
    url: { type: String, required: true },
    description: { type: String },
  },
  images: [
    {
      url: { type: String, required: true },
      description: { type: String },
    },
  ],
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isReadyToPublish: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
