
import React from 'react';

interface ChordInputProps {
  chords: string;
  onChordsChange: (chords: string) => void;
}

const ChordInput: React.FC<ChordInputProps> = ({ chords, onChordsChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="chords" className="block text-lg font-medium mb-2">Enter Chords</label>
      <textarea
        id="chords"
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
        rows={4}
        value={chords}
        onChange={(e) => onChordsChange(e.target.value)}
        placeholder="e.g., C G Am F"
      />
    </div>
  );
};

export default ChordInput;
