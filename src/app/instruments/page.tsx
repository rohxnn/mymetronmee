import InstrumentCard from '../components/InstrumentCard';
import { instruments } from '../lib/instruments';

export default function Instruments() {{
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Instruments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {{instruments.map((instrument) => (
          <InstrumentCard key={{instrument.id}} instrument={{instrument}} />
        ))}}
      </div>
    </div>
  );
}}
