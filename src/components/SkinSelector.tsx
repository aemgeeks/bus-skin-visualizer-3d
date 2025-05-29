
import React from 'react';
import { Skin } from '@/types/skin';

interface SkinSelectorProps {
  skins: Skin[];
  selectedSkin: Skin;
  onSkinSelect: (skin: Skin) => void;
}

export const SkinSelector: React.FC<SkinSelectorProps> = ({
  skins,
  selectedSkin,
  onSkinSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Available Skins</h3>
      {skins.map((skin) => (
        <div
          key={skin.id}
          onClick={() => onSkinSelect(skin)}
          className={`cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-105 ${
            selectedSkin.id === skin.id
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/25'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-lg border-2 border-white/20"
              style={{ backgroundColor: skin.color }}
            />
            <div className="flex-1">
              <h4 className="font-semibold text-white">{skin.name}</h4>
              <p className="text-sm text-gray-400 mt-1">{skin.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                  {skin.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
