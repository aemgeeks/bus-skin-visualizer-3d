
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Skin } from '@/types/skin';
import { Bus } from 'lucide-react';

interface BusModelProps {
  selectedSkin: Skin;
}

export const BusModel: React.FC<BusModelProps> = ({ selectedSkin }) => {
  const busRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (busRef.current) {
      busRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main Bus Body */}
      <mesh ref={busRef} position={[0, 0, 0]}>
        <boxGeometry args={[4, 2, 1.5]} />
        <meshStandardMaterial 
          color={selectedSkin.color}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Bus Front */}
      <mesh position={[2.1, 0, 0]}>
        <boxGeometry args={[0.2, 1.8, 1.4]} />
        <meshStandardMaterial 
          color={selectedSkin.accentColor || selectedSkin.color}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Bus Roof */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[4.2, 0.2, 1.6]} />
        <meshStandardMaterial 
          color="#2c2c2c"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Windows */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, index) => (
        <mesh key={index} position={[x, 0.3, 0.76]}>
          <boxGeometry args={[0.6, 0.8, 0.02]} />
          <meshStandardMaterial 
            color="#87CEEB"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Front Windshield */}
      <mesh position={[2.05, 0.3, 0]}>
        <boxGeometry args={[0.02, 0.8, 1.2]} />
        <meshStandardMaterial 
          color="#87CEEB"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Wheels */}
      {[[-1.2, -1, -0.8], [-1.2, -1, 0.8], [1.2, -1, -0.8], [1.2, -1, 0.8]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Wheel Rims */}
      {[[-1.2, -1, -0.8], [-1.2, -1, 0.8], [1.2, -1, -0.8], [1.2, -1, 0.8]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.31, 16]} />
          <meshStandardMaterial 
            color="#c0c0c0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[-0.8, -0.2, 0.76]}>
        <boxGeometry args={[0.8, 1.2, 0.02]} />
        <meshStandardMaterial 
          color={selectedSkin.accentColor || "#333333"}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Headlights */}
      {[[2.11, 0.2, -0.4], [2.11, 0.2, 0.4]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffff88"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Side Stripes/Decoration */}
      <mesh position={[0, 0, 0.76]}>
        <boxGeometry args={[3.8, 0.2, 0.01]} />
        <meshStandardMaterial 
          color={selectedSkin.accentColor || "#ffffff"}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};
