// EventForm.js
import React, { useState } from "react";
import "./EventForm.css";

function EventForm({ node, onSubmit, onCancel, onNavigate }) {
  const [supplementalInfo, setSupplementalInfo] = useState("");
  const isFreeTextMandatory = node.metadata?.freeTextMandatory;
  const hasChildren = node.children && node.children.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFreeTextMandatory && !supplementalInfo.trim()) {
      alert("Supplemental information is required for this event.");
      return;
    }
    onSubmit(supplementalInfo);
    setSupplementalInfo("");
  };

  return (
    <div className="event-form">
      <h3>{node.title}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={
            node.metadata?.freeTextDescription ||
            "Enter supplemental information..."
          }
          value={supplementalInfo}
          onChange={(e) => setSupplementalInfo(e.target.value)}
        />
        <div className="buttons">
          <button type="submit" className="submit">
            Tag Event
          </button>
          <button type="button" className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
