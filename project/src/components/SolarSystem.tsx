import React, { useRef, useState, useEffect } from 'react';
import { Info, ZoomIn, ZoomOut, RotateCcw, Search, Layers, Eye, Globe, Thermometer, Wind, Mountain, Droplets } from 'lucide-react';

interface Planet {
  name: string;
  distance: number;
  size: number;
  color: string;
  rotationSpeed: number;
  orbitSpeed: number;
  moons: number;
  temperature: string;
  description: string;
  detailedInfo: {
    diameter: string;
    mass: string;
    gravity: string;
    dayLength: string;
    yearLength: string;
    atmosphere: string;
    composition: string;
    magneticField: string;
    rings: boolean;
    waterPresence: string;
    exploration: string[];
    interestingFacts: string[];
    geology: string;
    weather: string;
    seasons: string;
    visibility: string;
  };
  layers: {
    core: { description: string; temperature: string; composition: string; };
    mantle: { description: string; temperature: string; composition: string; };
    crust: { description: string; thickness: string; composition: string; };
    atmosphere: { description: string; composition: string; pressure: string; };
  };
  missionHistory: {
    name: string;
    year: string;
    agency: string;
    type: string;
    discoveries: string[];
  }[];
}

const planets: Planet[] = [
  {
    name: 'Mercury',
    distance: 4,
    size: 0.4,
    color: '#8C7853',
    rotationSpeed: 0.01,
    orbitSpeed: 0.04,
    moons: 0,
    temperature: '167°C',
    description: 'The smallest planet and closest to the Sun, Mercury experiences extreme temperature variations and has a heavily cratered surface similar to our Moon.',
    detailedInfo: {
      diameter: '4,879 km (0.38 Earth diameters)',
      mass: '3.3011 × 10²³ kg (0.055 Earth masses)',
      gravity: '3.7 m/s² (0.38 Earth gravity)',
      dayLength: '58.6 Earth days',
      yearLength: '88 Earth days',
      atmosphere: 'Extremely thin exosphere of oxygen, sodium, hydrogen, helium, and potassium',
      composition: 'Large iron core (75% of radius), thin silicate mantle and crust',
      magneticField: 'Weak global magnetic field (1% of Earth\'s strength)',
      rings: false,
      waterPresence: 'Water ice confirmed in permanently shadowed polar craters',
      exploration: ['Mariner 10 (1974-1975)', 'MESSENGER (2011-2015)', 'BepiColombo (ongoing)'],
      interestingFacts: [
        'Has the most eccentric orbit of all planets',
        'One day on Mercury lasts longer than one year',
        'Surface temperatures range from -173°C to 427°C',
        'Has a "weird" rotation - it rotates exactly 1.5 times for every orbit',
        'Contains more iron than any other planet in the solar system',
        'Has cliffs up to 3 km high called "scarps"'
      ],
      geology: 'Heavily cratered surface with large impact basins, extensive cliff systems (scarps), and smooth plains formed by ancient volcanic activity',
      weather: 'No weather due to lack of atmosphere; extreme temperature variations between day and night sides',
      seasons: 'No seasons due to nearly zero axial tilt (0.034°)',
      visibility: 'Difficult to observe from Earth due to proximity to Sun; best viewed during greatest elongations'
    },
    layers: {
      core: { 
        description: 'Massive iron core making up 75% of the planet\'s radius', 
        temperature: '1,500-2,000°C', 
        composition: 'Iron and nickel with possible sulfur content' 
      },
      mantle: { 
        description: 'Thin silicate mantle surrounding the core', 
        temperature: '1,000-1,500°C', 
        composition: 'Silicate rock with iron and magnesium' 
      },
      crust: { 
        description: 'Thin rocky crust heavily cratered by impacts', 
        thickness: '100-300 km', 
        composition: 'Silicate rock with basaltic plains' 
      },
      atmosphere: { 
        description: 'Extremely thin exosphere', 
        composition: '42% oxygen, 29% sodium, 22% hydrogen, 6% helium, 0.5% potassium', 
        pressure: '10⁻¹⁵ bar (essentially vacuum)' 
      }
    },
    missionHistory: [
      {
        name: 'Mariner 10',
        year: '1974-1975',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['First close-up images', 'Magnetic field detection', 'Thin atmosphere discovery']
      },
      {
        name: 'MESSENGER',
        year: '2011-2015',
        agency: 'NASA',
        type: 'Orbiter',
        discoveries: ['Water ice at poles', 'Volcanic activity evidence', 'Detailed surface mapping']
      },
      {
        name: 'BepiColombo',
        year: '2018-ongoing',
        agency: 'ESA/JAXA',
        type: 'Dual Orbiter',
        discoveries: ['Mission ongoing - comprehensive study planned']
      }
    ]
  },
  {
    name: 'Venus',
    distance: 6,
    size: 0.9,
    color: '#FFA500',
    rotationSpeed: 0.007,
    orbitSpeed: 0.03,
    moons: 0,
    temperature: '464°C',
    description: 'Often called Earth\'s twin due to similar size, Venus is the hottest planet in our solar system due to its extreme greenhouse effect caused by a thick carbon dioxide atmosphere.',
    detailedInfo: {
      diameter: '12,104 km (0.95 Earth diameters)',
      mass: '4.8675 × 10²⁴ kg (0.815 Earth masses)',
      gravity: '8.87 m/s² (0.904 Earth gravity)',
      dayLength: '243 Earth days (retrograde)',
      yearLength: '225 Earth days',
      atmosphere: 'Dense carbon dioxide atmosphere with sulfuric acid clouds',
      composition: 'Iron core, silicate mantle, basaltic crust',
      magneticField: 'No global magnetic field',
      rings: false,
      waterPresence: 'Trace amounts of water vapor; likely had oceans in the past',
      exploration: ['Venera series (USSR)', 'Magellan (NASA)', 'Venus Express (ESA)', 'Akatsuki (JAXA)'],
      interestingFacts: [
        'Rotates backwards (retrograde rotation)',
        'A day is longer than a year on Venus',
        'Surface pressure is 90 times that of Earth',
        'Clouds are made of sulfuric acid',
        'Surface hot enough to melt lead',
        'Brightest planet in Earth\'s sky after the Moon'
      ],
      geology: 'Volcanic plains, impact craters, mountain ranges, and unique geological features like coronae and arachnoids',
      weather: 'Extreme greenhouse effect with global cloud cover, sulfuric acid rain (evaporates before reaching surface), and hurricane-force winds in upper atmosphere',
      seasons: 'No seasons due to minimal axial tilt (2.64°)',
      visibility: 'Third brightest object in sky after Sun and Moon; visible as morning or evening star'
    },
    layers: {
      core: { 
        description: 'Iron-nickel core similar to Earth but likely solid', 
        temperature: '4,000-5,000°C', 
        composition: 'Iron and nickel' 
      },
      mantle: { 
        description: 'Hot silicate mantle with active volcanism', 
        temperature: '1,200-4,000°C', 
        composition: 'Silicate rock with high magnesium content' 
      },
      crust: { 
        description: 'Basaltic crust with extensive volcanic features', 
        thickness: '20-50 km', 
        composition: 'Basaltic rock with volcanic plains' 
      },
      atmosphere: { 
        description: 'Extremely dense atmosphere with runaway greenhouse effect', 
        composition: '96.5% CO₂, 3.5% nitrogen, traces of sulfur dioxide and water vapor', 
        pressure: '92 bar (92 times Earth\'s pressure)' 
      }
    },
    missionHistory: [
      {
        name: 'Venera Program',
        year: '1961-1984',
        agency: 'Soviet Union',
        type: 'Multiple landers and orbiters',
        discoveries: ['First successful planetary landing', 'Surface images', 'Atmospheric composition']
      },
      {
        name: 'Magellan',
        year: '1990-1994',
        agency: 'NASA',
        type: 'Orbiter',
        discoveries: ['Detailed radar mapping', 'Volcanic activity evidence', 'Surface geology']
      },
      {
        name: 'Venus Express',
        year: '2006-2014',
        agency: 'ESA',
        type: 'Orbiter',
        discoveries: ['Atmospheric dynamics', 'Lightning detection', 'Possible active volcanism']
      }
    ]
  },
  {
    name: 'Earth',
    distance: 8,
    size: 1,
    color: '#4F94CD',
    rotationSpeed: 0.02,
    orbitSpeed: 0.02,
    moons: 1,
    temperature: '15°C',
    description: 'Our home planet, the only known world to harbor life. Earth has liquid water, a protective atmosphere, and a dynamic climate system that has supported the evolution of complex life for billions of years.',
    detailedInfo: {
      diameter: '12,756 km',
      mass: '5.972 × 10²⁴ kg',
      gravity: '9.8 m/s²',
      dayLength: '24 hours',
      yearLength: '365.25 days',
      atmosphere: 'Nitrogen-oxygen atmosphere with water vapor and trace gases',
      composition: 'Iron core, silicate mantle, diverse crust with continents and ocean basins',
      magneticField: 'Strong dipolar magnetic field generated by liquid iron outer core',
      rings: false,
      waterPresence: '71% of surface covered by liquid water oceans',
      exploration: ['Continuous human habitation', 'Thousands of satellites', 'International Space Station'],
      interestingFacts: [
        'Only known planet with life',
        'Has plate tectonics that recycle the crust',
        'Moon stabilizes Earth\'s axial tilt',
        'Atmosphere protects from harmful radiation',
        'Has a complex climate system with weather patterns',
        'Biodiversity includes millions of species'
      ],
      geology: 'Active plate tectonics, diverse rock types, mountain ranges, ocean basins, and continuous geological processes',
      weather: 'Complex weather systems driven by solar heating, rotation, and ocean currents; includes storms, precipitation, and seasonal variations',
      seasons: 'Four distinct seasons due to 23.5° axial tilt',
      visibility: 'Home planet - observed from space by astronauts and satellites'
    },
    layers: {
      core: { 
        description: 'Solid inner core and liquid outer core generating magnetic field', 
        temperature: '4,000-6,000°C', 
        composition: 'Iron and nickel with light elements' 
      },
      mantle: { 
        description: 'Hot, convecting silicate mantle driving plate tectonics', 
        temperature: '500-4,000°C', 
        composition: 'Silicate minerals rich in magnesium and iron' 
      },
      crust: { 
        description: 'Thin oceanic and continental crust with diverse geology', 
        thickness: '5-70 km', 
        composition: 'Oceanic basalt and continental granite/sedimentary rocks' 
      },
      atmosphere: { 
        description: 'Life-supporting atmosphere with greenhouse effect', 
        composition: '78% nitrogen, 21% oxygen, 1% argon, 0.04% CO₂, water vapor', 
        pressure: '1 bar at sea level' 
      }
    },
    missionHistory: [
      {
        name: 'Apollo Program',
        year: '1969-1972',
        agency: 'NASA',
        type: 'Crewed lunar missions',
        discoveries: ['Moon rock samples', 'Lunar geology', 'Earth photography from space']
      },
      {
        name: 'International Space Station',
        year: '1998-ongoing',
        agency: 'International',
        type: 'Orbital laboratory',
        discoveries: ['Microgravity research', 'Earth observation', 'Space medicine']
      },
      {
        name: 'Earth Observation Satellites',
        year: 'Ongoing',
        agency: 'Multiple',
        type: 'Remote sensing',
        discoveries: ['Climate monitoring', 'Weather prediction', 'Environmental changes']
      }
    ]
  },
  {
    name: 'Mars',
    distance: 10,
    size: 0.7,
    color: '#CD5C5C',
    rotationSpeed: 0.018,
    orbitSpeed: 0.015,
    moons: 2,
    temperature: '-65°C',
    description: 'The Red Planet, named for its rusty color caused by iron oxide on its surface. Mars has the largest volcano in the solar system, polar ice caps, and evidence of ancient water activity that may have supported life.',
    detailedInfo: {
      diameter: '6,792 km (0.53 Earth diameters)',
      mass: '6.4171 × 10²³ kg (0.107 Earth masses)',
      gravity: '3.71 m/s² (0.38 Earth gravity)',
      dayLength: '24 hours 37 minutes',
      yearLength: '687 Earth days',
      atmosphere: 'Thin carbon dioxide atmosphere with dust storms',
      composition: 'Iron core, basaltic mantle, iron oxide-rich crust',
      magneticField: 'No global field, but localized crustal magnetic fields',
      rings: false,
      waterPresence: 'Water ice at poles and subsurface; evidence of ancient rivers and lakes',
      exploration: ['Multiple rovers', 'Orbiters', 'Future human missions planned'],
      interestingFacts: [
        'Has the largest volcano in the solar system (Olympus Mons)',
        'Day length similar to Earth (24h 37m)',
        'Has seasons due to axial tilt similar to Earth',
        'Dust storms can cover the entire planet',
        'Has two small moons: Phobos and Deimos',
        'Evidence suggests it once had a thicker atmosphere and liquid water'
      ],
      geology: 'Ancient impact craters, massive volcanoes, deep canyons (Valles Marineris), polar ice caps, and evidence of water erosion',
      weather: 'Cold desert climate with seasonal dust storms, temperature variations, and thin atmosphere causing rapid temperature changes',
      seasons: 'Four seasons similar to Earth due to 25.2° axial tilt, but each season lasts about twice as long',
      visibility: 'Visible to naked eye as red "star"; best viewing during opposition every 26 months'
    },
    layers: {
      core: { 
        description: 'Partially molten iron core smaller than Earth\'s', 
        temperature: '1,500-2,000°C', 
        composition: 'Iron with sulfur and lighter elements' 
      },
      mantle: { 
        description: 'Silicate mantle with evidence of past volcanic activity', 
        temperature: '500-1,500°C', 
        composition: 'Basaltic rock rich in iron and magnesium' 
      },
      crust: { 
        description: 'Iron oxide-rich crust giving Mars its red color', 
        thickness: '50-125 km', 
        composition: 'Basaltic rock with iron oxide (rust) coating' 
      },
      atmosphere: { 
        description: 'Thin atmosphere insufficient to support liquid water on surface', 
        composition: '95% CO₂, 3% nitrogen, 1.6% argon, traces of oxygen and water vapor', 
        pressure: '0.6% of Earth\'s pressure' 
      }
    },
    missionHistory: [
      {
        name: 'Viking Program',
        year: '1976',
        agency: 'NASA',
        type: 'Landers and orbiters',
        discoveries: ['First successful Mars landing', 'Surface images', 'Soil analysis']
      },
      {
        name: 'Mars Pathfinder/Sojourner',
        year: '1997',
        agency: 'NASA',
        type: 'Lander and rover',
        discoveries: ['Mobile surface exploration', 'Rock analysis', 'Weather monitoring']
      },
      {
        name: 'Mars Exploration Rovers',
        year: '2004-2018',
        agency: 'NASA',
        type: 'Twin rovers (Spirit & Opportunity)',
        discoveries: ['Evidence of past water activity', 'Mineral analysis', 'Long-term surface operations']
      },
      {
        name: 'Curiosity Rover',
        year: '2012-ongoing',
        agency: 'NASA',
        type: 'Nuclear-powered rover',
        discoveries: ['Organic compounds', 'Past habitability evidence', 'Methane detection']
      },
      {
        name: 'Perseverance Rover',
        year: '2021-ongoing',
        agency: 'NASA',
        type: 'Sample collection rover',
        discoveries: ['Sample collection for future return', 'Oxygen production', 'Helicopter flight (Ingenuity)']
      }
    ]
  },
  {
    name: 'Jupiter',
    distance: 15,
    size: 3,
    color: '#DAA520',
    rotationSpeed: 0.04,
    orbitSpeed: 0.008,
    moons: 79,
    temperature: '-110°C',
    description: 'The largest planet in our solar system, Jupiter is a gas giant with a mass greater than all other planets combined. Its Great Red Spot is a storm larger than Earth that has raged for centuries.',
    detailedInfo: {
      diameter: '142,984 km (11.2 Earth diameters)',
      mass: '1.898 × 10²⁷ kg (317.8 Earth masses)',
      gravity: '24.79 m/s² (2.53 Earth gravity)',
      dayLength: '9 hours 56 minutes',
      yearLength: '11.9 Earth years',
      atmosphere: 'Hydrogen and helium atmosphere with complex storm systems',
      composition: 'Hydrogen and helium gas giant with possible rocky core',
      magneticField: 'Strongest magnetic field of any planet (20,000 times Earth\'s)',
      rings: true,
      waterPresence: 'Water vapor in atmosphere; subsurface oceans on several moons',
      exploration: ['Pioneer', 'Voyager', 'Galileo', 'Juno missions'],
      interestingFacts: [
        'Could fit all other planets inside it',
        'Has more than 75 known moons',
        'Great Red Spot is a storm larger than Earth',
        'Acts as a "cosmic vacuum cleaner" protecting inner planets',
        'Has the shortest day of any planet',
        'Radiates more heat than it receives from the Sun'
      ],
      geology: 'No solid surface; composed of layers of gas and liquid with possible rocky core',
      weather: 'Complex atmospheric dynamics with bands, storms, and the famous Great Red Spot; wind speeds up to 640 km/h',
      seasons: 'Minimal seasonal variation due to small axial tilt (3.13°)',
      visibility: 'Fourth brightest object in sky; easily visible to naked eye'
    },
    layers: {
      core: { 
        description: 'Possible rocky core under extreme pressure', 
        temperature: '20,000°C', 
        composition: 'Rock, metals, and hydrogen compounds under extreme pressure' 
      },
      mantle: { 
        description: 'Metallic hydrogen layer conducting electricity', 
        temperature: '10,000-20,000°C', 
        composition: 'Metallic hydrogen and helium' 
      },
      crust: { 
        description: 'No solid crust; gradual transition from gas to liquid', 
        thickness: 'N/A - gas giant', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Thick atmosphere with complex storm systems and bands', 
        composition: '89% hydrogen, 10% helium, 1% methane, ammonia, and other compounds', 
        pressure: 'Increases dramatically with depth' 
      }
    },
    missionHistory: [
      {
        name: 'Pioneer 10 & 11',
        year: '1973-1974',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['First close-up images', 'Radiation belt mapping', 'Magnetic field study']
      },
      {
        name: 'Voyager 1 & 2',
        year: '1979',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['Detailed moon studies', 'Ring discovery', 'Atmospheric dynamics']
      },
      {
        name: 'Galileo',
        year: '1995-2003',
        agency: 'NASA',
        type: 'Orbiter and atmospheric probe',
        discoveries: ['Europa ocean evidence', 'Io volcanism', 'Atmospheric composition']
      },
      {
        name: 'Juno',
        year: '2016-ongoing',
        agency: 'NASA',
        type: 'Polar orbiter',
        discoveries: ['Interior structure', 'Magnetic field details', 'Atmospheric composition']
      }
    ]
  },
  {
    name: 'Saturn',
    distance: 20,
    size: 2.5,
    color: '#FAD5A5',
    rotationSpeed: 0.035,
    orbitSpeed: 0.006,
    moons: 82,
    temperature: '-140°C',
    description: 'Famous for its spectacular ring system, Saturn is a gas giant with the lowest density of any planet. It has more than 80 moons, including Titan with its thick atmosphere and methane lakes.',
    detailedInfo: {
      diameter: '120,536 km (9.4 Earth diameters)',
      mass: '5.683 × 10²⁶ kg (95.2 Earth masses)',
      gravity: '10.44 m/s² (1.065 Earth gravity)',
      dayLength: '10 hours 42 minutes',
      yearLength: '29.5 Earth years',
      atmosphere: 'Hydrogen and helium with ammonia clouds',
      composition: 'Gas giant with hydrogen and helium; lowest density of any planet',
      magneticField: 'Strong magnetic field tilted relative to rotation axis',
      rings: true,
      waterPresence: 'Water ice in rings and moons; subsurface oceans on Enceladus and Titan',
      exploration: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens mission'],
      interestingFacts: [
        'Has the most spectacular ring system',
        'Density so low it would float in water',
        'Has hexagonal storm at north pole',
        'Titan has lakes of liquid methane',
        'Enceladus shoots water geysers from south pole',
        'Has "shepherd moons" that maintain ring structure'
      ],
      geology: 'No solid surface; gas giant with possible small rocky core',
      weather: 'High-speed winds up to 1,800 km/h, ammonia clouds, and unique hexagonal polar storm',
      seasons: 'Seasonal changes due to 26.7° axial tilt; each season lasts about 7 Earth years',
      visibility: 'Visible to naked eye; rings visible through small telescope'
    },
    layers: {
      core: { 
        description: 'Small rocky core surrounded by metallic hydrogen', 
        temperature: '11,700°C', 
        composition: 'Rock, ice, and metals' 
      },
      mantle: { 
        description: 'Metallic hydrogen layer', 
        temperature: '5,000-11,700°C', 
        composition: 'Metallic hydrogen and helium' 
      },
      crust: { 
        description: 'No solid crust; gradual transition from gas to liquid', 
        thickness: 'N/A - gas giant', 
        composition: 'Hydrogen and helium gas' 
      },
      atmosphere: { 
        description: 'Thick atmosphere with distinctive banded appearance', 
        composition: '96% hydrogen, 3% helium, 1% methane, ammonia, and hydrogen deuteride', 
        pressure: 'Increases with depth' 
      }
    },
    missionHistory: [
      {
        name: 'Pioneer 11',
        year: '1979',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['First close-up images', 'Ring structure details', 'Magnetic field study']
      },
      {
        name: 'Voyager 1 & 2',
        year: '1980-1981',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['Complex ring structure', 'New moons', 'Atmospheric dynamics']
      },
      {
        name: 'Cassini-Huygens',
        year: '2004-2017',
        agency: 'NASA/ESA',
        type: 'Orbiter and Titan lander',
        discoveries: ['Enceladus geysers', 'Titan methane lakes', 'Ring particle composition']
      }
    ]
  },
  {
    name: 'Uranus',
    distance: 25,
    size: 1.8,
    color: '#4FD0E7',
    rotationSpeed: 0.03,
    orbitSpeed: 0.004,
    moons: 27,
    temperature: '-195°C',
    description: 'An ice giant tilted on its side, Uranus rotates at a 98-degree angle to its orbit. It has a faint ring system and an atmosphere rich in hydrogen, helium, and methane, which gives it its blue-green color.',
    detailedInfo: {
      diameter: '51,118 km (4.0 Earth diameters)',
      mass: '8.681 × 10²⁵ kg (14.5 Earth masses)',
      gravity: '8.69 m/s² (0.886 Earth gravity)',
      dayLength: '17 hours 14 minutes (retrograde)',
      yearLength: '84 Earth years',
      atmosphere: 'Hydrogen, helium, and methane atmosphere',
      composition: 'Ice giant with water, methane, and ammonia ices',
      magneticField: 'Tilted magnetic field offset from center',
      rings: true,
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
      geology: 'No solid surface; ice giant with rocky core surrounded by water, methane, and ammonia ices',
      weather: 'Extreme seasonal variations, high-speed winds up to 900 km/h, and methane clouds',
      seasons: 'Extreme 84-year seasonal cycle due to extreme axial tilt',
      visibility: 'Barely visible to naked eye; discovered with telescope in 1781'
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
        composition: '83% hydrogen, 15% helium, 2% methane, traces of hydrogen deuteride', 
        pressure: 'Increases with depth' 
      }
    },
    missionHistory: [
      {
        name: 'Voyager 2',
        year: '1986',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['10 new moons', 'Ring system details', 'Magnetic field measurement', 'Atmospheric composition']
      }
    ]
  },
  {
    name: 'Neptune',
    distance: 30,
    size: 1.7,
    color: '#4169E1',
    rotationSpeed: 0.032,
    orbitSpeed: 0.002,
    moons: 14,
    temperature: '-200°C',
    description: 'The windiest planet in our solar system, Neptune has the fastest winds recorded, reaching speeds of up to 2,100 km/h. This ice giant has a dynamic atmosphere and the largest moon, Triton, which orbits backwards.',
    detailedInfo: {
      diameter: '49,528 km (3.9 Earth diameters)',
      mass: '1.024 × 10²⁶ kg (17.1 Earth masses)',
      gravity: '11.15 m/s² (1.14 Earth gravity)',
      dayLength: '16 hours 7 minutes',
      yearLength: '165 Earth years',
      atmosphere: 'Hydrogen, helium, and methane with dynamic weather',
      composition: 'Ice giant similar to Uranus with water, methane, and ammonia ices',
      magneticField: 'Strong magnetic field tilted 47° from rotation axis',
      rings: true,
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
      geology: 'No solid surface; ice giant with rocky core and mantle of water, methane, and ammonia ices',
      weather: 'Most dynamic weather in solar system with supersonic winds, large storms, and methane clouds',
      seasons: 'Long seasonal cycles due to 165-year orbit and 28.3° axial tilt',
      visibility: 'Not visible to naked eye; discovered through mathematical prediction'
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
        composition: '80% hydrogen, 19% helium, 1% methane, traces of hydrogen deuteride and ethane', 
        pressure: 'Increases dramatically with depth' 
      }
    },
    missionHistory: [
      {
        name: 'Voyager 2',
        year: '1989',
        agency: 'NASA',
        type: 'Flyby',
        discoveries: ['6 new moons', 'Ring system confirmation', 'Great Dark Spot', 'Triton geysers', 'Magnetic field measurement']
      }
    ]
  }
];

