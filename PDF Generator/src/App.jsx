import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("address", address);
    formData.append("photo", photo);

    try {
      const response = await fetch("http://localhost:8000/new/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData); // Logging the response from the server

      // Trigger the function to fetch and display user details after uploading
      handlePreview();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handlePreview = async () => {
    try {
      const response = await fetch("http://localhost:8000/new/view");
      const responseData = await response.json();
      setUserDetails(responseData.details);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Open the PDF in a new tab/window
      window.open("http://localhost:8000/new/download", "_blank");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Upload User Details</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
      </div>
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          placeholder="Photo"
        />
      </div>
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>

      {userDetails && (
        <div className="preview-container">
          <h2>Preview</h2>
          <p>Name: {userDetails.name}</p>
          <p>Age: {userDetails.age}</p>
          <p>Address: {userDetails.address}</p>
          {userDetails.photoURL && (
            <img
              src={userDetails.photoURL}
              alt="User"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          {/* Button to trigger PDF download */}
          <button className="download-button" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
