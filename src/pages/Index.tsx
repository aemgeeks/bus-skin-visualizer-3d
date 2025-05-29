
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { BusModel } from '@/components/BusModel';
import { SkinSelector } from '@/components/SkinSelector';
import { skins } from '@/data/skins';

const Index = () => {
  const [selectedSkin, setSelectedSkin] = useState(skins[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Bus Designer
            </h1>
            <p className="text-gray-400">Choose your perfect bus skin</p>
          </div>
          
          <SkinSelector 
            skins={skins}
            selectedSkin={selectedSkin}
            onSkinSelect={setSelectedSkin}
          />
        </div>

        {/* Main 3D View */}
        <div className="flex-1 relative">
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-black/20 backdrop-blur-xl rounded-lg p-4 border border-white/10">
              <h2 className="text-xl font-semibold mb-1">{selectedSkin.name}</h2>
              <p className="text-gray-400 text-sm">{selectedSkin.description}</p>
            </div>
          </div>

          <div className="absolute top-6 right-6 z-20">
            <div className="bg-black/20 backdrop-blur-xl rounded-lg p-3 border border-white/10">
              <p className="text-sm text-gray-400">Drag to rotate • Scroll to zoom</p>
            </div>
          </div>

          <Canvas
            camera={{ position: [8, 4, 8], fov: 50 }}
            className="w-full h-full"
          >
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            
            <BusModel selectedSkin={selectedSkin} />
            
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.75}
              scale={10}
              blur={2.5}
              far={4}
            />
            
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={6}
              maxDistance={20}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI - Math.PI / 6}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Index;
