
import Link from 'next/link';

export default function InstrumentCard({ instrument }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img src={instrument.image} alt={instrument.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{instrument.name}</h3>
      </div>
    </div>
  );
}
