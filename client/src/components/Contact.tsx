import { useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setLoading(false);
    }, 1500);
  };

  const contactItems = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      description: "Feel free to email me",
      link: "mailto:faisal@example.com",
      linkText: "faisal@example.com"
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Location",
      description: "Dhaka, Bangladesh",
      link: "https://maps.google.com",
      linkText: "View on map"
    },
    {
      icon: "fas fa-share-alt",
      title: "Social Profiles",
      description: "Connect with me",
      socialLinks: [
        { icon: "fab fa-github", url: "https://github.com/" },
        { icon: "fab fa-linkedin", url: "https://linkedin.com/in/" },
        { icon: "fab fa-twitter", url: "https://twitter.com/" }
      ]
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2">Get In <span className="text-primary">Touch</span></h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-dark-secondary rounded-lg p-6 shadow-lg flex flex-col items-center md:items-start"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className={`${item.icon} text-2xl text-primary`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2 font-poppins">{item.title}</h3>
              <p className="text-gray-300 mb-2">{item.description}</p>
              
              {item.link && (
                <motion.a 
                  whileHover={{ color: "#EC4899" }}
                  href={item.link} 
                  target={item.link.startsWith("https") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors"
                >
                  {item.linkText}
                </motion.a>
              )}
              
              {item.socialLinks && (
                <div className="flex space-x-4">
                  {item.socialLinks.map((social, idx) => (
                    <motion.a 
                      key={idx}
                      whileHover={{ y: -3, color: "#EC4899" }}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors"
                    >
                      <i className={`${social.icon} text-xl`}></i>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-dark-secondary rounded-lg p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 font-poppins text-center">Send Me a Message</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name" 
                  className="w-full px-4 py-3 bg-dark-DEFAULT border border-dark-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 bg-dark-DEFAULT border border-dark-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject" 
                className="w-full px-4 py-3 bg-dark-DEFAULT border border-dark-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5} 
                placeholder="Enter your message..." 
                className="w-full px-4 py-3 bg-dark-DEFAULT border border-dark-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white resize-none"
                required
              ></textarea>
            </div>
            
            <div className="text-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors inline-flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i> Send Message
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
