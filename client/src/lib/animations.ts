import { Variants } from "framer-motion";

// Fade up animation
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Fade right animation
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

// Fade left animation
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Scale up animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Skill bar animation
export const skillBarAnim = (percent: number): Variants => ({
  hidden: { width: 0 },
  visible: { 
    width: `${percent}%`,
    transition: { duration: 1, ease: "easeOut" }
  }
});

// Circular progress animation
export const circleAnimation = (percent: number): Variants => {
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  return {
    hidden: { strokeDashoffset: circumference },
    visible: { 
      strokeDashoffset: circumference - (circumference * percent / 100),
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };
};
