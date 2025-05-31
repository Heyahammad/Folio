import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isMobile, isTablet } = useIsMobile();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      // Check if page is scrolled for header styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
          current = sectionElement.getAttribute('id') || '';
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset overflow when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navItems = [
    { id: "home", label: "Home", icon: "fas fa-home" },
    { id: "about", label: "About", icon: "fas fa-user" },
    { id: "skills", label: "Skills", icon: "fas fa-code" },
    { id: "education", label: "Education", icon: "fas fa-graduation-cap" },
    { id: "projects", label: "Projects", icon: "fas fa-briefcase" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope" }
  ];

  // Close menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  }, [isMobile, mobileMenuOpen]);

  // Variants for animation
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.35,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "tween",
        duration: 0.45,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a1128]/80 backdrop-blur-md shadow-lg border-b border-[#1e2a45]' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <a 
            href="#home" 
            className="text-2xl font-bold font-poppins"
            onClick={() => handleNavClick("home")}
          >
            <span className="text-primary">F</span>
            <span className="text-white">aisal</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="nav-link text-gray-200 hover:text-primary transition-colors relative text-sm font-medium"
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary"
                    layoutId="activeSection"
                  />
                )}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-primary focus:outline-none z-50 relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <motion.i 
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="fas fa-times text-2xl"
              />
            ) : (
              <motion.i 
                className="fas fa-bars text-xl"
              />
            )}
          </button>
        </nav>
      </div>
      
      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#0a1128]/95 backdrop-blur-xl flex flex-col items-center justify-center z-40 md:hidden"
          >
            <div className="w-full max-w-sm mx-auto px-4">
              <div className="flex flex-col items-center space-y-8">
                {navItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <a 
                      href={`#${item.id}`} 
                      className={`flex items-center py-3 px-4 text-xl font-medium transition-all duration-300 rounded-lg border border-transparent
                        ${activeSection === item.id 
                          ? 'text-primary border-primary/30 bg-primary/10' 
                          : 'text-gray-300 hover:text-primary hover:bg-[#1e2a45]/30 hover:border-[#1e2a45]'
                        }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <i className={`${item.icon} w-8 text-center`}></i>
                      <span className="ml-4">{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div 
                          className="ml-auto"
                          layoutId="activeMobileIndicator"
                        >
                          <i className="fas fa-chevron-right text-primary"></i>
                        </motion.div>
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-16 flex justify-center"
              >
                <div className="flex space-x-6">
                  <a 
                    href="https://github.com/heyahammad" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors text-xl"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => handleNavClick("contact")}
                    className="text-gray-400 hover:text-primary transition-colors text-xl"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => handleNavClick("contact")}
                    className="text-gray-400 hover:text-primary transition-colors text-xl"
                  >
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
