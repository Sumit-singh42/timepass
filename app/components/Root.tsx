import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Beef, Bell, User } from "lucide-react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { Toaster } from "sonner";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/cattle", icon: Beef, label: "My Cattle" },
    { path: "/alerts", icon: Bell, label: "Alerts" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <ProtectedRoute>
      <Toaster position="top-center" richColors closeButton />
      <div className="min-h-screen flex flex-col bg-[#F9F8F4] dark:bg-gray-900 transition-colors">
        {/* Main Content */}
        <main className="flex-1 pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 transition-colors">
          <div className="max-w-lg mx-auto px-6 py-3">
            <div className="flex justify-around items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "text-[#2D5A27] dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-[#2D5A27] dark:hover:text-green-400"
                    }`}
                  >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </ProtectedRoute>
  );
}