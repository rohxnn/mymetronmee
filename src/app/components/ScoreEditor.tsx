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
  const [instrument, setInstrument] = useState("Synth");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<any>(null);
  const partRef = useRef<any>(null);

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
    if ((window as any).Tone) {
      synthRef.current = new (window as any).Tone.PolySynth((window as any).Tone[instrument]).toDestination();
      setIsLoaded(true);
    }
  }, [instrument]);

  useEffect(() => {
    return () => {
      if (partRef.current) {
        partRef.current.stop();
        partRef.current.clear();
      }
      if ((window as any).Tone) {
        (window as any).Tone.Transport.stop();
        (window as any).Tone.Transport.cancel();
      }
    };
  }, []);

  const playMusic = () => {
    if (!isLoaded || !synthRef.current) {
      console.warn("Tone.js not loaded yet.");
      return;
    }

    if (isPlaying) {
      (window as any).Tone.Transport.stop();
      setIsPlaying(false);
      return;
    }

    if (partRef.current) {
      partRef.current.stop();
      partRef.current.clear();
    }
    (window as any).Tone.Transport.stop();
    (window as any).Tone.Transport.cancel();

    const chordArr = chords.split(" ");
    const events = [];
    let time = 0;
    for (let i = 0; i < chordArr.length; i++) {
      const chord = chordArr[i];
      const beat = beats[i % beats.length];
      events.push({ time, note: chord + "4", duration: "8n" });
      time += beat;
    }

    partRef.current = new (window as any).Tone.Part((time: any, value: any) => {
      synthRef.current.triggerAttackRelease(value.note, value.duration, time);
    }, events).start(0);

    (window as any).Tone.Transport.start();
    setIsPlaying(true);

    (window as any).Tone.Transport.on("stop", () => {
      setIsPlaying(false);
    });
  };

  const handleBeatChange = (index: number, value: number) => {
    const newBeats = [...beats];
    newBeats[index] = value;
    setBeats(newBeats);
  };

  return (
    <div>
      <select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
        <option value="Synth">Synth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="DuoSynth">DuoSynth</option>
        <option value="MembraneSynth">MembraneSynth</option>
        <option value="MetalSynth">MetalSynth</option>
        <option value="MonoSynth">MonoSynth</option>
        <option value="NoiseSynth">NoiseSynth</option>
        <option value="PluckSynth">PluckSynth</option>
      </select>
      <ChordInput chords={chords} onChordsChange={setChords} />
      <BeatConfigurator beats={beats} onBeatChange={handleBeatChange} />
      <div ref={containerRef} className="border rounded-lg p-4"></div>
      <button onClick={playMusic} className="mt-4 bg-primary text-on-primary px-4 py-2 rounded-lg" disabled={!isLoaded}>
        {isPlaying ? "Stop" : "Play"}
      </button>
    </div>
  );
};

export default ScoreEditor;