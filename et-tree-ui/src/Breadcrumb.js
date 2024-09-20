// Breadcrumb.js
import React from "react";
import "./Breadcrumb.css";

function Breadcrumb({ path, onCrumbClick }) {
  return (
    <div className="breadcrumb">
      {path.map((node, index) => (
        <span key={node.id}>
          <span onClick={() => onCrumbClick(index)}>{node.title}</span>
          {index < path.length - 1 && <span className="separator">/</span>}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;
