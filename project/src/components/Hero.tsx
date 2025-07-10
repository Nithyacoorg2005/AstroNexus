import React from 'react';
import { ChevronDown, Sparkles, Telescope, Globe, Clock, Navigation } from 'lucide-react';

type Section = 'home' | 'gallery' | 'solar-system' | 'timeline' | 'telescope' | 'comparison' | 'mission' | 'ai-mentor' | 'radio' | 'universe';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Navigation,
      title: '3D Universe Explorer',
      description: 'Zoom from cosmic scales to planetary surfaces',
      section: 'universe' as Section
    },
    {
      icon: Sparkles,
      title: '4K Space Gallery',
      description: 'Explore stunning NASA & ESA imagery',
      section: 'gallery' as Section
    },
    {
      icon: Globe,
      title: '3D Solar System',
      description: 'Interactive planetary exploration',
      section: 'solar-system' as Section
    },
    {
      icon: Clock,
      title: 'Cosmic Timeline',
      description: 'Journey through space history',
      section: 'timeline' as Section
    },
    {
      icon: Telescope,
      title: 'Telescope Simulator',
      description: 'See through Hubble & Webb',
      section: 'telescope' as Section
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-6">
      <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-scale-in">
          AstroNexus
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed animate-fade-in-delayed">
          Journey through the cosmos with interactive 3D exploration, 4K imagery, 
          immersive sounds, and AI-powered learning. Experience the universe like never before 
          with our advanced planetarium featuring zoom capabilities from galactic scales down to planetary surfaces.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 animate-fade-in-stagger">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer group hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-300"
                onClick={() => onNavigate(feature.section)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-cyan-400 to-purple-400 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-final">
          <button
            onClick={() => onNavigate('universe')}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
          >
            Explore Universe
          </button>
          
          <button
            onClick={() => onNavigate('gallery')}
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            View Gallery
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/60" />
      </div>
    </div>
  );
};

export default Hero;