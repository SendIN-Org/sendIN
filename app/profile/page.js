"use client";
import React, { useState } from 'react';

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nationalId: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const renderField = (label, name) => {
    return (
      <div className="flex-1">
        <h3 className="text-xl font-medium mb-2">{label}</h3>
        {isEditing ? (
          <input
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className="w-full px-4 py-3 text-lg font-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <p className="text-lg">{formData[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-center my-20">
      <div className="w-full max-w-5xl rounded-3xl border bg-white p-10 shadow-lg">
        <div className="flex">
          {/* Left side - Avatar */}
          <div className="w-1/3 flex flex-col items-center justify-center pr-10">
            <div className="w-56 h-56 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <span className="text-5xl text-gray-500">Avatar</span>
            </div>
          </div>

          {/* Right side - Form fields */}
          <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
            <div className="flex space-x-6">
              {renderField('First Name', 'firstName')}
              {renderField('Last Name', 'lastName')}
            </div>
            <div className="flex space-x-6">
              {renderField('Phone Number', 'phoneNumber')}
              {renderField('National ID Number', 'nationalId')}
            </div>
            {renderField('Email ID', 'email')}
            <div>
              <h3 className="text-xl font-medium mb-2">Address</h3>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-lg font-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                  rows="3"
                ></textarea>
              ) : (
                <p className="text-lg">{formData.address}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Bank Account</h3>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-md transition duration-200"
              >
                Manage Accounts
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 rounded-xl transition duration-200 mt-6"
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}