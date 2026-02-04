import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Camera as CameraIcon, Mic, Activity, ScanLine, X, Circle, Volume2 } from "lucide-react";

type CameraMode = "muzzle" | "spatial" | "audio" | "general";

export default function Camera() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<CameraMode>(
    (searchParams.get("mode") as CameraMode) || "general"
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            // Navigate to results
            setTimeout(() => {
              navigate("/history");
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isScanning, navigate]);

  useEffect(() => {
    // Simulate audio levels for audio mode
    if (mode === "audio" && isScanning) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [mode, isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  const getModeInfo = () => {
    switch (mode) {
      case "muzzle":
        return {
          title: "Muzzle-ID Scan",
          description: "Align the cow's nose within the circular frame for biometric identification",
          icon: ScanLine,
          color: "from-blue-500 to-blue-600",
        };
      case "spatial":
        return {
          title: "Spatial AI Analysis",
          description: "Capture video to analyze gait, posture, and detect lameness",
          icon: Activity,
          color: "from-purple-500 to-purple-600",
        };
      case "audio":
        return {
          title: "Acoustic AI Listening",
          description: "Record bovine vocalizations for health analysis",
          icon: Mic,
          color: "from-green-500 to-green-600",
        };
      default:
        return {
          title: "Quick Health Check",
          description: "60-second comprehensive scan",
          icon: CameraIcon,
          color: "from-[#FDB931] to-[#BFA34B]",
        };
    }
  };

  const modeInfo = getModeInfo();
  const Icon = modeInfo.icon;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-white p-2 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm"
          >
            <X size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-white font-semibold">{modeInfo.title}</h2>
            <p className="text-white/80 text-xs">{modeInfo.description}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Camera View */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Simulated Camera Feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-6xl">📹</div>
          </div>
        </div>

        {/* Overlay based on mode */}
        {mode === "muzzle" && (
          <div className="relative z-10">
            <div className="relative">
              {/* Circular Frame */}
              <div className="w-72 h-72 rounded-full border-4 border-dashed border-blue-400 flex items-center justify-center animate-pulse">
                <div className="w-64 h-64 rounded-full border-2 border-blue-300"></div>
              </div>
              {/* Corner Markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-400"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-400"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-400"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-400"></div>
            </div>
            <p className="text-white text-center mt-6">Position cow's nose in the frame</p>
          </div>
        )}

        {mode === "spatial" && (
          <div className="relative z-10 w-full max-w-lg px-6">
            {/* Skeletal Mesh Overlay */}
            <div className="bg-purple-500/20 border-2 border-purple-400 rounded-2xl p-8 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Simulated skeleton points */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Circle className="text-purple-400" size={12} fill="currentColor" />
                    <div className="flex-1 h-1 bg-purple-400/50 rounded"></div>
                    <Circle className="text-purple-400" size={12} fill="currentColor" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white text-center mt-6">Analyzing posture and gait...</p>
          </div>
        )}

        {mode === "audio" && (
          <div className="relative z-10 w-full max-w-lg px-6">
            {/* Audio Waveform */}
            <div className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-end justify-center gap-2 h-40">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-green-400 rounded-t-lg transition-all duration-100"
                    style={{
                      height: isScanning
                        ? `${Math.random() * 100}%`
                        : "10%",
                      opacity: isScanning ? 1 : 0.3,
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Volume2 className="text-green-400" size={20} />
                <div className="text-white text-sm">
                  {isScanning ? "Listening..." : "Tap to start recording"}
                </div>
              </div>
            </div>
            <p className="text-white text-center mt-6">AI analyzing bovine vocalizations</p>
          </div>
        )}

        {mode === "general" && (
          <div className="relative z-10">
            <div className="w-80 h-80 border-4 border-dashed border-yellow-400 rounded-3xl flex items-center justify-center animate-pulse">
              <Icon size={64} className="text-yellow-400" />
            </div>
            <p className="text-white text-center mt-6">Position camera toward the cow</p>
          </div>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <div className="absolute bottom-32 left-0 right-0 px-6">
            <div className="max-w-lg mx-auto">
              <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm">Analyzing...</span>
                  <span className="text-white text-sm font-bold">{scanProgress}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${modeInfo.color} transition-all duration-200`}
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className="mt-3 text-white/70 text-xs text-center">
                  {scanProgress < 30 && "Capturing biometric data..."}
                  {scanProgress >= 30 && scanProgress < 60 && "Processing AI models..."}
                  {scanProgress >= 60 && scanProgress < 90 && "Analyzing health indicators..."}
                  {scanProgress >= 90 && "Generating report..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 pb-24 z-20">
          <div className="max-w-lg mx-auto px-6">
            {/* Mode Selector */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setMode("muzzle")}
                className={`px-4 py-2 rounded-full text-xs transition-all ${
                  mode === "muzzle"
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                Muzzle-ID
              </button>
              <button
                onClick={() => setMode("spatial")}
                className={`px-4 py-2 rounded-full text-xs transition-all ${
                  mode === "spatial"
                    ? "bg-purple-500 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                Spatial AI
              </button>
              <button
                onClick={() => setMode("audio")}
                className={`px-4 py-2 rounded-full text-xs transition-all ${
                  mode === "audio"
                    ? "bg-green-500 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                Acoustic
              </button>
            </div>

            {/* Capture Button */}
            <div className="flex justify-center">
              <button
                onClick={startScan}
                disabled={isScanning}
                className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                  isScanning
                    ? "bg-red-500 animate-pulse"
                    : "bg-white/30 backdrop-blur-sm hover:bg-white/50"
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${modeInfo.color}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}