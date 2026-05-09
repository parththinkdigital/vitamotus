"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function SpiderModel({ activePart = null, isAnimated = true, position = [0, -0.2, 0] }) {
  const group = useRef();
  
  // Load the high-quality GLTF model
  const { scene, animations } = useGLTF("/models/scene.gltf");
  const { actions } = useAnimations(animations, group);

  // Memoize biological parts for high-performance per-frame updates
  const biologicalParts = useMemo(() => {
    const parts = [];
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        parts.push({
          mesh: child,
          originalColor: child.material.color.clone(),
          name: child.name.toLowerCase()
        });
      }
    });
    return parts;
  }, [scene]);

  // Track animation state for smooth easing
  const stateRef = useRef({
    speed: 0,
    highlightIntensity: 0
  });

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction.play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    // 1. Smoothly Transition Animation Speed (Biological Easing)
    const targetSpeed = isAnimated ? 0.4 : 0;
    stateRef.current.speed = THREE.MathUtils.lerp(stateRef.current.speed, targetSpeed, 0.05);
    
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction.setEffectiveTimeScale(stateRef.current.speed);
    }

    // 2. Smoothly Transition Idle Movement
    const t = state.clock.elapsedTime;
    if (group.current) {
      const idleWeight = THREE.MathUtils.smoothstep(stateRef.current.speed, 0, 0.4);
      
      if (!activePart) {
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, Math.sin(t * 0.4) * 0.3 * idleWeight, 0.05);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t * 0.4) * 0.1 * idleWeight, 0.05);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t * 0.8) * 0.05 * idleWeight + position[1], 0.05);
      } else {
        // Apply idleWeight here too so it stops moving when isAnimated is false
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(t * 1.5) * 0.02 * idleWeight + position[1], 0.05);
      }
    }

    // 3. Smoothly Transition Biological Highlighting
    biologicalParts.forEach((part) => {
      const isTarget = activePart && part.name.includes(activePart.toLowerCase());
      const targetIntensity = isTarget ? 0.6 : 0;
      
      // Lerp emissive intensity for "pulsing/glowing" effect
      part.mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
        part.mesh.material.emissiveIntensity,
        targetIntensity,
        0.08
      );
      
      if (isTarget) {
        part.mesh.material.emissive.set("#bc6c25");
        part.mesh.material.color.lerp(new THREE.Color("#dda15e"), 0.08);
      } else {
        part.mesh.material.color.lerp(part.originalColor, 0.08);
      }
    });
  });

  return (
    <group ref={group} dispose={null} scale={[1, 1, 1]} position={position}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/scene.gltf");
