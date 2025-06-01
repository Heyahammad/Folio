import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  DiJava,
  DiPython,
  DiJavascript1,
} from "react-icons/di";
import { TbLetterC } from "react-icons/tb";
import {
  SiCplusplus,
  SiTypescript,
  SiNextdotjs,
  SiTensorflow,
  SiOpencv,
} from "react-icons/si";

export default function Skills() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const languages = [
    { name: "Java", icon: <DiJava className="text-orange-600" /> },
    // { name: "C", icon: <TbLetterC className="text-blue-500" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-700" /> },
    { name: "Python", icon: <DiPython className="text-yellow-400" /> },
    { name: "JavaScript", icon: <DiJavascript1 className="text-yellow-500" /> },
  ];

  const currentlyLearning = [
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-[#70ffbe] dark:text-white" /> },
    { name: "AI", icon: <SiTensorflow className="text-orange-400" /> },
    { name: "Machine Learning", icon: <SiTensorflow className="text-red-400" /> },
  ];

  return (
    <section id="skills" ref={ref} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        {/* Languages I Know */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 font-poppins text-center">
            Languages I Know
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                className="bg-dark-secondary rounded-xl p-6 w-full h-full flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="text-5xl mb-2">{lang.icon}</div>
                <span className="text-sm font-medium">{lang.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 font-poppins text-center">
            Currently Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {currentlyLearning.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-dark-secondary rounded-full text-sm font-medium shadow hover:shadow-lg transition"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
