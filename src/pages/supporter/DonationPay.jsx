import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDonationDetails, payDonation } from "../../lib/api";
import DonationPayForm from "../../components/DonationPayForm/DonationPayForm";
import "../../styles/donation-pay.css";
import "../../components/DonationCard/donation-card.css"; 

export default function DonationPay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    async function fetchDonation() {
      try {
        const res = await getDonationDetails(id);
        setDonation(res.data);
      } catch (err) {
        console.error("Failed to load donation:", err);
      }
    }
    fetchDonation();
  }, [id]);

  if (!donation) return <p className="text-center mt-5">Loading...</p>;

  const { patient, title, progress_percentage, target_amount } = donation;
  const progress = progress_percentage ?? 0;

  return (
    <div className="donation-pay-page">
      <div className="donation-pay-card">

        <div className="donation-card__header" style={{ marginLeft: "10px", marginBottom: "10px" }}>
          <div className="donation-card__avatar">
            <span className="material-symbols-outlined donation-avatar-icon">account_circle</span>
          </div>
          <div className="donation-card__info">
            <div className="donation-card__top-row">
              <p className="donation-card__name">{patient?.username}</p>
            </div>
            <p className="donation-card__illness">{patient?.illness}</p>
          </div>
        </div>

        <h5 className="donation-pay-title">
          {title} for: <strong>{patient?.username}</strong>
        </h5>


        <div className="progress-row">
          <span className="progress-side left-side">0</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              <span className="progress-label">{progress}%</span>
            </div>
          </div>
          <span className="progress-side right-side">{target_amount}</span>
        </div>

        <DonationPayForm
          donationId={id}
          payDonation={payDonation}
          onSuccess={() => setTimeout(() => navigate("/donations"), 1200)}
        />
      </div>
    </div>
  );
}
