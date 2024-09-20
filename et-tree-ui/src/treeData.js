// treeData.js
const treeData = {
  id: "root",
  title: "Events",
  icon: "FaClipboardList",
  textAlias: "root",
  children: [],
};

// Function to build the tree
function buildTree(codes) {
  const root = { ...treeData };

  codes.forEach((item) => {
    const { code, group, class: cls, subClass, attribute } = item;

    // Build the textAlias
    const textAliasParts = [group, cls, subClass, attribute].filter(Boolean);
    const textAlias = textAliasParts.join("_").replace(/\s+/g, "");

    // Start building the hierarchy
    let groupNode = root.children.find((node) => node.title === group);
    if (!groupNode) {
      groupNode = {
        id: `group-${group}`,
        title: group,
        icon: "FaFolder",
        textAlias: group.replace(/\s+/g, ""),
        children: [],
      };
      root.children.push(groupNode);
    }

    if (cls) {
      let classNode = groupNode.children.find((node) => node.title === cls);
      if (!classNode) {
        classNode = {
          id: `class-${cls}`,
          title: cls,
          icon: "FaFolderOpen",
          textAlias: `${group}_${cls}`.replace(/\s+/g, ""),
          children: [],
        };
        groupNode.children.push(classNode);
      }

      if (subClass) {
        let subClassNode = classNode.children.find(
          (node) => node.title === subClass
        );
        if (!subClassNode) {
          subClassNode = {
            id: `subClass-${subClass}`,
            title: subClass,
            icon: "FaFolderOpen",
            textAlias: `${group}_${cls}_${subClass}`.replace(/\s+/g, ""),
            children: [],
          };
          classNode.children.push(subClassNode);
        }

        if (attribute) {
          let attributeNode = subClassNode.children.find(
            (node) => node.title === attribute
          );
          if (!attributeNode) {
            attributeNode = {
              id: code.toString(),
              title: attribute,
              icon: "FaFileAlt",
              textAlias,
              children: [],
              metadata: { ...item },
            };
            subClassNode.children.push(attributeNode);
          }
        } else {
          // Leaf node at subClass level
          subClassNode.children.push({
            id: code.toString(),
            title: subClassNode.title,
            icon: "FaFileAlt",
            textAlias,
            children: [],
            metadata: { ...item },
          });
        }
      } else if (attribute) {
        let attributeNode = classNode.children.find(
          (node) => node.title === attribute
        );
        if (!attributeNode) {
          attributeNode = {
            id: code.toString(),
            title: attribute,
            icon: "FaFileAlt",
            textAlias,
            children: [],
            metadata: { ...item },
          };
          classNode.children.push(attributeNode);
        }
      } else {
        // Leaf node at class level
        classNode.children.push({
          id: code.toString(),
          title: classNode.title,
          icon: "FaFileAlt",
          textAlias,
          children: [],
          metadata: { ...item },
        });
      }
    } else {
      // Leaf node at group level
      groupNode.children.push({
        id: code.toString(),
        title: groupNode.title,
        icon: "FaFileAlt",
        textAlias,
        children: [],
        metadata: { ...item },
      });
    }
  });

  return root;
}

