// ButtonTree.js
import React from "react";
import { IconContext } from "react-icons";
import * as Icons from "react-icons/fa";
import "./ButtonTree.css";

function ButtonTree({ currentNode, nodes, onNodeClick, onTagCurrentNode }) {
  return (
    <div className="button-tree">
      {/* Button to tag current node */}
      {currentNode && currentNode.id !== "root" && (
        <button
          className="tag-button"
          onClick={() => onTagCurrentNode(currentNode)}
        >
          <IconContext.Provider value={{ className: "icon" }}>
            <Icons.FaTag />
          </IconContext.Provider>
          <span>Log {currentNode.title} Event</span>
        </button>
      )}
      {/* Render child nodes */}
      {nodes &&
        nodes.map((node) => {
          const Icon = Icons[node.icon] || Icons.FaQuestionCircle;
          return (
            <button key={node.id} onClick={() => onNodeClick(node)}>
              <IconContext.Provider value={{ className: "icon" }}>
                <Icon />
              </IconContext.Provider>
              <span>{node.title}</span>
            </button>
          );
        })}
    </div>
  );
}

export default ButtonTree;
