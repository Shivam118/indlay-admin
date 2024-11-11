"use client";
import { useState } from "react";

const labelStyle = "col-span-1 pr-5";
const inputStyle =
  "col-span-2 min-w-[200px] md:min-w-[660px] p-2 border border-gray-300 rounded-md";
const labelInputStyle = "col-span-3";

const InputField = ({
  label,
  name,
  type = "text",
  error,
  handleChange,
  formData,
}) => {
  return (
    <div className={labelInputStyle}>
      <label htmlFor={name} className={labelStyle}>
        {label}:
      </label>
      <div className="">
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleChange}
          className={inputStyle}
        />
        {error[name] && <span>{error[name]}</span>}
      </div>
    </div>
  );
};

const SelectField = ({
  label,
  name,
  type = "text",
  error,
  handleChange,
  formData,
  options,
}) => {
  return (
    <div className={labelInputStyle}>
      <label htmlFor={name} className={labelStyle}>
        {label}:
      </label>
      <div className="">
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={inputStyle}
        >
          {options.map((val, index) => (
            <option value={val} key={index} className="capitalize">
              {val}
            </option>
          ))}
        </select>
        {error[name] && <span>{error[name]}</span>}
      </div>
    </div>
  );
};

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "apartment",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      coordinates: { lat: "", lng: "" },
    },
    size: "",
    bedrooms: "",
    bathrooms: "",
    yearBuilt: "",
    amenities: [],
    generalInfo: {
      listingType: "sale",
      status: "available",
      contact: { name: "", phone: "", email: "" },
    },
    images: [{ url: "", description: "" }],
    isReadyForPublish: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name.includes(".")) {
        const [field, subField] = name.split(".");
        return {
          ...prevData,
          [field]: {
            ...prevData[field],
            [subField]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
      } else {
        alert("Property added successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          propertyType: "apartment",
          location: {
            address: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            coordinates: { lat: "", lng: "" },
          },
          size: "",
          bedrooms: "",
          bathrooms: "",
          yearBuilt: "",
          amenities: [],
          generalInfo: {
            listingType: "sale",
            status: "available",
            contact: { name: "", phone: "", email: "" },
          },
          images: [{ url: "", description: "" }],
          isReadyForPublish: false,
        });
      }
    } catch (error) {
      setErrors({ general: "An error occurred while adding the property." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-14 border-[#EDF0EF] border rounded-lg p-10">
      <h1 className="text-4xl">Add Property</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-10">
        <InputField
          label={"Title"}
          name={"title"}
          type="text"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <InputField
          label={"Price"}
          name={"price"}
          type="number"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <InputField
          label={"Description"}
          name={"description"}
          type="text"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <SelectField
          label={"Property Type"}
          name={"propertyType"}
          error={errors}
          handleChange={handleChange}
          formData={formData}
          options={["apartment", "house", "villa", "condo", "studio"]}
        />
        <div className={labelInputStyle}>
          <h3>Location</h3>
          <label className={labelStyle}>Address:</label>
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className={inputStyle}
          />
          {errors.location && <span>{errors.location}</span>}
          <label className={labelStyle}>City:</label>
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className={labelStyle}>State:</label>
          <input
            type="text"
            name="location.state"
            value={formData.location.state}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className={labelStyle}>Country:</label>
          <input
            type="text"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className={labelStyle}>Postal Code:</label>
          <input
            type="text"
            name="location.postalCode"
            value={formData.location.postalCode}
            onChange={handleChange}
            className={inputStyle}
          />
          <h4>Coordinates</h4>
          <label className={labelStyle}>Latitude:</label>
          <input
            type="number"
            name="location.coordinates.lat"
            value={formData.location.coordinates.lat}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className={labelStyle}>Longitude:</label>
          <input
            type="number"
            name="location.coordinates.lng"
            value={formData.location.coordinates.lng}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <InputField
          label={"Size (sqft)"}
          name={"size"}
          type="text"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <InputField
          label={"Bedrooms"}
          name={"bedrooms"}
          type="number"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <InputField
          label={"Bathrooms"}
          name={"bathrooms"}
          type="number"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <InputField
          label={"Year Built"}
          name={"yearBuilt"}
          type="number"
          error={errors}
          handleChange={handleChange}
          formData={formData}
        />
        <div className={labelInputStyle}>
          <label className={labelStyle}>Amenities:</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Enter amenity IDs (comma separated)"
          />
        </div>
        <div className={labelInputStyle}>
          <label className={labelStyle}>Listing Type:</label>
          <select
            name="generalInfo.listingType"
            value={formData.generalInfo.listingType}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className={labelInputStyle}>
          <label className={labelStyle}>Status:</label>
          <select
            name="generalInfo.status"
            value={formData.generalInfo.status}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>
        <div className={labelInputStyle}>
          <h3>Contact Info</h3>
          <label className={labelStyle}>Name:</label>
          <input
            type="text"
            name="generalInfo.contact.name"
            value={formData.generalInfo.contact.name}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className={labelStyle}>Phone:</label>
          <input
            type="text"
            name="generalInfo.contact.phone"
            value={formData.generalInfo.contact.phone}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className={labelStyle}>Email:</label>
          <input
            type="email"
            name="generalInfo.contact.email"
            value={formData.generalInfo.contact.email}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#074A6A] text-white font-medium py-2 rounded-md col-span-6"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
      {errors.general && <div>{errors.general}</div>}
    </div>
  );
}
