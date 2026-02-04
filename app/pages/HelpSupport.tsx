import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, HelpCircle, Phone, Mail, MessageCircle, Book, Video, ChevronDown, Volume2 } from "lucide-react";

export default function HelpSupport() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does hardware-less detection work?",
      questionHindi: "हार्डवेयर-रहित डिटेक्शन कैसे काम करता है?",
      answer: "PRANA-G AI uses your smartphone's camera and microphone to capture biometric data (Muzzle-ID), analyze gait patterns (Spatial AI), and process vocalizations (Acoustic AI). Advanced TinyML models run directly on your device, eliminating the need for collars or ear tags.",
    },
    {
      question: "Is internet required for diagnostics?",
      questionHindi: "क्या निदान के लिए इंटरनेट आवश्यक है?",
      answer: "No! Enable Offline Mode in Settings to use TinyML Edge processing. All AI diagnostics run locally on your smartphone. Data syncs automatically when you reconnect to the internet.",
    },
    {
      question: "How accurate is the Muzzle-ID recognition?",
      questionHindi: "मुज़ल-आईडी पहचान कितनी सटीक है?",
      answer: "Our Muzzle-ID system has 99.7% accuracy, comparable to human fingerprints. Each cow's nose pattern is unique and remains stable throughout their lifetime, making it the most reliable biometric for livestock.",
    },
    {
      question: "What diseases can be detected 48 hours early?",
      questionHindi: "कौन सी बीमारियों का पता 48 घंटे पहले लगाया जा सकता है?",
      answer: "Mastitis, Ketosis, Lameness, Respiratory infections, and Heat stress. Our Acoustic AI detects subtle changes in vocalization patterns that precede visible symptoms.",
    },
    {
      question: "Does PRANA-G support my language?",
      questionHindi: "क्या PRANA-G मेरी भाषा का समर्थन करता है?",
      answer: "Yes! Via Bhashini integration, we support 22+ Indian languages including Hindi, Marathi, Tamil, Telugu, Bengali, and more. All diagnostics can be heard via voice output.",
    },
  ];

  const supportChannels = [
    {
      icon: Phone,
      label: "Call Us",
      labelHindi: "हमें कॉल करें",
      value: "1800-123-PRANA",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      labelHindi: "व्हाट्सएप",
      value: "+91 98765 00000",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      labelHindi: "ईमेल",
      value: "support@prana-g.ai",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const resources = [
    {
      icon: Book,
      title: "User Guide",
      titleHindi: "उपयोगकर्ता गाइड",
      description: "Complete step-by-step manual",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      titleHindi: "वीडियो ट्यूटोरियल",
      description: "Learn with visual demonstrations",
    },
    {
      icon: Volume2,
      title: "Audio Instructions",
      titleHindi: "ऑडियो निर्देश",
      description: "Voice-guided help for all features",
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
              <h1 className="text-2xl text-[#2D5A27]">Help & Support</h1>
              <p className="text-sm text-gray-600">We're here to help you</p>
            </div>
            <HelpCircle size={28} className="text-[#2D5A27]" />
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Quick Contact */}
        <div className="bg-gradient-to-br from-[#2D5A27] to-[#3d7a35] rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-2">Need Immediate Help?</h2>
          <p className="text-green-100 text-sm mb-4">Our support team is available 24/7</p>
          <div className="grid grid-cols-3 gap-3">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <button
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all"
                >
                  <Icon size={24} className="mx-auto mb-2" />
                  <div className="text-xs font-medium">{channel.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Support Channels Detail */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div key={index} className="px-5 py-4 flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${channel.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{channel.label}</div>
                    <div className="text-sm text-gray-600">{channel.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                >
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{faq.question}</div>
                    <div className="text-xs text-gray-500 mt-1">{faq.questionHindi}</div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Learning Resources</h3>
          <div className="space-y-3">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <button
                  key={index}
                  className="w-full bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:bg-gray-50 transition-all"
                >
                  <div className="p-3 bg-[#2D5A27]/10 rounded-lg">
                    <Icon size={24} className="text-[#2D5A27]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">{resource.title}</div>
                    <div className="text-sm text-gray-600">{resource.description}</div>
                  </div>
                  <ChevronDown size={20} className="text-gray-400 -rotate-90" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 border border-yellow-200">
          <h4 className="font-semibold text-yellow-700 mb-2">💡 Send Feedback</h4>
          <p className="text-sm text-gray-700 mb-3">
            Help us improve PRANA-G AI by sharing your experience and suggestions.
          </p>
          <button className="text-sm font-medium text-yellow-700 hover:underline">
            Submit Feedback →
          </button>
        </div>
      </div>
    </div>
  );
}
