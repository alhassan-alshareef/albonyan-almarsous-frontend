import  { useState } from "react";

export default function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file); 
    }
  };

  return (
    <div className="mt-3">
      <label className="add-form-label">Image (optional)</label>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={handleChange}
      />

      {preview && (
        <div className="text-center mt-3">
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "10px",
              marginTop: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      )}
    </div>
  );
}
