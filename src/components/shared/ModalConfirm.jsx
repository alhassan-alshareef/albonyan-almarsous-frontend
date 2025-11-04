export default function ModalConfirm({ message, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p style={{ textAlign: "left",}}>{message}</p>
        <div  style={{display: "flex",justifyContent: "flex-end", gap: "8px",marginTop: "10px",}} className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
