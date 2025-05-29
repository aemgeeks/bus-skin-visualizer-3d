
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Skin } from '@/types/skin';

interface BusModelProps {
  selectedSkin: Skin;
}

export const BusModel: React.FC<BusModelProps> = ({ selectedSkin }) => {
  const busRef = useRef<Group>(null);

  useFrame((state) => {
    if (busRef.current) {
      busRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const isRainbowExpress = selectedSkin.id === 'rainbow-express';

  return (
    <group position={[0, -0.5, 0]} ref={busRef}>
      {/* Main Bus Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[6, 2.5, 2.2]} />
        <meshStandardMaterial 
          color={selectedSkin.color}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>

      {/* Bus Front Section */}
      <mesh position={[3.2, 0.5, 0]}>
        <boxGeometry args={[0.4, 2.3, 2.1]} />
        <meshStandardMaterial 
          color={selectedSkin.color}
          metalness={0.3}
          roughness={0.3}
        />
      </mesh>

      {/* Rainbow Stripes for Rainbow Express skin */}
      {isRainbowExpress && (
        <>
          {/* Green stripe */}
          <mesh position={[-0.5, 0.2, 1.11]}>
            <boxGeometry args={[4, 0.8, 0.02]} />
            <meshStandardMaterial color="#22C55E" metalness={0.3} roughness={0.4} />
          </mesh>
          
          {/* Blue stripe */}
          <mesh position={[0, -0.1, 1.11]}>
            <boxGeometry args={[5, 0.6, 0.02]} />
            <meshStandardMaterial color="#3B82F6" metalness={0.3} roughness={0.4} />
          </mesh>
          
          {/* Yellow stripe */}
          <mesh position={[0.5, -0.5, 1.11]}>
            <boxGeometry args={[4, 0.5, 0.02]} />
            <meshStandardMaterial color="#EAB308" metalness={0.3} roughness={0.4} />
          </mesh>
          
          {/* Red stripe */}
          <mesh position={[1, -0.8, 1.11]}>
            <boxGeometry args={[3, 0.4, 0.02]} />
            <meshStandardMaterial color="#EF4444" metalness={0.3} roughness={0.4} />
          </mesh>

          {/* Orange accent */}
          <mesh position={[1.5, -1.1, 1.11]}>
            <boxGeometry args={[2, 0.3, 0.02]} />
            <meshStandardMaterial color="#F97316" metalness={0.3} roughness={0.4} />
          </mesh>
        </>
      )}

      {/* Regular accent stripe for other skins */}
      {!isRainbowExpress && (
        <mesh position={[0, 0, 1.11]}>
          <boxGeometry args={[5.5, 0.4, 0.02]} />
          <meshStandardMaterial 
            color={selectedSkin.accentColor || "#333333"}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      )}

      {/* Bus Roof */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[6.2, 0.2, 2.3]} />
        <meshStandardMaterial 
          color="#E5E7EB"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Windows */}
      {[-2, -1, 0, 1, 2].map((x, index) => (
        <mesh key={index} position={[x, 0.8, 1.11]}>
          <boxGeometry args={[0.7, 1, 0.02]} />
          <meshStandardMaterial 
            color="#87CEEB"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Front Windshield */}
      <mesh position={[3.11, 0.8, 0]}>
        <boxGeometry args={[0.02, 1.2, 1.8]} />
        <meshStandardMaterial 
          color="#87CEEB"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Wheels */}
      {[[-2, -1.25, -1.2], [-2, -1.25, 1.2], [2, -1.25, -1.2], [2, -1.25, 1.2]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Wheel Rims */}
      {[[-2, -1.25, -1.2], [-2, -1.25, 1.2], [2, -1.25, -1.2], [2, -1.25, 1.2]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.41, 16]} />
          <meshStandardMaterial 
            color="#c0c0c0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Door */}
      <mesh position={[-1.5, 0, 1.11]}>
        <boxGeometry args={[1, 1.8, 0.02]} />
        <meshStandardMaterial 
          color={selectedSkin.accentColor || "#333333"}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Headlights */}
      {[[3.21, 0.3, -0.6], [3.21, 0.3, 0.6]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffff88"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Taillights */}
      {[[-3.01, 0.2, -0.8], [-3.01, 0.2, 0.8]].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Bus Company Logo Area */}
      <mesh position={[2.5, 1.2, 1.11]}>
        <boxGeometry args={[1.2, 0.6, 0.01]} />
        <meshStandardMaterial 
          color="#1F2937"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};
