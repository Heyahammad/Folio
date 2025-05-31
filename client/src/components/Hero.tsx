import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Hero() {
  const { isMobile, isTablet } = useIsMobile();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-20 md:pb-10 bg-[#060D21] overflow-hidden">
      {/* Background gradient blur effects */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-indigo-600/20 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins mb-2 md:mb-4 text-white">
              <span className="text-primary">Faisal</span>
              <motion.span
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="inline-block ml-2"
              >
                🗿
              </motion.span>
            </h1>

            <div className="relative h-14 md:h-16 mb-4 md:mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-gray-300 absolute left-0 right-0 md:right-auto"
              >
                React Developer
              </motion.h2>
            </div>

            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 mx-auto md:mx-0 max-w-md md:max-w-lg">
              A passionate developer with expertise in React and a strong academic background. Currently studying Computer Science at University of Liberal Arts Bangladesh.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="w-full sm:w-auto px-6 md:px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i> Contact Me
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="w-full sm:w-auto px-6 md:px-8 py-3 border-2 border-primary text-white hover:bg-primary/10 font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <i className="fas fa-code mr-2"></i> View Work
              </motion.a>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-6 mt-8">
              <motion.a
                whileHover={{ y: -3 }}
                href="https://github.com/heyahammad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <i className="fab fa-github"></i>
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="https://linkedin.com/heyahammad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="https://instagram.com/ahammad.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="mailto:heyahammad.rox@gmail.com"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <i className="fas fa-envelope"></i>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: isMobile ? -30 : 0, x: isMobile ? 0 : 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full md:w-2/5 relative mb-8 md:mb-0"
          >
            <div className="relative">
              {/* Circle background for profile image */}
              <div className="w-66 h-46 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-lg bg-gradient-to-r from-primary/30 to-indigo-600/30 p-[2px]">
                <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/20 backdrop-blur-sm">
                  <img
                    src="/images/dp4.png"
                    alt="Faisal Ahammad"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Developer function card - hidden on very small screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute top-0 -right-4 sm:right-0 md:-right-4 bg-[#0f1631]/70 backdrop-blur-md border border-[#1e2a45] rounded-lg p-3 shadow-lg hidden sm:block"
              >
                <div className="text-xs md:text-sm font-mono">
                  <span className="text-gray-400">function</span> <span className="text-primary">developer</span><span className="text-white">()</span> <span className="text-gray-400">{"{"}</span><br />
                  &nbsp;&nbsp;<span className="text-gray-400">return</span> <span className="text-green-400">'React Developer'</span><span className="text-gray-400">;</span><br />
                  <span className="text-gray-400">{"}"}</span>
                </div>
              </motion.div>

              {/* Available for hire card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-5 -left-6  sm:left-0 md:-left-0 bg-[#0f1631]/70 backdrop-blur-md border border-[#1e2a45] rounded-lg p-3 shadow-lg"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-400 text-sm md:text-base font-medium">Available for hire</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <i className="fas fa-chevron-down text-primary"></i>
        </motion.div>
      </motion.div>
    </section>
  );
}