const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [cameraDistance, setCameraDistance] = useState(50);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'layers' | 'missions'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<'core' | 'mantle' | 'crust' | 'atmosphere'>('core');

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    setViewMode('detailed');
  };

  const filteredPlanets = planets.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    planet.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Solar System Explorer
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Explore our solar system in unprecedented detail. Zoom into planetary layers, discover mission histories, 
            compare celestial bodies, and experience the most comprehensive digital planetarium available.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-delayed">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search planets, moons, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCameraDistance(Math.max(30, cameraDistance - 10))}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
              <span>Zoom In</span>
            </button>
            <button
              onClick={() => setCameraDistance(Math.min(100, cameraDistance + 10))}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
              <span>Zoom Out</span>
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>Compare</span>
            </button>
          </div>
        </div>

        {/* 3D Solar System View */}
        <div className="h-[600px] bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden animate-fade-in-stagger flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌌</div>
            <h3 className="text-2xl font-bold text-white mb-2">Interactive 3D Solar System</h3>
            <p className="text-white/60 mb-4">Advanced 3D visualization would be rendered here</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 max-w-2xl mx-auto">
              {planets.map((planet) => (
                <button
                  key={planet.name}
                  onClick={() => handlePlanetClick(planet)}
                  className="group relative"
                >
                  <div
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full mx-auto mb-1 group-hover:scale-110 transition-transform shadow-lg"
                    style={{ 
                      backgroundColor: planet.color,
                      boxShadow: `0 0 20px ${planet.color}40`
                    }}
                  />
                  <div className="text-white text-xs font-medium">{planet.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Planet Information */}
        {selectedPlanet && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-full shadow-lg"
                  style={{ 
                    backgroundColor: selectedPlanet.color,
                    boxShadow: `0 0 30px ${selectedPlanet.color}60`
                  }}
                />
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedPlanet.name}</h2>
                  <p className="text-cyan-400">The {selectedPlanet.name === 'Earth' ? 'Blue' : selectedPlanet.name === 'Mars' ? 'Red' : selectedPlanet.name === 'Jupiter' ? 'Giant' : selectedPlanet.name === 'Saturn' ? 'Ringed' : selectedPlanet.name === 'Venus' ? 'Hottest' : selectedPlanet.name === 'Mercury' ? 'Smallest' : selectedPlanet.name === 'Uranus' ? 'Tilted' : 'Windiest'} Planet</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {['overview', 'detailed', 'layers', 'missions'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="text-white/60 hover:text-white transition-colors text-xl px-3"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Overview Mode */}
            {viewMode === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60">Diameter</div>
                        <div className="text-white font-semibold">{selectedPlanet.detailedInfo.diameter}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60">Mass</div>
                        <div className="text-white font-semibold">{selectedPlanet.detailedInfo.mass}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60">Gravity</div>
                        <div className="text-white font-semibold">{selectedPlanet.detailedInfo.gravity}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60">Day Length</div>
                        <div className="text-white font-semibold">{selectedPlanet.detailedInfo.dayLength}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60">Year Length</div>
                        <div className="text-white font-semibold">{selectedPlanet.detailedInfo.yearLength}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60">Moons</div>
                        <div className="text-white font-semibold">{selectedPlanet.moons}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Interesting Facts</h3>
                    <ul className="space-y-2">
                      {selectedPlanet.detailedInfo.interestingFacts.map((fact, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                    <p className="text-white/80 leading-relaxed">{selectedPlanet.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Atmosphere & Composition</h3>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60 text-sm">Atmosphere</div>
                        <div className="text-white">{selectedPlanet.detailedInfo.atmosphere}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60 text-sm">Composition</div>
                        <div className="text-white">{selectedPlanet.detailedInfo.composition}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-white/60 text-sm">Magnetic Field</div>
                        <div className="text-white">{selectedPlanet.detailedInfo.magneticField}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Mode */}
            {viewMode === 'detailed' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-400/30">
                    <Thermometer className="h-8 w-8 text-blue-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Climate & Weather</h4>
                    <p className="text-white/70 text-sm">{selectedPlanet.detailedInfo.weather}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30">
                    <Mountain className="h-8 w-8 text-green-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Geology</h4>
                    <p className="text-white/70 text-sm">{selectedPlanet.detailedInfo.geology}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30">
                    <Wind className="h-8 w-8 text-purple-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Seasons</h4>
                    <p className="text-white/70 text-sm">{selectedPlanet.detailedInfo.seasons}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-xl border border-cyan-400/30">
                    <Droplets className="h-8 w-8 text-cyan-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Water Presence</h4>
                    <p className="text-white/70 text-sm">{selectedPlanet.detailedInfo.waterPresence}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Exploration History</h3>
                    <div className="space-y-2">
                      {selectedPlanet.detailedInfo.exploration.map((mission, index) => (
                        <div key={index} className="bg-white/5 p-3 rounded-lg">
                          <div className="text-cyan-400 font-medium">{mission}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Visibility & Observation</h3>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-white/80">{selectedPlanet.detailedInfo.visibility}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layers Mode */}
            {viewMode === 'layers' && (
              <div className="space-y-6">
                <div className="flex justify-center space-x-2 mb-6">
                  {Object.keys(selectedPlanet.layers).map((layer) => (
                    <button
                      key={layer}
                      onClick={() => setSelectedLayer(layer as any)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedLayer === layer
                          ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {layer.charAt(0).toUpperCase() + layer.slice(1)}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex justify-center items-center">
                    <div className="relative w-64 h-64">
                      {/* Simplified layer visualization */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-80" />
                      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 opacity-80" />
                      <div className="absolute inset-8 rounded-full bg-gradient-to-r from-yellow-500 to-green-500 opacity-80" />
                      <div className="absolute inset-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">{selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)}</h3>
                    <div className="space-y-3">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-cyan-400 mb-2">Description</h4>
                        <p className="text-white/80">{selectedPlanet.layers[selectedLayer].description}</p>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-400 mb-2">Temperature</h4>
                        <p className="text-white/80">{selectedPlanet.layers[selectedLayer].temperature}</p>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-400 mb-2">Composition</h4>
                        <p className="text-white/80">{selectedPlanet.layers[selectedLayer].composition}</p>
                      </div>
                      
                      {selectedLayer === 'crust' && selectedPlanet.layers.crust.thickness && (
                        <div className="bg-white/5 p-4 rounded-lg">
                          <h4 className="font-semibold text-yellow-400 mb-2">Thickness</h4>
                          <p className="text-white/80">{selectedPlanet.layers.crust.thickness}</p>
                        </div>
                      )}
                      
                      {selectedLayer === 'atmosphere' && selectedPlanet.layers.atmosphere.pressure && (
                        <div className="bg-white/5 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-400 mb-2">Pressure</h4>
                          <p className="text-white/80">{selectedPlanet.layers.atmosphere.pressure}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Missions Mode */}
            {viewMode === 'missions' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Mission History & Exploration</h3>
                <div className="space-y-4">
                  {selectedPlanet.missionHistory.map((mission, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-cyan-400">{mission.name}</h4>
                          <p className="text-white/60">{mission.agency} • {mission.year} • {mission.type}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-white mb-2">Key Discoveries:</h5>
                        <ul className="space-y-1">
                          {mission.discoveries.map((discovery, discoveryIndex) => (
                            <li key={discoveryIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-white/80 text-sm">{discovery}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Planet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 animate-fade-in-final">
          {filteredPlanets.map((planet) => (
            <button
              key={planet.name}
              onClick={() => handlePlanetClick(planet)}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg"
                style={{ 
                  backgroundColor: planet.color,
                  boxShadow: `0 0 20px ${planet.color}40`
                }}
              />
              <div className="text-white text-sm font-medium mb-1">{planet.name}</div>
              <div className="text-white/60 text-xs">{planet.temperature}</div>
              <div className="text-white/40 text-xs">{planet.moons} moon{planet.moons !== 1 ? 's' : ''}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;