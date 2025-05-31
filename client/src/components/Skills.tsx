import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Skills() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const technicalSkills = [
    { name: "React", percent: 85 },
    { name: "JavaScript", percent: 90 },
    { name: "CSS/HTML", percent: 95 },
    { name: "Java", percent: 80 },
    { name: "C Programming", percent: 85 },
    { name: "Git", percent: 75 }
  ];

  const professionalSkills = [
    { name: "Problem Solving", percent: 90 },
    { name: "Teamwork", percent: 85 },
    { name: "Communication", percent: 80 },
    { name: "Dedication", percent: 95 }
  ];

  const currentlyLearning = ["AI", "Machine Learning", "Next.js", "TypeScript"];

  return (
    <section id="skills" ref={ref} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2">My <span className="text-primary">Skills</span></h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-poppins">Technical Skills</h3>
            
            {technicalSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percent}%</span>
                </div>
                <div className="skill-bar bg-dark-secondary rounded-lg h-2 w-full overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-lg"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.percent}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 font-poppins">Professional Skills</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {professionalSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-dark-secondary rounded-lg p-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
                    <circle cx="50" cy="50" r="45" fill="transparent" strokeWidth="10" stroke="#1E293B" className="opacity-25" />
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="transparent" 
                      strokeWidth="10" 
                      stroke="#4F46E5" 
                      strokeDasharray="282.74" 
                      initial={{ strokeDashoffset: 282.74 }}
                      animate={inView ? { 
                        strokeDashoffset: 282.74 - (282.74 * skill.percent / 100) 
                      } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      className="transform -rotate-90 origin-center"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{skill.percent}%</span>
                    <span className="text-sm mt-1">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4 font-poppins">Currently Learning</h3>
              <div className="flex flex-wrap gap-3">
                {currentlyLearning.map((skill, index) => (
                  <motion.span 
                    key={index}
                    className="px-4 py-2 bg-dark-secondary rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.2)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
