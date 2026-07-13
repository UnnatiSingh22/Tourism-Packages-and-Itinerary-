import React, { useState } from 'react';
import { RuleBuilder } from '../components/pricing/RuleBuilder';
import { formatRupee } from '../lib/utils';
import { Promotions } from '../components/pricing/Promotions';
import { RevenueInsight } from '../components/pricing/RevenueInsight';
import { SeasonalAdjustments } from '../components/pricing/SeasonalAdjustments';
import { AuditTrail } from '../components/pricing/AuditTrail';
import { BarChart3, Clock, TrendingUp } from 'lucide-react';

export function PricingRulesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports'>('overview');

  return (
    <div className="animate-in fade-in duration-500 pb-8">
      {/* Breadcrumb & Header section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8">
        <div>
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <a href="#" className="hover:text-gray-900 transition-colors">Pricing Engine</a>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-[#E65A4B] font-bold">Rules Configuration</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Pricing Rules
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Configure dynamic pricing, seasonal adjustments, and conditional discounts for tour packages across all global destinations.
          </p>
        </div>

        {/* Workflow Status Card */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl px-6 py-4 flex items-center gap-8 shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Workflow Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E65A4B]"></span>
              <p className="text-sm font-bold text-gray-900">3 Rules Pending<br/>Approval</p>
            </div>
          </div>
          <div className="pl-6 border-l border-blue-100 h-full flex items-center justify-center">
            <button className="text-xs font-bold text-[#E65A4B] hover:text-red-700 transition-colors text-center leading-tight">
              Review<br/>All
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Sub-navigation */}
      <div className="flex border-b border-gray-100 mb-6 gap-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'overview' 
              ? 'border-[#E65A4B] text-[#E65A4B]' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'reports' 
              ? 'border-[#E65A4B] text-[#E65A4B]' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Reports & Audit
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Main Grid Layout */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Left Column (Rule Builder) */}
            <div className="w-full lg:w-[65%] xl:w-[70%]">
              <RuleBuilder />
            </div>

            {/* Right Column (Promotions & Insight) */}
            <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col">
              <Promotions />
              <RevenueInsight />
            </div>
          </div>

          {/* Bottom Layout (Tables & Audit) */}
          <div className="flex flex-col gap-6">
            <SeasonalAdjustments />
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Pricing Rules Reports */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rule Hits Rate</span>
                <BarChart3 className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-2xl font-black text-gray-900">84.2%</span>
              <span className="text-emerald-500 text-[10px] font-bold block mt-1">↑ +4.2% vs last month</span>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avg Adjustment</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-2xl font-black text-gray-900">+{formatRupee(240)} / Pax</span>
              <span className="text-gray-400 text-[10px] font-bold block mt-1">Standard margin buffer</span>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Audit Frequency</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-2xl font-black text-gray-900">Daily</span>
              <span className="text-emerald-500 text-[10px] font-bold block mt-1">System compliance active</span>
            </div>
          </div>

          <AuditTrail />
        </div>
      )}

      {/* Footer text */}
      <div className="mt-10 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          © 2026 EVENTHUB360 PREMIUM CONCIERGE • DYNAMIC PRICING ENGINE V4.2.1
        </p>
      </div>
    </div>
  );
}
