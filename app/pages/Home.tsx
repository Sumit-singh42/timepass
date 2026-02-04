import { useNavigate } from "react-router";
import { Mic, Camera, Activity, MessageCircle, ChevronDown, Shield, Zap, Globe, Award } from "lucide-react";
const logo = "https://placehold.co/100x40/2D5A27/FFF?text=PRANA";
const heroImage = "https://placehold.co/600x400/2D5A27/FFF?text=Prana-G+AI";
import AIAssistant from "@/app/components/AIAssistant";
import { useSettings } from "@/contexts/SettingsContext";
import { getTranslations, type LanguageCode } from "@/utils/translations";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { selectedLanguage, setSelectedLanguage, darkMode } = useSettings();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const t = getTranslations(selectedLanguage as LanguageCode);

  const languages = [
    { code: "hindi", name: "हिन्दी", label: "भाषा | हिन्दी" },
    { code: "marathi", name: "मराठी", label: "भाषा | मराठी" },
    { code: "gujarati", name: "ગુજરાતી", label: "ભાષા | ગુજરાતી" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ", label: "ਭਾਸ਼ਾ | ਪੰਜਾਬੀ" },
    { code: "bengali", name: "বাংলা", label: "ভাষা | বাংলা" },
    { code: "tamil", name: "தமிழ்", label: "மொழி | தமிழ்" },
    { code: "telugu", name: "తెలుగు", label: "భాష | తెలుగు" },
    { code: "kannada", name: "ಕನ್ನಡ", label: "ಭಾಷೆ | ಕನ್ನಡ" },
    { code: "malayalam", name: "മലയാളം", label: "ഭാഷ | മലയാളം" },
    { code: "english", name: "English", label: "Language | English" },
  ];

  const currentLang = languages.find(l => l.code === selectedLanguage);

  return (
    <div className={`min-h-screen pb-24 ${darkMode ? 'bg-gray-900' : 'bg-[#F9F8F4]'} transition-colors`}>
      {/* Header */}
      <header className={`shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors`}>
        <div className="max-w-lg mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="PRANA-G AI" className="h-8 w-auto" />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${darkMode
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-200'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-900'
                }`}
            >
              <span className="text-sm">{currentLang?.label}</span>
              <ChevronDown size={16} />
            </button>

            {showLanguageDropdown && (
              <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-50 overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-all ${selectedLanguage === lang.code
                        ? darkMode
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-[#2D5A27] text-white'
                        : darkMode
                          ? 'hover:bg-gray-700 text-gray-200'
                          : 'hover:bg-gray-50 text-gray-900'
                      }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <div className={`rounded-3xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors`}>
          {/* Hero Image */}
          <div className="relative">
            <img
              src={heroImage}
              alt="PRANA-G AI Hero"
              className="w-full h-auto"
            />
          </div>

          {/* CTA Button */}
          <div className="px-6 py-6 relative">
            <button
              onClick={() => navigate("/camera")}
              className="w-full bg-gradient-to-r from-[#FDB931] to-[#BFA34B] text-white py-4 px-6 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Mic size={24} />
              <span>{t.home.checkCowHealth}</span>
            </button>

            <button
              onClick={() => navigate("/camera")}
              className={`w-full mt-3 py-2 flex items-center justify-center gap-2 text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-[#2D5A27]'
                }`}
            >
              <Camera size={18} />
              <span>{t.home.scanWithCamera}</span>
            </button>
          </div>

          {/* Quick Action Cards */}
          <div className="px-6 pb-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate("/camera?mode=muzzle")}
              className={`rounded-2xl p-4 transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
              <div className={`w-16 h-16 rounded-xl shadow-md flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                <Camera size={28} className={darkMode ? 'text-green-400' : 'text-[#2D5A27]'} />
              </div>
              <span className={`text-sm text-center block mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {t.home.scanCow}
              </span>
            </button>

            <button
              onClick={() => navigate("/camera?mode=audio")}
              className={`rounded-2xl p-4 transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
              <div className={`w-16 h-16 rounded-xl shadow-md flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                <Activity size={28} className={darkMode ? 'text-green-400' : 'text-[#2D5A27]'} />
              </div>
              <span className={`text-sm text-center block mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {t.home.listenToSound}
              </span>
            </button>

            <button
              onClick={() => navigate("/history")}
              className={`rounded-2xl p-4 transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
              <div className={`w-16 h-16 rounded-xl shadow-md flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-white'
                }`}>
                <MessageCircle size={28} className={darkMode ? 'text-amber-400' : 'text-[#BFA34B]'} />
              </div>
              <span className={`text-sm text-center block mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {t.home.hearHealthReport}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-lg mx-auto px-6 pb-8">
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
            {t.home.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Feature 1 */}
          <div className={`rounded-2xl p-5 shadow-md border ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
            }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${darkMode ? 'bg-blue-900/30' : 'bg-gradient-to-br from-blue-50 to-blue-100'
              }`}>
              <Shield size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <h3 className={`font-semibold mb-1 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
              {t.home.feature1Title}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.feature1Desc}
            </p>
          </div>

          {/* Feature 2 */}
          <div className={`rounded-2xl p-5 shadow-md border ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
            }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${darkMode ? 'bg-green-900/30' : 'bg-gradient-to-br from-green-50 to-green-100'
              }`}>
              <Zap size={24} className={darkMode ? 'text-green-400' : 'text-green-600'} />
            </div>
            <h3 className={`font-semibold mb-1 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
              {t.home.feature2Title}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.feature2Desc}
            </p>
          </div>

          {/* Feature 3 */}
          <div className={`rounded-2xl p-5 shadow-md border ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
            }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${darkMode ? 'bg-purple-900/30' : 'bg-gradient-to-br from-purple-50 to-purple-100'
              }`}>
              <Globe size={24} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
            </div>
            <h3 className={`font-semibold mb-1 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
              {t.home.feature3Title}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.feature3Desc}
            </p>
          </div>

          {/* Feature 4 */}
          <div className={`rounded-2xl p-5 shadow-md border ${darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-100'
            }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${darkMode ? 'bg-amber-900/30' : 'bg-gradient-to-br from-amber-50 to-amber-100'
              }`}>
              <Award size={24} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />
            </div>
            <h3 className={`font-semibold mb-1 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
              {t.home.feature4Title}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.feature4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-lg mx-auto px-6 pb-6">
        <div className={`rounded-2xl p-6 shadow-md border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
          <div className="text-center mb-4">
            <img src={logo} alt={t.home.title} className="h-10 w-auto mx-auto mb-3" />
            <h4 className={`font-semibold mb-1 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
              {t.home.title}
            </h4>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.home.tagline}
            </p>
          </div>

          <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`flex justify-center gap-6 text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <button
                onClick={() => navigate("/help")}
                className={darkMode ? 'hover:text-green-400' : 'hover:text-[#2D5A27]'}
              >
                {t.home.helpSupport}
              </button>
              <span>•</span>
              <button
                onClick={() => navigate("/privacy")}
                className={darkMode ? 'hover:text-green-400' : 'hover:text-[#2D5A27]'}
              >
                {t.home.privacyPolicy}
              </button>
            </div>

            <div className={`text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <p>{t.home.footerMadeWith}</p>
              <p className="mt-1">{t.home.footerCopyright}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}