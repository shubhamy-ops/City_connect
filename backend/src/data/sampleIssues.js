export const initialIssues = [
  {
    id: "CITY-101",
    title: "Hazardous Pothole on Main St & 4th Ave",
    description: "Deep pothole (~6 inches) causing severe tire damage and lane swerving. High traffic hazard during peak hours.",
    category: "Roads & Infrastructure",
    priority: "High",
    status: "In Progress",
    assignedDepartment: "Department of Public Works",
    location: {
      address: "Main St & 4th Ave, District 3",
      lat: 37.7749,
      lng: -122.4194
    },
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    beforeAfterImage: {
      before: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80"
    },
    reporter: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Citizen"
    },
    upvotes: 42,
    upvotedBy: ["user-1", "user-2"],
    aiDetection: {
      category: "Roads & Infrastructure",
      confidence: 0.96,
      detectedObject: "Asphalt Pothole Strain"
    },
    slaDueDate: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    timeline: [
      {
        status: "Reported",
        title: "Issue Logged",
        note: "Submitted by citizen Alex Rivera with AI geotag & photo evidence.",
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        actor: "Alex Rivera (Citizen)"
      },
      {
        status: "Assigned",
        title: "Dispatched to Department",
        note: "Auto-routed to Dept. of Public Works. Inspection team assigned.",
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        actor: "City Dispatcher Engine"
      },
      {
        status: "In Progress",
        title: "Asphalt Crew On Site",
        note: "Repair vehicle #DPW-402 arrived on scene. Milling and hot-mix asphalt filling underway.",
        timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        actor: "Chief Engineer Miller"
      }
    ]
  },
  {
    id: "CITY-102",
    title: "Overflowing Waste Receptacle at Central Park North",
    description: "Public bin overflowing with plastic containers attracting pests. Spilling onto walkway.",
    category: "Sanitation & Garbage",
    priority: "Medium",
    status: "Fixed",
    assignedDepartment: "Sanitation & Waste Management",
    location: {
      address: "Central Park Gate 7, North Entrance",
      lat: 37.7833,
      lng: -122.4167
    },
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80",
    beforeAfterImage: {
      before: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
    },
    reporter: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      role: "Citizen"
    },
    upvotes: 28,
    upvotedBy: ["user-3"],
    aiDetection: {
      category: "Sanitation & Garbage",
      confidence: 0.94,
      detectedObject: "Solid Waste Overflow"
    },
    slaDueDate: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    timeline: [
      {
        status: "Reported",
        title: "Report Submitted",
        note: "Garbage overflow reported near playground.",
        timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        actor: "Marcus Chen"
      },
      {
        status: "Assigned",
        title: "Assigned to Sanitation Unit 4",
        note: "Sanitation crew route updated.",
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        actor: "Admin Portal"
      },
      {
        status: "In Progress",
        title: "Trash Collection In Progress",
        note: "Truck #SAN-12 dispatched.",
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        actor: "Supervisor Sanders"
      },
      {
        status: "Fixed",
        title: "Cleaned & Bin Replaced",
        note: "High-capacity smart bin installed and surrounding walk pressure washed.",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        actor: "Sanitation Crew #4"
      }
    ]
  },
  {
    id: "CITY-103",
    title: "Broken LED Streetlight on 9th Cross Alleyway",
    description: "Entire street fixture is unlit since heavy thunderstorm yesterday. Creates dark hazardous spot for pedestrians.",
    category: "Streetlights & Electrical",
    priority: "Urgent",
    status: "Reported",
    assignedDepartment: "Electrical Grid & Utilities",
    location: {
      address: "9th Cross Alleyway, West District",
      lat: 37.7690,
      lng: -122.4480
    },
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    reporter: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Citizen"
    },
    upvotes: 54,
    upvotedBy: ["user-1", "user-4"],
    aiDetection: {
      category: "Streetlights & Electrical",
      confidence: 0.91,
      detectedObject: "Luminaire Outage / Wiring"
    },
    slaDueDate: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    timeline: [
      {
        status: "Reported",
        title: "Report Received",
        note: "Citizen flagged non-functioning overhead LED fixture.",
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        actor: "Priya Sharma"
      }
    ]
  },
  {
    id: "CITY-104",
    title: "Burst Water Pipe Leaking into Storm Drain",
    description: "Clean water leaking rapidly from subsurface pipe beneath sidewalk pavement. Substantial water runoff.",
    category: "Water & Drainage",
    priority: "Urgent",
    status: "Assigned",
    assignedDepartment: "Municipal Water Authority",
    location: {
      address: "Oak Street & 12th Plaza",
      lat: 37.7600,
      lng: -122.4200
    },
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
    reporter: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      role: "Citizen"
    },
    upvotes: 19,
    upvotedBy: [],
    aiDetection: {
      category: "Water & Drainage",
      confidence: 0.89,
      detectedObject: "Pressurized Hydraulic Leak"
    },
    slaDueDate: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    timeline: [
      {
        status: "Reported",
        title: "Water Leak Reported",
        note: "High priority leak logged.",
        timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        actor: "David Kim"
      },
      {
        status: "Assigned",
        title: "Assigned to Water Rapid Response",
        note: "Technician Team B assigned to shut valve.",
        timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        actor: "City Water Control Room"
      }
    ]
  },
  {
    id: "CITY-105",
    title: "Fallen Tree Branch Blocking Bike Lane",
    description: "Storm damage knocked heavy limb into dedicated cycle path. Forcing cyclists into vehicular traffic.",
    category: "Parks & Trees",
    priority: "Medium",
    status: "Verified",
    assignedDepartment: "Urban Forestry & Parks",
    location: {
      address: "Embarcadero Cycle Highway, Marker 4",
      lat: 37.7900,
      lng: -122.3900
    },
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    beforeAfterImage: {
      before: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      after: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80"
    },
    reporter: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      role: "Citizen"
    },
    upvotes: 36,
    upvotedBy: ["user-1", "user-2", "user-5"],
    aiDetection: {
      category: "Parks & Trees",
      confidence: 0.98,
      detectedObject: "Tree Debris Obstruction"
    },
    slaDueDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    timeline: [
      {
        status: "Reported",
        title: "Limb Obstruction Logged",
        note: "Reported by cyclist.",
        timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
        actor: "Sarah Jenkins"
      },
      {
        status: "Assigned",
        title: "Urban Forestry Dispatched",
        note: "Chainsaw crew assigned.",
        timestamp: new Date(Date.now() - 60 * 3600 * 1000).toISOString(),
        actor: "Parks Dept"
      },
      {
        status: "In Progress",
        title: "Removal Work",
        note: "Branch cut and wood chipped.",
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        actor: "Forestry Crew #2"
      },
      {
        status: "Fixed",
        title: "Lane Cleared",
        note: "Bike lane fully cleared and swept.",
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        actor: "Foreman Davis"
      },
      {
        status: "Verified",
        title: "Verified by Citizen",
        note: "Sarah Jenkins confirmed solution with 5-star rating.",
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        actor: "Sarah Jenkins (Reporter)"
      }
    ]
  }
];

