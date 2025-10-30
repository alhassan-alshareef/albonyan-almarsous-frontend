import React from "react";
import PatientHeader from "../../components/patient/PatientHeader";

export default function AddPost() {
  return (
    <div className="patient-page">
      <PatientHeader showSearch={false} showHi={false} />
      <div className="text-center mt-4">
        <h5>Add Post</h5>
      </div>
    </div>
  );
}