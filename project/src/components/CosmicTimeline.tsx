import React, { useState, useEffect, useRef } from 'react';
import { Clock, Star, Zap, Globe, Rocket, Telescope, Calendar, BookOpen, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  details: string[];
  category: 'cosmic' | 'stellar' | 'planetary' | 'technological' | 'discovery';
  significance: string;
  relatedEvents: string[];
  scientificImpact: string;
  modernRelevance: string;
  keyFigures: string[];
  location?: string;
  duration?: string;
  scale: 'universal' | 'galactic' | 'stellar' | 'planetary' | 'human';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'The Big Bang - Universe Creation',
    date: '13.8 billion years ago',
    description: 'The universe begins with rapid expansion from a singularity, creating space, time, matter, and energy in an instant that would shape everything we know today.',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    category: 'cosmic',
    significance: 'The fundamental beginning of everything - space, time, matter, and the physical laws that govern our universe.',
    details: [
      'Universe starts as a hot, dense point smaller than an atom',
      'Rapid expansion and cooling begins (inflation)',
      'First particles form within the first second',
      'Temperature drops from infinite to billions of degrees',
      'Four fundamental forces separate',
      'First atomic nuclei form during Big Bang nucleosynthesis',
      'Universe becomes transparent to light after 380,000 years'
    ],
    relatedEvents: ['2', '3'],
    scientificImpact: 'Established the foundation for modern cosmology and our understanding of the universe\'s origin and evolution.',
    modernRelevance: 'Continues to be studied through cosmic microwave background radiation and particle accelerator experiments.',
    keyFigures: ['Georges Lemaître', 'Edwin Hubble', 'George Gamow', 'Arno Penzias', 'Robert Wilson'],
    scale: 'universal'
  },
  {
    id: '2',
    title: 'Cosmic Dark Ages End - First Stars Ignite',
    date: '13.6 billion years ago',
    description: 'Massive Population III stars ignite, creating the first light in the universe and beginning the process of heavy element formation that would make planets and life possible.',
    icon: Star,
    color: 'from-blue-400 to-cyan-500',
    category: 'stellar',
    significance: 'First sources of light after the Big Bang, beginning the process of cosmic chemical evolution.',
    details: [
      'Hydrogen and helium clouds collapse under gravity',
      'Nuclear fusion begins in stellar cores for the first time',
      'First heavy elements (carbon, oxygen, silicon) are forged',
      'Universe becomes transparent to light',
      'Population III stars are much more massive than modern stars',
      'These stars live fast and die young in spectacular supernovae',
      'Heavy elements are dispersed into space for future star formation'
    ],
    relatedEvents: ['1', '3'],
    scientificImpact: 'Initiated stellar nucleosynthesis, the process that creates all elements heavier than hydrogen and helium.',
    modernRelevance: 'James Webb Space Telescope is actively searching for these first stars and galaxies.',
    keyFigures: ['Fred Hoyle', 'Margaret Burbidge', 'Geoffrey Burbidge', 'William Fowler'],
    scale: 'universal'
  },
  {
    id: '3',
    title: 'Milky Way Galaxy Formation',
    date: '13.5 billion years ago',
    description: 'Our galaxy begins to form from cosmic gas and dust, eventually becoming the spiral galaxy we call home, containing hundreds of billions of stars.',
    icon: Globe,
    color: 'from-purple-400 to-pink-500',
    category: 'galactic',
    significance: 'Formation of our cosmic neighborhood and the stellar environment that would eventually lead to our solar system.',
    details: [
      'Dark matter halo forms first, providing gravitational framework',
      'Gas clouds merge and collapse within the dark matter structure',
      'First generation of stars begins forming in the galactic halo',
      'Spiral structure begins to emerge through density waves',
      'Star formation accelerates in spiral arms',
      'Central supermassive black hole begins growing',
      'Galaxy continues to grow through mergers with smaller galaxies'
    ],
    relatedEvents: ['2', '4'],
    scientificImpact: 'Demonstrated how galaxies form hierarchically from smaller structures in the cosmic web.',
    modernRelevance: 'Gaia mission is mapping the structure and history of our galaxy in unprecedented detail.',
    keyFigures: ['Jan Oort', 'Bertil Lindblad', 'Fritz Zwicky'],
    location: 'Local Group of galaxies',
    scale: 'galactic'
  },
  {
    id: '4',
    title: 'Solar System Birth and Planetary Formation',
    date: '4.6 billion years ago',
    description: 'Our Sun and planets form from a collapsing nebula, creating the planetary system that includes Earth and setting the stage for the eventual emergence of life.',
    icon: Clock,
    color: 'from-green-400 to-emerald-500',
    category: 'planetary',
    significance: 'Birth of our solar system and the formation of Earth, the only known planet to harbor life.',
    details: [
      'Solar nebula begins to collapse due to gravitational instability',
      'Sun ignites nuclear fusion at the center',
      'Planets form from leftover material in the protoplanetary disk',
      'Earth reaches its current size through accretion',
      'Late Heavy Bombardment shapes planetary surfaces',
      'Moon forms from giant impact with early Earth',
      'Atmospheres and magnetic fields develop on planets'
    ],
    relatedEvents: ['3', '5'],
    scientificImpact: 'Provided the laboratory for studying planetary formation and the conditions necessary for life.',
    modernRelevance: 'Exoplanet discoveries are revealing how common planetary systems are throughout the galaxy.',
    keyFigures: ['Pierre-Simon Laplace', 'Immanuel Kant', 'Viktor Safronov'],
    location: 'Orion Arm of the Milky Way',
    duration: '50 million years',
    scale: 'stellar'
  },
  {
    id: '5',
    title: 'Life Emerges on Earth',
    date: '3.8 billion years ago',
    description: 'The first life forms appear on Earth, beginning the long evolutionary journey that would eventually lead to complex organisms and intelligent life.',
    icon: Globe,
    color: 'from-teal-400 to-green-500',
    category: 'planetary',
    significance: 'The emergence of life represents one of the most significant events in cosmic history.',
    details: [
      'First self-replicating molecules appear',
      'Primitive cells develop protective membranes',
      'Photosynthesis evolves, beginning to change Earth\'s atmosphere',
      'Oxygen levels gradually increase',
      'Complex cells (eukaryotes) evolve',
      'Multicellular life emerges',
      'Cambrian explosion leads to diverse life forms'
    ],
    relatedEvents: ['4', '6'],
    scientificImpact: 'Demonstrated that life can emerge from non-living matter under the right conditions.',
    modernRelevance: 'Astrobiology searches for similar conditions on other worlds like Mars and Europa.',
    keyFigures: ['Charles Darwin', 'Louis Pasteur', 'Stanley Miller', 'Harold Urey'],
    location: 'Earth',
    duration: 'Ongoing for 3.8 billion years',
    scale: 'planetary'
  },
  {
    id: '6',
    title: 'First Telescopes - Opening the Cosmic Eye',
    date: '1608 CE',
    description: 'Hans Lippershey invents the first practical telescope, revolutionizing astronomy and beginning humanity\'s detailed exploration of the cosmos.',
    icon: Telescope,
    color: 'from-indigo-400 to-blue-500',
    category: 'technological',
    significance: 'Marked the beginning of modern observational astronomy and our detailed understanding of the universe.',
    details: [
      'Refracting telescope invented in the Netherlands',
      'Galileo improves the design and turns it skyward',
      'First observations of lunar craters and mountains',
      'Jupiter\'s four largest moons discovered',
      'Venus phases observed, supporting heliocentric model',
      'Milky Way resolved into individual stars',
      'Saturn\'s "handles" (rings) first observed'
    ],
    relatedEvents: ['7', '8'],
    scientificImpact: 'Provided the first detailed observations of celestial objects, revolutionizing our understanding of the cosmos.',
    modernRelevance: 'Led to the development of increasingly powerful telescopes, culminating in space-based observatories.',
    keyFigures: ['Hans Lippershey', 'Galileo Galilei', 'Johannes Kepler', 'Isaac Newton'],
    location: 'Netherlands, then worldwide',
    scale: 'human'
  },
  {
    id: '7',
    title: 'Discovery of Other Galaxies',
    date: '1925 CE',
    description: 'Edwin Hubble proves that "spiral nebulae" are actually other galaxies, vastly expanding our understanding of the universe\'s scale and structure.',
    icon: Star,
    color: 'from-cyan-400 to-blue-500',
    category: 'discovery',
    significance: 'Revealed that the universe is far larger than previously imagined and contains billions of galaxies.',
    details: [
      'Hubble uses Cepheid variable stars as distance indicators',
      'Andromeda Galaxy proven to be outside the Milky Way',
      'Universe revealed to contain billions of galaxies',
      'Great Debate between Shapley and Curtis resolved',
      'Foundation laid for modern cosmology',
      'Island universe hypothesis confirmed',
      'Scale of the universe increased by millions of times'
    ],
    relatedEvents: ['6', '8'],
    scientificImpact: 'Fundamentally changed our understanding of the universe\'s scale and structure.',
    modernRelevance: 'Modern surveys continue to map the large-scale structure of the universe.',
    keyFigures: ['Edwin Hubble', 'Henrietta Swan Leavitt', 'Harlow Shapley', 'Heber Curtis'],
    location: 'Mount Wilson Observatory, California',
    scale: 'universal'
  },
  {
    id: '8',
    title: 'Space Age Begins - Sputnik Launch',
    date: '1957 CE',
    description: 'Sputnik 1 becomes the first artificial satellite, launching the Space Age and beginning humanity\'s direct exploration of space.',
    icon: Rocket,
    color: 'from-red-400 to-pink-500',
    category: 'technological',
    significance: 'Marked the beginning of the Space Age and humanity\'s expansion beyond Earth.',
    details: [
      'Soviet Union launches Sputnik 1 on October 4, 1957',
      'Space race begins between USA and USSR',
      'First human in space: Yuri Gagarin (1961)',
      'Moon landing achieved by Apollo 11 (1969)',
      'Space stations enable long-duration spaceflight',
      'Robotic probes explore the solar system',
      'Hubble Space Telescope revolutionizes astronomy'
    ],
    relatedEvents: ['7', '9'],
    scientificImpact: 'Enabled direct exploration of space and revolutionized our understanding of Earth and the cosmos.',
    modernRelevance: 'Led to the International Space Station, Mars rovers, and plans for human missions to Mars.',
    keyFigures: ['Sergei Korolev', 'Wernher von Braun', 'Yuri Gagarin', 'Neil Armstrong'],
    location: 'Baikonur Cosmodrome, Kazakhstan',
    scale: 'human'
  },
  {
    id: '9',
    title: 'Exoplanet Discovery Era',
    date: '1995 CE',
    description: 'First exoplanet around a Sun-like star discovered, opening a new era in astronomy and the search for life beyond our solar system.',
    icon: Globe,
    color: 'from-purple-500 to-indigo-500',
    category: 'discovery',
    significance: 'Proved that planetary systems are common throughout the galaxy and expanded the search for life.',
    details: [
      '51 Pegasi b discovered by Michel Mayor and Didier Queloz',
      'Radial velocity method proves planets orbit other stars',
      'Kepler Space Telescope discovers thousands of exoplanets',
      'Transit method becomes primary detection technique',
      'Earth-like planets found in habitable zones',
      'Atmospheric composition of exoplanets studied',
      'James Webb Space Telescope begins detailed exoplanet studies'
    ],
    relatedEvents: ['8', '10'],
    scientificImpact: 'Revolutionized our understanding of planetary formation and the potential for life in the universe.',
    modernRelevance: 'Continues with next-generation telescopes searching for signs of life on exoplanets.',
    keyFigures: ['Michel Mayor', 'Didier Queloz', 'Geoffrey Marcy', 'William Borucki'],
    location: 'Observatoire de Haute-Provence, France',
    scale: 'galactic'
  },
  {
    id: '10',
    title: 'James Webb Space Telescope Era',
    date: '2021 CE',
    description: 'The most powerful space telescope ever built begins operations, providing unprecedented views of the early universe and exoplanet atmospheres.',
    icon: Telescope,
    color: 'from-gold-400 to-yellow-500',
    category: 'technological',
    significance: 'Represents the pinnacle of space-based astronomy, capable of observing the first galaxies and signs of life.',
    details: [
      'Largest space telescope mirror ever deployed (6.5 meters)',
      'Observes in infrared to see through cosmic dust',
      'Studies the first galaxies formed after the Big Bang',
      'Analyzes exoplanet atmospheres for signs of life',
      'Located at L2 Lagrange point for stable observations',
      'International collaboration between NASA, ESA, and CSA',
      'Expected to operate for at least 10 years'
    ],
    relatedEvents: ['9'],
    scientificImpact: 'Pushing the boundaries of our understanding of the early universe and the search for life.',
    modernRelevance: 'Currently revolutionizing astronomy with discoveries about early galaxies and exoplanet atmospheres.',
    keyFigures: ['John Mather', 'Marcia Rieke', 'Pierre Ferruit', 'Gillian Wright'],
    location: 'L2 Lagrange Point, 1.5 million km from Earth',
    scale: 'universal'
  }
];

const CosmicTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScale, setSelectedScale] = useState<string>('all');
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const categories = ['all', 'cosmic', 'stellar', 'planetary', 'technological', 'discovery'];
  const scales = ['all', 'universal', 'galactic', 'stellar', 'planetary', 'human'];

  const filteredEvents = timelineEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.keyFigures.some(figure => figure.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesScale = selectedScale === 'all' || event.scale === selectedScale;
    return matchesSearch && matchesCategory && matchesScale;
  });

  const toggleEventExpansion = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Cosmic Timeline Explorer
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Journey through 13.8 billion years of cosmic history, from the Big Bang to modern space exploration. 
            Discover the key events that shaped our universe, from the formation of the first stars to the 
            latest astronomical discoveries. Each event includes detailed scientific information, key figures, 
            and its relevance to modern astronomy.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-delayed">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search events, people, or discoveries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-slate-800">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none transition-all"
            >
              {scales.map(scale => (
                <option key={scale} value={scale} className="bg-slate-800">
                  {scale.charAt(0).toUpperCase() + scale.slice(1)} Scale
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 animate-fade-in-stagger">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-cyan-400">{timelineEvents.length}</div>
            <div className="text-white/60 text-sm">Total Events</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-purple-400">13.8B</div>
            <div className="text-white/60 text-sm">Years Covered</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-green-400">{categories.length - 1}</div>
            <div className="text-white/60 text-sm">Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-yellow-400">{scales.length - 1}</div>
            <div className="text-white/60 text-sm">Scales</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-red-400">{filteredEvents.length}</div>
            <div className="text-white/60 text-sm">Filtered</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full" />

          {/* Timeline Events */}
          <div className="space-y-16">
            {filteredEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              const isExpanded = expandedEvents.has(event.id);

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start ${isEven ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-cyan-400 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`${isEven ? 'mr-8' : 'ml-8'} w-full max-w-lg bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 cursor-pointer hover:scale-102 transition-all duration-300`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        <p className="text-cyan-400 text-sm">{event.date}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.category === 'cosmic' ? 'bg-yellow-400/20 text-yellow-400' :
                            event.category === 'stellar' ? 'bg-blue-400/20 text-blue-400' :
                            event.category === 'planetary' ? 'bg-green-400/20 text-green-400' :
                            event.category === 'technological' ? 'bg-purple-400/20 text-purple-400' :
                            'bg-cyan-400/20 text-cyan-400'
                          }`}>
                            {event.category}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/70">
                            {event.scale}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleEventExpansion(event.id)}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    <p className="text-white/80 mb-4">{event.description}</p>
                    
                    {isExpanded && (
                      <div className="space-y-4 border-t border-white/10 pt-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">Scientific Significance</h4>
                          <p className="text-white/70 text-sm">{event.significance}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Key Details</h4>
                          <ul className="space-y-1">
                            {event.details.slice(0, 4).map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-white/70 text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Key Figures</h4>
                          <div className="flex flex-wrap gap-2">
                            {event.keyFigures.map((figure, figureIndex) => (
                              <span key={figureIndex} className="bg-purple-400/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                                {figure}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Modern Relevance</h4>
                          <p className="text-white/70 text-sm">{event.modernRelevance}</p>
                        </div>
                        
                        {event.location && (
                          <div>
                            <h4 className="font-semibold text-white mb-2">Location</h4>
                            <p className="text-white/70 text-sm">{event.location}</p>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        >
                          View Full Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Event Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 overflow-y-auto animate-scale-in">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>

              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedEvent.color} flex items-center justify-center`}>
                  <selectedEvent.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedEvent.title}</h2>
                  <p className="text-cyan-400 text-lg">{selectedEvent.date}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedEvent.category === 'cosmic' ? 'bg-yellow-400/20 text-yellow-400' :
                      selectedEvent.category === 'stellar' ? 'bg-blue-400/20 text-blue-400' :
                      selectedEvent.category === 'planetary' ? 'bg-green-400/20 text-green-400' :
                      selectedEvent.category === 'technological' ? 'bg-purple-400/20 text-purple-400' :
                      'bg-cyan-400/20 text-cyan-400'
                    }`}>
                      {selectedEvent.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70">
                      {selectedEvent.scale} scale
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                    <p className="text-white/80 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Scientific Significance</h3>
                    <p className="text-white/80 leading-relaxed">{selectedEvent.significance}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Scientific Impact</h3>
                    <p className="text-white/80 leading-relaxed">{selectedEvent.scientificImpact}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Modern Relevance</h3>
                    <p className="text-white/80 leading-relaxed">{selectedEvent.modernRelevance}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Detailed Information</h3>
                    <ul className="space-y-2">
                      {selectedEvent.details.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Key Figures</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.keyFigures.map((figure, index) => (
                        <span key={index} className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                          {figure}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Location</h3>
                      <p className="text-white/80">{selectedEvent.location}</p>
                    </div>
                  )}
                  
                  {selectedEvent.duration && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Duration</h3>
                      <p className="text-white/80">{selectedEvent.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CosmicTimeline;