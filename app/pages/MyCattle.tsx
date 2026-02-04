import { useNavigate } from "react-router";
import { Plus, ChevronRight, Activity, Calendar, MapPin, Trash2, AlertTriangle, Camera, Bell } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { getTranslations, type LanguageCode } from "@/utils/translations";

interface CattleData {
  id: string;
  name: string;
  breed: string;
  age: string;
  healthScore: number;
  lastScan: string;
  location: string;
  status: "healthy" | "warning" | "critical";
  muzzleId: string;
  alerts?: number; // Number of active alerts for this cattle
}

const mockCattle: CattleData[] = [
  {
    id: "1",
    name: "Lakshmi",
    breed: "Gir",
    age: "4 years",
    healthScore: 95,
    lastScan: "2 hours ago",
    location: "Barn A-12",
    status: "healthy",
    muzzleId: "MZL-99.7-001",
    alerts: 2,
  },
  {
    id: "2",
    name: "Nandi",
    breed: "Sahiwal",
    age: "3 years",
    healthScore: 78,
    lastScan: "5 hours ago",
    location: "Barn A-15",
    status: "warning",
    muzzleId: "MZL-99.7-002",
    alerts: 1,
  },
  {
    id: "3",
    name: "Kamadhenu",
    breed: "Red Sindhi",
    age: "5 years",
    healthScore: 92,
    lastScan: "1 day ago",
    location: "Barn B-03",
    status: "healthy",
    muzzleId: "MZL-99.7-003",
    alerts: 0,
  },
  {
    id: "4",
    name: "Surabhi",
    breed: "Rathi",
    age: "2 years",
    healthScore: 88,
    lastScan: "6 hours ago",
    location: "Barn A-08",
    status: "healthy",
    muzzleId: "MZL-99.7-004",
    alerts: 0,
  },
];

