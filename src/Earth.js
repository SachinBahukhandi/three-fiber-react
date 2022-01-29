import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import EarthDayMap from "../src/assets/textures/8k_earth_daymap.jpg";
import EarthCloudsMap from "../src/assets/textures/8k_earth_clouds.jpg";
import EarthNormalMap from "../src/assets/textures/8k_earth_normal_map.jpg";
import { TextureLoader } from "three";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

export default function Earth(props) {
  const [colorMap, normalMap, cloudsMap] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthCloudsMap,
  ]);
  const earthMesh = useRef();
  const cloudMesh = useRef();
  // Set up state for the hovered and active state
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthMesh.current.rotation.y = elapsedTime / 6;
    cloudMesh.current.rotation.y = elapsedTime / 6;
  });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
      <pointLight color="#f6f3ea" position={(2, 0, 2)} intensity={1.2} />
      <Stars radius={300} depth={70} count={20000} />
      <mesh ref={cloudMesh}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthMesh}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  );
}
