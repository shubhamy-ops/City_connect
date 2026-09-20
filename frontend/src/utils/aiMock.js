// Mock AI Computer Vision Classifier for Civic Issues

const AI_CATEGORIES = {
  pothole: { category: "Roads & Infrastructure", label: "Asphalt Degradation & Pothole", confidenceRange: [0.91, 0.98] },
  garbage: { category: "Sanitation & Garbage", label: "Uncontained Waste Accumulation", confidenceRange: [0.89, 0.96] },
  light: { category: "Streetlights & Electrical", label: "Luminaire Outage / Damaged Fixture", confidenceRange: [0.87, 0.95] },
  water: { category: "Water & Drainage", label: "Pressurized Hydraulic Leak", confidenceRange: [0.88, 0.96] },
  tree: { category: "Parks & Trees", label: "Vegetation & Tree Branch Hazard", confidenceRange: [0.92, 0.99] },
  safety: { category: "Public Safety", label: "Structural Infrastructure Obstruction", confidenceRange: [0.85, 0.94] }
};

export const runAIAnalysis = (fileNameOrBase64) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lower = (fileNameOrBase64 || '').toLowerCase();
      let matchKey = 'pothole';

      if (lower.includes('trash') || lower.includes('garbage') || lower.includes('waste') || lower.includes('bin')) {
        matchKey = 'garbage';
      } else if (lower.includes('light') || lower.includes('lamp') || lower.includes('wire') || lower.includes('dark')) {
        matchKey = 'light';
      } else if (lower.includes('water') || lower.includes('leak') || lower.includes('pipe') || lower.includes('flood')) {
        matchKey = 'water';
      } else if (lower.includes('tree') || lower.includes('branch') || lower.includes('park') || lower.includes('wood')) {
        matchKey = 'tree';
      }

      const info = AI_CATEGORIES[matchKey];
      const confidence = Number(
        (Math.random() * (info.confidenceRange[1] - info.confidenceRange[0]) + info.confidenceRange[0]).toFixed(2)
      );

      resolve({
        detectedCategory: info.category,
        detectedLabel: info.label,
        confidence: confidence,
        confidencePercent: Math.round(confidence * 100)
      });
    }, 1400); // simulate scanning latency
  });
};

// Simple Haversine distance calculator for duplicate detection (meters)
export const calculateDistanceMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
};

export const findNearbyDuplicates = (issues, targetLat, targetLng, targetCategory, radiusMeters = 300) => {
  if (!targetLat || !targetLng) return [];

  return issues.filter(issue => {
    if (!issue.location || !issue.location.lat || !issue.location.lng) return false;
    if (issue.status === 'Verified' || issue.status === 'Fixed') return false; // ignore closed issues
    
    const dist = calculateDistanceMeters(targetLat, targetLng, issue.location.lat, issue.location.lng);
    const sameCat = issue.category === targetCategory;
    return dist <= radiusMeters && (sameCat || dist <= 50);
  });
};

