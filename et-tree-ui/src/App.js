// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import treeDataJson from "./treeData";
import Breadcrumb from "./Breadcrumb";
import ButtonTree from "./ButtonTree";
import EventForm from "./EventForm";
import EventList from "./EventList";
import TreeEditor from "./TreeEditor";
import "./App.css";

function App() {
  const [treeData, setTreeData] = useState(treeDataJson);
  const [path, setPath] = useState([treeData]);
  const [taggedEvents, setTaggedEvents] = useState([]);
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [currentNodeToTag, setCurrentNodeToTag] = useState(null);

  const currentNode = path[path.length - 1];

  const handleButtonClick = (node) => {
    setPath([...path, node]);
  };

  const handleTagCurrentNode = (node) => {
    setCurrentNodeToTag(node);
    setIsEventFormVisible(true);
  };

  const handleBreadcrumbClick = (index) => {
    setPath(path.slice(0, index + 1));
    setIsEventFormVisible(false);
    setCurrentNodeToTag(null);
  };

  const handleEventSubmit = (supplementalInfo) => {
    const newEvent = {
      id: Date.now(),
      path: path.map((node) => node.title).join(" / "),
      node: currentNodeToTag,
      supplementalInfo,
    };
    setTaggedEvents([newEvent, ...taggedEvents]);
    // Reset to root
    setPath([treeData]);
    setIsEventFormVisible(false);
    setCurrentNodeToTag(null);
  };

  const handleEventCancel = () => {
    setIsEventFormVisible(false);
    setCurrentNodeToTag(null);
  };

  const handleEventEdit = (eventId, updatedInfo) => {
    setTaggedEvents(
      taggedEvents.map((event) =>
        event.id === eventId
          ? { ...event, supplementalInfo: updatedInfo }
          : event
      )
    );
  };

  const handleEventDelete = (eventId) => {
    setTaggedEvents(taggedEvents.filter((event) => event.id !== eventId));
  };

  return (
    <Router>
      <div className="app">
        <nav className="navigation">
          <Link to="/">Event Tagging</Link>
          <Link to="/editor">Tree Editor</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Breadcrumb path={path} onCrumbClick={handleBreadcrumbClick} />
                {isEventFormVisible ? (
                  <EventForm
                    node={currentNodeToTag}
                    onSubmit={handleEventSubmit}
                    onCancel={handleEventCancel}
                  />
                ) : (
                  <ButtonTree
                    currentNode={currentNode}
                    nodes={currentNode.children}
                    onNodeClick={handleButtonClick}
                    onTagCurrentNode={handleTagCurrentNode}
                  />
                )}
                <EventList
                  events={taggedEvents}
                  onEdit={handleEventEdit}
                  onDelete={handleEventDelete}
                />
              </>
            }
          />
          <Route
            path="/editor"
            element={
              <TreeEditor treeData={treeData} setTreeData={setTreeData} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
