import React, { useState } from 'react';
import { Brain, Send, Bot, User, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AISpaceMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Space Mentor. I can help you understand space concepts, missions, and answer any questions about astronomy and space exploration. What would you like to learn about today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: { [key: string]: string } = {
    'black hole': 'Black holes are regions in spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon. They form when massive stars collapse at the end of their lives. The largest black holes, called supermassive black holes, can be found at the centers of galaxies.',
    'mars': 'Mars is the fourth planet from the Sun, often called the Red Planet due to iron oxide on its surface. It has two small moons, Phobos and Deimos, and shows evidence of ancient water activity. Current missions like Perseverance are searching for signs of past microbial life.',
    'moon': 'The Moon is Earth\'s only natural satellite, formed about 4.5 billion years ago. It influences Earth\'s tides and stabilizes our planet\'s axial tilt. The Apollo missions from 1969-1972 brought back lunar samples that helped us understand its composition and formation.',
    'solar system': 'Our solar system consists of the Sun and everything that orbits it, including 8 planets, their moons, asteroids, comets, and interplanetary gas and dust. It formed about 4.6 billion years ago from the gravitational collapse of a giant molecular cloud.',
    'telescope': 'Telescopes collect and focus light to observe distant objects. Space telescopes like Hubble and James Webb avoid atmospheric interference, providing clearer images. Different types observe various wavelengths: optical, infrared, X-ray, and radio telescopes each reveal different aspects of the universe.',
    'galaxy': 'A galaxy is a gravitationally bound system of stars, stellar remnants, gas, dust, and dark matter. The Milky Way is our home galaxy, containing over 100 billion stars. Galaxies come in different shapes: spiral, elliptical, and irregular.',
    'space station': 'The International Space Station (ISS) is a habitable artificial satellite in low Earth orbit. It serves as a space environment research laboratory where crew members conduct experiments in biology, physics, astronomy, and other fields. It has been continuously occupied since 2000.',
    'rocket': 'Rockets work by ejecting mass in one direction to create thrust in the opposite direction (Newton\'s third law). They carry their own fuel and oxidizer, allowing them to work in the vacuum of space. Modern rockets like SpaceX\'s Falcon 9 are partially reusable, reducing launch costs.'
  };

  const quickQuestions = [
    'What is a black hole?',
    'How do rockets work?',
    'Tell me about Mars',
    'What is the ISS?',
    'How are stars born?',
    'What is dark matter?'
  ];

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in predefined responses
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default responses for common question types
    if (lowerMessage.includes('how') || lowerMessage.includes('why')) {
      return "That's a great question! Space science involves complex physics and ongoing research. For detailed explanations, I'd recommend checking NASA's educational resources or space science textbooks. Is there a specific aspect you'd like me to explain further?";
    }

    if (lowerMessage.includes('when') || lowerMessage.includes('date')) {
      return "Space exploration has many important dates! Some key milestones include: Sputnik 1 (1957), first human in space (1961), Moon landing (1969), and the launch of Hubble (1990). What specific event or timeline interests you?";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm here to help you explore the wonders of space. Feel free to ask me anything about astronomy, space missions, or cosmic phenomena!";
    }

    // Generic response
    return "That's an interesting topic! Space is full of fascinating phenomena. Could you be more specific about what aspect you'd like to learn about? I can help explain concepts about planets, stars, galaxies, space missions, or any other space-related topics.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Space Mentor
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Your personal AI guide to understanding space science, missions, and cosmic phenomena.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden animate-fade-in-delayed">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-400/20 to-purple-400/20 p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Space Mentor</h3>
                <p className="text-white/60 text-sm">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-cyan-400' : 'bg-purple-400'}`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${message.type === 'user' ? 'bg-cyan-400/20 text-white' : 'bg-white/10 text-white'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about space..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-8 animate-fade-in-stagger">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-cyan-400" />
            Quick Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-left hover:bg-white/20 hover:scale-102 transition-all group"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                  <span className="text-white text-sm">{question}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 animate-fade-in-final">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-cyan-400" />
            Learning Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-cyan-400">Best Questions to Ask:</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• "What is..." - for definitions</li>
                <li>• "How does..." - for explanations</li>
                <li>• "Why does..." - for reasoning</li>
                <li>• "Tell me about..." - for overviews</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-400">Topics I Can Help With:</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Planets and moons</li>
                <li>• Stars and galaxies</li>
                <li>• Space missions</li>
                <li>• Telescopes and instruments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISpaceMentor;