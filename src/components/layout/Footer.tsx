import React from 'react';
import { Cpu, Shield, Zap, Server, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm mt-16 font-sans">
      {/* Infrastructure Specs Bar */}
      <div className="border-b border-slate-800 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-sm">
            <Server className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200">APPHOSTING DEPLOY</p>
              <p className="text-[10px] text-slate-400">INSTANCES: 0 - 2 DYNAMIC</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-sm">
            <Cpu className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200">HARDWARE RESOURCES</p>
              <p className="text-[10px] text-slate-400">1 CPU / 1024 MiB RAM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-sm">
            <Zap className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200">EXPRESS 5 ROUTER</p>
              <p className="text-[10px] text-slate-400">SPA FALLBACK // *ALL</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-sm">
            <Shield className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200">FIRESTORE SYNC</p>
              <p className="text-[10px] text-slate-400">LIVE PRODUCTS & ORDERS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-blue-600 rounded-sm flex items-center justify-center font-black text-white text-base">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-100 text-xl tracking-tighter uppercase">TECH<span className="text-blue-500">VAULT</span></span>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
            High-performance workstation computers, mobile hardware, wireless audio, and camera sensors. Engineered with Geometric Balance design principles and deployed on Firebase AppHosting.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono font-bold">
            <CheckCircle2 className="w-4 h-4" /> SERVER OK // PORT 8080
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest mb-3">HARDWARE CATEGORIES</h4>
          <ul className="space-y-2 text-xs font-mono text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition">01 / Laptops & Workstations</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">02 / Smartphones & Tablets</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">03 / Wireless Audio & ANC</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">04 / Smart Home & Wearables</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">05 / Gaming Gear & Monitors</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">06 / 4K Drones & Cameras</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest mb-3">SYSTEM ARCHITECTURE</h4>
          <ul className="space-y-2 text-xs font-mono text-slate-400">
            <li>FRAMEWORK: <span className="text-white">Next.js / Vite SPA</span></li>
            <li>HOSTING: <span className="text-white">Firebase AppHosting</span></li>
            <li>CONFIG: <span className="text-white">apphosting.yaml</span></li>
            <li>EXPRESS: <span className="text-white">Version 5.x</span></li>
            <li>DATABASE: <span className="text-white">Firebase Firestore</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest mb-3">HARDWARE RELEASE DIGEST</h4>
          <p className="text-xs text-slate-400 mb-3 font-sans">Receive hardware telemetry and new Q4 release drops.</p>
          <div className="flex gap-2 font-mono">
            <input 
              type="email" 
              placeholder="user@system.com" 
              className="bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-slate-100 flex-1 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-sm transition uppercase">
              SUB
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 px-10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500">
        <div>© 2026 TECHVAULT ELECTRONICS CORP.</div>
        <div>LOC // GLOBAL-DIST-01</div>
        <div>VER // 1.0.4-GEOMETRIC-STABLE</div>
      </div>
    </footer>
  );
};
