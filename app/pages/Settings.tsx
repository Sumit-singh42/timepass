import { useNavigate } from "react-router";
import { ChevronLeft, Globe, Wifi, WifiOff, Volume2, Bell, Moon, Smartphone, ShieldCheck, HelpCircle, ChevronRight, Check } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const {
    darkMode,
    selectedLanguage,
    offlineMode,
    voiceOutput,
    notifications,
    setDarkMode,
    setSelectedLanguage,
    setOfflineMode,
    setVoiceOutput,
    setNotifications,
  } = useSettings();

  const languages = [
    { code: "hindi", name: "हिन्दी (Hindi)", dialect: "Devanagari" },
    { code: "marathi", name: "मराठी (Marathi)", dialect: "Devanagari" },
    { code: "gujarati", name: "ગુજરાતી (Gujarati)", dialect: "Gujarati" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ (Punjabi)", dialect: "Gurmukhi" },
    { code: "bengali", name: "বাংলা (Bengali)", dialect: "Bengali" },
    { code: "tamil", name: "தமிழ் (Tamil)", dialect: "Tamil" },
    { code: "telugu", name: "తెలుగు (Telugu)", dialect: "Telugu" },
    { code: "kannada", name: "ಕನ್ನಡ (Kannada)", dialect: "Kannada" },
    { code: "malayalam", name: "മലയാളം (Malayalam)", dialect: "Malayalam" },
    { code: "english", name: "English", dialect: "Latin" },
  ];

  const handleLanguageChange = (langCode: string) => {
    const lang = languages.find(l => l.code === langCode);
    setSelectedLanguage(langCode);
    toast.success(`Language changed to ${lang?.name}`, {
      description: "Bhashini voice support activated",
      duration: 3000,
    });
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    toast.success(value ? "Dark mode enabled ✨" : "Light mode enabled ☀️", {
      description: value ? "Your eyes will thank you" : "Bright and clear",
      duration: 2000,
    });
  };

  const handleOfflineModeToggle = (value: boolean) => {
    setOfflineMode(value);
    toast.success(value ? "Offline mode enabled" : "Online mode enabled", {
      description: value ? "TinyML on-device processing active" : "Cloud AI processing active",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-600 dark:text-gray-300 hover:text-[#2D5A27] dark:hover:text-green-400 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl text-[#2D5A27] dark:text-green-400">Settings</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customize your experience</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Bhashini Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Globe size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Language Selection</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Powered by Bhashini - 22+ dialects</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 rounded-lg flex items-center justify-between transition-all ${
                    selectedLanguage === lang.code
                      ? "bg-[#2D5A27] dark:bg-green-700 text-white"
                      : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  <span className="text-sm font-medium">{lang.name}</span>
                  {selectedLanguage === lang.code && (
                    <Check size={18} className="text-green-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Edge/Offline Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                {offlineMode ? (
                  <WifiOff size={24} className="text-purple-600 dark:text-purple-400" />
                ) : (
                  <Wifi size={24} className="text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Edge-Offline Sync</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">TinyML on-device processing</p>
              </div>
              <Switch checked={offlineMode} onCheckedChange={handleOfflineModeToggle} />
            </div>
          </div>
          <div className="p-5 bg-purple-50 dark:bg-purple-900/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {offlineMode
                ? "✅ All diagnostics run on your device without cloud dependency. Data syncs when online."
                : "🌐 Using cloud-enhanced AI processing for maximum accuracy. Internet required."}
            </p>
          </div>
        </div>

        {/* Voice-First Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors">
          <div className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <Volume2 size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Voice Output</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Read diagnostics aloud</p>
              </div>
              <Switch checked={voiceOutput} onCheckedChange={setVoiceOutput} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors">
          <div className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <Bell size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Early Warning Alerts</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">48-hour disease detection</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors">
          <div className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Moon size={24} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {darkMode ? "Dark theme enabled ✨" : "Light theme enabled ☀️"}
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-5 border border-green-200 dark:border-green-700 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <Smartphone size={24} className="text-[#2D5A27] dark:text-green-400" />
            <h4 className="font-semibold text-[#2D5A27] dark:text-green-400">Your Smartphone as a Lab</h4>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-between">
              <span>Camera Resolution</span>
              <span className="font-semibold">12MP (Sufficient)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Microphone Quality</span>
              <span className="font-semibold">High Fidelity</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Processing Power</span>
              <span className="font-semibold">AI-Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Storage Available</span>
              <span className="font-semibold">8.2 GB</span>
            </div>
          </div>
        </div>

        {/* Inclusivity Note */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-700 transition-colors">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">🗣️ Designed for Everyone</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            PRANA-G AI is built for zero-literacy users. Every diagnostic can be heard in your 
            preferred language via Bhashini integration. No reading required - just listen and act.
          </p>
        </div>

        {/* Additional Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-colors">
          <button
            onClick={() => navigate("/privacy")}
            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-b border-gray-100 dark:border-gray-700"
          >
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <ShieldCheck size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900 dark:text-white">Privacy Policy</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Data protection & security</div>
            </div>
            <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
          </button>
          
          <button
            onClick={() => navigate("/help")}
            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <HelpCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900 dark:text-white">Help & Support</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">FAQs & customer care</div>
            </div>
            <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}