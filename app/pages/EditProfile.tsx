import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, User, MapPin, Phone, Mail, Save } from "lucide-react";
import { updateProfile } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [location, setLocation] = useState(user?.user_metadata?.location || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    
    try {
      await updateProfile({ name, location, phone, email });
      
      // Success - navigate back to profile
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    } catch (err: any) {
      console.error("Save profile error:", err);
      setError(err.message || "Failed to save profile");
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2D5A27] to-[#3d7a35] text-white sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="text-white hover:bg-white/10 p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl">Edit Profile</h1>
              <p className="text-green-100 text-sm">Update your information</p>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSave} className="max-w-lg mx-auto px-6 py-8">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#2D5A27]">
              <User size={48} className="text-[#2D5A27]" />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#FDB931] rounded-full flex items-center justify-center shadow-lg text-white hover:bg-[#BFA34B] transition-all"
            >
              ✏️
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name | पूरा नाम
            </label>
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2D5A27] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location | स्थान
            </label>
            <div className="relative">
              <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2D5A27] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number | फ़ोन नंबर
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2D5A27] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email | ईमेल
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2D5A27] focus:outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full mt-8 bg-gradient-to-r from-[#FDB931] to-[#BFA34B] text-white py-4 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save size={20} />
          <span>{isSaving ? "Saving..." : "Save Changes | परिवर्तन सहेजें"}</span>
        </button>

        {/* Additional Info */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
          <h4 className="font-semibold text-blue-700 mb-2">📝 Profile Information</h4>
          <p className="text-sm text-gray-700">
            Your profile helps us personalize your PRANA-G AI experience and provide better 
            cattle health insights. All information is securely stored.
          </p>
        </div>
      </form>
    </div>
  );
}