import React, { useState, useEffect, useRef } from 'react';
import { Radio, Play, Pause, Volume2, VolumeX, Waves, Zap, Globe, Star, Telescope, Satellite, Navigation, Sparkles } from 'lucide-react';

interface SpaceSound {
  id: string;
  name: string;
  description: string;
  source: string;
  icon: React.ComponentType<any>;
  color: string;
  frequency: number;
  waveform: 'sine' | 'square' | 'sawtooth' | 'triangle';
  category: 'planetary' | 'stellar' | 'galactic' | 'cosmic' | 'mission';
  detailedInfo: {
    location: string;
    distance: string;
    discoveryDate: string;
    scientificSignificance: string;
    recordingDetails: string;
    frequency: string;
    duration: string;
    instrument: string;
    dataProcessing: string;
    relatedPhenomena: string[];
    interestingFacts: string[];
  };
}

const spaceSounds: SpaceSound[] = [
  {
    id: 'pulsar-b0329',
    name: 'Pulsar PSR B0329+54',
    description: 'A rapidly spinning neutron star emitting radio waves with clockwork precision',
    source: 'Arecibo Radio Telescope recordings',
    icon: Zap,
    color: '#FF6B6B',
    frequency: 440,
    waveform: 'square',
    category: 'stellar',
    detailedInfo: {
      location: 'Constellation Camelopardalis',
      distance: '3,400 light-years from Earth',
      discoveryDate: '1968 by Antony Hewish and Jocelyn Bell Burnell',
      scientificSignificance: 'One of the first pulsars discovered, revolutionized understanding of neutron stars',
      recordingDetails: 'Radio pulses recorded at 1.4 GHz frequency',
      frequency: '0.714 Hz (1.4 second period)',
      duration: 'Continuous since discovery',
      instrument: 'Arecibo Radio Telescope, Lovell Telescope',
      dataProcessing: 'Radio signals converted to audio frequencies',
      relatedPhenomena: ['Neutron star rotation', 'Magnetic field acceleration', 'Relativistic beaming'],
      interestingFacts: [
        'Spins 0.714 times per second with incredible precision',
        'More accurate than atomic clocks',
        'Magnetic field 1 trillion times stronger than Earth\'s',
        'Neutron star only 20 km across but contains 1.4 solar masses',
        'Lighthouse effect sweeps radio beams across space',
        'Used to test Einstein\'s theory of general relativity'
      ]
    }
  },
  {
    id: 'saturn-radio',
    name: 'Saturn Radio Emissions',
    description: 'Natural radio emissions from Saturn\'s magnetosphere and aurora',
    source: 'Cassini spacecraft Plasma Wave Science instrument',
    icon: Globe,
    color: '#4ECDC4',
    frequency: 330,
    waveform: 'sine',
    category: 'planetary',
    detailedInfo: {
      location: 'Saturn\'s magnetosphere',
      distance: '1.4 billion km from Earth (average)',
      discoveryDate: '1980 by Voyager 1, detailed by Cassini 2004-2017',
      scientificSignificance: 'Reveals magnetospheric dynamics and auroral processes',
      recordingDetails: 'Plasma wave frequencies 1-16 kHz converted to audio',
      frequency: '20-500 kHz (natural), 100-1000 Hz (converted)',
      duration: 'Continuous during Cassini mission',
      instrument: 'Cassini Plasma Wave Science (PWS) instrument',
      dataProcessing: 'Frequency shifted down to audible range',
      relatedPhenomena: ['Auroral kilometric radiation', 'Magnetospheric substorms', 'Ring interactions'],
      interestingFacts: [
        'Saturn\'s radio emissions are modulated by its rotation',
        'Intensity varies with solar wind conditions',
        'Similar to Earth\'s auroral radio emissions but much stronger',
        'Helped determine Saturn\'s true rotation period',
        'Emissions come from electrons spiraling in magnetic field lines',
        'Can be detected from Earth during strong solar storms'
      ]
    }
  },
  {
    id: 'jupiter-aurora',
    name: 'Jupiter Aurora Radio Waves',
    description: 'Intense radio waves from Jupiter\'s powerful auroral activity',
    source: 'Juno mission Waves instrument and ground-based observations',
    icon: Waves,
    color: '#45B7D1',
    frequency: 220,
    waveform: 'sawtooth',
    category: 'planetary',
    detailedInfo: {
      location: 'Jupiter\'s polar regions',
      distance: '628 million km from Earth (average)',
      discoveryDate: '1955 by radio astronomers Burke and Franklin',
      scientificSignificance: 'Strongest planetary radio source, reveals magnetospheric processes',
      recordingDetails: 'Decametric radio bursts 10-40 MHz',
      frequency: '10-40 MHz (natural), 100-2000 Hz (converted)',
      duration: 'Sporadic bursts lasting minutes to hours',
      instrument: 'Juno Waves instrument, Arecibo, VLA',
      dataProcessing: 'Radio frequency data compressed to audio range',
      relatedPhenomena: ['Io plasma torus', 'Magnetospheric dynamics', 'Solar wind interactions'],
      interestingFacts: [
        'Jupiter\'s magnetic field is 20,000 times stronger than Earth\'s',
        'Radio emissions can be heard on shortwave radio from Earth',
        'Io\'s volcanic activity feeds Jupiter\'s radiation belts',
        'Auroras are 1000 times more powerful than Earth\'s',
        'Radio storms can last for months',
        'Emissions influenced by Io\'s orbital position'
      ]
    }
  },
  {
    id: 'voyager-interstellar',
    name: 'Voyager 1 Interstellar Plasma',
    description: 'Sounds from the boundary between our solar system and interstellar space',
    source: 'Voyager 1 Plasma Wave Subsystem',
    icon: Star,
    color: '#96CEB4',
    frequency: 880,
    waveform: 'triangle',
    category: 'cosmic',
    detailedInfo: {
      location: 'Interstellar space beyond heliopause',
      distance: '23.5 billion km from Earth (and increasing)',
      discoveryDate: '2012 when Voyager 1 entered interstellar space',
      scientificSignificance: 'First direct measurements of interstellar plasma',
      recordingDetails: 'Plasma oscillations 2-3 kHz',
      frequency: '2-3 kHz (natural), 200-2000 Hz (processed)',
      duration: 'Ongoing since 2012',
      instrument: 'Voyager 1 Plasma Wave Subsystem (PWS)',
      dataProcessing: 'Plasma wave data converted to audio frequencies',
      relatedPhenomena: ['Interstellar medium', 'Cosmic ray interactions', 'Galactic magnetic fields'],
      interestingFacts: [
        'First human-made object to reach interstellar space',
        'Plasma density 40 times higher than in solar wind',
        'Traveling at 17 km/s relative to the Sun',
        'Will take 40,000 years to approach another star',
        'Still transmitting data after 45+ years',
        'Carries golden record with sounds of Earth'
      ]
    }
  },
  {
    id: 'earth-magnetosphere',
    name: 'Earth\'s Magnetospheric Chorus',
    description: 'Natural radio emissions from Earth\'s magnetic field interactions',
    source: 'Van Allen Probes and ground-based VLF receivers',
    icon: Globe,
    color: '#FFEAA7',
    frequency: 550,
    waveform: 'sine',
    category: 'planetary',
    detailedInfo: {
      location: 'Earth\'s magnetosphere',
      distance: '0 km (home planet)',
      discoveryDate: '1950s during early radio astronomy',
      scientificSignificance: 'Understanding space weather and radiation belt dynamics',
      recordingDetails: 'VLF emissions 0.3-30 kHz',
      frequency: '0.3-30 kHz (natural), 300-3000 Hz (audio)',
      duration: 'Continuous, varies with solar activity',
      instrument: 'Van Allen Probes, ground VLF stations',
      dataProcessing: 'VLF radio waves directly audible or frequency shifted',
      relatedPhenomena: ['Aurora borealis/australis', 'Solar wind', 'Radiation belts'],
      interestingFacts: [
        'Sounds like bird songs or whale calls',
        'Generated by electrons bouncing in radiation belts',
        'Intensity increases during geomagnetic storms',
        'Can be heard on VLF radio receivers',
        'Helps protect Earth from harmful cosmic radiation',
        'Similar phenomena occur on other magnetized planets'
      ]
    }
  },
  {
    id: 'black-hole-m87',
    name: 'Black Hole M87* Accretion Disk',
    description: 'Sonified data from the supermassive black hole in galaxy M87',
    source: 'Event Horizon Telescope collaboration data',
    icon: Zap,
    color: '#A29BFE',
    frequency: 110,
    waveform: 'square',
    category: 'galactic',
    detailedInfo: {
      location: 'Center of galaxy M87',
      distance: '55 million light-years from Earth',
      discoveryDate: '2019 first direct image by Event Horizon Telescope',
      scientificSignificance: 'First direct image of a black hole event horizon',
      recordingDetails: 'Radio telescope data sonified to audio frequencies',
      frequency: '230 GHz (observed), 50-500 Hz (sonified)',
      duration: 'Snapshot observations over several days',
      instrument: 'Event Horizon Telescope array',
      dataProcessing: 'Radio brightness data mapped to audio frequencies and tones',
      relatedPhenomena: ['Accretion disk dynamics', 'Relativistic jets', 'Gravitational lensing'],
      interestingFacts: [
        'Mass 6.5 billion times that of our Sun',
        'Event horizon diameter larger than our solar system',
        'Rotates at nearly the speed of light',
        'Jets extend 5,000 light-years from the black hole',
        'Temperature near event horizon reaches billions of degrees',
        'Confirms Einstein\'s predictions about black holes'
      ]
    }
  },
  {
    id: 'sun-solar-wind',
    name: 'Solar Wind Plasma Waves',
    description: 'Sounds from the stream of charged particles flowing from the Sun',
    source: 'Parker Solar Probe and Solar Orbiter missions',
    icon: Star,
    color: '#FF9F43',
    frequency: 150,
    waveform: 'sawtooth',
    category: 'stellar',
    detailedInfo: {
      location: 'Solar corona and interplanetary space',
      distance: '0.1-1 AU from the Sun',
      discoveryDate: '1950s, detailed by modern solar missions',
      scientificSignificance: 'Understanding solar-terrestrial interactions and space weather',
      recordingDetails: 'Plasma wave measurements 10 Hz - 20 kHz',
      frequency: '10 Hz - 20 kHz (natural), 50-2000 Hz (processed)',
      duration: 'Continuous solar wind flow',
      instrument: 'Parker Solar Probe FIELDS, Solar Orbiter RPW',
      dataProcessing: 'Electric field measurements converted to audio',
      relatedPhenomena: ['Coronal mass ejections', 'Solar flares', 'Magnetic reconnection'],
      interestingFacts: [
        'Solar wind travels at 400-800 km/s',
        'Carries Sun\'s magnetic field throughout solar system',
        'Creates comet tails and auroras on planets',
        'Parker Solar Probe has "touched" the Sun\'s corona',
        'Solar wind pressure varies with 11-year solar cycle',
        'Protects solar system from some galactic cosmic rays'
      ]
    }
  },
  {
    id: 'milky-way-center',
    name: 'Galactic Center Radio Source',
    description: 'Radio emissions from the supermassive black hole at our galaxy\'s center',
    source: 'Very Large Array and ALMA telescope observations',
    icon: Navigation,
    color: '#6C5CE7',
    frequency: 80,
    waveform: 'triangle',
    category: 'galactic',
    detailedInfo: {
      location: 'Sagittarius A*, Galactic Center',
      distance: '26,000 light-years from Earth',
      discoveryDate: '1974 as radio source, black hole confirmed 2020',
      scientificSignificance: 'Central engine of our galaxy, Nobel Prize 2020',
      recordingDetails: 'Radio continuum observations at multiple frequencies',
      frequency: '1-100 GHz (observed), 30-300 Hz (sonified)',
      duration: 'Continuous monitoring since 1970s',
      instrument: 'VLA, ALMA, Keck Observatory',
      dataProcessing: 'Radio flux density variations mapped to audio',
      relatedPhenomena: ['Stellar orbits', 'Accretion processes', 'Relativistic effects'],
      interestingFacts: [
        'Mass 4 million times that of our Sun',
        'Stars orbit at 7,000 km/s near the black hole',
        'Relatively quiet compared to other galactic centers',
        'Surrounded by dense cluster of stars',
        'Occasionally flares when consuming material',
        'Hidden behind dust clouds, visible only in radio/infrared'
      ]
    }
  },
  {
    id: 'neutron-star-collision',
    name: 'Neutron Star Merger GW170817',
    description: 'Sonified gravitational waves from colliding neutron stars',
    source: 'LIGO-Virgo gravitational wave detectors',
    icon: Sparkles,
    color: '#FD79A8',
    frequency: 200,
    waveform: 'sine',
    category: 'cosmic',
    detailedInfo: {
      location: 'Galaxy NGC 4993',
      distance: '130 million light-years from Earth',
      discoveryDate: 'August 17, 2017',
      scientificSignificance: 'First multi-messenger astronomy event, confirmed neutron star mergers create gold',
      recordingDetails: 'Gravitational wave strain data converted to audio',
      frequency: '35-250 Hz (gravitational waves), 100-2000 Hz (audio)',
      duration: '100 seconds of observable signal',
      instrument: 'LIGO Hanford, LIGO Livingston, Virgo detectors',
      dataProcessing: 'Strain data frequency shifted and amplified for audibility',
      relatedPhenomena: ['Kilonova explosion', 'Gamma-ray burst', 'Heavy element synthesis'],
      interestingFacts: [
        'Created gold worth $10 octillion',
        'Produced gravitational waves detectable across universe',
        'Confirmed Einstein\'s predictions about spacetime',
        'Generated short gamma-ray burst',
        'Created elements heavier than iron',
        'Visible in optical, X-ray, and radio wavelengths for months'
      ]
    }
  },
  {
    id: 'cosmic-microwave-background',
    name: 'Cosmic Microwave Background',
    description: 'The afterglow of the Big Bang, sonified from temperature fluctuations',
    source: 'Planck satellite and WMAP observations',
    icon: Telescope,
    color: '#00B894',
    frequency: 60,
    waveform: 'sine',
    category: 'cosmic',
    detailedInfo: {
      location: 'Observable universe, 380,000 years after Big Bang',
      distance: '13.8 billion light-years (time)',
      discoveryDate: '1965 by Penzias and Wilson (Nobel Prize 1978)',
      scientificSignificance: 'Strongest evidence for Big Bang theory, reveals early universe structure',
      recordingDetails: 'Temperature anisotropies mapped to audio frequencies',
      frequency: '160 GHz (peak), 20-200 Hz (sonified)',
      duration: 'Snapshot of universe at 380,000 years old',
      instrument: 'Planck satellite, WMAP, ground-based telescopes',
      dataProcessing: 'Temperature variations converted to pitch and amplitude',
      relatedPhenomena: ['Big Bang nucleosynthesis', 'Recombination epoch', 'Dark matter structure'],
      interestingFacts: [
        'Temperature 2.725 K everywhere in universe',
        'Tiny fluctuations led to galaxy formation',
        'Accidentally discovered while testing satellite communication',
        'Provides baby picture of the universe',
        'Confirms universe is 13.8 billion years old',
        'Shows universe is flat and expanding'
      ]
    }
  }
];

