import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { ChevronLeft, Calendar, TrendingUp, AlertCircle, CheckCircle, Volume2, Download, FileText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useSettings } from "@/contexts/SettingsContext";
import { getTranslations, type LanguageCode } from "@/utils/translations";

interface HealthLog {
  id: string;
  date: string;
  time: string;
  healthScore: number;
  rumination: number;
  respiratoryHealth: number;
  painIndicators: number;
  mode: "muzzle" | "spatial" | "audio" | "general";
  alerts: string[];
  notes: string;
}

const mockHealthData = [
  { date: "Jan 28", rumination: 85, respiratory: 92, pain: 5 },
  { date: "Jan 29", rumination: 87, respiratory: 90, pain: 3 },
  { date: "Jan 30", rumination: 82, respiratory: 88, pain: 8 },
  { date: "Jan 31", rumination: 90, respiratory: 93, pain: 2 },
  { date: "Feb 1", rumination: 88, respiratory: 91, pain: 4 },
  { date: "Feb 2", rumination: 92, respiratory: 95, pain: 1 },
];

const mockLogs: HealthLog[] = [
  {
    id: "1",
    date: "Feb 2, 2026",
    time: "08:30 AM",
    healthScore: 95,
    rumination: 92,
    respiratoryHealth: 95,
    painIndicators: 1,
    mode: "general",
    alerts: [],
    notes: "Excellent health indicators across all parameters",
  },
  {
    id: "2",
    date: "Feb 1, 2026",
    time: "07:15 AM",
    healthScore: 88,
    rumination: 88,
    respiratoryHealth: 91,
    painIndicators: 4,
    mode: "audio",
    alerts: ["Slight decrease in rumination activity"],
    notes: "Minor vocal stress detected. Continue monitoring.",
  },
  {
    id: "3",
    date: "Jan 31, 2026",
    time: "09:00 AM",
    healthScore: 90,
    rumination: 90,
    respiratoryHealth: 93,
    painIndicators: 2,
    mode: "spatial",
    alerts: [],
    notes: "Normal gait and posture. No lameness detected.",
  },
  {
    id: "4",
    date: "Jan 30, 2026",
    time: "08:45 AM",
    healthScore: 82,
    rumination: 82,
    respiratoryHealth: 88,
    painIndicators: 8,
    mode: "muzzle",
    alerts: ["Early warning: Potential mastitis detected", "Recommend veterinary consultation"],
    notes: "Temperature slightly elevated. Administered preventive care.",
  },
];

