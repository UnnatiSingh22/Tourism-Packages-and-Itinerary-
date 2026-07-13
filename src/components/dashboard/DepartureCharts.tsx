import React from 'react';
import { TrendingUp } from 'lucide-react';

type DateFilter = 'today' | 'week' | 'month' | 'quarter' | 'custom';

interface ChartProps { dateFilter?: DateFilter; selectedMonth?: string; }

const YIELD_DATA: Record<DateFilter, { labels: string[]; seatUtil: number[]; revYield: number[]; occupancy: number[]; profitMargin: number[]; growth: string; }> = {
  today: {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    seatUtil:    [22, 45, 68, 74, 61, 38],
    revYield:    [18, 39, 62, 71, 55, 31],
    occupancy:   [25, 48, 72, 78, 65, 42],
    profitMargin:[12, 28, 44, 52, 40, 22],
    growth: '+6.2% vs yesterday',
  },
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    seatUtil:    [61, 74, 68, 82, 78, 91, 55],
    revYield:    [55, 68, 61, 76, 72, 85, 49],
    occupancy:   [65, 79, 73, 86, 82, 94, 58],
    profitMargin:[38, 50, 44, 58, 54, 66, 34],
    growth: '+14.3% vs last week',
  },
  month: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    seatUtil:    [68, 74, 81, 78],
    revYield:    [62, 69, 76, 73],
    occupancy:   [72, 78, 86, 83],
    profitMargin:[44, 51, 58, 55],
    growth: '+12% vs last month',
  },
  quarter: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    seatUtil:    [60, 45, 80, 55, 70, 85],
    revYield:    [54, 40, 74, 49, 65, 79],
    occupancy:   [64, 48, 84, 58, 74, 90],
    profitMargin:[36, 25, 56, 32, 47, 62],
    growth: '+18.7% vs last quarter',
  },
  custom: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    seatUtil:    [70, 75, 68, 82, 77],
    revYield:    [64, 69, 62, 76, 71],
    occupancy:   [74, 79, 72, 86, 81],
    profitMargin:[46, 52, 44, 58, 53],
    growth: '+9.5% vs comparison',
  },
};

const SEAT_DATA: Record<DateFilter, { filled: number; total: number; available: number }> = {
  today:   { filled: 38, total: 52, available: 14 },
  week:    { filled: 287, total: 364, available: 77 },
  month:   { filled: 1140, total: 1456, available: 316 },
  quarter: { filled: 3820, total: 4368, available: 548 },
  custom:  { filled: 192, total: 260, available: 68 },
};

const SERIES_COLORS = ['#BC2C2C', '#E65A4B', '#10B981', '#3B82F6'];
const SERIES_LABELS = ['Seat Utilization', 'Revenue Yield', 'Occupancy %', 'Profit Margin'];

export function YieldEfficiencyChart({ dateFilter = 'month' }: ChartProps) {
  const d = YIELD_DATA[dateFilter];
  const allValues = [...d.seatUtil, ...d.revYield, ...d.occupancy, ...d.profitMargin];
  const maxVal = Math.max(...allValues, 1);
  const CHART_HEIGHT = 140;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Yield Efficiency</h2>
          <p className="text-[11px] text-gray-500 mt-0.5">{d.labels[0]} – {d.labels[d.labels.length - 1]}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${d.growth.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
          {d.growth}
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {SERIES_LABELS.map((label, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: SERIES_COLORS[i] }}></span>
            <span className="text-[10px] font-semibold text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="flex-1 relative" style={{ minHeight: CHART_HEIGHT + 24 }}>
        <svg
          viewBox={`0 0 ${d.labels.length * 56} ${CHART_HEIGHT + 4}`}
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: CHART_HEIGHT + 4 }}
        >
          {/* Y-axis guides */}
          {[0, 25, 50, 75, 100].map(v => {
            const y = CHART_HEIGHT - (v / maxVal) * CHART_HEIGHT;
            return (
              <line key={v} x1={0} x2={d.labels.length * 56} y1={y} y2={y}
                stroke="#F3F4F6" strokeWidth={1} strokeDasharray={v === 0 ? '0' : '4 2'} />
            );
          })}

          {/* Grouped bars */}
          {d.labels.map((_, colIdx) => {
            const x0 = colIdx * 56 + 4;
            const series = [d.seatUtil[colIdx], d.revYield[colIdx], d.occupancy[colIdx], d.profitMargin[colIdx]];
            return series.map((val, sIdx) => {
              const bw = 10;
              const bx = x0 + sIdx * (bw + 1);
              const bh = (val / maxVal) * CHART_HEIGHT;
              const by = CHART_HEIGHT - bh;
              return (
                <rect key={`${colIdx}-${sIdx}`} x={bx} y={by} width={bw} height={bh}
                  fill={SERIES_COLORS[sIdx]} rx={2} opacity={0.85}
                  className="hover:opacity-100 transition-opacity" />
              );
            });
          })}
        </svg>

        {/* X labels */}
        <div className="flex mt-1" style={{ gap: 0 }}>
          {d.labels.map((label, i) => (
            <span key={i} className="text-[9px] font-bold text-gray-400 uppercase text-center flex-1">{label}</span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        {[
          { label: 'Avg Seat Util', value: `${Math.round(d.seatUtil.reduce((a, b) => a + b, 0) / d.seatUtil.length)}%` },
          { label: 'Avg Rev Yield', value: `${Math.round(d.revYield.reduce((a, b) => a + b, 0) / d.revYield.length)}%` },
          { label: 'Avg Occupancy', value: `${Math.round(d.occupancy.reduce((a, b) => a + b, 0) / d.occupancy.length)}%` },
          { label: 'Avg Margin', value: `${Math.round(d.profitMargin.reduce((a, b) => a + b, 0) / d.profitMargin.length)}%` },
        ].map(s => (
          <div key={s.label} className="text-center">
            <p className="text-base font-extrabold text-gray-900">{s.value}</p>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeatInventoryChart({ dateFilter = 'month', selectedMonth }: ChartProps & { selectedMonth?: string }) {
  const d = SEAT_DATA[dateFilter];
  const pct = Math.round((d.filled / d.total) * 100);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-sm font-bold text-gray-900">Seat Inventory</h2>
        <div className="flex gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-500">
          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#BC2C2C]"></span> Filled</div>
          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-100 border border-blue-200"></span> Empty</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: 150 }}>
        <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#EFF6FF" strokeWidth="12" />
          <circle
            cx="50" cy="50" r="40" fill="none" stroke="#BC2C2C" strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <TrendingUp className="w-4 h-4 text-[#BC2C2C] mb-1" />
          <span className="text-2xl font-extrabold text-gray-900">{pct}%</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Occupancy</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-base font-extrabold text-gray-900">{d.filled}</p>
          <p className="text-[9px] font-semibold text-gray-400 uppercase">Booked</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-gray-900">{d.available}</p>
          <p className="text-[9px] font-semibold text-gray-400 uppercase">Available</p>
        </div>
        <div>
          <p className="text-base font-extrabold text-gray-900">{d.total}</p>
          <p className="text-[9px] font-semibold text-gray-400 uppercase">Total</p>
        </div>
      </div>
    </div>
  );
}