// Provided JSON data
const data = {
  codes: [
    {
      code: 1,
      group: "Ticket",
      class: "RequestTicketId",
      subClass: null,
      attribute: null,
      freeTextMandatory: true,
      freeTextDescription: "Which Request Ticket ID is adressed with the log?",
      shortDefinition: "Request ticket id",
      examplesComments: "Never been used, not critical",
    },
    {
      code: 2,
      group: "Ticket",
      class: "DriverTicketId",
      subClass: null,
      attribute: null,
      freeTextMandatory: true,
      freeTextDescription: "Which Driver Ticket ID is adressed with the log?",
      shortDefinition: "Driver ticket id",
      examplesComments: "Never been used, not critical",
    },
    {
      code: 3,
      group: "Issue",
      class: "DataQualityIssue",
      subClass: null,
      attribute: null,
      freeTextMandatory: true,
      freeTextDescription: "What known issue does this log contain?",
      shortDefinition:
        'Tag known data quality issues here, e.g.:\n\n7/2024: CW7 FWC Issue, required tag: "3 FWC"\n\nIntroduced 7/29/2024\n\n7/2024: CW7 FWC fell off and, was fixed provisionally and is/was not calibrated for a certain time. (end date not known yet)',
      examplesComments: null,
    },
    {
      code: 10,
      group: "Location",
      class: "Public road",
      subClass: null,
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Driving on public roads",
      examplesComments: null,
    },
    {
      code: 11,
      group: "Location",
      class: "Parking lot",
      subClass: "Open parking lot",
      attribute: "With markings",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving on a parking lot with clearly visible marking for parking spot instances",
      examplesComments: null,
    },
    {
      code: 12,
      group: "Location",
      class: "Parking lot",
      subClass: "Open parking lot",
      attribute: "Without markings",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving on a parking lot without markings for single parking spot instances",
      examplesComments: null,
    },
    {
      code: 13,
      group: "Location",
      class: "Parking lot",
      subClass: "Parking Garage",
      attribute: "With markings",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving in a parking garage with clearly visible marking for parking spot instances",
      examplesComments: null,
    },
    {
      code: 14,
      group: "Location",
      class: "Parking lot",
      subClass: "Parking Garage",
      attribute: "Without markings",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving in a parking garage without markings for single parking spot instances",
      examplesComments: null,
    },
    {
      code: 15,
      group: "Location",
      class: "Station",
      subClass: "Fuel",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Maneuvering/driving at a fuel station",
      examplesComments: null,
    },
    {
      code: 16,
      group: "Location",
      class: "Station",
      subClass: "Charging",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Maneuvering/driving at an EV charging station",
      examplesComments: null,
    },
    {
      code: 17,
      group: "Location",
      class: "Station",
      subClass: "Toll",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Maneuvering/driving at toll station",
      examplesComments: null,
    },
    {
      code: 18,
      group: "Location",
      class: "Construction side",
      subClass: null,
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving on a construction side (closed area)",
      examplesComments: null,
    },
    {
      code: 19,
      group: "Location",
      class: "Work zone",
      subClass: null,
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving in a work zone on public roads / parking lots",
      examplesComments: null,
    },
    {
      code: 20,
      group: "Location",
      class: "Drive-through",
      subClass: null,
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving in drive throughs (e.g. at fast food restaurants)",
      examplesComments: null,
    },
    {
      code: 21,
      group: "Location",
      class: "Private driveway/ private ground",
      subClass: null,
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving on private driveways or private grounds",
      examplesComments: null,
    },
    {
      code: 22,
      group: "Location",
      class: "Gradient change",
      subClass: null,
      attribute: null,
      freeTextMandatory: true,
      freeTextDescription: '"+": Ascent\n"-": Descent',
      shortDefinition:
        "Maneuvering on or passing close to (<20m distance) gradient changes like ramps (at load docks, parking docks",
      examplesComments: null,
    },
    {
      code: 23,
      group: "Location",
      class: "Recreational Park",
      subClass: null,
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Maneuvering/driving in recreational parcs",
      examplesComments: "In production since 03/25/24",
    },
    {
      code: 24,
      group: "Location",
      class: "Ground Surface",
      subClass: "Cobble Stones",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving on cobble stones (like it can be encountered in histroic city centers)",
      examplesComments: "In production since 03/25/24",
    },
    {
      code: 25,
      group: "Location",
      class: "Ground Surface",
      subClass: "Dirt",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Maneuvering/driving on dirt, gravel, sand, grass and other ground surfaces, no matter whether it's a public road or any other ground",
      examplesComments: "In production since 03/25/24",
    },
    {
      code: 40,
      group: "Weather",
      class: "Precepitation",
      subClass: "Rain",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Currently raining (no need to reflect the future)",
      examplesComments: null,
    },
    {
      code: 41,
      group: "Weather",
      class: "Precepitation",
      subClass: "Hail",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Currently hailing (no need to reflect the future)",
      examplesComments: null,
    },
    {
      code: 42,
      group: "Weather",
      class: "Precepitation",
      subClass: "Snow",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Currently snowing (including sleet,no need to reflect the future)",
      examplesComments: null,
    },
    {
      code: 43,
      group: "Weather",
      class: "Road Condition",
      subClass: "Snow",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Visible snow on the road",
      examplesComments: null,
    },
    {
      code: 44,
      group: "Weather",
      class: "Glare Condtion",
      subClass: "Glare",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        'Apply if there is glare visible in one of the surround view cameras or if there is glare on the road.\nJust needs to be applied once per log.\n\nOld Definition (prior to 03/25/24):\n"Glare on the road" only including glare on the road but not in other regions.',
      examplesComments:
        'Modified definition from "Glare on the road" to "Glare" in production since 03/25/24',
    },
    {
      code: 45,
      group: "Weather",
      class: "Sky Condition",
      subClass: "Fully clouded",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Fully cloudy without blue sky",
      examplesComments: null,
    },
    {
      code: 46,
      group: "Weather",
      class: "Sky Condition",
      subClass: "Sun/cloud mix",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Parts of the sky are visible, the sun could shine in parts of the log, but the sun could also be hidden in parts of the log",
      examplesComments: null,
    },
    {
      code: 47,
      group: "Weather",
      class: "Sky Condition",
      subClass: "Sunny",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Full sun, no clouds expected during the log",
      examplesComments: null,
    },
    {
      code: 48,
      group: "Weather",
      class: "Hazy View",
      subClass: "Fog",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Visible fog",
      examplesComments: null,
    },
    {
      code: 49,
      group: "Weather",
      class: "Hazy View",
      subClass: "Dust",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Visible dust, either locally or globally",
      examplesComments: null,
    },
    {
      code: 50,
      group: "Weather",
      class: "Hazy View",
      subClass: "Smoke/Smog",
      attribute: null,
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition: "Visible smoke, either locally or globally",
      examplesComments: null,
    },
    {
      code: 60,
      group: "Obstruction",
      class: "Camera lense soiling",
      subClass: "Translucent",
      attribute: "SVC Front",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Front SVC has only translucent soiling on lens (mud, droplets, ice, bugs, mist, ...)",
      examplesComments: null,
    },
    {
      code: 61,
      group: "Obstruction",
      class: "Camera lense soiling",
      subClass: "Translucent",
      attribute: "SVC Right",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Right SVC has only translucent soiling on lens (mud, droplets, ice, bugs, mist, ...)",
      examplesComments: "see examples attached to SVC Front",
    },
    {
      code: 62,
      group: "Obstruction",
      class: "Camera lense soiling",
      subClass: "Translucent",
      attribute: "SVC Rear",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Rear SVC has only translucent soiling on lens (mud, droplets, ice, bugs, mist, ...)",
      examplesComments: "see examples attached to SVC Front",
    },
    {
      code: 63,
      group: "Obstruction",
      class: "Camera lense soiling",
      subClass: "Translucent",
      attribute: "SVC Left",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Left SVC has only translucent soiling on lens (mud, droplets, ice, bugs, mist, ...)",
      examplesComments: "see examples attached to SVC Front",
    },
    {
      code: 64,
      group: "Obstruction",
      class: "Camera lense soiling",
      subClass: "Opaque & Opaque+ Translucent combined",
      attribute: "SVC Front",
      freeTextMandatory: false,
      freeTextDescription: null,
      shortDefinition:
        "Front SVC has opaque or opaque+translucent combined soiling on lens (mud, droplets, ice, bugs, mist, ...).",
      examplesComments: null,
    },
  ],
};

// Build the tree
const treeDataUpdated = buildTree(data.codes);

export default treeDataUpdated;
