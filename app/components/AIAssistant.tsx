import { useState, useEffect } from "react";
import { Mic, MicOff, X, Volume2, Send } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Speech recognition available
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();
    
    let responseText = "";
    let action: (() => void) | null = null;

    // Command processing
    if (lowerCommand.includes("scan") || lowerCommand.includes("camera") || lowerCommand.includes("check")) {
      responseText = "Opening camera to scan your cattle...";
      action = () => navigate("/camera");
    } else if (lowerCommand.includes("my cattle") || lowerCommand.includes("show cattle") || lowerCommand.includes("cattle list")) {
      responseText = "Showing your cattle registry...";
      action = () => navigate("/cattle");
    } else if (lowerCommand.includes("history") || lowerCommand.includes("reports") || lowerCommand.includes("health record")) {
      responseText = "Opening health history and reports...";
      action = () => navigate("/history");
    } else if (lowerCommand.includes("alert") || lowerCommand.includes("notification")) {
      responseText = "Opening alerts and notifications...";
      action = () => navigate("/alerts");
    } else if (lowerCommand.includes("profile") || lowerCommand.includes("settings")) {
      responseText = "Opening your profile settings...";
      action = () => navigate("/settings");
    } else if (lowerCommand.includes("home") || lowerCommand.includes("back")) {
      responseText = "Going back to home...";
      action = () => navigate("/");
    } else if (lowerCommand.includes("help") || lowerCommand.includes("मदद")) {
      responseText = "You can say commands like: 'Scan cow', 'Show my cattle', 'Open history', 'Check alerts', or 'Go to profile'.";
    } else {
      responseText = "मैं नहीं समझा। Please try commands like 'Scan cow' or 'Show my cattle'.";
    }

    setResponse(responseText);
    
    // Speak response
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setIsProcessing(false);
      if (action) {
        setTimeout(() => {
          action();
          setIsOpen(false);
          setTranscript("");
          setResponse("");
        }, 1000);
      }
    }, 500);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'hi-IN,en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
        setResponse("");
      };

      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        setTranscript(command);
        setIsListening(false);
        handleVoiceCommand(command);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Voice recognition not supported on this browser. Please use Chrome or Edge.");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if ('webkitSpeechRecognition' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleTextCommand = () => {
    if (transcript.trim()) {
      handleVoiceCommand(transcript);
    }
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-6 z-[60] w-16 h-16 bg-gradient-to-r from-[#BFA34B] to-[#8E7932] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center group"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <Mic size={28} />
            </motion.div>
            
            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#BFA34B] opacity-75 animate-ping"></span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              PRANA AI Assistant
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-end sm:items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#2D5A27] to-[#3d7a35] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Volume2 size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">PRANA AI Assistant</h3>
                    <p className="text-green-200 text-xs">Voice-First Control | आवाज से नियंत्रण</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    stopListening();
                    setTranscript("");
                    setResponse("");
                  }}
                  className="text-white/80 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Voice Button */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    disabled={isProcessing}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-gradient-to-r from-[#BFA34B] to-[#8E7932] hover:shadow-xl"
                    } disabled:opacity-50`}
                  >
                    {isListening ? (
                      <MicOff size={36} className="text-white" />
                    ) : (
                      <Mic size={36} className="text-white" />
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-600 text-center">
                    {isListening
                      ? "🎙️ Listening... Speak now"
                      : isProcessing
                      ? "⚙️ Processing your command..."
                      : "Tap to speak your command"}
                  </p>
                </div>

                {/* Transcript */}
                {transcript && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <p className="text-xs text-blue-600 mb-1">You said:</p>
                    <p className="text-sm text-gray-900">{transcript}</p>
                  </div>
                )}

                {/* Response */}
                {response && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <p className="text-xs text-green-600 mb-1">PRANA AI:</p>
                    <p className="text-sm text-gray-900">{response}</p>
                  </div>
                )}

                {/* Text Input Alternative */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-600 mb-2">Or type your command:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleTextCommand()}
                      placeholder="e.g., 'Scan cow' or 'Show my cattle'"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:border-[#2D5A27] focus:outline-none"
                      disabled={isProcessing}
                    />
                    <button
                      onClick={handleTextCommand}
                      disabled={!transcript.trim() || isProcessing}
                      className="bg-[#2D5A27] text-white p-2 rounded-xl hover:bg-[#3d7a35] disabled:opacity-50 transition-all"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>

                {/* Quick Commands */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-600 mb-2">Quick Commands:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Scan cow",
                      "My cattle",
                      "History",
                      "Alerts",
                      "Profile"
                    ].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => {
                          setTranscript(cmd);
                          handleVoiceCommand(cmd);
                        }}
                        disabled={isProcessing}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-all disabled:opacity-50"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}