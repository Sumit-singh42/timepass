import { useState } from "react";
import { useNavigate } from "react-router";
import { Phone, Volume2, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
const logo = "https://placehold.co/100x40/2D5A27/FFF?text=PRANA";
import { signIn } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { darkMode } = useSettings();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  // Demo login handler
  const handleDemoLogin = () => {
    setDemoMode(true);
    setError("");

    // Set demo user
    const demoUser = {
      id: "demo-user-123",
      phone: "+919876543210",
      user_metadata: {
        name: "राज पटेल (Raj Patel)",
        location: "Ahmedabad, Gujarat"
      }
    };

    setUser(demoUser);

    // Navigate to home after short delay
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phoneNumber.length === 10) {
      setStep("otp");
      // In production, this would send OTP via SMS
      console.log("OTP sent to:", phoneNumber);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-submit when all 4 digits are entered
      if (index === 3 && value && newOtp.every((digit) => digit)) {
        handleOtpSubmit(newOtp);
      }
    }
  };

  const handleOtpSubmit = async (otpValues: string[]) => {
    setIsVerifying(true);
    setError("");

    try {
      const otpCode = otpValues.join("");
      const response = await signIn(`+91${phoneNumber}`, otpCode);

      // Set user in context
      if (response.user) {
        setUser(response.user);
      }

      // Success - navigate to home
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      setIsVerifying(false);
      // Reset OTP fields
      setOtp(["", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    }
  };

  const speakInstructions = () => {
    // In real app, this would use Bhashini TTS
    const message = step === "phone"
      ? "Please enter your 10-digit mobile number"
      : "Please enter the 4-digit OTP sent to your phone";

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-[#F9F8F4] to-[#e8e6dc]'
      } transition-colors`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="PRANA-G AI" className="h-16 mx-auto mb-4" />
          <h1 className={`text-2xl mb-2 ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}>Welcome to PRANA-G AI</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hardware-less Livestock Health Monitoring</p>
        </div>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isVerifying}
          className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#BFA34B] to-[#8E7932] text-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 animate-pulse"
        >
          <CheckCircle size={20} />
          <span className="font-medium">🚀 Demo Login (No Database)</span>
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-[#F9F8F4] text-gray-500'}`}>OR use Phone Login</span>
          </div>
        </div>

        {/* Voice Instructions Button */}
        <button
          onClick={speakInstructions}
          className={`w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'
            }`}
        >
          <Volume2 size={20} className="text-[#BFA34B]" />
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>सुनें | Hear Instructions</span>
        </button>

        {/* Login Card */}
        <div className={`rounded-3xl shadow-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mobile Number | मोबाइल नंबर
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Phone size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className={`w-full pl-24 pr-4 py-4 text-lg border-2 rounded-2xl focus:outline-none transition-all ${darkMode
                        ? 'bg-gray-700 border-gray-600 focus:border-green-400 text-gray-100 placeholder:text-gray-500'
                        : 'border-gray-200 focus:border-[#2D5A27]'
                      }`}
                    maxLength={10}
                    required
                  />
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Enter your 10-digit mobile number
                </p>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length !== 10}
                className="w-full bg-gradient-to-r from-[#2D5A27] to-[#3d7a35] text-white py-4 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Get OTP | ओटीपी प्राप्त करें</span>
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Enter OTP | ओटीपी दर्ज करें</h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sent to +91 {phoneNumber}
                  <button
                    onClick={() => setStep("phone")}
                    className={`ml-2 underline ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}
                  >
                    Change
                  </button>
                </p>

                {/* OTP Input Slots */}
                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-2xl focus:outline-none transition-all ${darkMode
                          ? 'bg-gray-700 border-gray-600 focus:border-green-400 text-gray-100'
                          : 'border-gray-200 focus:border-[#2D5A27]'
                        }`}
                      maxLength={1}
                      required
                    />
                  ))}
                </div>

                {isVerifying && (
                  <div className={`flex items-center justify-center gap-2 mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">Verifying...</span>
                  </div>
                )}

                <button
                  onClick={() => handleOtpSubmit(otp)}
                  disabled={otp.some((digit) => !digit) || isVerifying}
                  className="w-full bg-gradient-to-r from-[#FDB931] to-[#BFA34B] text-white py-4 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Login | सत्यापित करें और लॉगिन करें
                </button>

                <button
                  onClick={() => {
                    // Resend OTP logic
                    setOtp(["", "", "", ""]);
                  }}
                  className={`w-full mt-3 text-sm font-medium hover:underline ${darkMode ? 'text-green-400' : 'text-[#2D5A27]'}`}
                >
                  Resend OTP | ओटीपी पुनः भेजें
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mt-4 rounded-2xl p-4 flex items-start gap-3 ${darkMode ? 'bg-red-900/50 border border-red-700' : 'bg-red-50 border border-red-200'
            }`}>
            <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            <div className="flex-1">
              <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{error}</p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className={`backdrop-blur-sm rounded-2xl p-4 text-center ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
            <div className="text-2xl mb-1">🔒</div>
            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Secure Login</p>
          </div>
          <div className={`backdrop-blur-sm rounded-2xl p-4 text-center ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
            <div className="text-2xl mb-1">🗣️</div>
            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Voice-First</p>
          </div>
          <div className={`backdrop-blur-sm rounded-2xl p-4 text-center ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
            <div className="text-2xl mb-1">📱</div>
            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No Hardware</p>
          </div>
        </div>

        {/* Footer */}
        <p className={`text-center text-xs mt-6 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}