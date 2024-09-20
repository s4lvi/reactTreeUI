# Event Tagging New UI Design Document

## Table of Contents

1. [Overview of the Application and Basic Workflow](#overview-of-the-application-and-basic-workflow)
2. [JSON Schema](#json-schema)
3. [Development Timeline](#development-timeline)
4. [User Guide](#user-guide)

---

## 1. Overview of the Application and Basic Workflow

The Event Tagging Application is designed to streamline the process of logging events during vehicle test drives. Testers can efficiently tag events without memorizing or sifting through extensive documentation. The application features an intuitive, icon-based user interface that allows users to navigate through a hierarchical tree of event categories.

**Basic Workflow:**

- **Navigation:**

  - Users start at the root of the event hierarchy.
  - Each event category is represented by a square button with an icon and title.
  - Clicking on a category button reveals its subcategories.
  - At any point, users can use the breadcrumb trail to navigate back to previous levels.

- **Event Tagging:**

  - At every node (category) in the hierarchy, there's a prominent "Log [Current Category] Event" button.
  - Clicking this button opens a form where users can enter supplemental information if required.
  - Users submit the form to log the event, which is then added to their list of tagged events.

- **Event Management:**
  - Tagged events are displayed in a list below the navigation area.
  - Users can edit or delete previously tagged events directly from this list.

---

## 2. JSON Schema

The application's event hierarchy and tagging options are defined using a JSON file that will be stored and fetched from a github repo. The schema for this file is as follows:

**Schema Structure:**

```json
{
  "codes": [
    {
      "code": number,
      "group": "string",
      "class": "string",
      "subClass": "string",
      "attribute": "string",
      "freeTextMandatory": boolean,
      "freeTextDescription": "string",
      "shortDefinition": "string",
      "examplesComments": "string",
      "textAlias": "string"
    }
  ]
}
```

**Example:**

```json
{
  "codes": [
    {
      "code": 1,
      "group": "Ticket",
      "class": "RequestTicketId",
      "subClass": null,
      "attribute": null,
      "freeTextMandatory": true,
      "freeTextDescription": "Which Request Ticket ID is addressed with the log?",
      "shortDefinition": "Request ticket id",
      "examplesComments": "Never been used, not critical",
      "textAlias": "ticket"
    }
  ]
}
```

**Field Descriptions:**

- **code**: A unique numerical identifier for the event tag.
- **group**: The top-level category of the event.
- **class**: A subcategory under the group.
- **subClass**: A further subcategory under class (can be null).
- **attribute**: Additional attribute to define the event (can be null).
- **freeTextMandatory**: Indicates if supplemental information is required.
- **freeTextDescription**: Instructions or prompts for the supplemental information.
- **shortDefinition**: A brief description of the event tag.
- **examplesComments**: Additional comments or examples.
- **textAlias**: A unique string identifier used by the backend.

---

## 3. Development Timeline

**Week 1**

- Design Document and Demo:
  - Finalize the design document.
  - Develop a basic demo showcasing the hierarchical navigation and event tagging UI.

**Week 2-3**

- Integration with Foxglove Event Tagging Panel:
  - Incorporate the application into the existing Foxglove panel.
- In-Vehicle Testing

**Week 4**

- Schema Editor/UI Proof of Concept:
  - Create a tool for editing and managing the JSON schema.
- User Guide Creation:
  - Develop a concise user guide for end-users.

**Week 5-6**

- ADFS/Auth Integration:
  - Implement authentication mechanisms.
- Deployment:
  - Deploy the application to the production environment.

---

## 4. User Guide

### Introduction

The Event Tagging Application simplifies the process of logging events during vehicle test drives. It provides an intuitive interface that allows testers to quickly navigate through event categories and tag relevant events efficiently.

### Getting Started

s
