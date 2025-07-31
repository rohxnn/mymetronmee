import React from 'react';

interface BeatConfiguratorProps {
  beats: number[];
  onBeatChange: (index: number, value: number) => void;
}

const BeatConfigurator: React.FC<BeatConfiguratorProps> = ({ beats, onBeatChange }) => {
  return (
    <div className="flex space-x-2">
      {beats.map((beat, index) => (
        <input
          key={index}
          type="number"
          className="w-16 p-2 bg-gray-700 border border-gray-600 rounded-md"
          value={beat}
          onChange={(e) => onBeatChange(index, parseInt(e.target.value))}
        />
      ))}
    </div>
  );
};

export default BeatConfigurator;