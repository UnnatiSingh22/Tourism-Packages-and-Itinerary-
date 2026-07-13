import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, CheckCircle2, UserCheck, Compass, Map, Store, Trash2 } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  type?: 'text' | 'compliance' | 'itinerary' | 'route' | 'vendors';
  data?: any;
}

export function AIHubPage() {
  const { format } = useCurrency();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Thinking...');
  const [errorState, setErrorState] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Load welcome message on mount
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: "Welcome to EventHub 360 AI Assistant! I can help you automate passenger compliance audits, generate luxury travel packages, optimize logistics routes, and compare vendor contracts dynamically. Select a quick action below or type a query to get started.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      }
    ]);
  }, []);

  const simulateLoading = (text: string, duration: number) => {
    setIsLoading(true);
    setLoadingText(text);
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setErrorState(null);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: time
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    const query = text.toLowerCase();

    try {
      if (query.includes('compliance') || query.includes('passport')) {
        await simulateLoading('Analyzing traveler records for compliance checks...', 1500);
        
        const complianceData = [
          { name: 'John Doe', passport: 'A992813', status: 'Clean', details: 'Expires in 2 years (Valid)' },
          { name: 'Sebastian Vance', passport: 'A128456', status: 'Warning', details: 'Expires in 4 months (Under 6-month limit)' },
          { name: 'Amara Okafor', passport: 'A561234', status: 'Clean', details: 'Expires in 18 months (Valid)' },
          { name: 'Elena Rodriguez', passport: 'A209483', status: 'Critical', details: 'Expired on June 15th, 2026' }
        ];

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: "Compliance Scan complete. I audited all passenger passport details. Here is the active checklist status:",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'compliance',
            data: complianceData
          }
        ]);
      } 
      else if (query.includes('amalfi') || query.includes('itinerary') || query.includes('tour')) {
        await simulateLoading('Generating luxury itinerary template...', 2000);

        const itineraryData = {
          title: 'Amalfi Coast Luxury Escape (AI-Generated)',
          type: 'Luxe Retreat',
          days: [
            { day: 1, title: 'Arrival & Aperitivo', activity: 'Private Chauffeur transfer from NAP to Villa San Giacomo. Michelin-starred dinner.' },
            { day: 2, title: 'Capri Yacht Cruise', activity: 'Private Yacht Charter to Blue Grotto. Snorkeling at Emerald Grotto.' },
            { day: 3, title: 'Ravello Music Garden', activity: 'Guided tour of historic Ravello cliffside gardens, sunset private concert.' }
          ],
          estimatedCost: 85000 // base cost in INR
        };

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: "I generated a premium 3-day itinerary centered on Amalfi Coast activities, incorporating private yacht and catering logistics:",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'itinerary',
            data: itineraryData
          }
        ]);
      } 
      else if (query.includes('route') || query.includes('optimize') || query.includes('transport')) {
        await simulateLoading('Running GIS pathfinding calculations for logistics routes...', 1800);

        const routeData = {
          origin: 'Le Meurice, Paris',
          destination: 'CDG Airport Terminal 2E',
          currentDuration: '72 mins (Traffic congestion)',
          optimizedDuration: '46 mins (Rerouting via Boulevard Périphérique Nord)',
          distance: '28.4 km',
          savings: '26 mins travel time reduction, 15% fuel efficiency'
        };

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: "Route Optimization calculations completed. Rerouting ground transportation via the northern bypass is recommended:",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'route',
            data: routeData
          }
        ]);
      } 
      else if (query.includes('caterer') || query.includes('vendor') || query.includes('compare')) {
        await simulateLoading('Parsing vendor pricing guidelines and contract terms...', 1600);

        const vendorData = [
          { name: 'Michelin Events Co.', rating: '5.0', menuRate: 15000, surcharge: 7500, status: 'Recommended (Tier 1)' },
          { name: 'Alpine Gourmet Catering', rating: '4.7', menuRate: 7000, surcharge: 3300, status: 'Compliant (Tier 2)' }
        ];

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: "I completed the vendor rate comparison audit for active catering suppliers in the region:",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'vendors',
            data: vendorData
          }
        ]);
      } 
      else {
        await simulateLoading('Querying event logs...', 1200);
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `I received your query: "${text}". I am optimized to perform specialized tasks. You can use one of the quick actions below, or ask me about "passenger compliance", "amalfi coast tour", "route optimization", or "compare caterers" for automated insights.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setErrorState("Failed to connect to the EventHub AI Service. Please check connections or retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: "Chat cleared. Ask me anything about compliance scans, itinerary generation, route planning, or vendor comparisons.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      }
    ]);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#BC2C2C]" /> AI Hub
          </h1>
          <p className="text-xs text-gray-500 mt-1">Autonomous concierge assistance and operational automation</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-3 flex gap-6">
            <div>
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Queries This Month</span>
              <span className="block text-sm font-black text-gray-800 mt-0.5">342 / 5,000</span>
            </div>
            <div className="border-l border-gray-200"></div>
            <div>
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Avg Response Time</span>
              <span className="block text-sm font-black text-gray-800 mt-0.5">1.4s</span>
            </div>
            <div className="border-l border-gray-200"></div>
            <div>
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Model Status</span>
              <span className="block text-sm font-black text-emerald-600 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-150 shadow-sm flex flex-col overflow-hidden">
          {/* Top Actions */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-700">Concierge Agent Core</span>
            </div>
            <button 
              onClick={handleClearChat}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Clear Chat Log"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, index) => {
              const isAI = msg.sender === 'ai';
              return (
                <div key={index} className={`flex gap-4 ${isAI ? 'justify-start' : 'justify-end'}`}>
                  {isAI && (
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl p-4 flex flex-col gap-2 ${
                    isAI 
                      ? 'bg-gray-50 text-gray-800 border border-gray-150' 
                      : 'bg-gradient-to-br from-[#E65A4B] to-[#BC2C2C] text-white'
                  }`}>
                    <p className="text-xs font-medium leading-relaxed whitespace-pre-line">{msg.text}</p>
                    
                    {/* Compliance Render */}
                    {msg.type === 'compliance' && msg.data && (
                      <div className="mt-3 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="px-4 py-2 font-bold text-gray-600">Traveler</th>
                              <th className="px-4 py-2 font-bold text-gray-600">Passport</th>
                              <th className="px-4 py-2 font-bold text-gray-600">Status</th>
                              <th className="px-4 py-2 font-bold text-gray-600">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {msg.data.map((item: any, i: number) => (
                              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                                <td className="px-4 py-2.5 font-bold text-gray-900">{item.name}</td>
                                <td className="px-4 py-2.5 text-gray-500 font-mono">{item.passport}</td>
                                <td className="px-4 py-2.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                    item.status === 'Clean' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                    item.status === 'Warning' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                    'bg-red-50 text-red-600 border border-red-100'
                                  }`}>{item.status}</span>
                                </td>
                                <td className="px-4 py-2.5 text-gray-500 font-medium">{item.details}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Itinerary Render */}
                    {msg.type === 'itinerary' && msg.data && (
                      <div className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <h4 className="text-xs font-bold text-gray-900">{msg.data.title}</h4>
                          <span className="text-[10px] bg-red-50 text-[#BC2C2C] px-2 py-0.5 rounded font-black tracking-widest uppercase">{msg.data.type}</span>
                        </div>
                        <div className="space-y-3">
                          {msg.data.days.map((d: any, i: number) => (
                            <div key={i} className="flex gap-3 items-start">
                              <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-extrabold text-gray-700">D0{d.day}</span>
                              <div>
                                <span className="block text-xs font-bold text-gray-800">{d.title}</span>
                                <span className="block text-[11px] text-gray-500 leading-normal mt-0.5">{d.activity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2 bg-gray-50/80 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
                          <span className="text-[10px] font-bold text-gray-500">Est. Cost: <strong className="text-gray-900 text-xs">{format(msg.data.estimatedCost)}</strong></span>
                          <button 
                            onClick={() => window.location.href = '/tourism/builder'}
                            className="px-3 py-1 bg-[#BC2C2C] hover:bg-[#8B2020] text-white text-[10px] font-black rounded-lg transition-colors shadow-sm"
                          >
                            Import to Builder
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Route Render */}
                    {msg.type === 'route' && msg.data && (
                      <div className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2">
                        <div className="pb-2 border-b border-gray-100">
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calculated Route Details</span>
                          <span className="block text-xs font-bold text-gray-900 mt-0.5">{msg.data.origin} → {msg.data.destination}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs pt-1.5">
                          <div>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase">Standard Duration</span>
                            <span className="block font-bold text-gray-700 mt-0.5">{msg.data.currentDuration}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase">Optimized (Rerouted)</span>
                            <span className="block font-bold text-emerald-600 mt-0.5">{msg.data.optimizedDuration}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase">Total Distance</span>
                            <span className="block font-semibold text-gray-600 mt-0.5">{msg.data.distance}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase">Estimated Savings</span>
                            <span className="block font-bold text-gray-800 mt-0.5">{msg.data.savings}</span>
                          </div>
                        </div>
                        <div className="flex justify-end pt-3 border-t border-gray-100 mt-2">
                          <button 
                            onClick={() => window.location.href = '/analytics/routes'}
                            className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-[10px] font-black rounded-lg transition-colors"
                          >
                            Apply Route Change
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Vendors Render */}
                    {msg.type === 'vendors' && msg.data && (
                      <div className="mt-3 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="px-4 py-2 font-bold text-gray-600">Supplier</th>
                              <th className="px-4 py-2 font-bold text-gray-600">Menu rate</th>
                              <th className="px-4 py-2 font-bold text-gray-600">Surcharge</th>
                              <th className="px-4 py-2 font-bold text-gray-600">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {msg.data.map((v: any, i: number) => (
                              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                                <td className="px-4 py-2.5 font-bold text-gray-900">{v.name}</td>
                                <td className="px-4 py-2.5 text-gray-800 font-medium">{format(v.menuRate)}/pax</td>
                                <td className="px-4 py-2.5 text-gray-800 font-medium">{format(v.surcharge)}</td>
                                <td className="px-4 py-2.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    v.status.includes('Recommended') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                  }`}>{v.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <span className={`text-[8px] mt-1 text-right block ${isAI ? 'text-gray-400' : 'text-white/70'}`}>{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-[#BC2C2C] flex items-center justify-center shrink-0 animate-pulse shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex items-center gap-3">
                  <RefreshCw className="w-3.5 h-3.5 text-[#BC2C2C] animate-spin" />
                  <span className="text-xs font-semibold text-gray-500 animate-pulse">{loadingText}</span>
                </div>
              </div>
            )}

            {/* Error Message Box */}
            {errorState && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 text-red-700 animate-in fade-in duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block">AI Engine Interruption</span>
                  <span className="block mt-0.5 font-medium leading-relaxed">{errorState}</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Quick Prompts Panel */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap gap-2.5 bg-gray-50/50">
            <button 
              onClick={() => handleSendMessage("Perform a passenger compliance passport check")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-red-50/50 border border-gray-200 hover:border-[#BC2C2C]/30 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl transition-all shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-500" /> Compliance scan
            </button>
            <button 
              onClick={() => handleSendMessage("Generate a luxury 3-day tour package for Amalfi Coast")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-red-50/50 border border-gray-200 hover:border-[#BC2C2C]/30 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" /> Build Amalfi Tour
            </button>
            <button 
              onClick={() => handleSendMessage("Optimize travel route from Le Meurice to CDG")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-red-50/50 border border-gray-200 hover:border-[#BC2C2C]/30 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl transition-all shadow-sm"
            >
              <Map className="w-3.5 h-3.5 text-emerald-500" /> Optimize CDG Route
            </button>
            <button 
              onClick={() => handleSendMessage("Compare catering vendor rates")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-red-50/50 border border-gray-200 hover:border-[#BC2C2C]/30 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl transition-all shadow-sm"
            >
              <Store className="w-3.5 h-3.5 text-purple-500" /> Compare Caterers
            </button>
          </div>

          {/* Message Input Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-6 border-t border-gray-100 flex gap-4 items-center"
          >
            <input 
              type="text"
              placeholder="Ask EventHub AI to build itineraries, audits, or optimize operations..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-gray-50 border border-gray-100 focus:border-[#BC2C2C]/30 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-medium focus:outline-none transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-12 h-12 rounded-xl bg-[#BC2C2C] hover:bg-[#8B2020] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm disabled:opacity-40"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Sidebar Status Info */}
        <div className="w-full xl:w-[300px] shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm">
            <h3 className="text-xs font-bold text-gray-900 mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#BC2C2C]" /> Available AI Agents
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="block text-xs font-bold text-gray-800">Itinerary Optimizer</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Generates dynamic event schedules</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded border border-emerald-100">Ready</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="block text-xs font-bold text-gray-800">Compliance Inspector</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Audits passport limits & compliance</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded border border-emerald-100">Ready</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="block text-xs font-bold text-gray-800">Logistics Routing Engine</span>
                  <span className="block text-[10px] text-gray-400 font-medium">GIS rerouting and fuel metrics</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase rounded border border-emerald-100">Ready</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Operational Accuracy
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                The EventHub 360 AI Assistant runs continuous integrity audits on passenger listings and itinerary constraints. If discrepancies are found, they are highlighted in interactive table cards.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6 text-[10px] font-bold text-gray-400 leading-relaxed">
              * Calculations are updated based on localized exchange configurations and standard safety policies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
