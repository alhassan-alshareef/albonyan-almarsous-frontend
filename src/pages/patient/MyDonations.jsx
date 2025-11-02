import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import PatientHeader from "../../components/patient/PatientHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";
import DonationCard from "../../components/DonationCard/DonationCard";
import AddCard from "../../components/shared/AddCard";
import { getPatientDonations, deleteDonation } from "../../lib/api";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  async function fetchDonations() {
    try {
      const response = await getPatientDonations();
      setDonations(response.data);
    } catch (error) {
      console.log("Error loading donations:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteDonation(donationToDelete.id);
      setDonations((prev) =>
        prev.filter((donation) => donation.id !== donationToDelete.id)
      );
      setDonationToDelete(null);
    } catch (error) {
      console.log("Error deleting donation:", error);
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="patient-page">
      <PatientHeader />
      <TabSwitcher />

      <div className="d-flex flex-column align-items-center mt-4">
        {loading ? (
          <p className="text-muted mt-5">Loading donations...</p>
        ) : donations.length ? (
          donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onDelete={() => setDonationToDelete(donation)}
            />
          ))
        ) : (
          <p className="text-muted mt-5">No donations found.</p>
        )}

        <AddCard label="Add Case" onClick={() => navigate("/patient/add-donation")} />
      </div>

      {donationToDelete && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete this donation?</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setDonationToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
