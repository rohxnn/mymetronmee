"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Stave, StaveNote, Voice, Formatter } from "vexflow";
import ChordInput from "./ChordInput";
import BeatConfigurator from "./BeatConfigurator";



const ScoreEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<string[]>(["C/4", "D/4", "E/4", "F/4"]);
  const [chords, setChords] = useState("C G Am F");
  const [beats, setBeats] = useState([1, 1, 1, 1]);
  const [instrument, setInstrument] = useState("guitar-acoustic");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
      renderer.resize(500, 200);
      const context = renderer.getContext();
      const stave = new Stave(10, 40, 400);
      stave.addClef("treble").addTimeSignature("4/4");
      stave.setContext(context).draw();

      const staveNotes = notes.map((note) => new StaveNote({ keys: [note], duration: "q" }));

      const voice = new Voice({ num_beats: 4, beat_value: 4 });
      voice.addTickables(staveNotes);

      new Formatter().joinVoices([voice]).format([voice], 350);

      voice.draw(context, stave);
    }
  }, [notes]);

  useEffect(() => {
    if ((window as any).Tone && (window as any).SampleLibrary) {
      setIsLoaded(true);
    }
  }, []);

  const playMusic = () => {
    if (!isLoaded) {
      console.warn("Tone.js or SampleLibrary not loaded yet.");
      return;
    }

    const sampler = (window as any).SampleLibrary.load({
      instruments: instrument,
    });

    const chordArr = chords.split(" ");
    let time = 0;
    chordArr.forEach((chord) => {
      beats.forEach((beat) => {
        (window as any).Tone.Transport.scheduleOnce((time: any) => {
          sampler.triggerAttackRelease("C4", "8n", time);
        }, time);
        time += beat;
      });
    });

    (window as any).Tone.Transport.start();
  };

  const handleBeatChange = (index: number, value: number) => {
    const newBeats = [...beats];
    newBeats[index] = value;
    setBeats(newBeats);
  };

  return (
    <div>
      <select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
        <option value="guitar-acoustic">Acoustic Guitar</option>
        <option value="piano">Piano</option>
        <option value="bass-electric">Electric Bass</option>
        <option value="violin">Violin</option>
      </select>
      <ChordInput chords={chords} onChordsChange={setChords} />
      <BeatConfigurator beats={beats} onBeatChange={handleBeatChange} />
      <div ref={containerRef} className="border rounded-lg p-4"></div>
      <button onClick={playMusic} className="mt-4 bg-primary text-on-primary px-4 py-2 rounded-lg" disabled={!isLoaded}>
        Play
      </button>
    </div>
  );
};

export default ScoreEditor;