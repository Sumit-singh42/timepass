import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  Camera, 
  Mic, 
  MapPin, 
  Footprints, 
  BarChart3, 
  Bell,
  Smartphone,
  CheckCircle2
} from "lucide-react";

interface InstructionSlide {
  id: number;
  type: 'image' | 'instruction';
  image?: string;
  icon?: React.ReactNode;
  title?: string;
  titleHindi?: string;
  description?: string;
  descriptionHindi?: string;
  bgColor?: string;
}

interface InstructionCarouselProps {
  heroImage: string;
}

export default function InstructionCarousel({ heroImage }: InstructionCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const instructionSlides: InstructionSlide[] = [
    {
      id: 1,
      type: 'image',
      image: heroImage
    },
    {
      id: 2,
      type: 'instruction',
      icon: <Camera size={80} className="text-[#2D5A27]" />,
      title: "Step 1: Grant Camera Permission",
      titleHindi: "चरण 1: कैमरा अनुमति दें",
      description: "Allow camera access for Muzzle-ID scanning and gait analysis",
      descriptionHindi: "मुजल-ID स्कैनिं और चाल विश्लेषण के लिए कैमरा एक्सेस की अनुमति दें",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      id: 3,
      type: 'instruction',
      icon: <Mic size={80} className="text-[#2D5A27]" />,
      title: "Step 2: Enable Microphone",
      titleHindi: "चरण 2: माइक्रोफोन सक्षम करें",
      description: "Allow microphone for acoustic AI and voice commands (Bhashini)",
      descriptionHindi: "ध्वनिक AI और आवाज आदेशों के लिए माइक्रोफ़ोन की अनुमति दें",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
    },
    {
      id: 4,
      type: 'instruction',
      icon: <MapPin size={80} className="text-[#2D5A27]" />,
      title: "Step 3: Location Access (Optional)",
      titleHindi: "चरण 3: स्थान पहुंच (वैकल्पिक)",
      description: "Enable location for regional disease alerts and farm mapping",
      descriptionHindi: "क्षेत्रीय रोग अलर्ट और फार्म मैपिंग के लिए स्थान सक्षम करें",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50"
    },
    {
      id: 5,
      type: 'instruction',
      icon: <Camera size={80} className="text-[#BFA34B]" />,
      title: "Scan Muzzle for 99.7% Accurate ID",
      titleHindi: "99.7% सटीक ID के लिए मुजल स्कैन करें",
      description: "Point camera at cow's muzzle for biometric fingerprint scanning",
      descriptionHindi: "बायोमेट्रिक फिंगरप्रिंट स्कैनिंग के लिए गाय के मुजल पर कैमरा करें",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50"
    },
    {
      id: 6,
      type: 'instruction',
      icon: <Footprints size={80} className="text-[#BFA34B]" />,
      title: "Gait Analysis with Spatial AI",
      titleHindi: "स्पेशल AI के साथ चाल विश्लेषण",
      description: "Record 10-second video of cow walking for lameness detection",
      descriptionHindi: "लंगड़ापन पता लगाने के लिए गाय की चाल का 10 सेकंड का वीडियो रिकॉर्ड करें",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50"
    },
    {
      id: 7,
      type: 'instruction',
      icon: <Mic size={80} className="text-[#BFA34B]" />,
      title: "Listen to Cow Vocalizations",
      titleHindi: "गाय की आवाज़ सुनें",
      description: "Record audio for acoustic AI analysis of health indicators",
      descriptionHindi: "स्वास्थ्य संकेतकों के ध्वनिक AI विश्लेषण के लिए ऑडियो रिकॉर्ड करें",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      id: 8,
      type: 'instruction',
      icon: <BarChart3 size={80} className="text-[#2D5A27]" />,
      title: "View Health Reports & Trends",
      titleHindi: "स्वास्थ्य रिपोर्ट और रुझान देखें",
      description: "Track vital signs, milk production, and disease predictions",
      descriptionHindi: "महत्वपूर्ण संकेत, दूध उत्पादन और रोग पूर्वानुमान ट्रैक करें",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50"
    },
    {
      id: 9,
      type: 'instruction',
      icon: <Bell size={80} className="text-[#BFA34B]" />,
      title: "48-Hour Early Disease Detection",
      titleHindi: "48 घंटे पहले रोग का पता लगाना",
      description: "Get instant alerts for health anomalies and treatment suggestions",
      descriptionHindi: "स्वास्थ्य विसंगतियों और उपचार सुझावों के लिए तुरंत अलर्ट प्राप्त करें",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50"
    },
    {
      id: 10,
      type: 'instruction',
      icon: <CheckCircle2 size={80} className="text-[#2D5A27]" />,
      title: "You're All Set!",
      titleHindi: "आप तैयार हैं!",
      description: "Start monitoring your cattle's health with PRANA-G AI",
      descriptionHindi: "प्राण-G AI के साथ अपने मवेशियों के स्वास्थ्य की निगरानी शुरू करें",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <div 
        style={{ 
          position: 'absolute',
          bottom: currentSlide === 0 ? '20px' : '15px',
          left: 0,
          right: 0
        }}
      >
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide 
            ? "bg-[#2D5A27] w-6" 
            : "bg-white border border-gray-300 hover:bg-gray-200"
        }`}
        style={{
          boxShadow: i === currentSlide ? '0 2px 8px rgba(45, 90, 39, 0.4)' : '0 1px 3px rgba(0,0,0,0.2)'
        }}
      />
    )
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {instructionSlides.map((slide) => (
          <div key={slide.id} className="outline-none">
            {slide.type === 'image' ? (
              // Hero Image Slide - Simple, no overlaid buttons
              <div className="relative">
                <img 
                  src={slide.image} 
                  alt="PRANA-G AI Hero" 
                  className="w-full h-auto"
                />
              </div>
            ) : (
              // Instruction Slide
              <div className={`${slide.bgColor} rounded-t-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center transition-all duration-500`}>
                {/* Step Number */}
                <div className="mb-4 text-sm font-medium text-[#2D5A27] bg-white/80 px-4 py-1 rounded-full">
                  चरण {slide.id - 1} | Step {slide.id - 1}
                </div>
                
                {/* Icon */}
                <div className="mb-6 transform transition-transform duration-500 hover:scale-110">
                  {slide.icon}
                </div>

                {/* Title - English */}
                <h2 className="text-2xl font-bold text-[#2D5A27] mb-2 px-4">
                  {slide.title}
                </h2>

                {/* Title - Hindi */}
                <h3 className="text-xl font-semibold text-[#2D5A27]/80 mb-4 px-4">
                  {slide.titleHindi}
                </h3>

                {/* Description - English */}
                <p className="text-base text-gray-700 mb-2 px-6 max-w-md">
                  {slide.description}
                </p>

                {/* Description - Hindi */}
                <p className="text-sm text-gray-600 px-6 max-w-md">
                  {slide.descriptionHindi}
                </p>

                {/* Progress Indicator */}
                <div className="mt-6 text-xs text-gray-500">
                  {slide.id} / {instructionSlides.length}
                </div>
              </div>
            )}
          </div>
        ))}
      </Slider>

      {/* Swipe Hint */}
      {currentSlide === 0 && (
        <div className="text-center py-3 text-xs text-gray-500 animate-pulse bg-white">
          ← स्वाइप करें | Swipe to see instructions →
        </div>
      )}
    </div>
  );
}