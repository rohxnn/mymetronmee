
import React from 'react';

interface MusicPlayerProps {
  audioUrl: string | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onDownload: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioUrl, isPlaying, onPlayPause, onDownload }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onPlayPause}
        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
        disabled={!audioUrl}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button
        onClick={onDownload}
        className="p-2 bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
        disabled={!audioUrl}
      >
        Download
      </button>
    </div>
  );
};

export default MusicPlayer;
