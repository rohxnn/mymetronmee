
'use client';

import { useState, useRef } from 'react';
import InstrumentSelector from './components/InstrumentSelector';
import ChordInput from './components/ChordInput';
import MusicPlayer from './components/MusicPlayer';

const instruments = [
  'acoustic_guitar_steel',
  'acoustic_guitar_nylon',
  'electric_guitar_clean',
  'electric_piano',
  'organ',
  'violin',
  'flute'
];

export default function HomePage() {
  const [selectedInstrument, setSelectedInstrument] = useState<string>(instruments[0]);
  const [chords, setChords] = useState<string>('C G Am F');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerateMusic = async () => {
    if (!chords) {
      alert('Please enter some chords.');
      return;
    }
    setLoading(true);
    setAudioUrl(null);
    setIsPlaying(false);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instrument: selectedInstrument, chords }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (error) {
      console.error(error);
      alert('Failed to generate music. Please check the console for more details.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'harmonify-tune.wav';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <InstrumentSelector
              instruments={instruments}
              selectedInstrument={selectedInstrument}
              onInstrumentChange={setSelectedInstrument}
            />
            <ChordInput chords={chords} onChordsChange={setChords} />
            <button
              onClick={handleGenerateMusic}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Music'}
            </button>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-700 p-6 rounded-lg">
            {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />} 
            <MusicPlayer
              audioUrl={audioUrl}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
