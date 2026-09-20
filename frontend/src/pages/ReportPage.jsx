import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { MapView } from '../components/MapView';
import { runAIAnalysis, findNearbyDuplicates } from '../utils/aiMock';
import { 
  Upload, MapPin, AlertTriangle, CheckCircle2, 
  RefreshCw, ThumbsUp, Sparkles, Building2
} from 'lucide-react';

const CATEGORIES = [
  'Roads & Infrastructure',
  'Sanitation & Garbage',
  'Streetlights & Electrical',
  'Water & Drainage',
  'Parks & Trees',
  'Public Safety'
];

const PRESET_SAMPLE_PHOTOS = [
  { name: 'Pothole Hazard', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80', cat: 'Roads & Infrastructure' },
  { name: 'Garbage Overflow', url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80', cat: 'Sanitation & Garbage' },
  { name: 'Broken Light', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80', cat: 'Streetlights & Electrical' },
  { name: 'Water Leak', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', cat: 'Water & Drainage' }
];

export const ReportPage = () => {
  const { createIssue, issues, upvoteIssue, navigateToDetail } = useIssues();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [priority, setPriority] = useState('Medium');
  const [selectedImage, setSelectedImage] = useState(PRESET_SAMPLE_PHOTOS[0].url);
  
  // Location selection state
  const [location, setLocation] = useState({
    address: 'Main St & 5th Ave, District 2',
    lat: 37.7749,
    lng: -122.4194
  });

  // AI helper state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedCat, setSuggestedCat] = useState('Roads & Infrastructure');

  // Duplicate detection state
  const [duplicates, setDuplicates] = useState([]);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Photo Selection
  const handleImageSelect = async (imageUrl, imageName = '') => {
    setSelectedImage(imageUrl);
    setIsAnalyzing(true);

    const result = await runAIAnalysis(imageName || imageUrl);
    setIsAnalyzing(false);
    if (result.detectedCategory) {
      setSuggestedCat(result.detectedCategory);
      setCategory(result.detectedCategory);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        handleImageSelect(uploadEvent.target.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Location select on map click
  const handlePositionSelect = (pos) => {
    setLocation(pos);
    const nearby = findNearbyDuplicates(issues, pos.lat, pos.lng, category, 300);
    setDuplicates(nearby);
    if (nearby.length > 0) {
      setShowDuplicateModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const nearby = findNearbyDuplicates(issues, location.lat, location.lng, category, 300);
    if (nearby.length > 0 && !showDuplicateModal) {
      setDuplicates(nearby);
      setShowDuplicateModal(true);
      return;
    }

    setIsSubmitting(true);
    const created = await createIssue({
      title,
      description,
      category,
      priority,
      location,
      image: selectedImage
    });

    setIsSubmitting(false);
    if (created && created.id) {
      navigateToDetail(created.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-heading font-semibold text-deepblue-900">
          <Building2 className="w-3.5 h-3.5 text-brandorange-500" />
          <span>Municipal Incident Reporting Form</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-deepblue-900">Report a Civic Incident</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Provide photo evidence and mark the exact location to route your ticket directly to municipal dispatch.
        </p>
      </div>

      {/* Main Form Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Upload & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="saas-card p-5 space-y-3.5">
            <h3 className="text-xs font-heading font-bold text-deepblue-900 uppercase tracking-wider">
              1. Photo Evidence
            </h3>

            {/* Preview Box */}
            <div className="relative h-56 w-full rounded-[12px] overflow-hidden bg-slate-100 border border-slate-200 group">
              <img 
                src={selectedImage} 
                alt="Selected incident" 
                className="w-full h-full object-cover" 
              />

              {/* Analyzing indicator */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center gap-2 text-xs font-medium text-deepblue-900">
                  <RefreshCw className="w-4 h-4 animate-spin text-brandorange-500" />
                  <span>AI Detecting Category...</span>
                </div>
              )}

              {/* Upload button */}
              <label className="absolute bottom-3 right-3 px-3.5 py-2 bg-deepblue-900 hover:bg-deepblue-950 text-white text-xs font-heading font-semibold rounded-[10px] cursor-pointer shadow-md flex items-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5 text-brandorange-500" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Smart Category suggestion note */}
            {suggestedCat && !isAnalyzing && (
              <div className="p-2.5 rounded-[10px] bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                <span>AI Detected: <strong className="text-deepblue-900 font-heading font-bold">{suggestedCat}</strong></span>
              </div>
            )}

            {/* Sample Presets selector */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-medium text-slate-500">Or choose a sample photo:</p>
              <div className="grid grid-cols-4 gap-1.5">
                {PRESET_SAMPLE_PHOTOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleImageSelect(preset.url, preset.name)}
                    className={`relative h-12 rounded-[10px] overflow-hidden border transition-all ${
                      selectedImage === preset.url ? 'border-brandorange-500 ring-2 ring-orange-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Category & Urgency */}
          <div className="saas-card p-5 space-y-3.5">
            <div>
              <label className="block text-xs font-heading font-bold text-deepblue-900 mb-1">Issue Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="saas-input font-medium"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-deepblue-900 mb-1">Urgency Level</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 px-2 rounded-[10px] text-xs font-heading font-semibold transition-all border ${
                      priority === p 
                        ? p === 'Urgent' ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : p === 'High' ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-brandorange-500 text-white border-brandorange-500 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Title, Description & Location (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="saas-card p-5 space-y-3.5">
            <h3 className="text-xs font-heading font-bold text-deepblue-900 uppercase tracking-wider">
              2. Incident Details
            </h3>

            <div>
              <label className="block text-xs font-heading font-bold text-deepblue-900 mb-1">Title / Summary *</label>
              <input
                type="text"
                placeholder="e.g. Deep pothole near crosswalk on Main Street"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="saas-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-deepblue-900 mb-1">Detailed Description *</label>
              <textarea
                rows={3}
                placeholder="Describe the severity, exact location landmarks, and hazard risk..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="saas-input resize-none"
                required
              />
            </div>
          </div>

          {/* Map Location */}
          <div className="saas-card p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-heading font-bold text-deepblue-900 uppercase tracking-wider">
                3. Pin Geolocation
              </h3>
              <span className="text-[11px] font-mono text-brandorange-500 font-bold">
                {location.lat}, {location.lng}
              </span>
            </div>

            <MapView
              selectable={true}
              selectedPosition={location}
              onPositionSelect={handlePositionSelect}
              height="220px"
              center={[location.lat, location.lng]}
              zoom={14}
            />

            <div>
              <label className="block text-xs font-heading font-bold text-deepblue-900 mb-1">Street Address Landmark</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-brandorange-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location.address}
                  onChange={e => setLocation({ ...location, address: e.target.value })}
                  className="saas-input pl-8"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !title || !description}
            className="w-full saas-btn-primary py-3.5 text-xs shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Submitting to Municipal Dispatch...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Submit Incident Ticket</span>
              </>
            )}
          </button>

        </div>
      </form>

      {/* Duplicate Alert Modal */}
      {showDuplicateModal && duplicates.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="saas-card max-w-md w-full p-6 border-amber-300 space-y-4 shadow-saas-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-[10px] bg-amber-100 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-bold text-deepblue-900">Similar Active Report Nearby</h3>
                <p className="text-xs text-slate-500">A matching report exists within 300 meters.</p>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {duplicates.map(dup => (
                <div key={dup.id} className="p-3 rounded-[10px] bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-mono text-deepblue-900 font-bold">{dup.id}</span>
                    <h4 className="text-xs font-heading font-bold text-slate-900 truncate">{dup.title}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{dup.location?.address}</p>
                  </div>

                  <button
                    onClick={() => {
                      upvoteIssue(dup.id);
                      setShowDuplicateModal(false);
                      navigateToDetail(dup.id);
                    }}
                    className="px-3 py-1 bg-brandorange-500 hover:bg-brandorange-600 text-white font-heading font-semibold text-xs rounded-[8px] flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Upvote</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowDuplicateModal(false)}
                className="px-3 py-1.5 text-xs font-heading font-semibold text-slate-600 hover:text-deepblue-900"
              >
                Submit New Ticket Anyway
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
