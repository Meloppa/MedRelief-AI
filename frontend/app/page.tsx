"use client";

import React, { useState } from 'react';
import { Activity, ShieldAlert, Package, Weight, Info, RefreshCw, Box, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function MedReliefDashboard() {
  const [weightLimit, setWeightLimit] = useState(470);
  const [volumeLimit, setVolumeLimit] = useState(850);
  const [mission, setMission] = useState("Earthquake Relief");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runOptimization = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/optimize', {
        weight_limit: weightLimit,
        volume_limit: volumeLimit, 
        mission_type: mission
      });
      setResults(response.data);
    } catch (error) {
      alert("Backend not responding. Check FastAPI!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      
      {/* PROFESSIONAL HERO SECTION WITH IMAGE */}
      <div className="bg-white border-b-4 border-black px-8 py-12 mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          
          {/* Hero Left: Titles and Subtitle */}
          <div className="md:col-span-7 space-y-4">
             <div className="flex items-center gap-3">
                <Activity className="text-red-600" size={36} strokeWidth={3} />
                <span className="text-sm font-black tracking-[0.4em] text-slate-400 uppercase font-mono">System v4.0 Alpha</span>
             </div>
             
             <h1 className="text-6xl font-black tracking-tighter text-black uppercase leading-[0.9]">
               Med<span className="text-red-600">Relief</span> AI
             </h1>
             
             <p className="text-xl font-bold text-slate-700 max-w-xl">
               An intelligent, offline-capable logistics engine optimizing critical medical supplies for disaster response triage.
             </p>

             <div className="flex items-center gap-2 pt-4">
                <div className="text-[10px] text-black/50 font-black font-mono uppercase tracking-tight bg-slate-100 px-3 py-1 rounded">LOCATION: AMPANG JAYA, SELANGOR</div>
                <div className="text-green-600 font-black font-mono text-[10px] flex items-center justify-end gap-1.5 bg-green-50 px-3 py-1 rounded border border-green-200">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    SYSTEM OPERATIONAL
                </div>
             </div>
          </div>

          {/* Hero Right: THE IMAGE (We use a Lucide Icon placeholder, but you should use a graphic) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative group">
                {/* Tactical Image/Graphic Placeholder */}
                <div className="bg-slate-100 border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
                    {/* Placeholder graphic: Box + Zap */}
                    <div className="flex items-center justify-center relative w-64 h-64">
                       <Box size={160} className="text-black/80" strokeWidth={1} />
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 p-6 rounded-full border-4 border-black">
                         <Zap size={64} className="text-white" strokeWidth={3} />
                       </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-black"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-black"></div>
            </div>
          </div>

        </div>
      </div>

      {/* DASHBOARD GRID CONTENT */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Column: Controls and Legend */}
          <div className="md:col-span-4 space-y-8">
            {/* Parameters Box (Kept White for Contrast) */}
            <section className="bg-white border-2 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-sm font-black mb-8 flex items-center gap-3 uppercase text-black tracking-widest">
                <ShieldAlert size={20} /> Mission Parameters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-black text-slate-500 block mb-2 uppercase tracking-tighter">Mission Scenario</label>
                  <select 
                    className="w-full bg-slate-100 border-2 border-black rounded-xl p-3 text-sm font-black text-black outline-none focus:ring-2 focus:ring-red-200"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                  >
                    <option>Flood Response</option>
                    <option>Earthquake Relief</option>
                    <option>Remote Refugee Camp</option>
                  </select>
                </div>

                {/* Weight Slider */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase">Max Weight</label>
                      <span className="text-black font-black text-2xl tracking-tighter">{weightLimit} <small className="text-sm">KG</small></span>
                  </div>
                  <input type="range" min="20" max="1000" step="10" className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-red-600" value={weightLimit} onChange={(e) => setWeightLimit(parseInt(e.target.value))} />
                </div>

                {/* Volume Slider */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase">Max Volume</label>
                      <span className="text-black font-black text-2xl tracking-tighter">{volumeLimit} <small className="text-sm">L</small></span>
                  </div>
                  <input type="range" min="50" max="1500" step="50" className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600" value={volumeLimit} onChange={(e) => setVolumeLimit(parseInt(e.target.value))} />
                </div>

                <button 
                  onClick={runOptimization}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-black text-white font-black text-lg py-5 rounded-2xl transition-all border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-3"
                >
                  {loading ? <RefreshCw className="animate-spin" /> : "GENERATE TRIAGE LOADOUT"}
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: AI Output */}
          <div className="md:col-span-8 space-y-8">
            <AnimatePresence>
              {results ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  
                  {/* AI Explanation - Now uses a sophisticated Dark look to match pattern */}
                  <div className="bg-[#1e293b] border-2 border-slate-700 p-8 rounded-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
                    <h3 className="text-blue-400 font-black flex items-center gap-3 text-xs uppercase mb-4 tracking-wider">
                      <Activity size={16} /> Gemma Logistics Analysis
                    </h3>
                    <p className="text-slate-100 leading-relaxed text-sm font-medium italic">
                      "{results.explanation}"
                    </p>
                    <div className="absolute top-0 right-0 p-5 opacity-10"><Info size={40} className="text-blue-500"/></div>
                  </div>

                  {/* Inventory Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {results.items.map((item: any, idx: number) => (
    <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group">
      <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl group-hover:bg-red-50 transition-colors">
        <Package className="text-slate-400" size={24} />
      </div>
      <div className="flex-1">
        <div className="font-bold text-slate-800 text-sm uppercase tracking-tight mb-1">
          {item.Item}
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1 uppercase">
            <Weight size={10} /> {item['Weight (kg)']}kg
          </span>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1 uppercase">
            <Box size={10} /> {item['Volume (L)']}L
          </span>
        </div>
      </div>
       <div className="flex flex-col items-center border-l border-slate-100 pl-4">
          <span className="text-[8px] font-black text-slate-300 uppercase">Pri</span>
          <span className="text-lg font-black text-red-600 leading-none">{item.Priority}</span>
       </div>
    </div>
  ))}
</div>

{/* Information Section: Priority Legend */}
<section className="bg-white border-2 border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-6">
  <h2 className="text-[10px] font-black mb-4 flex items-center gap-2 uppercase text-slate-500 tracking-widest">
    <Info size={14} /> Priority Intelligence
  </h2>
  
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-black text-xs">10</div>
      <div>
        <p className="text-[10px] font-black uppercase text-black leading-none">Critical</p>
        <p className="text-[9px] text-slate-500 font-bold">Immediate Life-Saving (Vaccines, Oxygen)</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-white font-black text-xs">7-9</div>
      <div>
        <p className="text-[10px] font-black uppercase text-black leading-none">Essential</p>
        <p className="text-[9px] text-slate-500 font-bold">Field Surgery & Stabilization</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded border-2 border-black flex items-center justify-center text-black font-black text-xs">1-6</div>
      <div>
        <p className="text-[10px] font-black uppercase text-black leading-none">Supportive</p>
        <p className="text-[9px] text-slate-500 font-bold">Long-term Recovery & Sanitation</p>
      </div>
    </div>
  </div>

  <div className="mt-4 pt-4 border-t border-slate-100">
    <p className="text-[9px] font-bold text-slate-400 leading-tight italic">
      "The Genetic Algorithm maximizes the total priority score while respecting logistical constraints."
    </p>
  </div>
</section>

                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] border-4 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center text-slate-600 bg-black/10">
                  <Box size={64} className="mb-6 opacity-20 animate-pulse text-slate-500" />
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Awaiting Mission Parameters...</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}