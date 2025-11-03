import React, { useState } from "react";

export default function DonationPayForm({ donationId, payDonation, onSuccess, onError }) {
  const [form, setForm] = useState({
    amount: "",
    name: "",
    card: "",
    expire: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await payDonation(donationId, { amount: form.amount, name: form.name });
      setMessage({ text: "Donation successful!", type: "success" });
      setForm({ amount: "", name: "", card: "", expire: "", cvv: "" });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Payment failed:", err);
      const errMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Something went wrong while processing payment.";
      setMessage({ text: errMsg, type: "danger" });
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="donation-pay-form" onSubmit={handleSubmit}>
      <label className="label-normal">Amount</label>
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        className="input amount-input"
        required
      />

      <label className="label-normal">Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="input name-input"
        required
      />

      <div className="card-row">
        <div className="card-col card-number-col">
          <label className="label-normal">Card number</label>
          <input
            type="text"
            name="card"
            value={form.card}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="card-col small-col">
          <label className="label-normal">Expire Date</label>
          <input
            type="text"
            name="expire"
            value={form.expire}
            onChange={handleChange}
            className="input"
            placeholder="MM/YY"
          />
        </div>

        <div className="card-col small-col">
          <label className="label-normal">CVV</label>
          <input
            type="text"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            className="input"
            placeholder="CVV"
          />
        </div>
      </div>

      <button type="submit" className="pay-btn" disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </button>

      {message.text && (
        <p
          className={`message ${message.type === "success" ? "success" : "danger"}`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
