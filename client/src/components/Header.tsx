import { useState, useEffect } from "react";
// useLocation from 'wouter' is imported, but setLocation is not used, so it's removed to clean up.
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming this hook correctly determines mobile/tablet status

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  // isMobile and isTablet are used from the custom hook to manage responsive behavior.
  const { isMobile, isTablet } = useIsMobile();

  /**
   * Toggles the mobile menu open/closed state.
   * Also controls body overflow to prevent scrolling when the menu is open.
   */
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling on the body when the mobile menu is active
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  /**
   * useEffect hook to handle scroll events for header styling and active section highlighting.
   */
  useEffect(() => {
    const handleScroll = () => {
      // Select all section elements that have an 'id' attribute
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      // Determine if the page has scrolled past a certain threshold to apply header styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Iterate through sections to determine which one is currently in view
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;
        
        // If the current scroll position is within the section's bounds (with an offset)
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
          current = sectionElement.getAttribute('id') || '';
        }
      });
      
      // Update the active section state if a current section is found
      if (current) {
        setActiveSection(current);
      }
    };
    
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Ensure body overflow is reset to 'auto' when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  /**
   * useEffect hook to handle the ESC key press to close the mobile menu.
   */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto'; // Reset body overflow
      }
    };
    
    // Add keydown event listener
    window.addEventListener('keydown', handleEsc);
    // Clean up the event listener
    return () => window.removeEventListener('keydown', handleEsc);
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  /**
   * Handles navigation link clicks.
   * Sets the active section and closes the mobile menu if it's open.
   * @param {string} sectionId - The ID of the section to navigate to.
   */
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false); // Close mobile menu on navigation
    document.body.style.overflow = 'auto'; // Reset body overflow
  };

  // Array defining navigation items with their IDs, labels, and Font Awesome icons
  const navItems = [
    { id: "home", label: "Home", icon: "fas fa-home" },
    { id: "about", label: "About", icon: "fas fa-user" },
    { id: "skills", label: "Skills", icon: "fas fa-code" },
    { id: "education", label: "Education", icon: "fas fa-graduation-cap" },
    { id: "projects", label: "Projects", icon: "fas fa-briefcase" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope" }
  ];

  /**
   * useEffect hook to close the mobile menu automatically when the screen size
   * changes from mobile/tablet to desktop.
   */
  useEffect(() => {
    // If not on mobile/tablet and the mobile menu is currently open, close it
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = 'auto'; // Reset body overflow
    }
  }, [isMobile, mobileMenuOpen]); // Dependencies: re-run when isMobile or mobileMenuOpen changes

  // Framer Motion variants for the mobile menu animation (slide in/out)
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%", // Starts off-screen to the right
      transition: {
        type: "tween",
        duration: 0.35,
        ease: "easeInOut",
        when: "afterChildren", // Animate children after parent closes
        staggerChildren: 0.05,
        staggerDirection: -1 // Stagger children in reverse order on close
      }
    },
    open: {
      opacity: 1,
      x: "-2%", // Slides into view
      transition: {
        type: "tween",
        duration: 0.45,
        ease: "easeInOut",
        when: "beforeChildren", // Animate children before parent opens
        staggerChildren: 0.1,
        delayChildren: 0.1 // Delay children animation slightly
      }
    }
  };

  // Framer Motion variants for individual menu items (fade in/slide in)
  const itemVariants = {
    closed: { opacity: 0, x: 20 }, // Starts invisible and slightly to the right
    open: { opacity: 1, x: 0 } // Fades in and slides to its final position
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a1128]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo/Home link */}
          <a 
            href="#home" 
            className="text-2xl font-bold font-poppins"
            onClick={() => handleNavClick("home")}
          >
            <span className="text-primary">F</span>
            <span className="text-white">aisal</span>
             <span className=" text-primary">.</span>
          </a>
          
          {/* Desktop Navigation - Hidden on mobile, flex on medium screens and up */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="nav-link text-gray-200 hover:text-primary transition-colors relative text-sm font-medium"
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
                {/* Active section indicator for desktop navigation */}
                {activeSection === item.id && (
                  <motion.div 
                    className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary"
                    layoutId="activeSection" // For Framer Motion shared layout animation
                  />
                )}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button - Visible on mobile, hidden on medium screens and up */}
          <button 
            className="md:hidden text-white hover:text-primary focus:outline-none right-5 z-50 relative"
            onClick={toggleMenu}
            aria-label="Toggle menu" // Accessibility label
          >
            {/* Animated icon for mobile menu toggle */}
            {mobileMenuOpen ? (
              <motion.i 
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="fas fa-times text-2xl" // 'X' icon when menu is open
              />
            ) : (
              <motion.i 
                className="fas fa-bars text-xl" // Hamburger icon when menu is closed
              />
            )}
          </button>
        </nav>
      </div>
      
      {/* Full Screen Mobile Menu - Animates in/out using AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#0a1128] flex flex-col pt-20 z-40 md:hidden"
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
                          ? 'text-primary border-primary/30 bg-primary/10' // Active link styling
                          : 'text-gray-300 hover:text-primary hover:bg-[#1e2a45]/30 hover:border-[#1e2a45]' // Inactive link styling
                        }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <i className={`${item.icon} w-8 text-center`}></i>
                      <span className="ml-4">{item.label}</span>
                      {/* Active section indicator for mobile navigation */}
                      {activeSection === item.id && (
                        <motion.div 
                          className="ml-auto"
                          layoutId="activeMobileIndicator" // For Framer Motion shared layout animation
                        >
                          <i className="fas fa-chevron-right text-primary"></i>
                        </motion.div>
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>
              
              {/* Social icons for mobile menu */}
              <motion.div 
                variants={itemVariants}
                className="mt-16 flex justify-center"
              >
                <div className="flex space-x-6">
                  <a 
                    href="[https://github.com/heyahammad](https://github.com/heyahammad)" // Corrected GitHub URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors text-xl"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a 
                    href="https://llinkedin.com/heyahammad" 
                    onClick={() => handleNavClick("contact")}
                    className="text-gray-400 hover:text-primary transition-colors text-xl"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a 
                    href="mailto:heyahammad.rox@gmail.com" 
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