export default function History() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { darkMode, selectedLanguage } = useSettings();
  const t = getTranslations(selectedLanguage as LanguageCode);
  const [activeTab, setActiveTab] = useState<"logs" | "trends">("logs");
  const cattleId = searchParams.get("cattleId");

  const getModeColor = (mode: HealthLog["mode"]) => {
    switch (mode) {
      case "muzzle":
        return darkMode ? "bg-blue-900 text-blue-300 border-blue-700" : "bg-blue-100 text-blue-700 border-blue-200";
      case "spatial":
        return darkMode ? "bg-purple-900 text-purple-300 border-purple-700" : "bg-purple-100 text-purple-700 border-purple-200";
      case "audio":
        return darkMode ? "bg-green-900 text-green-300 border-green-700" : "bg-green-100 text-green-700 border-green-200";
      default:
        return darkMode ? "bg-yellow-900 text-yellow-300 border-yellow-700" : "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getModeLabel = (mode: HealthLog["mode"]) => {
    switch (mode) {
      case "muzzle":
        return "Muzzle-ID";
      case "spatial":
        return "Spatial AI";
      case "audio":
        return "Acoustic";
      default:
        return "Quick Scan";
    }
  };

  const playVoiceReport = (log: HealthLog) => {
    // Simulate voice playback
    alert(`Voice Report (Bhashini): Health score ${log.healthScore}. ${log.notes}`);
  };

  const downloadReport = (log: HealthLog, format: 'pdf' | 'csv') => {
    // Generate report content
    const reportData = {
      date: log.date,
      time: log.time,
      healthScore: log.healthScore,
      rumination: log.rumination,
      respiratory: log.respiratoryHealth,
      pain: log.painIndicators,
      mode: getModeLabel(log.mode),
      notes: log.notes,
      alerts: log.alerts.join('; '),
    };

    if (format === 'csv') {
      // CSV Download
      const csvContent = [
        'Field,Value',
        `Date,${reportData.date}`,
        `Time,${reportData.time}`,
        `Health Score,${reportData.healthScore}`,
        `Rumination,${reportData.rumination}%`,
        `Respiratory Health,${reportData.respiratory}%`,
        `Pain Indicators,${reportData.pain}`,
        `Scan Mode,${reportData.mode}`,
        `Notes,"${reportData.notes}"`,
        `Alerts,"${reportData.alerts}"`,
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PRANA-Health-Report-${log.date.replace(/,/g, '')}-${log.id}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      // PDF Download (simplified text-based)
      const pdfContent = `
PRANA-G AI - Health Report
═══════════════════════════════════

Date: ${reportData.date}
Time: ${reportData.time}
Scan Mode: ${reportData.mode}

HEALTH METRICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Health Score: ${reportData.healthScore}/100
Rumination Activity: ${reportData.rumination}%
Respiratory Health: ${reportData.respiratory}%
Pain Indicators: ${reportData.pain}/10

NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${reportData.notes}

${reportData.alerts ? `ALERTS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${reportData.alerts}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by PRANA-G AI
Hardware-less Livestock Monitoring
      `;

      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PRANA-Health-Report-${log.date.replace(/,/g, '')}-${log.id}.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const downloadAllReports = () => {
    // Download all reports as CSV
    const csvContent = [
      'Date,Time,Health Score,Rumination,Respiratory,Pain,Mode,Notes',
      ...mockLogs.map(log => 
        `${log.date},${log.time},${log.healthScore},${log.rumination},${log.respiratoryHealth},${log.painIndicators},${getModeLabel(log.mode)},"${log.notes}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PRANA-All-Health-Reports-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-[#F9F8F4]'} transition-colors`}>
      {/* Header */}
      <header className={`shadow-sm sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors`}>
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(cattleId ? "/cattle" : "/")}
              className={darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-[#2D5A27]'}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1">
              <h1 className={`text-2xl ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>{t.history.title}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {cattleId ? "Lakshmi (Gir)" : t.history.allCattle}
              </p>
            </div>
            <button
              onClick={downloadAllReports}
              className="bg-gradient-to-r from-[#BFA34B] to-[#8E7932] text-white p-2 rounded-lg hover:shadow-lg transition-all"
              title={t.history.download}
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-lg mx-auto px-6 py-4">
        <div className={`flex gap-2 rounded-xl p-1 shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === "logs"
                ? "bg-[#2D5A27] text-white"
                : darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar size={18} />
              <span>Scan Logs</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("trends")}
            className={`flex-1 py-2 px-4 rounded-lg transition-all ${
              activeTab === "trends"
                ? "bg-[#2D5A27] text-white"
                : darkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={18} />
              <span>Trends</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 pb-24">
        {activeTab === "logs" && (
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div
                key={log.id}
                className={`rounded-2xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                {/* Header */}
                <div className={`px-5 py-3 flex items-center justify-between border-b ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                }`}>
                  <div>
                    <div className={`text-sm font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{log.date}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{log.time}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getModeColor(log.mode)}`}>
                      {getModeLabel(log.mode)}
                    </span>
                    <button
                      onClick={() => playVoiceReport(log)}
                      className="text-[#BFA34B] hover:text-[#8E7932]"
                      title="Play voice report"
                    >
                      <Volume2 size={20} />
                    </button>
                    <button
                      onClick={() => downloadReport(log, 'csv')}
                      className={darkMode ? 'text-green-400 hover:text-green-300' : 'text-[#2D5A27] hover:text-[#3d7a35]'}
                      title="Download CSV"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Health Score */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overall Health Score</span>
                    <span className={`text-3xl font-bold ${
                      log.healthScore >= 90
                        ? darkMode ? "text-green-400" : "text-green-600"
                        : log.healthScore >= 75
                        ? darkMode ? "text-yellow-400" : "text-yellow-600"
                        : darkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      {log.healthScore}
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className={`rounded-lg p-3 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-50'}`}>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rumination</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{log.rumination}%</div>
                    </div>
                    <div className={`rounded-lg p-3 ${darkMode ? 'bg-green-900/50' : 'bg-green-50'}`}>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Respiratory</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>{log.respiratoryHealth}%</div>
                    </div>
                    <div className={`rounded-lg p-3 ${darkMode ? 'bg-red-900/50' : 'bg-red-50'}`}>
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pain</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>{log.painIndicators}</div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {log.alerts.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {log.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 rounded-lg p-3 ${
                            darkMode ? 'bg-yellow-900/50 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
                          }`}
                        >
                          <AlertCircle size={16} className={`mt-0.5 flex-shrink-0 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>{alert}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  <div className={`flex items-start gap-2 rounded-lg p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{log.notes}</span>
                  </div>

                  {/* Download Options */}
                  <div className={`mt-4 pt-4 flex gap-2 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                    <button
                      onClick={() => downloadReport(log, 'csv')}
                      className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm ${
                        darkMode ? 'bg-green-900/50 hover:bg-green-900 text-green-300' : 'bg-green-50 hover:bg-green-100 text-green-700'
                      }`}
                    >
                      <FileText size={16} />
                      <span>Download CSV</span>
                    </button>
                    <button
                      onClick={() => downloadReport(log, 'pdf')}
                      className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm ${
                        darkMode ? 'bg-blue-900/50 hover:bg-blue-900 text-blue-300' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                      }`}
                    >
                      <Download size={16} />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "trends" && (
          <div className="space-y-6">
            {/* Chart Card */}
            <div className={`rounded-2xl shadow-md p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Health Indicators (7 Days)</h3>
              
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHealthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rumination"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Rumination"
                      dot={{ fill: "#3b82f6", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="respiratory"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Respiratory"
                      dot={{ fill: "#10b981", r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pain"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Pain"
                      dot={{ fill: "#ef4444", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Rumination</span>
                  <span className="font-semibold text-blue-600">87.3%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Respiratory Health</span>
                  <span className="font-semibold text-green-600">91.5%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Pain Indicators</span>
                  <span className="font-semibold text-red-600">3.8</span>
                </div>
              </div>
            </div>

            {/* Insights Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
              <h4 className="font-semibold text-[#2D5A27] mb-2">📊 AI Insights</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Rumination has improved by 8% over the past week</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Respiratory health is consistently above 88%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Pain indicators peaked on Jan 30 - addressed with preventive care</span>
                </li>
              </ul>
            </div>

            {/* 48-hour Early Warning */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 border border-yellow-200">
              <h4 className="font-semibold text-[#8E7932] mb-2">⚡ Early Warning System</h4>
              <p className="text-sm text-gray-700">
                Our AI detected subtle changes in acoustic patterns on Jan 30, 
                flagging potential mastitis 48 hours before visible symptoms. 
                Preventive measures were taken immediately.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}