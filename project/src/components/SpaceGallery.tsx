import React, { useState, useEffect } from 'react';
import { ZoomIn, Download, Star, Search, Filter, X, Calendar,  Telescope as  Info } from 'lucide-react';

interface SpaceImage {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  date: string;
  credits: string;
  detailedInfo: {
    location: string;
    distance: string;
    size: string;
    age: string;
    composition: string;
    temperature: string;
    discoveryDate: string;
    telescope: string;
    wavelength: string;
    exposureTime: string;
    resolution: string;
    scientificSignificance: string;
    relatedMissions: string[];
    interestingFacts: string[];
  };
  technicalDetails: {
    instrument: string;
    filters: string[];
    processingDate: string;
    imageType: string;
    coordinates: string;
    magnitude: string;
  };
}

const SpaceGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<SpaceImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [images, setImages] = useState<SpaceImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'detailed' | 'technical'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'category'>('date');

  const categories = ['all', 'nebulae', 'galaxies', 'planets', 'missions', 'black-holes', 'star-clusters', 'exoplanets', 'solar-system', 'deep-space'];

  // Enhanced NASA images with comprehensive data
  const mockImages: SpaceImage[] = [
    {
      id: '1',
      title: 'Crab Nebula - Supernova Remnant M1',
      url: 'https://images.pexels.com/photos/17662495/pexels-photo-17662495.jpeg',
      description: 'The Crab Nebula is a supernova remnant and pulsar wind nebula in the constellation Taurus. This spectacular object is the result of a supernova explosion observed by Chinese astronomers in 1054 AD. The nebula contains a pulsar at its center that spins 30 times per second, emitting beams of radiation that sweep across space like a cosmic lighthouse.',
      category: 'nebulae',
      date: '2024-01-15',
      credits: 'NASA/ESA Hubble Space Telescope',
      detailedInfo: {
        location: 'Constellation Taurus',
        distance: '6,500 light-years from Earth',
        size: '11 light-years across',
        age: '970 years (since supernova explosion)',
        composition: 'Hydrogen, helium, carbon, oxygen, nitrogen, neon, sulfur',
        temperature: '10,000-20,000 K in filaments',
        discoveryDate: '1731 by John Bevis',
        telescope: 'Hubble Space Telescope',
        wavelength: 'Visible light, X-ray, radio',
        exposureTime: '2.5 hours total',
        resolution: '0.1 arcseconds',
        scientificSignificance: 'First supernova remnant identified, contains the first discovered pulsar, serves as a standard candle for astronomical distance measurements',
        relatedMissions: ['Hubble Space Telescope', 'Chandra X-ray Observatory', 'Spitzer Space Telescope'],
        interestingFacts: [
          'The pulsar at its center rotates 30 times per second',
          'Visible to naked eye during 1054 AD supernova event',
          'Expanding at 1,500 kilometers per second',
          'Contains as much mass as our Sun compressed into a 20-kilometer sphere',
          'Emits more energy in one second than our Sun does in a year'
        ]
      },
      technicalDetails: {
        instrument: 'Wide Field Camera 3',
        filters: ['F656N (H-alpha)', 'F502N (OIII)', 'F673N (SII)'],
        processingDate: '2024-01-15',
        imageType: 'Composite RGB',
        coordinates: 'RA 05h 34m 31.94s, Dec +22° 00\' 52.2"',
        magnitude: '8.4 (visual)'
      }
    },
    {
      id: '2',
      title: 'Andromeda Galaxy - M31 Spiral Galaxy',
      url: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',
      description: 'The Andromeda Galaxy is the nearest major galaxy to the Milky Way and the most distant object visible to the naked eye. This magnificent spiral galaxy contains approximately one trillion stars and is on a collision course with our own galaxy, though this cosmic encounter won\'t occur for another 4.5 billion years.',
      category: 'galaxies',
      date: '2024-01-20',
      credits: 'NASA/ESA Hubble Space Telescope',
      detailedInfo: {
        location: 'Constellation Andromeda',
        distance: '2.537 million light-years from Earth',
        size: '220,000 light-years in diameter',
        age: '10 billion years',
        composition: 'Approximately 1 trillion stars, dark matter, gas, dust',
        temperature: 'Varies from 10 K (dust) to millions of K (stellar cores)',
        discoveryDate: '964 AD by Persian astronomer Abd al-Rahman al-Sufi',
        telescope: 'Hubble Space Telescope',
        wavelength: 'Visible, near-infrared, ultraviolet',
        exposureTime: '7.5 hours total',
        resolution: '0.05 arcseconds',
        scientificSignificance: 'Nearest major galaxy, provides insights into galaxy formation and evolution, will merge with Milky Way',
        relatedMissions: ['Hubble Space Telescope', 'Spitzer Space Telescope', 'Galex'],
        interestingFacts: [
          'Approaching Milky Way at 250,000 mph',
          'Contains a supermassive black hole 100 million times the mass of our Sun',
          'Has at least 14 satellite galaxies',
          'Visible to naked eye as a fuzzy star',
          'Will create "Milkomeda" galaxy when it merges with Milky Way'
        ]
      },
      technicalDetails: {
        instrument: 'Advanced Camera for Surveys',
        filters: ['F435W (B)', 'F555W (V)', 'F814W (I)'],
        processingDate: '2024-01-20',
        imageType: 'Multi-wavelength composite',
        coordinates: 'RA 00h 42m 44.3s, Dec +41° 16\' 09"',
        magnitude: '3.4 (visual)'
      }
    },
    {
      id: '3',
      title: 'Mars - Olympus Mons and Valles Marineris',
      url: 'https://images.pexels.com/photos/32909721/pexels-photo-32909721.jpeg',
      description: 'This comprehensive view of Mars showcases the planet\'s most dramatic geological features including Olympus Mons, the largest volcano in the solar system, and Valles Marineris, a canyon system that stretches over 4,000 kilometers across the Martian surface. The image reveals the complex geological history of the Red Planet.',
      category: 'planets',
      date: '2024-01-25',
      credits: 'NASA Mars Reconnaissance Orbiter',
      detailedInfo: {
        location: 'Fourth planet from the Sun',
        distance: '225 million kilometers from Earth (average)',
        size: '6,792 kilometers in diameter',
        age: '4.6 billion years',
        composition: 'Iron oxide surface, basaltic rock, water ice at poles',
        temperature: '-80°C to 20°C',
        discoveryDate: 'Known since ancient times',
        telescope: 'Mars Reconnaissance Orbiter',
        wavelength: 'Visible light',
        exposureTime: 'Multiple orbital passes',
        resolution: '25 centimeters per pixel',
        scientificSignificance: 'Evidence of past water activity, potential for past or present life, target for human exploration',
        relatedMissions: ['Mars Reconnaissance Orbiter', 'Perseverance Rover', 'Curiosity Rover', 'InSight Lander'],
        interestingFacts: [
          'Olympus Mons is 21 kilometers high - nearly three times taller than Mount Everest',
          'Valles Marineris is 4,000 km long and up to 7 km deep',
          'Has the largest dust storms in the solar system',
          'A day on Mars is 24 hours and 37 minutes',
          'Has two small moons: Phobos and Deimos'
        ]
      },
      technicalDetails: {
        instrument: 'HiRISE (High Resolution Imaging Science Experiment)',
        filters: ['Red', 'Blue-Green', 'Near-Infrared'],
        processingDate: '2024-01-25',
        imageType: 'Enhanced color composite',
        coordinates: 'Various locations on Mars',
        magnitude: '-2.9 to +1.9 (varies with distance)'
      }
    },
    {
      id: '4',
      title: 'Eagle Nebula - Pillars of Creation',
      url: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
      description: 'The iconic Pillars of Creation in the Eagle Nebula represent one of the most famous astronomical images ever captured. These towering columns of gas and dust are stellar nurseries where new stars are being born. The pillars are being slowly eroded by the intense radiation from nearby young, hot stars.',
      category: 'nebulae',
      date: '2024-01-30',
      credits: 'NASA/ESA/CSA James Webb Space Telescope',
      detailedInfo: {
        location: 'Constellation Serpens',
        distance: '7,000 light-years from Earth',
        size: '4-5 light-years tall',
        age: '5-6 million years',
        composition: 'Hydrogen, helium, carbon monoxide, molecular hydrogen',
        temperature: '10-50 K in dense regions',
        discoveryDate: '1745-46 by Jean-Philippe Loys de Chéseaux',
        telescope: 'James Webb Space Telescope',
        wavelength: 'Near-infrared',
        exposureTime: '12.5 hours total',
        resolution: '0.1 arcseconds',
        scientificSignificance: 'Active star formation region, demonstrates stellar birth processes, iconic representation of cosmic creation',
        relatedMissions: ['James Webb Space Telescope', 'Hubble Space Telescope', 'Spitzer Space Telescope'],
        interestingFacts: [
          'The pillars are being destroyed by radiation from nearby stars',
          'New stars are forming inside the dense gas clouds',
          'The entire structure will be gone in 3 million years',
          'Contains "EGGs" - Evaporating Gaseous Globules',
          'First imaged by Hubble in 1995, revolutionizing public interest in astronomy'
        ]
      },
      technicalDetails: {
        instrument: 'Near Infrared Camera (NIRCam)',
        filters: ['F090W', 'F187N', 'F200W', 'F335M', 'F444W'],
        processingDate: '2024-01-30',
        imageType: 'False-color infrared composite',
        coordinates: 'RA 18h 18m 48s, Dec -13° 49\' 00"',
        magnitude: '6.0 (visual)'
      }
    },
    {
      id: '5',
      title: 'Saturn - Ring System and Atmospheric Dynamics',
      url: 'https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg',
      description: 'This detailed view of Saturn reveals the intricate structure of its magnificent ring system and the complex atmospheric dynamics of the gas giant. The image shows the planet\'s hexagonal storm at the north pole, various atmospheric bands, and the detailed structure of the rings including the Cassini Division.',
      category: 'planets',
      date: '2024-02-05',
      credits: 'NASA/JPL-Caltech/Space Science Institute',
      detailedInfo: {
        location: 'Sixth planet from the Sun',
        distance: '1.4 billion kilometers from Earth (average)',
        size: '120,536 kilometers in diameter',
        age: '4.6 billion years',
        composition: 'Hydrogen and helium gas giant with rocky core',
        temperature: '-178°C (cloud tops)',
        discoveryDate: 'Known since ancient times, rings discovered 1659',
        telescope: 'Cassini spacecraft',
        wavelength: 'Visible light',
        exposureTime: 'Multiple exposures combined',
        resolution: '1 kilometer per pixel',
        scientificSignificance: 'Most extensive ring system, unique hexagonal polar storm, numerous moons with potential for life',
        relatedMissions: ['Cassini-Huygens', 'Pioneer 11', 'Voyager 1 & 2'],
        interestingFacts: [
          'Has a hexagonal storm at its north pole',
          'Density is less than water - it would float',
          'Has 82 confirmed moons',
          'Rings are made mostly of water ice',
          'A day on Saturn is only 10.7 hours'
        ]
      },
      technicalDetails: {
        instrument: 'Imaging Science Subsystem (ISS)',
        filters: ['Clear', 'Red', 'Green', 'Blue'],
        processingDate: '2024-02-05',
        imageType: 'Natural color composite',
        coordinates: 'Orbital observations',
        magnitude: '-0.5 to +1.2 (varies with ring orientation)'
      }
    },
    {
      id: '6',
      title: 'Spiral Galaxy NGC 1300 - Barred Spiral Structure',
      url: 'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg',
      description: 'NGC 1300 is a perfect example of a barred spiral galaxy, showcasing the elegant spiral arm structure that extends from a central bar. This galaxy provides insights into galactic evolution and the role of central bars in channeling gas toward the galactic center, potentially feeding central black holes.',
      category: 'galaxies',
      date: '2024-02-10',
      credits: 'NASA/ESA Hubble Space Telescope',
      detailedInfo: {
        location: 'Constellation Eridanus',
        distance: '61 million light-years from Earth',
        size: '110,000 light-years in diameter',
        age: '12 billion years',
        composition: 'Approximately 100 billion stars, gas, dust, dark matter',
        temperature: 'Varies from 10 K to millions of K',
        discoveryDate: '1835 by John Herschel',
        telescope: 'Hubble Space Telescope',
        wavelength: 'Visible light',
        exposureTime: '8 hours total',
        resolution: '0.1 arcseconds',
        scientificSignificance: 'Perfect example of barred spiral galaxy, demonstrates galactic structure and evolution',
        relatedMissions: ['Hubble Space Telescope'],
        interestingFacts: [
          'The central bar is 83,000 light-years long',
          'Contains a supermassive black hole at its center',
          'Star formation occurs primarily in the spiral arms',
          'The bar structure helps channel gas toward the center',
          'Similar in structure to our own Milky Way galaxy'
        ]
      },
      technicalDetails: {
        instrument: 'Advanced Camera for Surveys',
        filters: ['F435W (B)', 'F555W (V)', 'F814W (I)'],
        processingDate: '2024-02-10',
        imageType: 'True-color composite',
        coordinates: 'RA 03h 19m 41.0s, Dec -19° 24\' 40"',
        magnitude: '10.7 (visual)'
      }
    },
    {
      id: '7',
      title: 'Horsehead Nebula - Dark Nebula in Orion',
      url: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
      description: 'The Horsehead Nebula is one of the most recognizable dark nebulae in the sky. This striking silhouette is created by a dense cloud of gas and dust that blocks the light from the bright emission nebula behind it. The nebula is part of the Orion Molecular Cloud Complex.',
      category: 'nebulae',
      date: '2024-02-15',
      credits: 'NASA/ESA Hubble Space Telescope',
      detailedInfo: {
        location: 'Constellation Orion',
        distance: '1,500 light-years from Earth',
        size: '3.5 light-years across',
        age: 'Approximately 5 million years',
        composition: 'Dense molecular hydrogen, dust grains, carbon monoxide',
        temperature: '10-20 K',
        discoveryDate: '1888 by Williamina Fleming',
        telescope: 'Hubble Space Telescope',
        wavelength: 'Near-infrared',
        exposureTime: '6 hours total',
        resolution: '0.1 arcseconds',
        scientificSignificance: 'Classic example of dark nebula, part of active star-forming region, demonstrates interstellar medium properties',
        relatedMissions: ['Hubble Space Telescope', 'James Webb Space Telescope'],
        interestingFacts: [
          'The dark cloud is denser than surrounding space by factor of 100',
          'Will be dispersed by stellar winds in about 5 million years',
          'Part of the larger Orion Molecular Cloud Complex',
          'Contains protostars that will become new stars',
          'The red glow comes from hydrogen gas excited by nearby stars'
        ]
      },
      technicalDetails: {
        instrument: 'Wide Field Camera 3',
        filters: ['F160W (H-band)', 'F110W (J-band)'],
        processingDate: '2024-02-15',
        imageType: 'False-color infrared',
        coordinates: 'RA 05h 40m 59.0s, Dec -02° 27\' 33"',
        magnitude: '6.8 (visual, surrounding region)'
      }
    },
    {
      id: '8',
      title: 'Jupiter - Great Red Spot and Atmospheric Bands',
      url: 'https://images.pexels.com/photos/29998043/pexels-photo-29998043.jpeg',
      description: 'This detailed image of Jupiter showcases the planet\'s most famous feature, the Great Red Spot, along with the complex banded structure of its atmosphere. The Great Red Spot is a massive anticyclonic storm that has been raging for at least 400 years and is larger than Earth.',
      category: 'planets',
      date: '2024-02-20',
      credits: 'NASA/JPL-Caltech/SwRI/MSSS',
      detailedInfo: {
        location: 'Fifth planet from the Sun',
        distance: '628 million kilometers from Earth (average)',
        size: '142,984 kilometers in diameter',
        age: '4.6 billion years',
        composition: 'Hydrogen and helium gas giant with possible rocky core',
        temperature: '-145°C (cloud tops)',
        discoveryDate: 'Known since ancient times',
        telescope: 'Juno spacecraft',
        wavelength: 'Visible light',
        exposureTime: 'Multiple close passes',
        resolution: '2 kilometers per pixel',
        scientificSignificance: 'Largest planet, protects inner planets from asteroids, has largest moon system',
        relatedMissions: ['Juno', 'Galileo', 'Voyager 1 & 2', 'Pioneer 10 & 11'],
        interestingFacts: [
          'Great Red Spot is shrinking and has been for 150 years',
          'Has 79 known moons including four Galilean moons',
          'Radiates more heat than it receives from the Sun',
          'Has the strongest magnetic field of any planet',
          'A day on Jupiter is less than 10 hours'
        ]
      },
      technicalDetails: {
        instrument: 'JunoCam',
        filters: ['Methane', 'Blue', 'Green', 'Red'],
        processingDate: '2024-02-20',
        imageType: 'Enhanced color composite',
        coordinates: 'Orbital observations',
        magnitude: '-2.9 to -1.6 (varies with distance)'
      }
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setImages(mockImages);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.detailedInfo.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'date':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleImageClick = (image: SpaceImage) => {
    setSelectedImage(image);
    setViewMode('detailed');
  };

  const handleDownload = (image: SpaceImage) => {
    // In production, this would download the actual high-res image
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, '_')}_4K.jpg`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 style={{marginTop:"50px"}} className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Cosmic Image Archive
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Explore the universe through the most comprehensive collection of high-resolution astronomical imagery. 
            Each image comes with detailed scientific information, technical specifications, and fascinating insights 
            into the cosmos. From nearby planets to distant galaxies, discover the wonders of space through the eyes 
            of the world's most advanced telescopes and space missions.
          </p>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in-delayed">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, location, or description..."
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
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 appearance-none transition-all"
            >
              <option value="date" className="bg-slate-800">Sort by Date</option>
              <option value="name" className="bg-slate-800">Sort by Name</option>
              <option value="category" className="bg-slate-800">Sort by Category</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-stagger">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-cyan-400">{images.length}</div>
            <div className="text-white/60 text-sm">Total Images</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-purple-400">{categories.length - 1}</div>
            <div className="text-white/60 text-sm">Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-green-400">{filteredImages.length}</div>
            <div className="text-white/60 text-sm">Filtered Results</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">4K+</div>
            <div className="text-white/60 text-sm">Resolution</div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-stagger">
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:scale-102 transition-all duration-300"
              onClick={() => handleImageClick(image)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                    className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    {image.detailedInfo.telescope}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {image.title}
                  </h3>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-white/60 text-sm mb-3 line-clamp-2">{image.description}</p>
                <div className="flex items-center justify-between text-xs text-white/40 mb-3">
                  <span>{image.date}</span>
                  <span className="bg-white/10 px-2 py-1 rounded-full">
                    {image.category.replace('-', ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/5 p-2 rounded">
                    <div className="text-white/40">Distance</div>
                    <div className="text-white font-medium">{image.detailedInfo.distance}</div>
                  </div>
                  <div className="bg-white/5 p-2 rounded">
                    <div className="text-white/40">Size</div>
                    <div className="text-white font-medium">{image.detailedInfo.size}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Image Modal */}
        {selectedImage && (
          <div style={{marginTop:"100px"}} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="relative max-w-6xl max-h-[95vh] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 animate-scale-in">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* View Mode Tabs */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                {['detailed', 'technical'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400'
                        : 'bg-black/50 text-white/70 hover:bg-black/70'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[95vh] overflow-hidden">
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Information Panel */}
                <div className="p-6 overflow-y-auto max-h-[95vh]">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                  <p className="text-cyan-400 mb-4">{selectedImage.detailedInfo.location}</p>
                  
                  {viewMode === 'detailed' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                        <p className="text-white/80 leading-relaxed">{selectedImage.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="text-white/60 text-sm">Distance</div>
                          <div className="text-white font-semibold">{selectedImage.detailedInfo.distance}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="text-white/60 text-sm">Size</div>
                          <div className="text-white font-semibold">{selectedImage.detailedInfo.size}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="text-white/60 text-sm">Age</div>
                          <div className="text-white font-semibold">{selectedImage.detailedInfo.age}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="text-white/60 text-sm">Temperature</div>
                          <div className="text-white font-semibold">{selectedImage.detailedInfo.temperature}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Scientific Significance</h3>
                        <p className="text-white/80">{selectedImage.detailedInfo.scientificSignificance}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Interesting Facts</h3>
                        <ul className="space-y-2">
                          {selectedImage.detailedInfo.interestingFacts.map((fact, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-white/80 text-sm">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Related Missions</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.detailedInfo.relatedMissions.map((mission, index) => (
                            <span key={index} className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                              {mission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {viewMode === 'technical' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Technical Specifications</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-sm">Instrument</div>
                            <div className="text-white font-semibold">{selectedImage.technicalDetails.instrument}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-sm">Wavelength</div>
                            <div className="text-white font-semibold">{selectedImage.detailedInfo.wavelength}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-sm">Exposure Time</div>
                            <div className="text-white font-semibold">{selectedImage.detailedInfo.exposureTime}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-sm">Resolution</div>
                            <div className="text-white font-semibold">{selectedImage.detailedInfo.resolution}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-sm">Coordinates</div>
                            <div className="text-white font-semibold text-xs">{selectedImage.technicalDetails.coordinates}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-white/60 text-sm">Magnitude</div>
                            <div className="text-white font-semibold">{selectedImage.technicalDetails.magnitude}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Filters Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.technicalDetails.filters.map((filter, index) => (
                            <span key={index} className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">
                              {filter}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Image Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Image Type:</span>
                            <span className="text-white">{selectedImage.technicalDetails.imageType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Processing Date:</span>
                            <span className="text-white">{selectedImage.technicalDetails.processingDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Discovery Date:</span>
                            <span className="text-white">{selectedImage.detailedInfo.discoveryDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handleDownload(selectedImage)}
                      className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download 4K</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors">
                      <Info className="h-4 w-4" />
                      <span>More Info</span>
                    </button>
                  </div>
                  
                  <div className="mt-4 text-xs text-white/60">
                    Credits: {selectedImage.credits}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceGallery;