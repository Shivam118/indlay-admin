// utils/validation.js

// Validate Register Input
function validateRegisterInput(data) {
  const errors = {};

  // First Name Validation
  if (!data.firstName || typeof data.firstName !== "string") {
    errors.firstName = "First name is required and must be a string.";
  } else if (data.firstName.length < 2 || data.firstName.length > 30) {
    errors.firstName = "First name must be between 2 and 30 characters.";
  }

  // Last Name Validation
  if (!data.lastName || typeof data.lastName !== "string") {
    errors.lastName = "Last name is required and must be a string.";
  } else if (data.lastName.length < 2 || data.lastName.length > 30) {
    errors.lastName = "Last name must be between 2 and 30 characters.";
  }

  // Phone Number Validation
  if (!data.phoneNumber) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^[0-9]{10}$/.test(data.phoneNumber)) {
    errors.phoneNumber = "Phone number must be a valid 10-digit number.";
  }

  // Email Validation
  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  // Password Validation
  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8 || data.password.length > 30) {
    errors.password = "Password must be between 8 and 30 characters.";
  }

  // Role Validation
  if (!data.role) {
    errors.role = "Role is required.";
  } else if (data.role !== "user" && data.role !== "admin") {
    errors.role = "Role must be either 'user' or 'admin'.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Validate Login Input
function validateLoginInput(data) {
  const errors = {};

  // Email Validation
  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format.";
  }

  // Password Validation
  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8 || data.password.length > 30) {
    errors.password = "Password must be between 8 and 30 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Validation for Amenity data
const validateAmenity = (data) => {
  const errors = {};

  // Validate name
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.name = "Name is required and must be a non-empty string.";
  }

  // Validate description
  if (
    !data.description ||
    typeof data.description !== "string" ||
    data.description.trim() === ""
  ) {
    errors.description =
      "Description is required and must be a non-empty string.";
  }

  // Optional icon field validation
  if (data.icon && typeof data.icon !== "string") {
    errors.icon = "Icon, if provided, must be a string (URL).";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

// Validation for Property data
const validateProperty = (data) => {
  const errors = {};

  // Validate title
  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim() === ""
  ) {
    errors.title = "Title is required and must be a non-empty string.";
  }

  // Validate description
  if (
    !data.description ||
    typeof data.description !== "string" ||
    data.description.trim() === ""
  ) {
    errors.description =
      "Description is required and must be a non-empty string.";
  }

  // Validate price
  if (typeof data.price !== "number" || data.price <= 0) {
    errors.price = "Price is required and must be a positive number.";
  }

  // Validate propertyType
  const validTypes = ["apartment", "house", "villa", "condo", "studio"];
  if (!data.propertyType || !validTypes.includes(data.propertyType)) {
    errors.propertyType = `Property type is required and must be one of: ${validTypes.join(
      ", "
    )}.`;
  }

  // Validate location
  if (!data.location || typeof data.location !== "object") {
    errors.location = "Location is required and must be an object.";
  } else {
    if (!data.location.address || typeof data.location.address !== "string") {
      errors.location = "Address is required and must be a string.";
    }
    if (!data.location.city || typeof data.location.city !== "string") {
      errors.city = "City is required and must be a string.";
    }
    if (!data.location.state || typeof data.location.state !== "string") {
      errors.state = "State is required and must be a string.";
    }
    if (!data.location.country || typeof data.location.country !== "string") {
      errors.country = "Country is required and must be a string.";
    }
    if (
      !data.location.postalCode ||
      typeof data.location.postalCode !== "string"
    ) {
      errors.postalCode = "Postal code is required and must be a string.";
    }
    if (
      !data.location.coordinates ||
      typeof data.location.coordinates !== "object" ||
      typeof data.location.coordinates.lat !== "number" ||
      typeof data.location.coordinates.lng !== "number"
    ) {
      errors.coordinates =
        "Coordinates are required and must include valid latitude and longitude numbers.";
    }
  }

  // Validate size
  if (typeof data.size !== "number" || data.size <= 0) {
    errors.size = "Size is required and must be a positive number.";
  }

  // Validate bedrooms
  if (typeof data.bedrooms !== "number" || data.bedrooms < 0) {
    errors.bedrooms = "Bedrooms is required and must be a non-negative number.";
  }

  // Validate bathrooms
  if (typeof data.bathrooms !== "number" || data.bathrooms < 0) {
    errors.bathrooms =
      "Bathrooms is required and must be a non-negative number.";
  }

  // Validate amenities
  if (!Array.isArray(data.amenities)) {
    errors.amenities = "Amenities must be an array of amenity IDs.";
  }

  // Validate generalInfo
  if (!data.generalInfo || typeof data.generalInfo !== "object") {
    errors.generalInfo =
      "General information is required and must be an object.";
  } else {
    const listingTypes = ["sale", "rent"];
    const statuses = ["available", "sold", "rented"];

    if (
      !data.generalInfo.listingType ||
      !listingTypes.includes(data.generalInfo.listingType)
    ) {
      errors.listingType = `Listing type must be one of: ${listingTypes.join(
        ", "
      )}.`;
    }

    if (
      !data.generalInfo.status ||
      !statuses.includes(data.generalInfo.status)
    ) {
      errors.status = `Status must be one of: ${statuses.join(", ")}.`;
    }

    if (
      !data.generalInfo.contact ||
      typeof data.generalInfo.contact !== "object"
    ) {
      errors.contact = "Contact information is required and must be an object.";
    } else {
      if (
        !data.generalInfo.contact.name ||
        typeof data.generalInfo.contact.name !== "string"
      ) {
        errors.contactName = "Contact name is required and must be a string.";
      }
      if (
        !data.generalInfo.contact.phone ||
        typeof data.generalInfo.contact.phone !== "string"
      ) {
        errors.contactPhone = "Contact phone is required and must be a string.";
      }
      if (
        !data.generalInfo.contact.email ||
        typeof data.generalInfo.contact.email !== "string"
      ) {
        errors.contactEmail = "Contact email is required and must be a string.";
      }
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

module.exports = {
  validateAmenity,
  validateProperty,
  validateRegisterInput,
  validateLoginInput,
};
