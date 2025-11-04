import { useEffect, useState } from "react";
import SupporterHeader from "../../components/Header/SupporterHeader";
import TabSwitcher from "../../components/shared/TabSwitcher";
import { getAllDonations } from "../../lib/api";
import SupporterDonationCard from "../../components/DonationCard/SupporterDonationCard";

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await getAllDonations();
        setDonations(res.data);
      } catch (err) {
        console.error("Error loading donations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  return (
    <div className="supporter-page">
      <SupporterHeader />
      <TabSwitcher />

      <div className="d-flex flex-column align-items-center mt-5">
        <h2 className="text-muted">All Active Donations</h2>
        <p className="text-secondary mt-2"/>
      </div>

      <div className="d-flex flex-column align-items-center mt-4">
        {loading ? (
          <p className="text-muted">Loading donations...</p>
        ) : donations.length === 0 ? (
          <p className="text-muted">No active campaigns found.</p>
        ) : (
          donations.map((donation) => (
            <SupporterDonationCard key={donation.id} donation={donation} />
          ))
        )}
      </div>
    </div>
  );
}
