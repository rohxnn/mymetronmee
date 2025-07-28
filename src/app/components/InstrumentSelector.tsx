
import React from 'react';

interface InstrumentSelectorProps {
  instruments: string[];
  selectedInstrument: string;
  onInstrumentChange: (instrument: string) => void;
}

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({ instruments, selectedInstrument, onInstrumentChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="instrument" className="block text-lg font-medium mb-2">Select Instrument</label>
      <select
        id="instrument"
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
        value={selectedInstrument}
        onChange={(e) => onInstrumentChange(e.target.value)}
      >
        {instruments.map((instrument) => (
          <option key={instrument} value={instrument}>{instrument}</option>
        ))}
      </select>
    </div>
  );
};

export default InstrumentSelector;
