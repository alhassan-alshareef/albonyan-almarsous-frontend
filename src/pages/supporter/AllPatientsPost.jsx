import React from "react";
import SupporterHeader from "../../components/Header/SupporterHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";

export default function AllPatientsPosts() {
  return (
    <div className="supporter-page">
      <SupporterHeader />
      <TabSwitcher />

      <div className="d-flex flex-column align-items-center mt-5">
        <h2 className="text-muted">All Patients Posts</h2>
        <p className="text-secondary mt-2">
          Browse all patient updates and stories.
        </p>
      </div>
    </div>
  );
}
