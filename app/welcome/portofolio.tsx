import { useState, useEffect, useRef } from 'react';
import { Code, Database, Server, Globe, ChevronDown, Menu, X, Zap, Heart } from 'lucide-react';
import About from './about';
import Skills from './skills';
import Projects from './projects';
import Experience from './experience';
import Contact from './contact';
import Footer from './footer';

function Portofolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState<any>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef(null);

  const words = ['Full-Stack Developer', 'Problem Solver', 'Code Enthusiast', 'Tech Innovator'];
  const currentWord = words[currentWordIndex];

  // Typing animation effect
  useEffect(() => {
    let timeout;
    if (typedText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [typedText, currentWord, currentWordIndex]);

  // Particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev: any) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));

          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };


  const FloatingIcon = ({ icon, className, delay = 0 }: any) => (
    <div
      className={`absolute animate-pulse ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {icon}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div
        className="fixed pointer-events-none z-50 w-4 h-4 bg-blue-500 rounded-full opacity-50 transition-all duration-100"
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
              Portfolio
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 ${activeSection === item
                      ? 'text-blue-400 bg-gray-800 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2 transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="capitalize block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left transition-all duration-300 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

        {/* Floating Icons */}
        <FloatingIcon icon={<Code className="text-blue-400" size={32} />} className="top-20 left-10" delay={0} />
        <FloatingIcon icon={<Database className="text-green-400" size={28} />} className="top-40 right-20" delay={1} />
        <FloatingIcon icon={<Server className="text-purple-400" size={30} />} className="bottom-40 left-20" delay={2} />
        <FloatingIcon icon={<Globe className="text-pink-400" size={26} />} className="bottom-20 right-10" delay={0.5} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className={`transform transition-all duration-1000 ${isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hi, I'm a
              </h1>
              <div className="text-4xl md:text-6xl font-bold text-white h-20 flex items-center justify-center">
                <span className="animate-pulse">{typedText}</span>
                <span className="animate-blink text-blue-400">|</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up">
              Creating innovative solutions with modern technologies 🚀 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-subtle"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce-subtle"
                style={{ animationDelay: '0.2s' }}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50 relative">
        <About isVisible={isVisible.about} />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <Skills isVisible={isVisible.skills} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800/50 relative">
        <Projects isVisible={isVisible.projects} />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <Experience isVisible={isVisible.experience} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800/50 relative">
        <Contact isVisible={isVisible.contact} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <Footer />
      </footer>

      {/* Custom Styles */}
      <style >{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Portofolio;