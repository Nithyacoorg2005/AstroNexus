import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Volume2, VolumeX, Play, Pause, Download, Info, Eye, Layers, Globe, Star, Sparkles, Navigation, Telescope } from 'lucide-react';

interface CelestialBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon' | 'asteroid' | 'nebula' | 'galaxy';
  distance: number;
  size: number;
  color: string;
  rotationSpeed: number;
  orbitSpeed: number;
  temperature: string;
  description: string;
  soundFrequency: number;
  soundWaveform: 'sine' | 'square' | 'sawtooth' | 'triangle';
  textureUrl: string;
  nightTextureUrl?: string;
  cloudTextureUrl?: string;
  normalMapUrl?: string;
  specularMapUrl?: string;
  ringSystem?: {
    innerRadius: number;
    outerRadius: number;
    texture: string;
    opacity: number;
  };
  atmosphere?: {
    color: string;
    thickness: number;
    opacity: number;
  };
  moons: number;
  detailedInfo: {
    diameter: string;
    mass: string;
    gravity: string;
    dayLength: string;
    yearLength: string;
    atmosphere: string;
    composition: string;
    magneticField: string;
    waterPresence: string;
    exploration: string[];
    interestingFacts: string[];
    surfaceFeatures: string[];
    geology: string;
    weather: string;
    seasons: string;
    visibility: string;
    discoveryDate: string;
    namedAfter: string;
  };
  layers: {
    core: { description: string; temperature: string; composition: string; };
    mantle: { description: string; temperature: string; composition: string; };
    crust: { description: string; thickness: string; composition: string; };
    atmosphere: { description: string; composition: string; pressure: string; };
  };
}

