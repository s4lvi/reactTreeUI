// EditableTree.js
import React from "react";
import EditableNode from "./EditableNode";
import "./EditableTree.css";

function EditableTree({ node, setNode }) {
  return (
    <div className="editable-tree">
      <EditableNode node={node} setNode={setNode} isRoot={true} />
    </div>
  );
}

export default EditableTree;
