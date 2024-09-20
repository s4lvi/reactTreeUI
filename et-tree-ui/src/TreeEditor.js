// TreeEditor.js
import React from "react";
import EditableTree from "./EditableTree";
import "./TreeEditor.css";

function TreeEditor({ treeData, setTreeData }) {
  const handleDownloadJson = () => {
    const dataStr = JSON.stringify(treeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "treeData.json";
    link.href = url;
    link.click();
  };

  return (
    <div className="tree-editor">
      <h2>Tree Editor</h2>
      <EditableTree node={treeData} setNode={setTreeData} />
      <button className="download-button" onClick={handleDownloadJson}>
        Download JSON
      </button>
    </div>
  );
}

export default TreeEditor;
