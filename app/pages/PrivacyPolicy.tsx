import { useNavigate } from "react-router";
import { ChevronLeft, ShieldCheck, Lock, Eye, Database, FileText, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Lock,
      title: "Data Encryption",
      content: "All cattle health data is encrypted end-to-end using industry-standard AES-256 encryption. Your biometric muzzle-ID data is never stored in plain text.",
    },
    {
      icon: Database,
      title: "Data Storage",
      content: "Health records are stored securely on Indian servers complying with Data Protection Laws. You have full ownership and control of your data.",
    },
    {
      icon: Eye,
      title: "Data Collection",
      content: "We collect only essential data: cattle biometric IDs, health scan results, and device diagnostics. No personal identification is linked to cattle data without consent.",
    },
    {
      icon: FileText,
      title: "Third-Party Sharing",
      content: "We never sell your data. Information is only shared with veterinary partners when you explicitly request health consultations.",
    },
    {
      icon: Globe,
      title: "Offline Processing",
      content: "With TinyML Edge mode, all AI diagnostics run on your device. Data syncs only when you're online and authorize it.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-600 hover:text-[#2D5A27]"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl text-[#2D5A27]">Privacy Policy</h1>
              <p className="text-sm text-gray-600">Your data, your control</p>
            </div>
            <ShieldCheck size={28} className="text-[#2D5A27]" />
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 mb-6">
          <h2 className="font-bold text-blue-700 text-lg mb-3">
            🔐 Privacy-First Design
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            PRANA-G AI is built with privacy at its core. As a hardware-less solution, 
            we minimize data collection and maximize user control.
          </p>
          <div className="bg-white/80 rounded-xl p-3 text-xs text-gray-600">
            <strong>Last Updated:</strong> February 3, 2026
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#2D5A27]/10 rounded-lg">
                      <Icon size={24} className="text-[#2D5A27]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-700">{section.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Rights */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Rights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Access:</strong> Request a copy of all your cattle health data at any time
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Delete:</strong> Request permanent deletion of your account and all associated data
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Export:</strong> Download health records in CSV or JSON format for analysis
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Opt-Out:</strong> Disable cloud sync and use 100% offline TinyML mode
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
          <h4 className="font-semibold text-[#2D5A27] mb-2">Questions or Concerns?</h4>
          <p className="text-sm text-gray-700 mb-3">
            Contact our privacy team at privacy@prana-g.ai or call our helpline for assistance.
          </p>
          <button
            onClick={() => navigate("/help")}
            className="text-sm font-medium text-[#2D5A27] hover:underline"
          >
            Visit Help & Support →
          </button>
        </div>
      </div>
    </div>
  );
}
