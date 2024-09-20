// EventList.js
import React, { useState } from "react";
import "./EventList.css";

function EventList({ events, onEdit, onDelete }) {
  const [editingEventId, setEditingEventId] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState("");

  const handleEditClick = (event) => {
    setEditingEventId(event.id);
    setUpdatedInfo(event.supplementalInfo);
  };

  const handleUpdateSubmit = (eventId) => {
    onEdit(eventId, updatedInfo);
    setEditingEventId(null);
    setUpdatedInfo("");
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setUpdatedInfo("");
  };

  return (
    <div className="event-list">
      <h2>Tagged Events</h2>
      {events.length === 0 ? (
        <p>No events tagged yet.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <div className="event-path">{event.path}</div>
              {editingEventId === event.id ? (
                <div className="edit-form">
                  <textarea
                    value={updatedInfo}
                    onChange={(e) => setUpdatedInfo(e.target.value)}
                  />
                  <div className="buttons">
                    <button onClick={() => handleUpdateSubmit(event.id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="event-info">
                  <p>{event.supplementalInfo}</p>
                  <div className="event-actions">
                    <button onClick={() => handleEditClick(event)}>Edit</button>
                    <button onClick={() => onDelete(event.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
