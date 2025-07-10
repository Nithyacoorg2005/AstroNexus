import React, { useState } from 'react';
import { Scale, RotateCcw, Info, ArrowLeftRight } from 'lucide-react';

interface CelestialBody {
  id: string;
  name: string;
  type: 'planet' | 'star' | 'moon';
  diameter: number; // in kilometers
  mass: number; // in Earth masses
  temperature: number; // in Celsius
  color: string;
  description: string;
  facts: string[];
}

const celestialBodies: CelestialBody[] = [
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    diameter: 12756,
    mass: 1,
    temperature: 15,
    color: '#4F94CD',
    description: 'Our home planet with perfect conditions for life',
    facts: [
      '71% of surface is covered by water',
      'Only known planet with life',
      'Has one natural satellite (Moon)',
      'Atmosphere is 78% nitrogen, 21% oxygen'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    diameter: 142984,
    mass: 317.8,
    temperature: -110,
    color: '#DAA520',
    description: 'The largest planet in our solar system',
    facts: [
      'Has a Great Red Spot storm',
      'More than 75 known moons',
      'Made mostly of hydrogen and helium',
      'Could fit all other planets inside it'
    ]
  },
  {
    id: 'sun',
    name: 'Sun',
    type: 'star',
    diameter: 1392700,
    mass: 333000,
    temperature: 5500,
    color: '#FDB813',
    description: 'Our nearest star and the center of our solar system',
    facts: [
      'Contains 99.86% of solar system mass',
      'Core temperature is 15 million°C',
      'Converts 4 million tons of mass to energy per second',
      'Light takes 8 minutes to reach Earth'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    diameter: 6792,
    mass: 0.107,
    temperature: -65,
    color: '#CD5C5C',
    description: 'The Red Planet with signs of ancient water',
    facts: [
      'Has the largest volcano in the solar system',
      'Day length is similar to Earth (24.6 hours)',
      'Has polar ice caps',
      'Atmosphere is 95% carbon dioxide'
    ]
  },
  {
    id: 'moon',
    name: 'Moon',
    type: 'moon',
    diameter: 3475,
    mass: 0.012,
    temperature: -20,
    color: '#C0C0C0',
    description: 'Earth\'s only natural satellite',
    facts: [
      'Always shows the same face to Earth',
      'Creates tides on Earth',
      'Formed from debris after a Mars-sized impact',
      'Is gradually moving away from Earth'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    diameter: 12104,
    mass: 0.815,
    temperature: 464,
    color: '#FFA500',
    description: 'The hottest planet due to extreme greenhouse effect',
    facts: [
      'Rotates backwards compared to most planets',
      'One day is longer than one year',
      'Surface pressure is 90 times that of Earth',
      'Thick atmosphere of carbon dioxide'
    ]
  }
];

const PlanetComparison: React.FC = () => {
  const [selectedBodies, setSelectedBodies] = useState<CelestialBody[]>([
    celestialBodies[0], // Earth
    celestialBodies[1]  // Jupiter
  ]);
  const [comparisonMode, setComparisonMode] = useState<'size' | 'mass' | 'temperature'>('size');

  const handleBodySelect = (body: CelestialBody, index: number) => {
    const newSelectedBodies = [...selectedBodies];
    newSelectedBodies[index] = body;
    setSelectedBodies(newSelectedBodies);
  };

  const getScaleValue = (body: CelestialBody) => {
    switch (comparisonMode) {
      case 'size':
        return body.diameter;
      case 'mass':
        return body.mass;
      case 'temperature':
        return Math.abs(body.temperature) + 273; // Convert to Kelvin for positive values
      default:
        return body.diameter;
    }
  };

  const getDisplayValue = (body: CelestialBody) => {
    switch (comparisonMode) {
      case 'size':
        return `${body.diameter.toLocaleString()} km`;
      case 'mass':
        return `${body.mass} Earth masses`;
      case 'temperature':
        return `${body.temperature}°C`;
      default:
        return `${body.diameter.toLocaleString()} km`;
    }
  };

  const getRelativeSize = (body: CelestialBody) => {
    const maxValue = Math.max(...selectedBodies.map(getScaleValue));
    const bodyValue = getScaleValue(body);
    const minSize = 40; // Minimum size in pixels
    const maxSize = 200; // Maximum size in pixels
    
    return minSize + (bodyValue / maxValue) * (maxSize - minSize);
  };

  const getRatio = () => {
    if (selectedBodies.length < 2) return 1;
    const value1 = getScaleValue(selectedBodies[0]);
    const value2 = getScaleValue(selectedBodies[1]);
    return value1 > value2 ? value1 / value2 : value2 / value1;
  };

  const resetComparison = () => {
    setSelectedBodies([celestialBodies[0], celestialBodies[1]]);
    setComparisonMode('size');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Celestial Body Comparison
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Compare the size, mass, and temperature of planets, stars, and moons in our solar system.
          </p>
        </div>

        {/* Comparison Mode Selector */}
        <div className="flex justify-center mb-8 animate-fade-in-delayed">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
            {['size', 'mass', 'temperature'].map((mode) => (
              <button
                key={mode}
                onClick={() => setComparisonMode(mode as typeof comparisonMode)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  comparisonMode === mode
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-8 animate-fade-in-stagger">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Scale className="h-6 w-6 mr-2 text-cyan-400" />
              Visual Comparison
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={resetComparison}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-white" />
                <span className="text-white">Reset</span>
              </button>
            </div>
          </div>

          {/* Comparison Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {selectedBodies.map((body, index) => (
              <div key={`${body.id}-${index}`} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div
                    className="rounded-full shadow-lg transition-all duration-500"
                    style={{
                      width: `${getRelativeSize(body)}px`,
                      height: `${getRelativeSize(body)}px`,
                      backgroundColor: body.color,
                      boxShadow: `0 0 20px ${body.color}40`
                    }}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{body.name}</h3>
                <p className="text-cyan-400 font-semibold mb-2">{getDisplayValue(body)}</p>
                <p className="text-white/60 text-sm">{body.description}</p>
              </div>
            ))}
          </div>

          {/* Ratio Display */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-white font-semibold">{selectedBodies[0].name}</span>
              <ArrowLeftRight className="h-5 w-5 text-cyan-400" />
              <span className="text-white font-semibold">{selectedBodies[1].name}</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">
              Ratio: {getRatio().toFixed(2)}:1
            </div>
            <p className="text-white/60 text-sm mt-2">
              {getRatio() > 1 
                ? `${selectedBodies[0].name} is ${getRatio().toFixed(2)} times larger`
                : `${selectedBodies[1].name} is ${getRatio().toFixed(2)} times larger`
              }
            </p>
          </div>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-final">
          {[0, 1].map((index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Selection {index + 1}: {selectedBodies[index].name}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {celestialBodies.map((body) => (
                  <button
                    key={body.id}
                    onClick={() => handleBodySelect(body, index)}
                    className={`p-3 rounded-xl border text-center transition-all hover:scale-105 ${
                      selectedBodies[index].id === body.id
                        ? 'bg-cyan-400/20 border-cyan-400'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: body.color }}
                    />
                    <div className="text-white text-sm font-medium">{body.name}</div>
                    <div className="text-white/60 text-xs">{body.type}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedBodies.map((body, index) => (
            <div key={`details-${body.id}-${index}`} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: body.color }}
                />
                <h3 className="text-lg font-bold text-white">{body.name}</h3>
                <Info className="h-5 w-5 text-cyan-400" />
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Type:</span>
                    <span className="text-white font-medium ml-2">{body.type}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Diameter:</span>
                    <span className="text-white font-medium ml-2">{body.diameter.toLocaleString()} km</span>
                  </div>
                  <div>
                    <span className="text-white/60">Mass:</span>
                    <span className="text-white font-medium ml-2">{body.mass} Earth masses</span>
                  </div>
                  <div>
                    <span className="text-white/60">Temperature:</span>
                    <span className="text-white font-medium ml-2">{body.temperature}°C</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Interesting Facts:</h4>
                  <ul className="space-y-1">
                    {body.facts.map((fact, factIndex) => (
                      <li key={factIndex} className="text-white/70 text-sm flex items-start">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetComparison;