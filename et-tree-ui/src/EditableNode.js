// EditableNode.js
import React, { useState } from "react";
import "./EditableNode.css";

function EditableNode({ node, setNode, isRoot = false }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddChild = () => {
    const newNode = {
      id: Date.now().toString(),
      title: "New Node",
      icon: "FaFolder",
      textAlias: "",
      children: [],
      metadata: {},
    };
    setNode({
      ...node,
      children: [...(node.children || []), newNode],
    });
  };

  const handleDelete = () => {
    // This function will be passed down and called from parent
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNode({ ...node, [name]: value });
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChildChange = (childIndex, updatedChild) => {
    const updatedChildren = [...node.children];
    updatedChildren[childIndex] = updatedChild;
    setNode({ ...node, children: updatedChildren });
  };

  const handleDeleteChild = (childIndex) => {
    const updatedChildren = [...node.children];
    updatedChildren.splice(childIndex, 1);
    setNode({ ...node, children: updatedChildren });
  };

  return (
    <div className="editable-node">
      {!isRoot && (
        <div className="node-header">
          <input
            type="text"
            name="title"
            value={node.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="icon"
            value={node.icon}
            onChange={handleChange}
            placeholder="Icon"
          />
          <input
            type="text"
            name="textAlias"
            value={node.textAlias}
            onChange={handleChange}
            placeholder="Text Alias"
          />
          <button onClick={handleToggleExpand}>{isExpanded ? "-" : "+"}</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {isExpanded && (
        <div className="node-children">
          <button onClick={handleAddChild}>Add Child</button>
          {node.children &&
            node.children.map((child, index) => (
              <EditableNode
                key={child.id}
                node={child}
                setNode={(updatedChild) =>
                  handleChildChange(index, updatedChild)
                }
                handleDelete={() => handleDeleteChild(index)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default EditableNode;
