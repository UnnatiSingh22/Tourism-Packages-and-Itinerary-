import React from 'react';
import { Smile, TrendingDown, CloudSun, Download } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { DESTINATIONS_DB, type DestinationStat } from '../../data/destinationsDb';

interface TravelerSatisfactionProps {
  timeFilter?: 'Q1' | '6M' | 'Yearly';
  selectedRegion: string;
  selectedDestination: string;
}

export function TravelerSatisfaction({ timeFilter = '6M', selectedRegion, selectedDestination }: TravelerSatisfactionProps) {
  // Get active destinations list
  const activeDests = Object.values(DESTINATIONS_DB).filter(d => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesDest = selectedDestination === 'All' || d.name === selectedDestination;
    return matchesRegion && matchesDest;
  });

  // Calculate base rating score (out of 5)
  const totalRating = activeDests.reduce((acc, d) => acc + parseFloat(d.satisfaction), 0);
  const avgRating = activeDests.length > 0 ? totalRating / activeDests.length : 4.92;

  // Derive NPS based on satisfaction rating
  // 4.95 => 82, 4.90 => 78, 4.80 => 72, 4.60 => 68 etc.
  const derivedNps = Math.round(70 + (avgRating - 4.60) * 40);

  // Sub-metrics base percentages
  const baseAccom = Math.round(avgRating * 19.3); // ~95%
  const baseService = Math.round(avgRating * 18.9); // ~93%
  const baseLogistics = Math.round(avgRating * 17.1); // ~84%
  const baseValue = Math.round(avgRating * 18.1); // ~89%
  const baseExperience = Math.round(avgRating * 19.8); // ~97%

  // Apply time filter factors
  let timeFactor = 1.0;
  let labelSuffix = '';
  if (timeFilter === 'Q1') {
    timeFactor = 0.94;
    labelSuffix = ' (Q1)';
  } else if (timeFilter === 'Yearly') {
    timeFactor = 1.02;
    labelSuffix = ' (Yearly)';
  }

  const metrics = [
    { label: 'Accommodation Quality', score: Math.min(Math.round(baseAccom * timeFactor), 100) + '%', color: 'bg-[#8B2020]' },
    { label: 'Service & Hospitality', score: Math.min(Math.round(baseService * timeFactor), 100) + '%', color: 'bg-[#BC2C2C]' },
    { label: 'Logistics & Transport', score: Math.min(Math.round(baseLogistics * timeFactor), 100) + '%', color: 'bg-amber-600' },
    { label: 'Value for Investment', score: Math.min(Math.round(baseValue * timeFactor), 100) + '%', color: 'bg-[#E65A4B]' },
    { label: 'Local Experience', score: Math.min(Math.round(baseExperience * timeFactor), 100) + '%', color: 'bg-emerald-500' },
  ];

  const currentNps = Math.min(Math.max(Math.round(derivedNps * timeFactor), 40), 100);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Traveler Satisfaction</h2>
      <p className="text-xs font-medium text-gray-500 mb-8 leading-relaxed">
        Metrics based on verified post-event feedback{labelSuffix}.
      </p>

      <div className="space-y-6 flex-1">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">{m.label}</span>
              <span className={`text-xs font-bold ${m.color.replace('bg-', 'text-')}`}>{m.score}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
              <div className={`h-full ${m.color} rounded-full`} style={{ width: m.score }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <Smile className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Overall Net Promoter Score:</p>
          <span className="text-lg font-bold text-gray-900">{currentNps}</span>
        </div>
      </div>
    </div>
  );
}

interface DestinationRow {
  name: string;
  location: string;
  revenue: number;
  occ: string;
  type: string;
  typeColor: string;
  trend: string;
  trendColor: string;
  img: string;
  occColor: string;
  region: string;
}

