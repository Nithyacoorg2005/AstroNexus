import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SpaceGallery from './components/SpaceGallery';
import SolarSystem from './components/SolarSystem';
import CosmicTimeline from './components/CosmicTimeline';
import TelescopeSimulator from './components/TelescopeSimulator';
import PlanetComparison from './components/PlanetComparison';
import MissionBuilder from './components/MissionBuilder';
import AISpaceMentor from './components/AISpaceMentor';
import DeepSpaceRadio from './components/DeepSpaceRadio';
import UniverseExplorer from './components/UniverseExplorer';
import StarField from './components/StarField';

type Section = 'home' | 'gallery' | 'solar-system' | 'timeline' | 'telescope' | 'comparison' | 'mission' | 'ai-mentor' | 'radio' | 'universe';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero onNavigate={setActiveSection} />;
      case 'universe':
        return <UniverseExplorer />;
      case 'gallery':
        return <SpaceGallery />;
      case 'solar-system':
        return <SolarSystem />;
      case 'timeline':
        return <CosmicTimeline />;
      case 'telescope':
        return <TelescopeSimulator />;
      case 'comparison':
        return <PlanetComparison />;
      case 'mission':
        return <MissionBuilder />;
      case 'ai-mentor':
        return <AISpaceMentor />;
      case 'radio':
        return <DeepSpaceRadio />;
      default:
        return <Hero onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <StarField />
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className="relative z-10 transition-all duration-500 ease-in-out">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;