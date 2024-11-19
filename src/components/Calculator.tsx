import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Users, MousePointer, Target, TrendingUp, Info } from 'lucide-react';

interface MetricsType {
  impressions: number;
  reach: number;
  estimatedClicks: number;
  ctr: number;
}

export default function AdCalculator() {
  const [budget, setBudget] = useState<number>(500);
  const [cpc, setCpc] = useState<number>(0.5);
  const [metrics, setMetrics] = useState<MetricsType>({
    impressions: 0,
    reach: 0,
    estimatedClicks: 0,
    ctr: 0,
  });

  useEffect(() => {
    // Calculate estimated metrics
    const estimatedClicks = Math.floor(budget / cpc);
    const impressions = Math.floor(estimatedClicks * (100 / 1.5)); // Assuming 1.5% CTR
    const reach = Math.floor(impressions * 0.7); // Assuming 70% unique reach
    const ctr = (estimatedClicks / impressions) * 100;

    setMetrics({
      impressions,
      reach,
      estimatedClicks,
      ctr,
    });
  }, [budget, cpc]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Facebook Ad Spend Calculator</h1>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <label className="block">
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Daily Budget
                </span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter daily budget"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  <MousePointer className="w-4 h-4" />
                  Cost per Click (CPC)
                </span>
                <input
                  type="number"
                  value={cpc}
                  onChange={(e) => setCpc(Math.max(0, Number(e.target.value)))}
                  step="0.01"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter CPC"
                />
              </label>
            </div>

            {/* Results Card */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800 mb-4">
                <Target className="w-5 h-5" />
                Estimated Daily Results
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Clicks</span>
                  <span className="font-semibold text-blue-900">{metrics.estimatedClicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Impressions</span>
                  <span className="font-semibold text-blue-900">{metrics.impressions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Reach</span>
                  <span className="font-semibold text-blue-900">{metrics.reach.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">CTR</span>
                  <span className="font-semibold text-blue-900">{metrics.ctr.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold">Daily Cost</h3>
              </div>
              <p className="text-2xl font-bold">${budget.toFixed(2)}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <MousePointer className="w-5 h-5" />
                <h3 className="font-semibold">CPC</h3>
              </div>
              <p className="text-2xl font-bold">${cpc.toFixed(2)}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5" />
                <h3 className="font-semibold">Monthly Reach</h3>
              </div>
              <p className="text-2xl font-bold">{(metrics.reach * 30).toLocaleString()}</p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Average Facebook CPC varies by industry (typically $0.50 - $2.00)</li>
              <li>• Higher CTR generally leads to lower CPC</li>
              <li>• Consider your target audience and campaign objectives</li>
              <li>• Monitor and optimize your campaigns regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}