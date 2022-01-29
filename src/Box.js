import React from 'react'
import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";
import { OrbitControls } from '@react-three/drei';
function Box() {
  return (
    <div id="canvas-container">
      <Canvas style={{ height: "100vh" }}>
        <Earth position={[-1.2, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default Box;
