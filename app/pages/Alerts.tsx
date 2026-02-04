import { useNavigate } from "react-router";
import { AlertTriangle, AlertCircle, CheckCircle, Clock, ChevronRight, Trash2 } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  cattleName: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

const initialMockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Early Mastitis Detection",
    description: "Acoustic AI detected abnormal vocalizations indicating early stage mastitis. Immediate veterinary consultation recommended.",
    cattleName: "Lakshmi (Gir)",
    timestamp: "2 hours ago",
    isRead: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "warning",
    title: "Decreased Rumination Activity",
    description: "Rumination levels have dropped by 12% over the past 24 hours. Monitor feeding patterns closely.",
    cattleName: "Nandi (Sahiwal)",
    timestamp: "5 hours ago",
    isRead: false,
    actionRequired: true,
  },
  {
    id: "3",
    type: "info",
    title: "Health Scan Due",
    description: "It's been 24 hours since the last comprehensive health scan for this animal.",
    cattleName: "Kamadhenu (Red Sindhi)",
    timestamp: "8 hours ago",
    isRead: true,
    actionRequired: false,
  },
  {
    id: "4",
    type: "warning",
    title: "Gait Irregularity Detected",
    description: "Spatial AI analysis shows slight lameness in the left hind leg. Early intervention recommended.",
    cattleName: "Surabhi (Rathi)",
    timestamp: "1 day ago",
    isRead: true,
    actionRequired: false,
  },
  {
    id: "5",
    type: "info",
    title: "Excellent Health Milestone",
    description: "Health score has remained above 90 for 7 consecutive days!",
    cattleName: "Lakshmi (Gir)",
    timestamp: "2 days ago",
    isRead: true,
    actionRequired: false,
  },
];

export default function Alerts() {
  const navigate = useNavigate();
  const { darkMode } = useSettings();
  const [alerts, setAlerts] = useState<Alert[]>(initialMockAlerts);
  const [alertToDelete, setAlertToDelete] = useState<string | null>(null);

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    setAlertToDelete(null);
  };

  const getAlertStyle = (type: Alert["type"]) => {
    if (darkMode) {
      switch (type) {
        case "critical":
          return {
            bg: "bg-red-900/30",
            border: "border-red-700",
            icon: AlertTriangle,
            iconColor: "text-red-400",
            iconBg: "bg-red-900/50",
            badge: "bg-red-600 text-white",
            ringColor: "ring-red-500",
          };
        case "warning":
          return {
            bg: "bg-orange-900/30",
            border: "border-orange-700",
            icon: AlertCircle,
            iconColor: "text-orange-400",
            iconBg: "bg-orange-900/50",
            badge: "bg-orange-600 text-white",
            ringColor: "ring-orange-500",
          };
        case "info":
          return {
            bg: "bg-green-900/30",
            border: "border-green-700",
            icon: CheckCircle,
            iconColor: "text-green-400",
            iconBg: "bg-green-900/50",
            badge: "bg-green-600 text-white",
            ringColor: "ring-green-500",
          };
      }
    }
    
    switch (type) {
      case "critical":
        return {
          bg: "bg-gradient-to-br from-red-50 to-red-100",
          border: "border-red-300",
          icon: AlertTriangle,
          iconColor: "text-red-600",
          iconBg: "bg-red-100",
          badge: "bg-red-600 text-white",
          ringColor: "ring-red-500",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-br from-orange-50 to-amber-100",
          border: "border-orange-300",
          icon: AlertCircle,
          iconColor: "text-orange-600",
          iconBg: "bg-orange-100",
          badge: "bg-orange-600 text-white",
          ringColor: "ring-orange-500",
        };
      case "info":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-100",
          border: "border-green-300",
          icon: CheckCircle,
          iconColor: "text-green-600",
          iconBg: "bg-green-100",
          badge: "bg-green-600 text-white",
          ringColor: "ring-green-500",
        };
    }
  };

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-[#F9F8F4]'} transition-colors`}>
      {/* Header */}
      <header className={`shadow-sm sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors`}>
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>Alerts</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {unreadCount > 0 ? `${unreadCount} new alerts` : "All caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="max-w-lg mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`rounded-2xl p-4 shadow-md border ${
            darkMode 
              ? 'bg-red-900/30 border-red-700' 
              : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
          }`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              {alerts.filter((a) => a.type === "critical").length}
            </div>
            <div className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Critical</div>
          </div>
          <div className={`rounded-2xl p-4 shadow-md border ${
            darkMode 
              ? 'bg-orange-900/30 border-orange-700' 
              : 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200'
          }`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              {alerts.filter((a) => a.type === "warning").length}
            </div>
            <div className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Warnings</div>
          </div>
          <div className={`rounded-2xl p-4 shadow-md border ${
            darkMode 
              ? 'bg-green-900/30 border-green-700' 
              : 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200'
          }`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {alerts.filter((a) => a.type === "info").length}
            </div>
            <div className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Healthy</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            const Icon = style.icon;

            return (
              <div
                key={alert.id}
                className={`${style.bg} border ${style.border} rounded-2xl overflow-hidden relative hover:shadow-lg transition-all ${
                  !alert.isRead ? "ring-2 ring-offset-2 " + style.ringColor : ""
                }`}
              >
                <div 
                  onClick={() => navigate(`/history?cattleId=${alert.cattleName}`)}
                  className="p-5 cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${style.iconBg} ${style.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 pr-8">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {alert.title}
                        </h3>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                        )}
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="font-medium">{alert.cattleName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {alert.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${style.badge}`}>
                        {alert.type.toUpperCase()}
                      </span>
                      {alert.actionRequired && (
                        <span className={`text-xs px-3 py-1 rounded-full border ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-300' 
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}>
                          Action Required
                        </span>
                      )}
                    </div>
                    <ChevronRight size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                </div>
                
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlertToDelete(alert.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' 
                      : 'hover:bg-gray-100 text-gray-400 hover:text-red-600'
                  }`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}</div>

        {/* Info Card */}
        <div className={`mt-6 rounded-2xl p-5 border ${
          darkMode 
            ? 'bg-green-900/30 border-green-700' 
            : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
        }`}>
          <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>
            ⚡ 48-Hour Early Warning
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            PRANA-G AI analyzes over 200 health parameters in real-time to detect diseases 
            48 hours before physical symptoms appear, giving you crucial time for preventive action.
          </p>
        </div>
      </div>

      {/* Delete Alert Dialog */}
      <AlertDialog open={alertToDelete !== null} onOpenChange={() => setAlertToDelete(null)}>
        <AlertDialogContent className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          <AlertDialogHeader>
            <AlertDialogTitle className={darkMode ? 'text-white' : ''}>
              Remove Alert?
            </AlertDialogTitle>
            <AlertDialogDescription className={darkMode ? 'text-gray-400' : ''}>
              This will permanently delete the alert from your list. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : ''}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => alertToDelete && handleDeleteAlert(alertToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
