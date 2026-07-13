import React from 'react';
import { Eye, ZoomIn, ZoomOut, Printer, Share2 } from 'lucide-react';

export function DigitalPreviewPanel() {
  return (
    <div className="bg-[#EBF0F8] rounded-3xl shadow-sm border border-indigo-50 flex flex-col h-full overflow-hidden">
      {/* Top Toolbar */}
      <div className="px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2 text-gray-700">
          <Eye className="w-5 h-5" />
          <span className="text-sm font-semibold">Digital Preview</span>
        </div>
        <div className="flex gap-4 text-gray-500">
          <button className="hover:text-gray-900 transition-colors"><ZoomIn className="w-5 h-5" /></button>
          <button className="hover:text-gray-900 transition-colors"><ZoomOut className="w-5 h-5" /></button>
          <button className="hover:text-gray-900 transition-colors"><Printer className="w-5 h-5" /></button>
          <button className="hover:text-gray-900 transition-colors"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Document Canvas area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        {/* The PDF Document Mock */}
        <div className="bg-white w-full max-w-[800px] rounded-xl shadow-sm p-12 shrink-0 h-[1000px] relative">
          {/* Subtle grid pattern background to mock paper texture/grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Document Header */}
            <div className="flex justify-between items-start mb-16 border-b border-gray-100 pb-8">
              <div>
                <h1 className="text-3xl font-light text-[#8B2020] mb-2 tracking-tight">Travel Pack</h1>
                <p className="text-sm font-medium text-gray-500">Prepared for the Henderson-Smith Wedding</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 mb-1">ID: #EH-9921-X</p>
                <p className="text-sm text-gray-500">October 24, 2024</p>
              </div>
            </div>

            {/* Document Content Blocks (Skeleton mocks) */}
            <div className="space-y-8 flex-1">
              <div className="w-3/4 h-3 bg-[#EBF0F8] rounded-full"></div>
              
              <div className="flex gap-6 mt-8">
                <div className="w-1/2 h-40 bg-[#EBF0F8] rounded-2xl"></div>
                <div className="w-1/2 h-40 bg-[#EBF0F8] rounded-2xl"></div>
              </div>

              <div className="w-1/2 h-3 bg-[#EBF0F8] rounded-full mt-12"></div>
              <div className="w-full h-2 bg-[#EBF0F8] rounded-full mt-4"></div>
              <div className="w-full h-2 bg-[#EBF0F8] rounded-full"></div>
              <div className="w-5/6 h-2 bg-[#EBF0F8] rounded-full"></div>

              {/* Large Image Block */}
              <div className="w-full h-64 mt-12 rounded-2xl overflow-hidden relative">
                 <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Destination" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
