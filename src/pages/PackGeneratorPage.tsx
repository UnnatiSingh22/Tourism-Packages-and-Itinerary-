import React from 'react';
import { DocumentSelectionPanel } from '../components/sales/DocumentSelectionPanel';
import { DigitalPreviewPanel } from '../components/sales/DigitalPreviewPanel';
import { Sparkles } from 'lucide-react';

export function PackGeneratorPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-12 h-[calc(100vh-6rem)] flex flex-col">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4 shrink-0">
        <span>Sales</span>
        <span>›</span>
        <span>Document Management</span>
        <span>›</span>
        <span className="text-[#BC2C2C]">Travel Pack Generator</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 shrink-0">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Pack Generator
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed">
            Compile and export the ultimate client experience documentation.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#E65A4B] to-[#BC2C2C] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all shadow-sm">
            <Sparkles className="w-4 h-4" />
            Generate Pack
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        {/* Left Column */}
        <div className="w-full xl:w-[320px] shrink-0">
          <DocumentSelectionPanel />
        </div>

        {/* Right Column */}
        <div className="flex-1 min-w-0 h-full">
          <DigitalPreviewPanel />
        </div>
      </div>
    </div>
  );
}
