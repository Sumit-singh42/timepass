import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SettingsContextType {
  darkMode: boolean;
  selectedLanguage: string;
  offlineMode: boolean;
  voiceOutput: boolean;
  notifications: boolean;
  setDarkMode: (value: boolean) => void;
  setSelectedLanguage: (value: string) => void;
  setOfflineMode: (value: boolean) => void;
  setVoiceOutput: (value: boolean) => void;
  setNotifications: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    return localStorage.getItem("selectedLanguage") || "hindi";
  });

  const [offlineMode, setOfflineModeState] = useState(() => {
    const saved = localStorage.getItem("offlineMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [voiceOutput, setVoiceOutputState] = useState(() => {
    const saved = localStorage.getItem("voiceOutput");
    return saved ? JSON.parse(saved) : true;
  });

  const [notifications, setNotificationsState] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : true;
  });

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Save other settings to localStorage
  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem("offlineMode", JSON.stringify(offlineMode));
  }, [offlineMode]);

  useEffect(() => {
    localStorage.setItem("voiceOutput", JSON.stringify(voiceOutput));
  }, [voiceOutput]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
  };

  const setSelectedLanguage = (value: string) => {
    setSelectedLanguageState(value);
    // Show toast notification
    const languageNames: Record<string, string> = {
      hindi: "हिन्दी",
      marathi: "मराठी",
      gujarati: "ગુજરાતી",
      punjabi: "ਪੰਜਾਬੀ",
      bengali: "বাংলা",
      tamil: "தமிழ்",
      telugu: "తెలుగు",
      kannada: "ಕನ್ನಡ",
      malayalam: "മലയാളം",
      english: "English",
    };
    console.log(`Language changed to ${languageNames[value] || value}`);
  };

  const setOfflineMode = (value: boolean) => {
    setOfflineModeState(value);
  };

  const setVoiceOutput = (value: boolean) => {
    setVoiceOutputState(value);
  };

  const setNotifications = (value: boolean) => {
    setNotificationsState(value);
  };

  return (
    <SettingsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
