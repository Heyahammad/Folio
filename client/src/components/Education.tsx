import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Education() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  const educations = [
    {
      institution: "University of Liberal Arts Bangladesh",
      degree: "Bachelor of Science in Computer Science and Engineering",
      period: "2020 - Present",
      grade: "CGPA: 3.84",
      year: "3rd Year"
    },
    {
      institution: "Dhaka City College",
      degree: "Higher Secondary Certificate (HSC)",
      period: "2017 - 2019",
      grade: "GPA: 5.00"
    },
    {
      institution: "Rayer Bazar High School",
      degree: "Secondary School Certificate (SSC)",
      period: "2015 - 2017",
      grade: "GPA: 5.00"
    }
  ];

  return (
    <section id="education" ref={ref} className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2">My <span className="text-primary">Education</span></h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {educations.map((education, index) => (
            <motion.div 
              key={index} 
              className="timeline-item relative pl-10 pb-10 last:pb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
            >
              <div className="absolute left-0 top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                <i className="fas fa-graduation-cap text-white"></i>
              </div>
              
              <motion.div 
                className="bg-dark-DEFAULT rounded-lg p-6 shadow-lg"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold font-poppins">{education.institution}</h3>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">{education.period}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-3">{education.degree}</p>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-2"></i>
                    <span className="font-medium">{education.grade}</span>
                  </div>
                  
                  {education.year && (
                    <div className="flex items-center">
                      <i className="fas fa-calendar text-primary mr-2"></i>
                      <span>{education.year}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
