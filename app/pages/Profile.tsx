import { useNavigate } from "react-router";
import { Settings, User, MapPin, Phone, Mail, ChevronRight, Award, Smartphone, LogOut, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { getProfile, getCattle, getScans } from "@/utils/api";
import { useSettings } from "@/contexts/SettingsContext";
import { getTranslations, type LanguageCode } from "@/utils/translations";
const logo = "https://placehold.co/100x40/2D5A27/FFF?text=PRANA";

// Mock data to match My Cattle page
const mockCattleCount = 4;
const mockHealthyCount = 3;
const mockWarningCount = 1;
const mockTotalAlerts = 3; // Total alerts across all cattle

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { darkMode, selectedLanguage } = useSettings();
  const t = getTranslations(selectedLanguage as LanguageCode);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ cattle: mockCattleCount, scans: 12, alerts: mockTotalAlerts });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [profileData, cattleData, scansData] = await Promise.all([
        getProfile().catch(() => ({ profile: null })),
        getCattle().catch(() => ({ cattle: [] })),
        getScans().catch(() => ({ scans: [] })),
      ]);

      setProfile(profileData.profile);

      // Use mock data for stats if API returns empty, otherwise use API data
      const cattleCount = cattleData.cattle?.length || mockCattleCount;
      const scansCount = scansData.scans?.length || 12; // Default scan count

      setStats({
        cattle: cattleCount,
        scans: scansCount,
        alerts: mockTotalAlerts,
      });
    } catch (error) {
      console.error("Failed to load profile data:", error);
      // Use mock data as fallback
      setProfile(null);
      setStats({ cattle: mockCattleCount, scans: 12, alerts: mockTotalAlerts });
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      signOut();
      navigate("/login");
    }
  };

  const menuItems = [
    {
      icon: Award,
      label: "Achievements",
      description: "Health milestones & records",
      path: "/achievements",
      color: "text-[#BFA34B]",
    },
    {
      icon: Smartphone,
      label: "Device Info",
      description: "TinyML status & diagnostics",
      path: "/device",
      color: "text-blue-600",
    },
  ];

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-[#F9F8F4]'} transition-colors`}>
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2D5A27] to-[#3d7a35] text-white">
        <div className="max-w-lg mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User size={40} className="text-[#2D5A27]" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">
                  {loading ? "Loading..." : (profile?.name || "User")}
                </h1>
                <p className="text-green-100 text-sm">Dairy Farmer</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                    Premium Member
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Settings size={18} />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-lg mx-auto px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className={`rounded-2xl p-4 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>{stats.cattle}</div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.profile.cattle}</div>
          </div>
          <div className={`rounded-2xl p-4 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-[#BFA34B]'}`}>{stats.scans}</div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.profile.healthScans}</div>
          </div>
          <div className={`rounded-2xl p-4 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stats.alerts}</div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.profile.alerts || "Early Alerts"}</div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-lg mx-auto px-6 mb-6">
        <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Contact Information</h2>
        <div className={`rounded-2xl shadow-md p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {loading ? "Loading..." : (profile?.location || "Not provided")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {loading ? "Loading..." : (profile?.phone || user?.phone || "Not provided")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {loading ? "Loading..." : (user?.email || "Not provided")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-lg mx-auto px-6 mb-6">
        <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>More Options</h2>
        <div className={`rounded-2xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full px-5 py-4 flex items-center gap-4 transition-all ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } ${index < menuItems.length - 1 ? darkMode ? "border-b border-gray-700" : "border-b border-gray-100" : ""
                  }`}
              >
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ${item.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item.label}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</div>
                </div>
                <ChevronRight size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              </button>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="max-w-lg mx-auto px-6 mb-6">
        <div className={`rounded-2xl p-5 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
          }`}>
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="PRANA-G AI" className="h-8 w-30 rounded-lg" />
            <div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Version 1.0.0</div>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Hardware-less DeepTech livestock health monitoring powered by AI.
            Zero collars, zero tags - just your smartphone.
          </p>
        </div>
      </div>

      {/* Hardware-less Badge */}
      <div className="max-w-lg mx-auto px-6 pb-6">
        <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Your Device Capabilities</h2>
        <div className={`rounded-2xl shadow-md p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Muzzle-ID Recognition</span>
              <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>99.7% Accurate</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Spatial AI Processing</span>
              <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Acoustic AI Monitoring</span>
              <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Offline TinyML Mode</span>
              <span className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="max-w-lg mx-auto px-6 pb-24">
        <button
          onClick={handleLogout}
          className="w-full px-5 py-4 flex items-center gap-4 bg-red-500 text-white rounded-2xl shadow-md hover:bg-red-600 transition-all"
        >
          <LogOut size={24} />
          <div className="flex-1 text-left">
            <div className="font-semibold text-white">Logout</div>
          </div>
        </button>
      </div>
    </div>
  );
}