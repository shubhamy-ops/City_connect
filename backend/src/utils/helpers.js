export const calculateSLA = (priority) => {
  const now = Date.now();
  switch (priority) {
    case 'Urgent': return new Date(now + 12 * 3600 * 1000);
    case 'High': return new Date(now + 24 * 3600 * 1000);
    case 'Medium': return new Date(now + 48 * 3600 * 1000);
    case 'Low': default: return new Date(now + 72 * 3600 * 1000);
  }
};

export const mockAICategorize = (title, description, category) => {
  const sampleConfidence = (Math.random() * (0.98 - 0.88) + 0.88).toFixed(2);
  return {
    category: category || "Roads & Infrastructure",
    confidence: parseFloat(sampleConfidence),
    detectedObject: `Detected ${category || 'Civic Issue'} Pattern`
  };
};

export const defaultDepartments = {
  'Roads & Infrastructure': 'Department of Public Works',
  'Sanitation & Garbage': 'Sanitation & Waste Management',
  'Streetlights & Electrical': 'Electrical Grid & Utilities',
  'Water & Drainage': 'Municipal Water Authority',
  'Parks & Trees': 'Urban Forestry & Parks',
  'Public Safety': 'Civic Safety & Rapid Response'
};