const DeepSpaceRadio: React.FC = () => {
  const [selectedSound, setSelectedSound] = useState<SpaceSound>(spaceSounds[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [visualData, setVisualData] = useState<number[]>(new Array(64).fill(0));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetails, setShowDetails] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  const categories = ['all', 'planetary', 'stellar', 'galactic', 'cosmic', 'mission'];

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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startSound = () => {
    if (!audioContextRef.current) return;

    stopSound();

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const analyser = audioContext.createAnalyser();

    oscillator.type = selectedSound.waveform;
    oscillator.frequency.setValueAtTime(selectedSound.frequency, audioContext.currentTime);
    
    // Add complex modulation for realistic space sounds
    const lfo1 = audioContext.createOscillator();
    const lfo2 = audioContext.createOscillator();
    const lfoGain1 = audioContext.createGain();
    const lfoGain2 = audioContext.createGain();
    
    lfo1.frequency.setValueAtTime(0.3, audioContext.currentTime);
    lfo2.frequency.setValueAtTime(0.7, audioContext.currentTime);
    lfo1.type = 'sine';
    lfo2.type = 'triangle';
    
    lfoGain1.gain.setValueAtTime(selectedSound.frequency * 0.05, audioContext.currentTime);
    lfoGain2.gain.setValueAtTime(selectedSound.frequency * 0.02, audioContext.currentTime);
    
    lfo1.connect(lfoGain1);
    lfo2.connect(lfoGain2);
    lfoGain1.connect(oscillator.frequency);
    lfoGain2.connect(oscillator.frequency);
    
    lfo1.start();
    lfo2.start();

    gainNode.gain.setValueAtTime(isMuted ? 0 : volume, audioContext.currentTime);
    
    analyser.fftSize = 128;
    
    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);
    
    oscillator.start();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    analyserRef.current = analyser;
    
    startVisualization();
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const startVisualization = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateVisualization = () => {
      analyser.getByteFrequencyData(dataArray);
      
      const normalizedData = Array.from(dataArray).map((value, index) => {
        const normalized = value / 255;
        const spaceNoise = Math.random() * 0.15;
        const cosmicVariation = Math.sin(Date.now() * 0.001 + index * 0.1) * 0.1;
        return Math.min(1, normalized + spaceNoise + cosmicVariation);
      });
      
      setVisualData(normalizedData);
      animationRef.current = requestAnimationFrame(updateVisualization);
    };

    updateVisualization();
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSound();
      setIsPlaying(false);
    } else {
      startSound();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current!.currentTime);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? volume : 0,
        audioContextRef.current!.currentTime
      );
    }
  };

  const handleSoundSelect = (sound: SpaceSound) => {
    const wasPlaying = isPlaying;
    if (isPlaying) {
      stopSound();
      setIsPlaying(false);
    }
    
    setSelectedSound(sound);
    
    if (wasPlaying) {
      setTimeout(() => {
        startSound();
        setIsPlaying(true);
      }, 100);
    }
  };

  const filteredSounds = spaceSounds.filter(sound => 
    selectedCategory === 'all' || sound.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 style={{marginTop:"50px"}} className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Deep Space Radio Observatory
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Listen to the authentic sounds of the cosmos - from pulsars and black holes to planetary magnetospheres 
            and gravitational waves. Experience the universe through audio with scientifically accurate sonifications 
            of real astronomical data from space missions and observatories worldwide.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 animate-fade-in-delayed">
          <div className="flex flex-wrap gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Radio Interface */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-8 animate-fade-in-stagger">
          {/* Current Playing */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                style={{ 
                  backgroundColor: selectedSound.color,
                  boxShadow: `0 0 30px ${selectedSound.color}60`
                }}
              >
                <selectedSound.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedSound.name}</h2>
                <p className="text-white/70">{selectedSound.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="bg-white/20 px-2 py-1 rounded-full text-white/80">
                    {selectedSound.category}
                  </span>
                  <span className="text-cyan-400">
                    {selectedSound.frequency} Hz
                  </span>
                  <span className="text-purple-400">
                    {selectedSound.waveform.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-white/60 mb-6">
              Source: {selectedSound.source}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <button
                onClick={togglePlayback}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="text-white/70 hover:text-white transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-24 accent-cyan-400"
                />
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Radio className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Enhanced Audio Visualizer */}
          <div className="relative h-40 bg-black/30 rounded-xl overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-end justify-center space-x-1 p-4">
              {visualData.slice(0, 48).map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-cyan-400 via-purple-400 to-pink-400 rounded-sm transition-all duration-100"
                  style={{
                    width: '6px',
                    height: `${Math.max(4, value * 120)}px`,
                    opacity: isPlaying ? 0.8 + value * 0.2 : 0.3,
                    boxShadow: isPlaying ? `0 0 ${value * 10}px ${selectedSound.color}40` : 'none'
                  }}
                />
              ))}
            </div>
            
            {/* Cosmic background effect */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>

            {/* Frequency Display */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
              <div className="text-cyan-400 text-sm font-mono">
                {selectedSound.frequency.toFixed(1)} Hz
              </div>
              <div className="text-white/60 text-xs">
                {selectedSound.waveform.toUpperCase()}
              </div>
            </div>

            {/* Distance Display */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
              <div className="text-purple-400 text-sm">
                {selectedSound.detailedInfo.distance}
              </div>
              <div className="text-white/60 text-xs">
                Distance
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Panel */}
        {showDetails && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8 animate-fade-in">
            <h3 className="text-2xl font-semibold text-white mb-6">Scientific Details</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-3">Discovery & Significance</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60">Discovery Date</div>
                      <div className="text-white">{selectedSound.detailedInfo.discoveryDate}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60">Scientific Significance</div>
                      <div className="text-white">{selectedSound.detailedInfo.scientificSignificance}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Recording Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60">Instrument</div>
                      <div className="text-white">{selectedSound.detailedInfo.instrument}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60">Frequency Range</div>
                      <div className="text-white">{selectedSound.detailedInfo.frequency}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60">Data Processing</div>
                      <div className="text-white">{selectedSound.detailedInfo.dataProcessing}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">Related Phenomena</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSound.detailedInfo.relatedPhenomena.map((phenomenon, index) => (
                      <span key={index} className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                        {phenomenon}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">Fascinating Facts</h4>
                  <ul className="space-y-2">
                    {selectedSound.detailedInfo.interestingFacts.slice(0, 4).map((fact, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sound Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-final">
          {filteredSounds.map((sound, index) => {
            const Icon = sound.icon;
            return (
              <button
                key={sound.id}
                onClick={() => handleSoundSelect(sound)}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl border p-6 text-left transition-all hover:scale-102 ${
                  selectedSound.id === sound.id
                    ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                    : 'border-white/20 hover:bg-white/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: sound.color,
                      boxShadow: `0 0 20px ${sound.color}40`
                    }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{sound.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-cyan-400 text-sm">{sound.frequency} Hz</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs text-white/80">
                        {sound.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-3">{sound.description}</p>
                
                <div className="text-xs text-white/50">
                  {sound.detailedInfo.location}
                </div>
                <div className="text-xs text-white/40 mt-1">
                  Distance: {sound.detailedInfo.distance}
                </div>
              </button>
            );
          })}
        </div>

        {/* Information Panel */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Satellite className="h-5 w-5 mr-2 text-cyan-400" />
            About Deep Space Radio Observatory
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">What You're Hearing</h4>
                <p className="text-white/70 text-sm">
                  These are authentic sonifications of real astronomical data from space missions, radio telescopes, 
                  and gravitational wave detectors. While space is mostly silent, electromagnetic waves, plasma 
                  oscillations, and gravitational waves can be converted to audio frequencies while preserving 
                  their original patterns and scientific characteristics.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Scientific Accuracy</h4>
                <p className="text-white/70 text-sm">
                  Each sound is based on real measurements from spacecraft instruments, radio telescopes, or 
                  gravitational wave detectors. The frequency relationships, timing, and variations you hear 
                  reflect the actual physical processes occurring in space, scaled to audible frequencies.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Data Sources</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• NASA space missions (Voyager, Cassini, Juno, Parker Solar Probe)</li>
                  <li>• Radio telescopes (Arecibo, VLA, ALMA)</li>
                  <li>• Gravitational wave detectors (LIGO, Virgo)</li>
                  <li>• Space-based observatories (Planck, Hubble, Chandra)</li>
                  <li>• Ground-based monitoring stations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Categories</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• <strong>Planetary:</strong> Magnetospheres, auroras, atmospheric phenomena</li>
                  <li>• <strong>Stellar:</strong> Pulsars, solar wind, stellar emissions</li>
                  <li>• <strong>Galactic:</strong> Black holes, galactic center, star formation</li>
                  <li>• <strong>Cosmic:</strong> Big Bang afterglow, gravitational waves, dark matter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepSpaceRadio;