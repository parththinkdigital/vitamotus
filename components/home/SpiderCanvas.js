"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, Html, useProgress, Float, Lightformer } from "@react-three/drei";
import SpiderModel from "./SpiderModel";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-6 min-w-[300px]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-moss/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-moss border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-ink animate-pulse">
            Scanning Specimen
          </span>
          <div className="w-48 h-1 bg-ink/5 rounded-full overflow-hidden">
            <div className="h-full bg-moss transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-medium text-ink/30 tabular-nums">
            {Math.round(progress)}% Digital Reconstruction
          </span>
        </div>
      </div>
    </Html>
  );
}

// Smooth Camera Transition Rig
function Rig({ position, target }) {
  const { camera } = useThree();
  const targetVec = useMemo(() => new THREE.Vector3(), []);
  
  return useFrame((state) => {
    // 1. Smoothly glide to the exact coordinate
    const posTarget = new THREE.Vector3(...position);
    state.camera.position.lerp(posTarget, 0.1); 
    
    // 2. Smoothly glide the focal point
    const focalTarget = new THREE.Vector3(...target);
    targetVec.lerp(focalTarget, 0.1);
    state.camera.lookAt(targetVec);
  });
}

export default function SpiderCanvas({ 
  cameraPosition = [0, 1, 4], 
  cameraTarget = [0, 0, 0],
  modelPosition = [0, -0.2, 0],
  autoRotate = false,
  activePart = null,
  isInteractive = true,
  isAnimated = true,
  enableZoom = true,
  enablePan = true,
  children
}) {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas 
        shadows
        camera={{ fov: 35 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          shadowMapType: THREE.PCFShadowMap,
        }}
      >
        <Suspense fallback={<Loader />}>
          {children}
          {!isInteractive && <Rig position={cameraPosition} target={cameraTarget} />}
          
          {/* 1. Global Ambience */}
          <ambientLight intensity={0.1} />
          
          {/* 2. Key Light */}
          <directionalLight
            position={[5, 10, 5]}
            intensity={4}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            color="#ffffff"
          />

          {/* 3. Rim Light */}
          <spotLight
            position={[-5, 5, -5]}
            angle={0.5}
            penumbra={1}
            intensity={8}
            color="#e0f2fe"
          />

          {/* 4. Fill Light */}
          <pointLight 
            position={[-10, -2, 5]} 
            intensity={1.5} 
            color="#ffe4b5" 
            decay={2} 
          />

          {/* 5. Environment */}
          {/* 5. Custom Environment (Local - No Network Fetch) */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, 0, 0]}>
              <Lightformer form="rect" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer form="rect" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
              <Lightformer form="rect" intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={[10, 2, 1]} />
            </group>
          </Environment>
          
          <Float 
            speed={isAnimated ? 1.5 : 0} 
            rotationIntensity={isAnimated ? 0.2 : 0} 
            floatIntensity={isAnimated ? 0.2 : 0}
          >
            <SpiderModel 
              activePart={activePart} 
              isAnimated={isAnimated} 
              position={modelPosition}
            />
          </Float>
          
          {/* 6. Contact Shadows */}
          <ContactShadows 
            position={[0, -0.8, 0]} 
            opacity={0.6} 
            scale={10} 
            blur={2} 
            far={1.5} 
          />

          {isInteractive && (
            <OrbitControls 
              enableZoom={enableZoom} 
              enablePan={enablePan}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              enableDamping={true}
              dampingFactor={0.1}
              makeDefault
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