export default function MyCattle() {
  const navigate = useNavigate();
  const { darkMode, selectedLanguage } = useSettings();
  const t = getTranslations(selectedLanguage as LanguageCode);
  const [cattle, setCattle] = useState<CattleData[]>(mockCattle);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getStatusColor = (status: CattleData["status"]) => {
    switch (status) {
      case "healthy":
        return darkMode ? "bg-green-900 text-green-300 border-green-700" : "bg-green-100 text-green-700 border-green-200";
      case "warning":
        return darkMode ? "bg-yellow-900 text-yellow-300 border-yellow-700" : "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "critical":
        return darkMode ? "bg-red-900 text-red-300 border-red-700" : "bg-red-100 text-red-700 border-red-200";
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return darkMode ? "text-green-400" : "text-green-600";
    if (score >= 75) return darkMode ? "text-yellow-400" : "text-yellow-600";
    return darkMode ? "text-red-400" : "text-red-600";
  };

  const handleDeleteCattle = (id: string) => {
    // Show confirmation
    const cattleToDelete = cattle.find(c => c.id === id);
    if (!cattleToDelete) return;

    const confirmed = window.confirm(
      `Are you sure you want to remove ${cattleToDelete.name} from your cattle registry?\n\nThis will:\n• Delete all health records\n• Remove Muzzle-ID: ${cattleToDelete.muzzleId}\n• Cannot be undone\n\nProceed with deletion?`
    );

    if (confirmed) {
      setDeletingId(id);
      
      // Simulate deletion delay
      setTimeout(() => {
        setCattle(prevCattle => prevCattle.filter(c => c.id !== id));
        setDeletingId(null);
        
        // Show success message
        alert(`${cattleToDelete.name} has been successfully removed from your registry.`);
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-[#F9F8F4]'} transition-colors`}>
      {/* Header */}
      <header className={`shadow-sm sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors`}>
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>{t.myCattle.title}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.myCattle.subtitle}</p>
            </div>
            <button
              onClick={() => navigate("/camera?mode=register")}
              className="bg-gradient-to-r from-[#BFA34B] to-[#8E7932] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-lg mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`rounded-2xl p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>{cattle.length}</div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Cattle</div>
          </div>
          <div className={`rounded-2xl p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {cattle.filter((c) => c.status === "healthy").length}
            </div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.myCattle.healthy || "Healthy"}</div>
          </div>
          <div className={`rounded-2xl p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              {cattle.filter((c) => c.status === "warning").length}
            </div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Attention</div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Health Scan Card */}
            <button
              onClick={() => navigate("/camera?mode=health")}
              className="bg-gradient-to-br from-[#2D5A27] to-[#3d7a35] rounded-2xl p-5 shadow-md hover:shadow-lg transition-all text-left"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <Camera size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{t.myCattle.healthScan}</h3>
              <p className="text-green-100 text-xs">
                Start AI diagnostic camera
              </p>
            </button>

            {/* Early Alerts Card */}
            <button
              onClick={() => navigate("/alerts")}
              className="bg-gradient-to-br from-[#BFA34B] to-[#8E7932] rounded-2xl p-5 shadow-md hover:shadow-lg transition-all text-left relative"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <Bell size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{t.myCattle.earlyAlerts}</h3>
              <p className="text-yellow-100 text-xs">
                48-hour warning system
              </p>
              {cattle.some(c => (c.alerts || 0) > 0) && (
                <div className="absolute top-3 right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {cattle.reduce((sum, c) => sum + (c.alerts || 0), 0)}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Cattle List */}
        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Your Cattle</h2>
          <div className="space-y-4">
            {cattle.map((cattleItem) => (
              <div
                key={cattleItem.id}
                className={`rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } ${deletingId === cattleItem.id ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {/* Muzzle ID Badge */}
                <div className="bg-gradient-to-r from-[#2D5A27] to-[#3d7a35] px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-mono">{cattleItem.muzzleId}</span>
                  </div>
                  <span className="text-green-200 text-xs">Digital Twin Active</span>
                </div>

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{cattleItem.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cattleItem.breed} • {cattleItem.age}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`text-3xl font-bold ${getHealthScoreColor(cattleItem.healthScore)}`}>
                        {cattleItem.healthScore}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Health Score</div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(cattleItem.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      {cattleItem.status === "healthy" ? "Excellent Health" : "Needs Attention"}
                    </span>
                    {(cattleItem.alerts || 0) > 0 && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 border border-red-200">
                        <AlertTriangle size={12} />
                        {cattleItem.alerts} Alert{cattleItem.alerts! > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Info Grid */}
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Activity size={16} className={darkMode ? 'text-green-400' : 'text-[#2D5A27]'} />
                      <span>Last scan: {cattleItem.lastScan}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MapPin size={16} className={darkMode ? 'text-green-400' : 'text-[#2D5A27]'} />
                      <span>{cattleItem.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => navigate(`/camera?cattleId=${cattleItem.id}&mode=health`)}
                      className="bg-gradient-to-br from-[#2D5A27] to-[#3d7a35] hover:shadow-md text-white py-2 px-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-all"
                    >
                      <Camera size={16} />
                      <span className="text-xs">Scan</span>
                    </button>
                    <button 
                      onClick={() => navigate(`/alerts?cattleId=${cattleItem.id}`)}
                      className="bg-gradient-to-br from-[#BFA34B] to-[#8E7932] hover:shadow-md text-white py-2 px-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-all relative"
                    >
                      <Bell size={16} />
                      <span className="text-xs">Alerts</span>
                      {(cattleItem.alerts || 0) > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                          {cattleItem.alerts}
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteCattle(cattleItem.id)}
                      disabled={deletingId === cattleItem.id}
                      className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-all disabled:opacity-50"
                      title="Remove cattle"
                    >
                      <Trash2 size={16} />
                      <span className="text-xs">Remove</span>
                    </button>
                  </div>
                  
                  {/* View Full Records Link */}
                  <button 
                    onClick={() => navigate(`/history?cattleId=${cattleItem.id}`)}
                    className={`w-full mt-3 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-green-400' : 'bg-gray-50 hover:bg-gray-100 text-[#2D5A27]'
                    }`}
                  >
                    <span className="text-sm">View Complete Health Records</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {cattle.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🐄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cattle Registered</h3>
            <p className="text-gray-600 mb-6">
              Start by scanning your first cattle using Muzzle-ID biometric identification
            </p>
            <button
              onClick={() => navigate("/camera?mode=register")}
              className="bg-gradient-to-r from-[#BFA34B] to-[#8E7932] text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Register First Cattle</span>
            </button>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
          <h4 className="font-semibold text-[#2D5A27] mb-2">🔍 99.7% Muzzle-ID Accuracy</h4>
          <p className="text-sm text-gray-700">
            Each cattle is identified through unique nose-print biometrics using PointNet++ deep learning. 
            No tags, no collars - just natural identification.
          </p>
        </div>
      </div>
    </div>
  );
}