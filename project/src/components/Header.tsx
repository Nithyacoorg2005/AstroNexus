import React from 'react';
import { Telescope, Home, Image, Globe, Clock, Camera, Scale, Rocket, Brain, Radio, Navigation } from 'lucide-react';

type Section = 'home' | 'gallery' | 'solar-system' | 'timeline' | 'telescope' | 'comparison' | 'mission' | 'ai-mentor' | 'radio' | 'universe';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'universe', label: 'Universe', icon: Navigation },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'solar-system', label: 'Solar System', icon: Globe },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'telescope', label: 'Telescope', icon: Camera },
    { id: 'comparison', label: 'Compare', icon: Scale },
    { id: 'mission', label: 'Mission', icon: Rocket },
    { id: 'ai-mentor', label: 'AI Mentor', icon: Brain },
    { id: 'radio', label: 'Deep Space', icon: Radio },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 animate-fade-in">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <Telescope className="h-8 w-8 text-cyan-400" />
            <h1 style={{marginRight:"20px"}}className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AstroNexus
            </h1>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as Section)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-cyan-400/20 text-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="md:hidden hover:scale-105 transition-transform">
            <button className="text-white/70 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;