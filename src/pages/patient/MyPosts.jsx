import React from "react";
import PatientHeader from "../../components/patient/PatientHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";

export default function MyPosts() {
  return (
    <div className="patient-page">
      <PatientHeader />
      <TabSwitcher />
    </div>
  );
}
