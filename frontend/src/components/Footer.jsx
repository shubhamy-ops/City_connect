import React from 'react';
import { MapPin, Phone, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-deepblue-950 border-t border-deepblue-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[10px] bg-brandorange-500 text-white flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <span className="text-lg font-heading font-extrabold text-white tracking-tight">City<span className="text-brandorange-500">Connect</span></span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Smart civic issue reporting and accountability platform linking citizens directly with municipal operations for transparent resolution.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>99.1% SLA Compliance Index</span>
          </div>
        </div>

        {/* Civic Hotline Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Emergency Hotlines</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-brandorange-500" />
              <span>Public Works Dispatch: 311-CIVIC</span>
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Water Leak Emergency: 1-800-555-WATER</span>
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>Public Hazard Escalation: 911</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Municipal Departments</h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="hover:text-brandorange-500 cursor-pointer transition-colors">Roads & Pavement Infrastructure</li>
            <li className="hover:text-brandorange-500 cursor-pointer transition-colors">Sanitation & Environmental Health</li>
            <li className="hover:text-brandorange-500 cursor-pointer transition-colors">Electrical Grid & Public Lighting</li>
            <li className="hover:text-brandorange-500 cursor-pointer transition-colors">Urban Forestry & Parks Maintenance</li>
          </ul>
        </div>

        {/* Future Scope / Vision */}
        <div className="space-y-3">
          <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">Smart City SaaS</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Integrating IoT road stress sensors, automated AI pavement scanning, and WhatsApp chatbot dispatch.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-[8px] bg-deepblue-900 border border-deepblue-800 text-brandorange-500 font-semibold">
              <span>Open Civic API v2.4</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-deepblue-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 CityConnect SaaS Platform. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built for Smart Cities with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & Deep Accountability
        </p>
      </div>
    </footer>
  );
};