const celestialBodies: CelestialBody[] = [
  {
    id: 'sun',
    name: 'Sun',
    type: 'star',
    distance: 0,
    size: 8,
    color: '#FDB813',
    rotationSpeed: 0.5,
    orbitSpeed: 0,
    temperature: '5,778 K',
    description: 'Our nearest star and the center of our solar system, containing 99.86% of the system\'s mass.',
    soundFrequency: 60,
    soundWaveform: 'sawtooth',
    textureUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1024&h=1024&fit=crop',
    atmosphere: {
      color: '#FFD700',
      thickness: 0.3,
      opacity: 0.6
    },
    moons: 0,
    detailedInfo: {
      diameter: '1,392,700 km (109 Earth diameters)',
      mass: '1.989 × 10³⁰ kg (333,000 Earth masses)',
      gravity: '274 m/s² (28 times Earth gravity)',
      dayLength: '25-35 days (differential rotation)',
      yearLength: '225-250 million years (galactic orbit)',
      atmosphere: 'Plasma corona extending millions of kilometers',
      composition: '73% hydrogen, 25% helium, 2% heavier elements',
      magneticField: 'Complex magnetic field with 11-year cycle',
      waterPresence: 'None - temperatures too extreme',
      exploration: ['Parker Solar Probe', 'Solar Orbiter', 'SOHO', 'SDO'],
      interestingFacts: [
        'Converts 4 million tons of mass to energy every second',
        'Core temperature reaches 15 million°C',
        'Light takes 8 minutes 20 seconds to reach Earth',
        'Contains 99.86% of solar system mass',
        'Surface has magnetic field 10,000 times stronger than Earth',
        'Solar wind travels at 400-800 km/s'
      ],
      surfaceFeatures: ['Sunspots', 'Solar flares', 'Coronal mass ejections', 'Prominences', 'Granulation'],
      geology: 'Plasma state - no solid surface, layered structure from core to corona',
      weather: 'Solar storms, coronal mass ejections, solar wind variations, 11-year solar cycle',
      seasons: 'No seasons - consistent nuclear fusion',
      visibility: 'Visible during day (never look directly!), best observed with solar filters',
      discoveryDate: 'Known since prehistoric times',
      namedAfter: 'Sol (Roman sun god), Helios (Greek sun god)'
    },
    layers: {
      core: { 
        description: 'Nuclear fusion reactor converting hydrogen to helium', 
        temperature: '15,000,000°C', 
        composition: 'Hydrogen plasma undergoing fusion' 
      },
      mantle: { 
        description: 'Radiative and convective zones transferring energy outward', 
        temperature: '2,000,000-7,000,000°C', 
        composition: 'Hydrogen and helium plasma' 
      },
      crust: { 
        description: 'Photosphere - visible surface layer', 
        thickness: '500 km', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Chromosphere and corona extending millions of kilometers', 
        composition: 'Ionized hydrogen and helium', 
        pressure: 'Varies from 0.01 to 100 Pa' 
      }
    }
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    distance: 4,
    size: 0.4,
    color: '#8C7853',
    rotationSpeed: 0.1,
    orbitSpeed: 0.04,
    temperature: '167°C',
    description: 'The smallest planet and closest to the Sun, with extreme temperature variations.',
    soundFrequency: 220,
    soundWaveform: 'square',
    textureUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1024&h=1024&fit=crop',
    normalMapUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1024&h=1024&fit=crop',
    moons: 0,
    detailedInfo: {
      diameter: '4,879 km (0.38 Earth diameters)',
      mass: '3.3011 × 10²³ kg (0.055 Earth masses)',
      gravity: '3.7 m/s² (0.38 Earth gravity)',
      dayLength: '58.6 Earth days',
      yearLength: '88 Earth days',
      atmosphere: 'Extremely thin exosphere',
      composition: 'Large iron core, thin silicate mantle',
      magneticField: 'Weak global field (1% of Earth\'s)',
      waterPresence: 'Water ice in polar craters',
      exploration: ['Mariner 10', 'MESSENGER', 'BepiColombo'],
      interestingFacts: [
        'Most eccentric orbit of all planets',
        'One day longer than one year',
        'Temperature range: -173°C to 427°C',
        'Has cliffs up to 3 km high',
        'Largest iron core relative to size',
        'No moons or ring system'
      ],
      surfaceFeatures: ['Caloris Basin', 'Discovery Rupes', 'Rachmaninoff Crater', 'Hokusai Crater'],
      geology: 'Heavily cratered surface with large impact basins and extensive cliff systems',
      weather: 'No weather due to lack of atmosphere; extreme day/night temperature variations',
      seasons: 'No seasons due to nearly zero axial tilt',
      visibility: 'Difficult to observe; best during greatest elongations',
      discoveryDate: 'Known since ancient times',
      namedAfter: 'Roman messenger god Mercury'
    },
    layers: {
      core: { 
        description: 'Massive iron core making up 75% of radius', 
        temperature: '1,500-2,000°C', 
        composition: 'Iron and nickel' 
      },
      mantle: { 
        description: 'Thin silicate mantle', 
        temperature: '1,000-1,500°C', 
        composition: 'Silicate rock' 
      },
      crust: { 
        description: 'Thin rocky crust with impact craters', 
        thickness: '100-300 km', 
        composition: 'Silicate rock and basalt' 
      },
      atmosphere: { 
        description: 'Extremely thin exosphere', 
        composition: 'Oxygen, sodium, hydrogen, helium', 
        pressure: '10⁻¹⁵ bar' 
      }
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    distance: 6,
    size: 0.9,
    color: '#FFA500',
    rotationSpeed: -0.07,
    orbitSpeed: 0.03,
    temperature: '464°C',
    description: 'The hottest planet due to extreme greenhouse effect, often called Earth\'s twin.',
    soundFrequency: 150,
    soundWaveform: 'sine',
    textureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    cloudTextureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    atmosphere: {
      color: '#FFA500',
      thickness: 0.2,
      opacity: 0.8
    },
    moons: 0,
    detailedInfo: {
      diameter: '12,104 km (0.95 Earth diameters)',
      mass: '4.8675 × 10²⁴ kg (0.815 Earth masses)',
      gravity: '8.87 m/s² (0.904 Earth gravity)',
      dayLength: '243 Earth days (retrograde)',
      yearLength: '225 Earth days',
      atmosphere: 'Dense CO₂ with sulfuric acid clouds',
      composition: 'Iron core, silicate mantle, basaltic crust',
      magneticField: 'No global magnetic field',
      waterPresence: 'Trace water vapor; likely had oceans',
      exploration: ['Venera series', 'Magellan', 'Venus Express', 'Akatsuki'],
      interestingFacts: [
        'Rotates backwards (retrograde)',
        'Day longer than year',
        'Surface pressure 90 times Earth\'s',
        'Clouds made of sulfuric acid',
        'Brightest planet in sky',
        'Surface hot enough to melt lead'
      ],
      surfaceFeatures: ['Maxwell Montes', 'Ishtar Terra', 'Aphrodite Terra', 'Coronae', 'Arachnoids'],
      geology: 'Volcanic plains, impact craters, mountain ranges, unique geological features',
      weather: 'Extreme greenhouse effect, sulfuric acid rain, hurricane-force upper winds',
      seasons: 'No seasons due to minimal axial tilt',
      visibility: 'Third brightest object in sky; morning/evening star',
      discoveryDate: 'Known since ancient times',
      namedAfter: 'Roman goddess of love and beauty'
    },
    layers: {
      core: { 
        description: 'Iron-nickel core similar to Earth', 
        temperature: '4,000-5,000°C', 
        composition: 'Iron and nickel' 
      },
      mantle: { 
        description: 'Hot silicate mantle with volcanism', 
        temperature: '1,200-4,000°C', 
        composition: 'Silicate rock' 
      },
      crust: { 
        description: 'Basaltic crust with volcanic features', 
        thickness: '20-50 km', 
        composition: 'Basaltic rock' 
      },
      atmosphere: { 
        description: 'Extremely dense CO₂ atmosphere', 
        composition: '96.5% CO₂, 3.5% nitrogen', 
        pressure: '92 bar' 
      }
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    distance: 8,
    size: 1,
    color: '#4F94CD',
    rotationSpeed: 1,
    orbitSpeed: 0.02,
    temperature: '15°C',
    description: 'Our home planet, the only known world to harbor life.',
    soundFrequency: 110,
    soundWaveform: 'sine',
    textureUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1024&h=1024&fit=crop',
    nightTextureUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1024&h=1024&fit=crop',
    cloudTextureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    normalMapUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1024&h=1024&fit=crop',
    specularMapUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1024&h=1024&fit=crop',
    atmosphere: {
      color: '#87CEEB',
      thickness: 0.15,
      opacity: 0.3
    },
    moons: 1,
    detailedInfo: {
      diameter: '12,756 km',
      mass: '5.972 × 10²⁴ kg',
      gravity: '9.8 m/s²',
      dayLength: '24 hours',
      yearLength: '365.25 days',
      atmosphere: 'Nitrogen-oxygen with water vapor',
      composition: 'Iron core, silicate mantle, diverse crust',
      magneticField: 'Strong dipolar field',
      waterPresence: '71% surface covered by oceans',
      exploration: ['Continuous human habitation', 'ISS', 'Thousands of satellites'],
      interestingFacts: [
        'Only known planet with life',
        'Has plate tectonics',
        'Moon stabilizes axial tilt',
        'Atmosphere protects from radiation',
        'Complex climate system',
        'Millions of species'
      ],
      surfaceFeatures: ['Mount Everest', 'Mariana Trench', 'Amazon Rainforest', 'Sahara Desert', 'Great Barrier Reef'],
      geology: 'Active plate tectonics, diverse rock types, continuous geological processes',
      weather: 'Complex weather systems with storms, precipitation, seasonal variations',
      seasons: 'Four distinct seasons due to 23.5° axial tilt',
      visibility: 'Home planet - observed from space',
      discoveryDate: 'Home planet',
      namedAfter: 'Old English "eorþe" meaning ground or soil'
    },
    layers: {
      core: { 
        description: 'Solid inner and liquid outer core', 
        temperature: '4,000-6,000°C', 
        composition: 'Iron and nickel' 
      },
      mantle: { 
        description: 'Hot convecting silicate mantle', 
        temperature: '500-4,000°C', 
        composition: 'Silicate minerals' 
      },
      crust: { 
        description: 'Oceanic and continental crust', 
        thickness: '5-70 km', 
        composition: 'Basalt and granite' 
      },
      atmosphere: { 
        description: 'Life-supporting atmosphere', 
        composition: '78% nitrogen, 21% oxygen', 
        pressure: '1 bar' 
      }
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    distance: 10,
    size: 0.7,
    color: '#CD5C5C',
    rotationSpeed: 0.97,
    orbitSpeed: 0.015,
    temperature: '-65°C',
    description: 'The Red Planet with evidence of ancient water and potential for past life.',
    soundFrequency: 180,
    soundWaveform: 'triangle',
    textureUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1024&h=1024&fit=crop',
    normalMapUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1024&h=1024&fit=crop',
    atmosphere: {
      color: '#CD853F',
      thickness: 0.05,
      opacity: 0.2
    },
    moons: 2,
    detailedInfo: {
      diameter: '6,792 km (0.53 Earth diameters)',
      mass: '6.4171 × 10²³ kg (0.107 Earth masses)',
      gravity: '3.71 m/s² (0.38 Earth gravity)',
      dayLength: '24 hours 37 minutes',
      yearLength: '687 Earth days',
      atmosphere: 'Thin CO₂ atmosphere',
      composition: 'Iron core, basaltic mantle, iron oxide crust',
      magneticField: 'No global field, localized crustal fields',
      waterPresence: 'Water ice at poles, subsurface water',
      exploration: ['Multiple rovers', 'Orbiters', 'Future human missions planned'],
      interestingFacts: [
        'Largest volcano: Olympus Mons (21 km high)',
        'Day length similar to Earth',
        'Has seasons like Earth',
        'Planet-wide dust storms',
        'Two small moons: Phobos and Deimos',
        'Evidence of ancient rivers and lakes'
      ],
      surfaceFeatures: ['Olympus Mons', 'Valles Marineris', 'Polar ice caps', 'Impact craters', 'Ancient riverbeds'],
      geology: 'Ancient impact craters, massive volcanoes, deep canyons, evidence of water erosion',
      weather: 'Cold desert climate, seasonal dust storms, rapid temperature changes',
      seasons: 'Four seasons due to 25.2° axial tilt, each lasting twice as long as Earth\'s',
      visibility: 'Visible as red "star"; best during opposition',
      discoveryDate: 'Known since ancient times',
      namedAfter: 'Roman god of war'
    },
    layers: {
      core: { 
        description: 'Partially molten iron core', 
        temperature: '1,500-2,000°C', 
        composition: 'Iron with sulfur' 
      },
      mantle: { 
        description: 'Silicate mantle with past volcanism', 
        temperature: '500-1,500°C', 
        composition: 'Basaltic rock' 
      },
      crust: { 
        description: 'Iron oxide-rich crust (rusty)', 
        thickness: '50-125 km', 
        composition: 'Basaltic rock with iron oxide' 
      },
      atmosphere: { 
        description: 'Thin CO₂ atmosphere', 
        composition: '95% CO₂, 3% nitrogen, 1.6% argon', 
        pressure: '0.6% of Earth\'s' 
      }
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    distance: 15,
    size: 3,
    color: '#DAA520',
    rotationSpeed: 2.4,
    orbitSpeed: 0.008,
    temperature: '-110°C',
    description: 'The largest planet with a mass greater than all other planets combined.',
    soundFrequency: 80,
    soundWaveform: 'sawtooth',
    textureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    atmosphere: {
      color: '#DAA520',
      thickness: 0.4,
      opacity: 0.7
    },
    moons: 79,
    detailedInfo: {
      diameter: '142,984 km (11.2 Earth diameters)',
      mass: '1.898 × 10²⁷ kg (317.8 Earth masses)',
      gravity: '24.79 m/s² (2.53 Earth gravity)',
      dayLength: '9 hours 56 minutes',
      yearLength: '11.9 Earth years',
      atmosphere: 'Hydrogen and helium with complex storms',
      composition: 'Gas giant with possible rocky core',
      magneticField: 'Strongest in solar system (20,000x Earth\'s)',
      waterPresence: 'Water vapor in atmosphere, subsurface oceans on moons',
      exploration: ['Pioneer', 'Voyager', 'Galileo', 'Juno'],
      interestingFacts: [
        'Could fit all other planets inside',
        '79+ known moons',
        'Great Red Spot larger than Earth',
        'Acts as cosmic vacuum cleaner',
        'Shortest day of any planet',
        'Radiates more heat than receives'
      ],
      surfaceFeatures: ['Great Red Spot', 'Atmospheric bands', 'Storm systems', 'Cloud formations'],
      geology: 'No solid surface; gas giant with layered atmosphere',
      weather: 'Complex storms, Great Red Spot, wind speeds up to 640 km/h',
      seasons: 'Minimal seasonal variation due to small axial tilt',
      visibility: 'Fourth brightest object in sky',
      discoveryDate: 'Known since ancient times',
      namedAfter: 'Roman king of gods'
    },
    layers: {
      core: { 
        description: 'Possible rocky core under extreme pressure', 
        temperature: '20,000°C', 
        composition: 'Rock and hydrogen compounds' 
      },
      mantle: { 
        description: 'Metallic hydrogen layer', 
        temperature: '10,000-20,000°C', 
        composition: 'Metallic hydrogen and helium' 
      },
      crust: { 
        description: 'No solid crust - gas giant', 
        thickness: 'N/A', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Thick atmosphere with storm systems', 
        composition: '89% hydrogen, 10% helium, 1% other', 
        pressure: 'Increases dramatically with depth' 
      }
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    distance: 20,
    size: 2.5,
    color: '#FAD5A5',
    rotationSpeed: 2.2,
    orbitSpeed: 0.006,
    temperature: '-140°C',
    description: 'Famous for its spectacular ring system and lowest density of any planet.',
    soundFrequency: 90,
    soundWaveform: 'sine',
    textureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    ringSystem: {
      innerRadius: 1.2,
      outerRadius: 2.3,
      texture: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
      opacity: 0.8
    },
    atmosphere: {
      color: '#FAD5A5',
      thickness: 0.3,
      opacity: 0.6
    },
    moons: 82,
    detailedInfo: {
      diameter: '120,536 km (9.4 Earth diameters)',
      mass: '5.683 × 10²⁶ kg (95.2 Earth masses)',
      gravity: '10.44 m/s² (1.065 Earth gravity)',
      dayLength: '10 hours 42 minutes',
      yearLength: '29.5 Earth years',
      atmosphere: 'Hydrogen and helium with ammonia clouds',
      composition: 'Gas giant with lowest density',
      magneticField: 'Strong field tilted relative to rotation',
      waterPresence: 'Water ice in rings, subsurface oceans on moons',
      exploration: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens'],
      interestingFacts: [
        'Most spectacular ring system',
        'Density lower than water',
        'Hexagonal storm at north pole',
        'Titan has methane lakes',
        'Enceladus has water geysers',
        'Shepherd moons maintain rings'
      ],
      surfaceFeatures: ['Ring system', 'Hexagonal polar storm', 'Atmospheric bands', 'Storm systems'],
      geology: 'No solid surface; gas giant with extensive ring system',
      weather: 'High-speed winds up to 1,800 km/h, hexagonal polar storm',
      seasons: 'Seasonal changes due to 26.7° tilt; each season lasts 7 Earth years',
      visibility: 'Visible to naked eye; rings visible through telescope',
      discoveryDate: 'Known since ancient times',
      namedAfter: 'Roman god of agriculture'
    },
    layers: {
      core: { 
        description: 'Small rocky core', 
        temperature: '11,700°C', 
        composition: 'Rock, ice, and metals' 
      },
      mantle: { 
        description: 'Metallic hydrogen layer', 
        temperature: '5,000-11,700°C', 
        composition: 'Metallic hydrogen and helium' 
      },
      crust: { 
        description: 'No solid crust - gas giant', 
        thickness: 'N/A', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Thick atmosphere with distinctive bands', 
        composition: '96% hydrogen, 3% helium, 1% other', 
        pressure: 'Increases with depth' 
      }
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    distance: 25,
    size: 1.8,
    color: '#4FD0E7',
    rotationSpeed: 1.4,
    orbitSpeed: 0.004,
    temperature: '-195°C',
    description: 'An ice giant tilted on its side, rotating at a 98-degree angle to its orbit.',
    soundFrequency: 120,
    soundWaveform: 'triangle',
    textureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    ringSystem: {
      innerRadius: 1.6,
      outerRadius: 2.0,
      texture: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
      opacity: 0.3
    },
    atmosphere: {
      color: '#4FD0E7',
      thickness: 0.2,
      opacity: 0.4
    },
    moons: 27,
    detailedInfo: {
      diameter: '51,118 km (4.0 Earth diameters)',
      mass: '8.681 × 10²⁵ kg (14.5 Earth masses)',
      gravity: '8.69 m/s² (0.886 Earth gravity)',
      dayLength: '17 hours 14 minutes (retrograde)',
      yearLength: '84 Earth years',
      atmosphere: 'Hydrogen, helium, and methane atmosphere',
      composition: 'Ice giant with water, methane, and ammonia ices',
      magneticField: 'Tilted magnetic field offset from center',
      waterPresence: 'Water ice in interior and possibly in moons',
      exploration: ['Voyager 2 (only spacecraft to visit)'],
      interestingFacts: [
        'Rotates on its side (98° axial tilt)',
        'Has extreme seasons lasting 21 Earth years each',
        'Coldest planetary atmosphere in solar system',
        'Has faint rings discovered in 1977',
        'Magnetic field is tilted 59° from rotation axis',
        'Named after Greek god of the sky'
      ],
      surfaceFeatures: ['Faint ring system', 'Atmospheric bands', 'Storm systems', 'Methane clouds'],
      geology: 'No solid surface; ice giant with rocky core surrounded by ices',
      weather: 'Extreme seasonal variations, high-speed winds up to 900 km/h, methane clouds',
      seasons: 'Extreme 84-year seasonal cycle due to extreme axial tilt',
      visibility: 'Barely visible to naked eye; discovered with telescope in 1781',
      discoveryDate: '1781 by William Herschel',
      namedAfter: 'Greek god of the sky'
    },
    layers: {
      core: { 
        description: 'Rocky core surrounded by ice mantle', 
        temperature: '5,000°C', 
        composition: 'Rock and possibly ice' 
      },
      mantle: { 
        description: 'Hot, dense fluid of water, methane, and ammonia ices', 
        temperature: '2,000-5,000°C', 
        composition: 'Water, methane, and ammonia ices under pressure' 
      },
      crust: { 
        description: 'No solid crust; gradual transition to atmosphere', 
        thickness: 'N/A - ice giant', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Hydrogen and helium atmosphere with methane giving blue color', 
        composition: '83% hydrogen, 15% helium, 2% methane', 
        pressure: 'Increases with depth' 
      }
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    distance: 30,
    size: 1.7,
    color: '#4169E1',
    rotationSpeed: 1.5,
    orbitSpeed: 0.002,
    temperature: '-200°C',
    description: 'The windiest planet with the fastest winds recorded, reaching speeds up to 2,100 km/h.',
    soundFrequency: 100,
    soundWaveform: 'sine',
    textureUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1024&h=1024&fit=crop',
    atmosphere: {
      color: '#4169E1',
      thickness: 0.25,
      opacity: 0.5
    },
    moons: 14,
    detailedInfo: {
      diameter: '49,528 km (3.9 Earth diameters)',
      mass: '1.024 × 10²⁶ kg (17.1 Earth masses)',
      gravity: '11.15 m/s² (1.14 Earth gravity)',
      dayLength: '16 hours 7 minutes',
      yearLength: '165 Earth years',
      atmosphere: 'Hydrogen, helium, and methane with dynamic weather',
      composition: 'Ice giant similar to Uranus with water, methane, and ammonia ices',
      magneticField: 'Strong magnetic field tilted 47° from rotation axis',
      waterPresence: 'Water ice in interior and moons',
      exploration: ['Voyager 2 (only spacecraft to visit)'],
      interestingFacts: [
        'Has the fastest winds in the solar system (up to 2,100 km/h)',
        'Takes 165 Earth years to orbit the Sun',
        'Has completed only one orbit since discovery in 1846',
        'Triton orbits backwards and may be a captured Kuiper Belt object',
        'Radiates 2.6 times more energy than it receives from Sun',
        'Has faint rings named after astronomers'
      ],
      surfaceFeatures: ['Great Dark Spot', 'Atmospheric bands', 'Storm systems', 'High-speed winds'],
      geology: 'No solid surface; ice giant with rocky core and mantle of ices',
      weather: 'Most dynamic weather in solar system with supersonic winds, large storms, methane clouds',
      seasons: 'Long seasonal cycles due to 165-year orbit and 28.3° axial tilt',
      visibility: 'Not visible to naked eye; discovered through mathematical prediction',
      discoveryDate: '1846 by Urbain Le Verrier and Johann Galle',
      namedAfter: 'Roman god of the sea'
    },
    layers: {
      core: { 
        description: 'Rocky core similar in size to Earth', 
        temperature: '5,400°C', 
        composition: 'Rock and possibly ice' 
      },
      mantle: { 
        description: 'Hot, dense fluid of water, methane, and ammonia ices', 
        temperature: '2,000-5,400°C', 
        composition: 'Water, methane, and ammonia ices under extreme pressure' 
      },
      crust: { 
        description: 'No solid crust; gradual transition to atmosphere', 
        thickness: 'N/A - ice giant', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Dynamic atmosphere with fastest winds in solar system', 
        composition: '80% hydrogen, 19% helium, 1% methane', 
        pressure: 'Increases dramatically with depth' 
      }
    }
  }
];

const UniverseExplorer: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState<CelestialBody>(celestialBodies[3]); // Start with Earth
  const [zoomLevel, setZoomLevel] = useState(2);
  const [textureMode, setTextureMode] = useState<'surface' | 'night' | 'clouds'>('surface');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<'core' | 'mantle' | 'crust' | 'atmosphere'>('core');
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [showRings, setShowRings] = useState(true);
  const [showMoons, setShowMoons] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const effectOscillatorRef = useRef<OscillatorNode | null>(null);

  const zoomLevels = [
    { name: 'Surface Detail', scale: 0.1, description: 'Extreme close-up surface features and textures' },
    { name: 'Local Scale', scale: 1, description: 'Regional features and atmospheric layers' },
    { name: 'Planetary Scale', scale: 2, description: 'Full celestial body with all features visible' },
    { name: 'System Scale', scale: 5, description: 'Body with moons, rings, and environment' },
    { name: 'Cosmic Scale', scale: 10, description: 'Wide field stellar neighborhood view' }
  ];

  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.error('Web Audio API not supported:', error);
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (autoRotate) {
      const interval = setInterval(() => {
        setRotation(prev => prev + selectedBody.rotationSpeed);
        // Add slight tilt variation for realism
        setTilt(prev => prev + Math.sin(Date.now() * 0.001) * 0.1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, selectedBody.rotationSpeed]);

  const playSound = () => {
    if (!audioContextRef.current) return;

    stopSound();

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    oscillator.type = selectedBody.soundWaveform;
    oscillator.frequency.setValueAtTime(selectedBody.soundFrequency, audioContext.currentTime);
    
    // Add modulation for realistic space sounds
    lfo.frequency.setValueAtTime(0.3, audioContext.currentTime);
    lfo.type = 'sine';
    lfoGain.gain.setValueAtTime(selectedBody.soundFrequency * 0.1, audioContext.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    lfo.start();

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(isMuted ? 0 : volume, audioContext.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  };

  const playSoundEffect = (type: 'zoom' | 'transition') => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    if (type === 'zoom') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    } else {
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.5);
    }

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleZoomIn = () => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1);
      playSoundEffect('zoom');
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel < zoomLevels.length - 1) {
      setZoomLevel(zoomLevel + 1);
      playSoundEffect('zoom');
    }
  };

  const handleBodySelect = (body: CelestialBody) => {
    const wasPlaying = isPlaying;
    if (isPlaying) {
      stopSound();
      setIsPlaying(false);
    }
    
    setSelectedBody(body);
    playSoundEffect('transition');
    
    if (wasPlaying) {
      setTimeout(() => {
        playSound();
        setIsPlaying(true);
      }, 600);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSound();
      setIsPlaying(false);
    } else {
      playSound();
      setIsPlaying(true);
    }
  };

  const getCurrentTexture = () => {
    switch (textureMode) {
      case 'night':
        return selectedBody.nightTextureUrl || selectedBody.textureUrl;
      case 'clouds':
        return selectedBody.cloudTextureUrl || selectedBody.textureUrl;
      default:
        return selectedBody.textureUrl;
    }
  };

  const getBodyScale = () => {
    const baseScale = selectedBody.size * zoomLevels[zoomLevel].scale;
    return Math.max(80, Math.min(500, baseScale * 30));
  };

  const PlanetRenderer: React.FC<{ body: CelestialBody; scale: number }> = ({ body, scale }) => {
    const planetStyle: React.CSSProperties = {
      width: `${scale}px`,
      height: `${scale}px`,
      borderRadius: '50%',
      position: 'relative',
      background: `
        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
        linear-gradient(45deg, ${body.color}dd 0%, ${body.color}aa 50%, ${body.color}77 100%)
      `,
      backgroundImage: `url(${getCurrentTexture()})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: `rotate(${rotation}deg) rotateX(${tilt}deg)`,
      boxShadow: `
        inset -${scale * 0.1}px -${scale * 0.1}px ${scale * 0.2}px rgba(0,0,0,0.6),
        0 0 ${scale * 0.3}px ${body.color}60,
        0 0 ${scale * 0.6}px ${body.color}30
      `,
      transition: 'all 0.3s ease-out',
      overflow: 'hidden'
    };

    // Add surface details overlay
    const surfaceOverlay: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: `
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 30%),
        radial-gradient(circle at 80% 60%, rgba(0,0,0,0.1) 0%, transparent 40%),
        radial-gradient(circle at 60% 80%, rgba(255,255,255,0.05) 0%, transparent 25%)
      `,
      opacity: zoomLevel <= 1 ? 1 : 0.5
    };

    return (
      <div className="relative flex items-center justify-center">
        {/* Atmospheric glow */}
        {body.atmosphere && showAtmosphere && (
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${scale * (1 + body.atmosphere.thickness)}px`,
              height: `${scale * (1 + body.atmosphere.thickness)}px`,
              background: `radial-gradient(circle, transparent 60%, ${body.atmosphere.color}${Math.floor(body.atmosphere.opacity * 255).toString(16)} 100%)`,
              filter: 'blur(8px)'
            }}
          />
        )}

        {/* Ring system */}
        {body.ringSystem && showRings && (
          <div className="absolute flex items-center justify-center">
            {/* Main rings */}
            <div
              className="absolute border-2 rounded-full opacity-80"
              style={{
                width: `${scale * body.ringSystem.outerRadius}px`,
                height: `${scale * 0.05}px`,
                borderColor: body.color,
                background: `linear-gradient(90deg, transparent 0%, ${body.color}40 20%, ${body.color}80 50%, ${body.color}40 80%, transparent 100%)`,
                boxShadow: `0 0 ${scale * 0.1}px ${body.color}60`,
                transform: `rotateX(75deg) rotateZ(${rotation * 0.1}deg)`
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute border rounded-full opacity-60"
              style={{
                width: `${scale * body.ringSystem.innerRadius}px`,
                height: `${scale * 0.03}px`,
                borderColor: body.color,
                background: `linear-gradient(90deg, transparent 0%, ${body.color}30 30%, ${body.color}60 70%, transparent 100%)`,
                transform: `rotateX(75deg) rotateZ(${rotation * 0.15}deg)`
              }}
            />
            {/* Outer ring */}
            <div
              className="absolute border rounded-full opacity-40"
              style={{
                width: `${scale * (body.ringSystem.outerRadius * 1.2)}px`,
                height: `${scale * 0.02}px`,
                borderColor: body.color,
                background: `linear-gradient(90deg, transparent 0%, ${body.color}20 40%, ${body.color}40 60%, transparent 100%)`,
                transform: `rotateX(75deg) rotateZ(${rotation * 0.05}deg)`
              }}
            />
          </div>
        )}

        {/* Main planet */}
        <div style={planetStyle}>
          {/* Surface detail overlay */}
          <div style={surfaceOverlay} />
          
          {/* Atmospheric effects for gas giants */}
          {(body.type === 'planet' && body.size > 2) && (
            <div
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                background: `
                  linear-gradient(0deg, ${body.color}20 0%, transparent 30%),
                  linear-gradient(45deg, transparent 40%, ${body.color}10 50%, transparent 60%),
                  linear-gradient(90deg, ${body.color}15 0%, transparent 20%, transparent 80%, ${body.color}15 100%)
                `,
                animation: 'spin 20s linear infinite'
              }}
            />
          )}

          {/* Polar ice caps for applicable planets */}
          {(body.id === 'earth' || body.id === 'mars') && zoomLevel <= 2 && (
            <>
              <div
                className="absolute rounded-full bg-white opacity-80"
                style={{
                  width: `${scale * 0.15}px`,
                  height: `${scale * 0.15}px`,
                  top: `${scale * 0.05}px`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 ${scale * 0.05}px rgba(255,255,255,0.8)`
                }}
              />
              <div
                className="absolute rounded-full bg-white opacity-80"
                style={{
                  width: `${scale * 0.12}px`,
                  height: `${scale * 0.12}px`,
                  bottom: `${scale * 0.05}px`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 ${scale * 0.05}px rgba(255,255,255,0.8)`
                }}
              />
            </>
          )}

          {/* Great Red Spot for Jupiter */}
          {body.id === 'jupiter' && zoomLevel <= 2 && (
            <div
              className="absolute rounded-full opacity-90"
              style={{
                width: `${scale * 0.2}px`,
                height: `${scale * 0.15}px`,
                background: 'radial-gradient(circle, #FF6B6B 0%, #CC5555 70%, transparent 100%)',
                top: '45%',
                right: '20%',
                transform: `rotate(${rotation * 0.1}deg)`,
                boxShadow: `inset 0 0 ${scale * 0.05}px rgba(0,0,0,0.5)`
              }}
            />
          )}

          {/* Hexagonal storm for Saturn */}
          {body.id === 'saturn' && zoomLevel <= 1 && (
            <div
              className="absolute"
              style={{
                width: `${scale * 0.1}px`,
                height: `${scale * 0.1}px`,
                top: `${scale * 0.05}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'conic-gradient(from 0deg, #FFD700, #FFA500, #FF8C00, #FFD700)',
                clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)'
              }}
            />
          )}
        </div>

        {/* Moons */}
        {body.moons > 0 && showMoons && zoomLevel >= 2 && (
          <>
            {Array.from({ length: Math.min(body.moons, 8) }).map((_, i) => {
              const moonDistance = scale * (0.8 + i * 0.3);
              const moonSize = Math.max(4, scale * (0.02 + i * 0.005));
              const moonAngle = (rotation * (1 + i * 0.3) + i * 45) * (Math.PI / 180);
              
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-gray-300 shadow-lg"
                  style={{
                    width: `${moonSize}px`,
                    height: `${moonSize}px`,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${Math.cos(moonAngle) * moonDistance}px, ${Math.sin(moonAngle) * moonDistance}px)`,
                    boxShadow: `0 0 ${moonSize * 0.5}px rgba(255,255,255,0.3), inset -${moonSize * 0.2}px -${moonSize * 0.2}px ${moonSize * 0.3}px rgba(0,0,0,0.4)`,
                    background: i === 0 && body.id === 'earth' 
                      ? 'radial-gradient(circle at 30% 30%, #F5F5DC 0%, #D3D3D3 50%, #A9A9A9 100%)'
                      : 'radial-gradient(circle at 30% 30%, #E5E5E5 0%, #C0C0C0 50%, #808080 100%)'
                  }}
                />
              );
            })}
          </>
        )}

        {/* Zoom level indicator */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white text-sm font-medium">
            {zoomLevels[zoomLevel].name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6 relative overflow-hidden">
      {/* Enhanced Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 300 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: ['#ffffff', '#ffffcc', '#ccccff', '#ffcccc'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Realistic 3D Universe Explorer
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Experience photorealistic planetary visuals with authentic surface textures, atmospheric effects, 
            ring systems, and moon orbits. Hear the unique acoustic signature of each celestial body as you explore 
            the cosmos in unprecedented detail.
          </p>
        </div>

        {/* Main 3D Viewer */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-8 animate-fade-in-delayed">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white">{selectedBody.name}</h2>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm text-white/80">
                {selectedBody.type.charAt(0).toUpperCase() + selectedBody.type.slice(1)}
              </span>
              <span className="bg-cyan-400/20 px-3 py-1 rounded-full text-sm text-cyan-400">
                {selectedBody.temperature}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-lg transition-colors ${autoRotate ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/10 text-white/70'}`}
                title="Toggle Auto Rotation"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowAtmosphere(!showAtmosphere)}
                className={`p-2 rounded-lg transition-colors ${showAtmosphere ? 'bg-blue-400/20 text-blue-400' : 'bg-white/10 text-white/70'}`}
                title="Toggle Atmosphere"
              >
                <Globe className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowRings(!showRings)}
                className={`p-2 rounded-lg transition-colors ${showRings ? 'bg-purple-400/20 text-purple-400' : 'bg-white/10 text-white/70'}`}
                title="Toggle Ring Systems"
              >
                <Layers className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowMoons(!showMoons)}
                className={`p-2 rounded-lg transition-colors ${showMoons ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white/70'}`}
                title="Toggle Moons"
              >
                <Star className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                title="Toggle Information Panel"
              >
                <Info className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* 3D Celestial Body Display */}
          <div className="relative h-[500px] flex items-center justify-center mb-6 bg-gradient-radial from-transparent via-black/20 to-black/40 rounded-xl">
            <PlanetRenderer body={selectedBody} scale={getBodyScale()} />
          </div>

          {/* Enhanced Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Zoom Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Navigation className="h-4 w-4 mr-2 text-cyan-400" />
                Zoom Control
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel === 0}
                  className="flex items-center space-x-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors"
                >
                  <ZoomIn className="h-4 w-4" />
                  <span>In</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel === zoomLevels.length - 1}
                  className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors"
                >
                  <ZoomOut className="h-4 w-4" />
                  <span>Out</span>
                </button>
              </div>
              <p className="text-white/60 text-xs">{zoomLevels[zoomLevel].description}</p>
              <div className="mt-2 bg-white/5 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((zoomLevels.length - 1 - zoomLevel) / (zoomLevels.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Texture Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Layers className="h-4 w-4 mr-2 text-cyan-400" />
                Surface View
              </h3>
              <div className="space-y-2">
                {['surface', 'night', 'clouds'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTextureMode(mode as any)}
                    disabled={mode === 'night' && !selectedBody.nightTextureUrl || mode === 'clouds' && !selectedBody.cloudTextureUrl}
                    className={`w-full p-2 rounded-lg text-sm transition-all ${
                      textureMode === mode
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)} View
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Volume2 className="h-4 w-4 mr-2 text-cyan-400" />
                Planetary Audio
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                <button
                  onClick={togglePlayback}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-2 rounded-lg hover:shadow-lg transition-all"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (gainNodeRef.current) {
                      gainNodeRef.current.gain.setValueAtTime(
                        isMuted ? volume : 0,
                        audioContextRef.current!.currentTime
                      );
                    }
                  }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (gainNodeRef.current && !isMuted) {
                    gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current!.currentTime);
                  }
                }}
                className="w-full accent-cyan-400"
              />
              <p className="text-white/60 text-xs mt-2">
                {selectedBody.soundFrequency}Hz {selectedBody.soundWaveform} wave
              </p>
            </div>

            {/* Rotation Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <RotateCcw className="h-4 w-4 mr-2 text-cyan-400" />
                Rotation
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Speed:</span>
                  <span className="text-white">{selectedBody.rotationSpeed.toFixed(1)}°/s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Day Length:</span>
                  <span className="text-white text-xs">{selectedBody.detailedInfo.dayLength}</span>
                </div>
                <button
                  onClick={() => setRotation(0)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white/70 px-3 py-1 rounded text-sm transition-colors"
                >
                  Reset Position
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Celestial Body Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 animate-fade-in-stagger">
          {celestialBodies.map((body, index) => (
            <button
              key={body.id}
              onClick={() => handleBodySelect(body)}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border transition-all hover:scale-105 group ${
                selectedBody.id === body.id
                  ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/20'
                  : 'border-white/20 hover:bg-white/20'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-3">
                <div
                  className="w-12 h-12 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), ${body.color}`,
                    boxShadow: `0 0 20px ${body.color}40, inset -3px -3px 6px rgba(0,0,0,0.3)`
                  }}
                />
                {body.ringSystem && (
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full opacity-60"
                    style={{
                      width: '60px',
                      height: '3px',
                      borderColor: body.color,
                      transform: 'translate(-50%, -50%) rotateX(75deg)'
                    }}
                  />
                )}
              </div>
              <div className="text-white text-sm font-medium mb-1">{body.name}</div>
              <div className="text-white/60 text-xs mb-1">{body.type}</div>
              <div className="text-white/40 text-xs">{body.temperature}</div>
              {body.moons > 0 && (
                <div className="text-cyan-400 text-xs mt-1">{body.moons} moon{body.moons !== 1 ? 's' : ''}</div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Information Panel */}
        {showInfo && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-fade-in-final">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-cyan-400" />
                    Physical Properties
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-white/60">Diameter</div>
                      <div className="text-white font-semibold">{selectedBody.detailedInfo.diameter}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-white/60">Mass</div>
                      <div className="text-white font-semibold">{selectedBody.detailedInfo.mass}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-white/60">Gravity</div>
                      <div className="text-white font-semibold">{selectedBody.detailedInfo.gravity}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-white/60">Temperature</div>
                      <div className="text-white font-semibold">{selectedBody.temperature}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-cyan-400" />
                    Composition & Structure
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-white/60 text-sm">Atmosphere</div>
                      <div className="text-white">{selectedBody.detailedInfo.atmosphere}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-white/60 text-sm">Composition</div>
                      <div className="text-white">{selectedBody.detailedInfo.composition}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-cyan-400" />
                    Fascinating Facts
                  </h3>
                  <ul className="space-y-2">
                    {selectedBody.detailedInfo.interestingFacts.map((fact, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Telescope className="h-5 w-5 mr-2 text-cyan-400" />
                    Exploration History
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBody.detailedInfo.exploration.map((mission, index) => (
                      <span key={index} className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-400/30">
                        {mission}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Surface Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBody.detailedInfo.surfaceFeatures.map((feature, index) => (
                      <span key={index} className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-400/30">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UniverseExplorer;