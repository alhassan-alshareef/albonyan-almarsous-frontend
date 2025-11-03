import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDonationDetails, payDonation } from "../../lib/api";
import "../../components/DonationCard/donation-card.css";
import "../../styles/donation-pay.css";

export default function DonationPay() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ amount: "", name: "", card: "", expire: "", cvv: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await getDonationDetails(id);
        setDonation(res.data);
      } catch {
        setMessage({ text: "Failed to load donation.", type: "danger" });
      }
    })();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await payDonation(id, { amount: form.amount, name: form.name });
      setMessage({ text: "Donation successful! Redirecting...", type: "success" });
      setForm({ amount: "", name: "", card: "", expire: "", cvv: "" });
      setTimeout(() => navigate("/donations"), 1200);
    } catch (err) {
      const errMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Something went wrong while processing payment.";
      setMessage({ text: errMsg, type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  if (!donation) return <p className="text-center mt-5">Loading...</p>;

  const { patient, title, progress_percentage = 0, target_amount } = donation;

  return (
    <div className="donation-pay-page">
      <div className="donation-pay-card">
        <h5 className="donation-pay-title">
          {title} for <strong>{patient?.username}</strong>
        </h5>

        <div className="progress-row">
          <span className="progress-side">0</span>
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress_percentage}%` }}>
                <span className="progress-label">{progress_percentage}%</span>
              </div>
            </div>
          </div>
          <span className="progress-side">{target_amount}</span>
        </div>

        <form className="donation-pay-form" onSubmit={handleSubmit}>
          {[
            { label: "Amount", name: "amount", type: "number", strong: true },
            { label: "Name", name: "name", type: "text" },
          ].map(({ label, name, type, strong }) => (
            <div key={name}>
              <label className={strong ? "label-strong" : "label-normal"}>{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className={`input ${name}-input`}
                required
              />
            </div>
          ))}

          <div className="card-row">
            {[
              { label: "Card number", name: "card", flex: "card-number-col" },
              { label: "Expire Date", name: "expire", placeholder: "MM/YY", flex: "small-col" },
              { label: "CVV", name: "cvv", placeholder: "CVV", flex: "small-col" },
            ].map(({ label, name, placeholder, flex }) => (
              <div className={`card-col ${flex}`} key={name}>
                <label className="label-normal">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="input"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          <button type="submit" className="pay-btn" disabled={loading}>
            {loading ? "Processing..." : "Pay"}
          </button>

          {message.text && (
            <p className={`message ${message.type === "success" ? "success" : "danger"}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
