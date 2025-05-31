import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/githubService";

// Images for projects based on tech
const projectImages = {
  JavaScript: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  TypeScript: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  React: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  HTML: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
  CSS: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  Python: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  Java: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  default: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
};

// Format project category based on language
const formatCategory = (language: string | null): "react" | "javascript" | "other" => {
  if (!language) return "other";
  if (language.toLowerCase().includes("react")) return "react";
  if (language.toLowerCase() === "javascript" || language.toLowerCase() === "typescript") return "javascript";
  return "other";
};

// Extract topics or create technologies from language
const extractTechnologies = (repo: GitHubRepo): string[] => {
  if (repo.topics && repo.topics.length > 0) {
    return repo.topics.slice(0, 3).map(topic => 
      topic.charAt(0).toUpperCase() + topic.slice(1)
    );
  }
  
  // If no topics, create from language
  const techs: string[] = [];
  if (repo.language) techs.push(repo.language);
  
  // Add some related technologies based on language
  if (repo.language === "JavaScript") {
    techs.push("Web Development");
  } else if (repo.language === "TypeScript") {
    techs.push("TypeScript");
  } else if (repo.language === "HTML") {
    techs.push("CSS", "Frontend");
  } else if (repo.language === "Python") {
    techs.push("Programming");
  }
  
  return techs.slice(0, 3);
};

// Get appropriate image for a project
const getProjectImage = (repo: GitHubRepo): string => {
  if (repo.language && projectImages[repo.language as keyof typeof projectImages]) {
    return projectImages[repo.language as keyof typeof projectImages];
  }
  return projectImages.default;
};

export default function Projects() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubRepos();
        
        // Filter out forked repos and those without descriptions
        const filteredRepos = data
          .filter(repo => !repo.name.includes("github.io")) // Exclude personal website repo
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 6); // Get up to 6 most recently updated repos
        
        setRepos(filteredRepos);
        setError(null);
      } catch (err) {
        console.error("Error fetching GitHub repos for projects:", err);
        setError("Failed to load project data. Using fallback projects.");
        
        // Set fallback projects
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadRepos();
  }, []);

  // Transform GitHub repos into projects format
  const projects = repos.map((repo, index) => ({
    id: repo.id,
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    description: repo.description || `A project built by Faisal Ahammad.`,
    image: getProjectImage(repo),
    category: formatCategory(repo.language),
    technologies: extractTechnologies(repo),
    liveDemo: repo.homepage || repo.html_url,
    repository: repo.html_url
  }));

  // Fallback projects if no GitHub data is available
  const fallbackProjects = [
    {
      id: 1,
      title: "Modern Portfolio Website",
      description: "A responsive portfolio website using React and Tailwind CSS with dark mode and animation effects.",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "react",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      liveDemo: "https://github.com/heyahammad",
      repository: "https://github.com/heyahammad"
    },
    {
      id: 2,
      title: "JavaScript Calculator",
      description: "A fully functional calculator with complex operation support built with vanilla JavaScript.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "javascript",
      technologies: ["JavaScript", "HTML/CSS", "DOM Manipulation"],
      liveDemo: "https://github.com/heyahammad",
      repository: "https://github.com/heyahammad"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather application with forecast and location tracking using OpenWeather API.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "react",
      technologies: ["React", "Weather API", "Geolocation"],
      liveDemo: "https://github.com/heyahammad",
      repository: "https://github.com/heyahammad"
    }
  ];

  // Choose which projects to display
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  const filters = [
    { id: "all", name: "All Projects" },
    { id: "react", name: "React" },
    { id: "javascript", name: "JavaScript" },
    { id: "other", name: "Other" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? displayProjects 
    : displayProjects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="py-20 bg-[#0a1631] relative overflow-hidden">
      {/* Background gradient blur effects */}
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-white">My <span className="text-primary">Projects</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 flex flex-wrap justify-center gap-4"
            >
              {filters.map((filter) => (
                <motion.button 
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 ${activeFilter === filter.id 
                    ? 'bg-primary text-white' 
                    : 'bg-[#0f1631]/70 text-white hover:bg-primary/80'} 
                    rounded-lg transition-colors backdrop-blur-sm border border-[#1e2a45]`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.name}
                </motion.button>
              ))}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="project-card bg-[#0f1631]/70 backdrop-blur-sm rounded-lg overflow-hidden border border-[#1e2a45] shadow-lg"
                    whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
                  >
                    <div className="project-image h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] to-transparent opacity-50 z-10"></div>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 font-poppins text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs border border-primary/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between">
                        <a 
                          href={project.liveDemo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:text-white transition-colors flex items-center gap-2"
                        >
                          <i className="fas fa-link"></i> Demo
                        </a>
                        <a 
                          href={project.repository} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:text-white transition-colors flex items-center gap-2"
                        >
                          <i className="fab fa-github"></i> Repository
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-12"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/heyahammad" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-6 py-3 bg-[#0f1631]/70 hover:bg-primary text-white font-medium rounded-lg transition-colors backdrop-blur-sm border border-[#1e2a45]"
              >
                <i className="fab fa-github mr-2"></i> More Projects on GitHub
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
