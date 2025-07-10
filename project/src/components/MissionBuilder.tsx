import React, { useState } from 'react';
import { Rocket, Target, DollarSign, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

interface MissionComponent {
  id: string;
  name: string;
  type: 'rocket' | 'payload' | 'orbit' | 'destination';
  cost: number;
  reliability: number;
  description: string;
  requirements?: string[];
}

interface Mission {
  rocket: MissionComponent | null;
  payload: MissionComponent | null;
  orbit: MissionComponent | null;
  destination: MissionComponent | null;
}

const missionComponents: { [key: string]: MissionComponent[] } = {
  rocket: [
    {
      id: 'falcon-9',
      name: 'Falcon 9',
      type: 'rocket',
      cost: 62000000,
      reliability: 95,
      description: 'Reusable rocket for medium to heavy payloads',
      requirements: ['Medium payload capacity', 'LEO/GTO capable']
    },
    {
      id: 'falcon-heavy',
      name: 'Falcon Heavy',
      type: 'rocket',
      cost: 90000000,
      reliability: 90,
      description: 'Heavy-lift rocket for large payloads',
      requirements: ['Heavy payload capacity', 'Deep space capable']
    },
    {
      id: 'saturn-v',
      name: 'Saturn V',
      type: 'rocket',
      cost: 185000000,
      reliability: 85,
      description: 'Legendary heavy-lift rocket for lunar missions',
      requirements: ['Super heavy payload', 'Lunar capable']
    },
    {
      id: 'artemis-sls',
      name: 'Artemis SLS',
      type: 'rocket',
      cost: 200000000,
      reliability: 88,
      description: 'Next-generation rocket for lunar and Mars missions',
      requirements: ['Super heavy payload', 'Deep space capable']
    }
  ],
  payload: [
    {
      id: 'communications-sat',
      name: 'Communications Satellite',
      type: 'payload',
      cost: 150000000,
      reliability: 98,
      description: 'High-tech satellite for global communications',
      requirements: ['Geostationary orbit']
    },
    {
      id: 'space-telescope',
      name: 'Space Telescope',
      type: 'payload',
      cost: 800000000,
      reliability: 85,
      description: 'Advanced telescope for deep space observation',
      requirements: ['Deep space orbit', 'High precision']
    },
    {
      id: 'mars-rover',
      name: 'Mars Rover',
      type: 'payload',
      cost: 2500000000,
      reliability: 75,
      description: 'Robotic rover for Mars surface exploration',
      requirements: ['Mars transfer orbit', 'Entry system']
    },
    {
      id: 'lunar-lander',
      name: 'Lunar Lander',
      type: 'payload',
      cost: 1200000000,
      reliability: 80,
      description: 'Spacecraft designed for lunar surface missions',
      requirements: ['Trans-lunar injection', 'Landing system']
    }
  ],
  orbit: [
    {
      id: 'leo',
      name: 'Low Earth Orbit (LEO)',
      type: 'orbit',
      cost: 10000000,
      reliability: 95,
      description: '160-2000 km altitude, ideal for Earth observation',
      requirements: ['Basic rocket capability']
    },
    {
      id: 'geo',
      name: 'Geostationary Orbit (GEO)',
      type: 'orbit',
      cost: 25000000,
      reliability: 90,
      description: '35,786 km altitude, perfect for communications',
      requirements: ['Medium lift capability']
    },
    {
      id: 'lunar-orbit',
      name: 'Lunar Orbit',
      type: 'orbit',
      cost: 100000000,
      reliability: 85,
      description: 'Orbit around the Moon',
      requirements: ['Heavy lift capability', 'Deep space systems']
    },
    {
      id: 'mars-orbit',
      name: 'Mars Transfer Orbit',
      type: 'orbit',
      cost: 300000000,
      reliability: 70,
      description: 'Trajectory to Mars',
      requirements: ['Super heavy lift', 'Deep space navigation']
    }
  ],
  destination: [
    {
      id: 'earth',
      name: 'Earth Operations',
      type: 'destination',
      cost: 5000000,
      reliability: 99,
      description: 'Earth-based operations and monitoring',
      requirements: ['LEO or GEO orbit']
    },
    {
      id: 'moon',
      name: 'Lunar Surface',
      type: 'destination',
      cost: 150000000,
      reliability: 75,
      description: 'Landing and operations on the Moon',
      requirements: ['Lunar orbit', 'Landing system']
    },
    {
      id: 'mars',
      name: 'Mars Surface',
      type: 'destination',
      cost: 500000000,
      reliability: 60,
      description: 'Landing and operations on Mars',
      requirements: ['Mars transfer orbit', 'Entry/descent/landing']
    },
    {
      id: 'deep-space',
      name: 'Deep Space',
      type: 'destination',
      cost: 200000000,
      reliability: 80,
      description: 'Operations beyond planetary orbits',
      requirements: ['Deep space trajectory', 'Advanced systems']
    }
  ]
};

const MissionBuilder: React.FC = () => {
  const [mission, setMission] = useState<Mission>({
    rocket: null,
    payload: null,
    orbit: null,
    destination: null
  });
  const [simulationResult, setSimulationResult] = useState<{
    success: boolean;
    probability: number;
    cost: number;
    issues: string[];
  } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleComponentSelect = (component: MissionComponent) => {
    setMission(prev => ({
      ...prev,
      [component.type]: component
    }));
    setSimulationResult(null);
  };

  const calculateMissionStats = () => {
    const components = Object.values(mission).filter(Boolean) as MissionComponent[];
    if (components.length === 0) return { cost: 0, reliability: 0 };

    const totalCost = components.reduce((sum, comp) => sum + comp.cost, 0);
    const avgReliability = components.reduce((sum, comp) => sum + comp.reliability, 0) / components.length;

    return { cost: totalCost, reliability: avgReliability };
  };

  const runSimulation = async () => {
    if (!mission.rocket || !mission.payload || !mission.orbit || !mission.destination) {
      return;
    }

    setIsSimulating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const stats = calculateMissionStats();
    const issues: string[] = [];

    // Check compatibility
    if (mission.payload.id === 'mars-rover' && mission.orbit.id !== 'mars-orbit') {
      issues.push('Mars rover requires Mars transfer orbit');
    }
    if (mission.payload.id === 'lunar-lander' && mission.orbit.id !== 'lunar-orbit') {
      issues.push('Lunar lander requires lunar orbit');
    }
    if (mission.payload.id === 'communications-sat' && mission.orbit.id !== 'geo') {
      issues.push('Communications satellite works best in geostationary orbit');
    }

    // Calculate success probability
    let successProbability = stats.reliability;
    if (issues.length > 0) {
      successProbability -= issues.length * 15; // Reduce by 15% per issue
    }

    // Add some randomness
    successProbability += (Math.random() - 0.5) * 10;
    successProbability = Math.max(0, Math.min(100, successProbability));

    setSimulationResult({
      success: successProbability > 75,
      probability: successProbability,
      cost: stats.cost,
      issues
    });
    
    setIsSimulating(false);
  };

  const resetMission = () => {
    setMission({
      rocket: null,
      payload: null,
      orbit: null,
      destination: null
    });
    setSimulationResult(null);
  };

  const stats = calculateMissionStats();

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Mission Builder
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Design your own space mission! Select components and simulate the success probability.
          </p>
        </div>

        {/* Mission Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8 animate-fade-in-delayed">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                ${stats.cost.toLocaleString()}
              </div>
              <div className="text-white/60 text-sm">Total Cost</div>
            </div>
            
            <div className="text-center">
              <Target className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {stats.reliability.toFixed(1)}%
              </div>
              <div className="text-white/60 text-sm">Avg Reliability</div>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {Object.values(mission).filter(Boolean).length}/4
              </div>
              <div className="text-white/60 text-sm">Components</div>
            </div>
            
            <div className="text-center">
              <button
                onClick={runSimulation}
                disabled={Object.values(mission).filter(Boolean).length < 4 || isSimulating}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {isSimulating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Simulating...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Launch Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Component Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in-stagger">
          {Object.entries(missionComponents).map(([category, components]) => (
            <div
              key={category}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-cyan-400" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              
              <div className="space-y-3">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => handleComponentSelect(component)}
                    className={`w-full p-4 rounded-xl border text-left transition-all hover:scale-102 ${
                      mission[component.type]?.id === component.id
                        ? 'bg-cyan-400/20 border-cyan-400'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{component.name}</h4>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">
                          ${(component.cost / 1000000).toFixed(0)}M
                        </div>
                        <div className="text-cyan-400 text-sm">
                          {component.reliability}% reliability
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">{component.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Simulation Results */}
        {simulationResult && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                {simulationResult.success ? (
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-400 mr-2" />
                )}
                Mission Simulation Results
              </h3>
              <button
                onClick={resetMission}
                className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
              >
                Reset Mission
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${simulationResult.success ? 'text-green-400' : 'text-red-400'}`}>
                  {simulationResult.success ? 'SUCCESS' : 'FAILURE'}
                </div>
                <div className="text-white/60">Mission Outcome</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">
                  {simulationResult.probability.toFixed(1)}%
                </div>
                <div className="text-white/60">Success Probability</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  ${(simulationResult.cost / 1000000).toFixed(0)}M
                </div>
                <div className="text-white/60">Total Cost</div>
              </div>
            </div>

            {simulationResult.issues.length > 0 && (
              <div className="mt-6 p-4 bg-red-400/10 border border-red-400/20 rounded-xl">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Mission Issues
                </h4>
                <ul className="space-y-1">
                  {simulationResult.issues.map((issue, index) => (
                    <li key={index} className="text-red-300 text-sm">
                      • {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Selected Components Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-final">
          {Object.entries(mission).map(([type, component]) => (
            <div
              key={type}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 ${
                !component ? 'opacity-50' : ''
              }`}
            >
              <h4 className="font-semibold text-white mb-2 capitalize">{type}</h4>
              {component ? (
                <div>
                  <div className="font-medium text-cyan-400">{component.name}</div>
                  <div className="text-white/60 text-sm">{component.description}</div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-green-400">${(component.cost / 1000000).toFixed(0)}M</span>
                    <span className="text-cyan-400">{component.reliability}%</span>
                  </div>
                </div>
              ) : (
                <div className="text-white/40 text-sm">No component selected</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionBuilder;