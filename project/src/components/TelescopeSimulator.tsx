import React, { useState } from 'react';
import { Camera, Eye, Sliders, Download, Info } from 'lucide-react';

interface Telescope {
  id: string;
  name: string;
  type: string;
  description: string;
  wavelengths: string[];
  launched: string;
  imageUrl: string;
}

interface CelestialObject {
  id: string;
  name: string;
  type: string;
  description: string;
  images: {
    [key: string]: string;
  };
}

const telescopes: Telescope[] = [
  {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    type: 'Optical/UV',
    description: 'Famous for its stunning visible light images of space',
    wavelengths: ['Visible', 'Near-UV', 'Near-IR'],
    launched: '1990',
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg'
  },
  {
    id: 'webb',
    name: 'James Webb Space Telescope',
    type: 'Infrared',
    description: 'Next-generation telescope observing in infrared light',
    wavelengths: ['Near-IR', 'Mid-IR'],
    launched: '2021',
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg'
  },
  {
    id: 'spitzer',
    name: 'Spitzer Space Telescope',
    type: 'Infrared',
    description: 'Pioneering infrared space observatory',
    wavelengths: ['Mid-IR', 'Far-IR'],
    launched: '2003',
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg'
  },
  {
    id: 'chandra',
    name: 'Chandra X-ray Observatory',
    type: 'X-ray',
    description: 'Observes high-energy X-ray emissions from space',
    wavelengths: ['X-ray'],
    launched: '1999',
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg'
  }
];

const celestialObjects: CelestialObject[] = [
  {
    id: 'crab-nebula',
    name: 'Crab Nebula',
    type: 'Supernova Remnant',
    description: 'The remnant of a supernova observed in 1054 AD',
    images: {
      hubble: 'https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-41951.jpeg',
      webb: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
      spitzer: 'https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-41951.jpeg',
      chandra: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg'
    }
  },
  {
    id: 'orion-nebula',
    name: 'Orion Nebula',
    type: 'Star-forming Region',
    description: 'A stellar nursery where new stars are being born',
    images: {
      hubble: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
      webb: 'https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-41951.jpeg',
      spitzer: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg',
      chandra: 'https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-41951.jpeg'
    }
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy',
    type: 'Spiral Galaxy',
    description: 'Our nearest major galactic neighbor',
    images: {
      hubble: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',
      webb: 'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg',
      spitzer: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',
      chandra: 'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg'
    }
  }
];

const TelescopeSimulator: React.FC = () => {
  const [selectedTelescope, setSelectedTelescope] = useState<Telescope>(telescopes[0]);
  const [selectedObject, setSelectedObject] = useState<CelestialObject>(celestialObjects[0]);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [showInfo, setShowInfo] = useState(false);

  const handleTelescopeChange = (telescope: Telescope) => {
    setSelectedTelescope(telescope);
    setActiveFilter('');
  };

  const handleObjectChange = (object: CelestialObject) => {
    setSelectedObject(object);
    setActiveFilter('');
  };

  const getCurrentImage = () => {
    let imageUrl = selectedObject.images[selectedTelescope.id];
    return imageUrl;
  };

  const getFilterStyle = () => {
    switch (activeFilter) {
      case 'infrared':
        return { filter: 'hue-rotate(280deg) saturate(1.5)' };
      case 'xray':
        return { filter: 'invert(1) contrast(1.2)' };
      case 'uv':
        return { filter: 'hue-rotate(240deg) saturate(1.3)' };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Telescope View Simulator
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Experience how different space telescopes see the same celestial objects across various wavelengths of light.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Telescope Selection */}
          <div className="lg:col-span-1 animate-fade-in-delayed">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-cyan-400" />
                Select Telescope
              </h2>
              
              <div className="space-y-3">
                {telescopes.map((telescope) => (
                  <button
                    key={telescope.id}
                    onClick={() => handleTelescopeChange(telescope)}
                    className={`w-full p-4 rounded-xl border text-left transition-all hover:scale-102 ${
                      selectedTelescope.id === telescope.id
                        ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400'
                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold">{telescope.name}</div>
                    <div className="text-sm opacity-70">{telescope.type}</div>
                    <div className="text-xs opacity-50">Launched: {telescope.launched}</div>
                  </button>
                ))}
              </div>

              {/* Wavelength Filters */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Sliders className="h-4 w-4 mr-2 text-cyan-400" />
                  Wavelength Filters
                </h3>
                <div className="space-y-2">
                  {selectedTelescope.wavelengths.map((wavelength) => (
                    <button
                      key={wavelength}
                      onClick={() => setActiveFilter(wavelength.toLowerCase().replace('-', ''))}
                      className={`w-full p-2 rounded-lg text-sm transition-all ${
                        activeFilter === wavelength.toLowerCase().replace('-', '')
                          ? 'bg-purple-400/20 border border-purple-400 text-purple-400'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {wavelength}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Viewer */}
          <div className="lg:col-span-2 animate-fade-in-stagger">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-cyan-400" />
                  {selectedTelescope.name} View
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Info className="h-5 w-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <Download className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Image Viewer */}
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <img
                  src={getCurrentImage()}
                  alt={`${selectedObject.name} as seen by ${selectedTelescope.name}`}
                  className="w-full h-full object-cover"
                  style={getFilterStyle()}
                />
                
                {/* Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{selectedObject.name}</h3>
                      <p className="text-white/70 text-sm">{selectedObject.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 text-sm">{selectedTelescope.name}</p>
                      {activeFilter && (
                        <p className="text-purple-400 text-xs">{activeFilter.toUpperCase()} Filter</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Object Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {celestialObjects.map((object) => (
                  <button
                    key={object.id}
                    onClick={() => handleObjectChange(object)}
                    className={`p-4 rounded-xl border text-left transition-all hover:scale-102 ${
                      selectedObject.id === object.id
                        ? 'bg-cyan-400/20 border-cyan-400'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="aspect-video bg-black rounded-lg mb-3 overflow-hidden">
                      <img
                        src={object.images[selectedTelescope.id]}
                        alt={object.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-semibold text-white text-sm">{object.name}</div>
                    <div className="text-white/60 text-xs">{object.type}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">About {selectedTelescope.name}</h3>
            <p className="text-white/80 mb-4">{selectedTelescope.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Telescope Details</h4>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>Type: {selectedTelescope.type}</li>
                  <li>Launched: {selectedTelescope.launched}</li>
                  <li>Wavelengths: {selectedTelescope.wavelengths.join(', ')}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Current Object</h4>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>Name: {selectedObject.name}</li>
                  <li>Type: {selectedObject.type}</li>
                  <li className="text-xs">{selectedObject.description}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelescopeSimulator;