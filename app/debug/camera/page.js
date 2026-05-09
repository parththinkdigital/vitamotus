"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import SpiderCanvas from "@/components/home/SpiderCanvas";

function CameraHelper({ data, onPosChange, isTyping }) {
  const { camera, controls } = useThree();
  const isInteracting = useRef(false);
  
  // Update camera if data changes FROM EXTERNAL (typing)
  useEffect(() => {
    if (isInteracting.current || !controls) return;
    
    camera.position.set(...data.pos);
    controls.target.set(...data.target);
    controls.update();
  }, [data.pos, data.target, camera, controls]);

  useFrame(() => {
    if (!controls || isTyping) return;
    
    // Check if the camera or target actually moved from user interaction
    const cx = parseFloat(camera.position.x.toFixed(2));
    const cy = parseFloat(camera.position.y.toFixed(2));
    const cz = parseFloat(camera.position.z.toFixed(2));
    const tx = parseFloat(controls.target.x.toFixed(2));
    const ty = parseFloat(controls.target.y.toFixed(2));
    const tz = parseFloat(controls.target.z.toFixed(2));

    if (
      cx !== data.pos[0] || cy !== data.pos[1] || cz !== data.pos[2] ||
      tx !== data.target[0] || ty !== data.target[1] || tz !== data.target[2]
    ) {
      isInteracting.current = true;
      onPosChange(prev => ({ 
        ...prev, 
        pos: [cx, cy, cz], 
        target: [tx, ty, tz] 
      }));
      // Reset interaction flag after a short delay
      setTimeout(() => { isInteracting.current = false; }, 100);
    }
  });

  return null;
}

export default function CameraDebugPage() {
  const [data, setData] = useState({
    pos: [0, 1, 5],
    target: [0, 0, 0],
    customPos: { bottom: 48, left: 48 }
  });
  const [isTyping, setIsTyping] = useState(false);

  const updatePos = (axis, val, type = "pos") => {
    const newVal = parseFloat(val) || 0;
    setData(prev => {
      const newData = { ...prev };
      if (type === "pos") {
        const newPos = [...prev.pos];
        newPos[axis] = newVal;
        newData.pos = newPos;
      } else {
        const newTarget = [...prev.target];
        newTarget[axis] = newVal;
        newData.target = newTarget;
      }
      return newData;
    });
  };

  const setPreset = (preset) => {
    if (preset === "left") setData(prev => ({ ...prev, customPos: { bottom: 48, left: 48 } }));
    else setData(prev => ({ ...prev, customPos: { bottom: 48, right: 48 } }));
  };

  return (
    <div className="fixed inset-0 bg-parchment overflow-hidden text-ink">
      {/* 1:1 Production Ratio Canvas */}
      <div className="absolute inset-0 z-0">
        <SpiderCanvas 
          cameraPosition={data.pos} 
          cameraTarget={data.target}
          isInteractive={true} 
          isAnimated={false}
        >
          <CameraHelper data={data} onPosChange={setData} isTyping={isTyping} />
        </SpiderCanvas>
      </div>

      {/* Production UI Simulation (The 1.5rem border) */}
      <div className="absolute inset-0 z-10 pointer-events-none border-[1.5rem] border-parchment/50 opacity-50" />

      {/* Free-Draggable UI Box - Visual Reference */}
      <motion.div 
        drag
        dragMomentum={false}
        onDragEnd={(event, info) => {
          const rect = event.target.getBoundingClientRect();
          const bottom = window.innerHeight - rect.bottom;
          const left = rect.left;
          setData(prev => ({
            ...prev,
            customPos: { bottom: Math.round(bottom), left: Math.round(left) }
          }));
        }}
        style={{ 
          position: 'absolute',
          bottom: data.customPos.bottom,
          left: data.customPos.left,
          zIndex: 50,
          cursor: 'grab'
        }}
        className="pointer-events-auto active:cursor-grabbing max-w-md group"
      >
        <div className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-moss/20 shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-moss/20 rounded-full group-hover:bg-moss/40 transition-colors" />
          <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-moss mb-3">Custom UI Placement</span>
          <h2 className="text-3xl font-serif text-ink mb-4">Draggable Guide</h2>
          <p className="text-sm text-ink/70 font-medium leading-relaxed max-w-xs">
            Drag this box to find the perfect empty space.
          </p>
          <div className="mt-6 pt-4 border-t border-ink/5 flex justify-between items-center">
             <span className="text-[9px] font-bold text-moss uppercase tracking-widest">Live Pos</span>
             <span className="font-mono text-[10px] bg-moss/10 px-2 py-1 rounded text-moss">
                {JSON.stringify(data.customPos)}
             </span>
          </div>
        </div>
      </motion.div>

      {/* Overlaid Debug HUD */}
      <div className="absolute top-0 left-0 right-0 p-8 flex items-start justify-between bg-gradient-to-b from-white/80 to-transparent z-40 pointer-events-none">
         <div className="min-w-[180px] pointer-events-auto">
            <h1 className="text-xl font-serif">Camera Debug</h1>
            <p className="text-[9px] text-ink/40 font-bold uppercase tracking-[0.3em]">VitaMotus Utility</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setPreset("left")} className="px-3 py-1.5 bg-ink text-white text-[9px] font-bold uppercase tracking-widest rounded transition-colors hover:bg-moss">Left</button>
              <button onClick={() => setPreset("right")} className="px-3 py-1.5 bg-ink text-white text-[9px] font-bold uppercase tracking-widest rounded transition-colors hover:bg-moss">Right</button>
            </div>
         </div>

         {/* Integrated HUD - Centered */}
         <div className="flex flex-col items-center gap-4 pointer-events-auto bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-ink/5 shadow-2xl">
            <div className="flex gap-12">
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase text-ink/30 tracking-widest font-bold">Camera [X,Y,Z]</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <input
                        key={`pos-${i}`}
                        type="number"
                        step="0.01"
                        value={data.pos[i]}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        onChange={(e) => updatePos(i, e.target.value, "pos")}
                        className="w-16 bg-white border border-ink/10 rounded px-2 py-1 font-mono text-sm focus:border-moss outline-none"
                      />
                    ))}
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase text-ink/30 tracking-widest font-bold">Focal Target [X,Y,Z]</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <input
                        key={`target-${i}`}
                        type="number"
                        step="0.01"
                        value={data.target[i]}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        onChange={(e) => updatePos(i, e.target.value, "target")}
                        className="w-16 bg-moss/5 border border-moss/20 rounded px-2 py-1 font-mono text-sm text-moss focus:border-moss outline-none"
                      />
                    ))}
                  </div>
               </div>
            </div>
            <div className="w-full pt-4 border-t border-ink/5">
               <code className="text-[10px] text-moss block text-center font-mono select-all">
                 camera: [{data.pos.join(", ")}], target: [{data.target.join(", ")}], customPos: {JSON.stringify(data.customPos)}
               </code>
            </div>
         </div>

         <div className="text-right min-w-[180px] pointer-events-auto">
            <span className="text-[10px] font-bold text-ink/30 uppercase tracking-widest">Composition Mode</span>
            <p className="text-[10px] text-ink/60 font-medium">Drag UI Box to Find Space</p>
         </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-30 text-[9px] uppercase tracking-[0.4em] font-bold">
        Absolute Coordinate Mapping System
      </div>
    </div>
  );
}