export function TopDestinationsTable({ 
  timeFilter = '6M', 
  selectedRegion, 
  selectedDestination, 
  onViewWeather, 
  onExportCSV 
}: { 
  timeFilter?: 'Q1' | '6M' | 'Yearly'; 
  selectedRegion: string;
  selectedDestination: string;
  onViewWeather?: (dest: any) => void; 
  onExportCSV?: () => void; 
}) {
  const { format } = useCurrency();
  const [page, setPage] = React.useState(1);
  const PAGE_SIZE = 5;

  React.useEffect(() => { setPage(1); }, [timeFilter, selectedRegion, selectedDestination]);

  const allDestinations = React.useMemo(() => {
    return Object.values(DESTINATIONS_DB).map(d => {
      let revenue = d.revenue;
      let occ = d.occupancy;
      if (timeFilter === 'Q1') {
        revenue = Math.round(d.revenue * 0.3);
        occ = (parseFloat(d.occupancy) * 0.92).toFixed(0) + '%';
      } else if (timeFilter === 'Yearly') {
        revenue = Math.round(d.revenue * 2.1);
        occ = Math.min(Math.round(parseFloat(d.occupancy) * 1.03), 100) + '%';
      }
      return {
        name: d.name,
        location: d.location,
        revenue,
        occ,
        type: d.type,
        typeColor: d.typeColor,
        trend: d.trend,
        trendColor: d.trendColor,
        img: d.img,
        occColor: parseFloat(occ) > 90 ? 'bg-emerald-500' : parseFloat(occ) > 80 ? 'bg-blue-500' : 'bg-amber-500',
        region: d.region
      };
    }).filter(d => {
      const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
      const matchesDest = selectedDestination === 'All' || d.name === selectedDestination;
      return matchesRegion && matchesDest;
    });
  }, [timeFilter, selectedRegion, selectedDestination]);

  const totalPages = Math.ceil(allDestinations.length / PAGE_SIZE) || 1;
  const destinations = allDestinations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <h2 className="text-lg font-bold text-gray-900">Top Performing Destinations</h2>
        <div className="flex gap-2">
          <button 
            onClick={onExportCSV}
            className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#BC2C2C]" /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Destination</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">
                Revenue ({timeFilter === 'Q1' ? 'Q1' : timeFilter === '6M' ? 'H1' : 'Yearly'})
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Avg. Occupancy</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Key Event Type</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide">Market Trend</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 tracking-wide text-center">Weather Forecast</th>
            </tr>
          </thead>
          <tbody>
            {destinations.length > 0 ? (
              destinations.map((d, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={d.img} alt={d.name} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm" />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{d.name}</h3>
                        <p className="text-[11px] font-medium text-gray-500">{d.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-gray-900">{format(d.revenue)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-700">{d.occ}</span>
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full">
                        <div className={`h-full rounded-full ${d.occColor}`} style={{ width: d.occ }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 items-start">
                      {d.type.split(' ').map((word, wIdx) => (
                        <span key={wIdx} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${d.typeColor}`}>
                          {word}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[11px] font-bold flex items-center gap-1 ${d.trendColor}`}>
                      {d.trend !== 'Stable' && <TrendingDown className={`w-3 h-3 ${d.trendColor} rotate-180`} />}
                      {d.trend === 'Stable' && <span className="w-3 text-center">-</span>}
                      {d.trend}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button 
                      onClick={() => onViewWeather?.(d)}
                      className="flex items-center justify-center gap-1 text-xs font-bold text-[#BC2C2C] hover:text-[#8B2020] border border-[#BC2C2C]/20 hover:border-[#BC2C2C]/50 px-3 py-1.5 rounded-xl transition-all mx-auto shadow-sm bg-white"
                    >
                      <CloudSun className="w-3.5 h-3.5" /> Check Weather
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400 font-bold">
                  No destinations found matching active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs font-semibold">
        <span className="text-gray-500">Showing {allDestinations.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, allDestinations.length)} of {allDestinations.length} destinations</span>
        <div className="flex gap-2 items-center">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed">← Previous</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded font-bold transition-all ${p === page ? 'bg-[#BC2C2C] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-[#BC2C2C] hover:text-[#8B2020] disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
        </div>
      </div>
    </div>
  );
}
