import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary/80 hover:bg-primary/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 backdrop-blur-sm border border-primary/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ y: -5, boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up text-lg"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
