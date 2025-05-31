import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import { 
  fetchGitHubUser, 
  fetchGitHubRepos, 
  GitHubUser, 
  GitHubRepo,
  formatRepoLanguage,
  getLanguageColor
} from "@/lib/githubService";

export default function GitHubStats() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate sample contribution grid data
  const contributionGrid = Array(28).fill(0).map(() => Math.random());

  // Process languages from repos
  const processLanguages = (repos: GitHubRepo[]) => {
    const languageCounts: Record<string, number> = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    
    const totalRepos = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percent: Math.round((count / totalRepos) * 100),
        color: `bg-[${getLanguageColor(name)}]`
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 4);
  };

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch GitHub user and repos data
        const [userData, reposData] = await Promise.all([
          fetchGitHubUser(),
          fetchGitHubRepos()
        ]);
        
        setUser(userData);
        setRepos(reposData);
        setError(null);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError("Failed to load GitHub data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadGitHubData();
  }, []);

  // Get top languages
  const languages = repos.length > 0 ? processLanguages(repos) : [];
  
  // Get recent repos (max 3)
  const recentRepos = repos
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3);

  return (
    <section ref={ref} className="py-20 bg-[#0a1631] relative overflow-hidden">
      {/* Background gradient blur effects */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-white">GitHub <span className="text-primary">Contributions</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading GitHub data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
            <p>{error}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0f1631]/70 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-[#1e2a45]"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
                  <img 
                    src={user?.avatar_url || "https://github.com/identicons/heyahammad.png"} 
                    alt="Faisal Ahammad GitHub" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-poppins text-white">{user?.name || "Faisal Ahammad"}</h3>
                  <a 
                    href={user?.html_url || "https://github.com/heyahammad"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    @{user?.login || "heyahammad"}
                  </a>
                </div>
              </div>
              
              <div className="flex gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-white">{user?.public_repos || 0}</div>
                  <div className="text-gray-400 text-sm">Repositories</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-white">{repos.length}+</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-white">{user?.followers || 0}</div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#0a1128]/50 backdrop-blur-sm rounded-lg p-6 border border-[#1e2a45]"
            >
              <h4 className="text-lg font-bold mb-4 text-white">Contribution Graph</h4>
              <div className="grid grid-cols-7 md:grid-cols-14 gap-2">
                {contributionGrid.map((value, index) => {
                  const opacity = Math.max(0.1, value);
                  
                  return (
                    <motion.div 
                      key={index}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.01 }}
                      className={`aspect-square bg-primary rounded-sm`}
                      style={{ opacity }}
                    />
                  );
                })}
              </div>
            </motion.div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#0a1128]/50 backdrop-blur-sm rounded-lg p-6 border border-[#1e2a45]"
              >
                <h4 className="text-lg font-bold mb-4 text-white">Top Languages</h4>
                {languages.length > 0 ? (
                  <div className="space-y-4">
                    {languages.map((language, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1 text-gray-300">
                          <span>{language.name}</span>
                          <span>{language.percent}%</span>
                        </div>
                        <div className="w-full bg-[#1e2a45] rounded-full h-2.5">
                          <motion.div 
                            className={`h-2.5 rounded-full`}
                            style={{ backgroundColor: getLanguageColor(language.name) }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${language.percent}%` } : {}}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No language data available.</p>
                )}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#0a1128]/50 backdrop-blur-sm rounded-lg p-6 border border-[#1e2a45]"
              >
                <h4 className="text-lg font-bold mb-4 text-white">Recent Repositories</h4>
                {recentRepos.length > 0 ? (
                  <div className="space-y-4">
                    {recentRepos.map((repo, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className={`${index < recentRepos.length - 1 ? 'border-b border-[#1e2a45]' : ''} pb-3`}
                      >
                        <div className="flex justify-between items-center">
                          <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-white hover:text-primary transition-colors"
                          >
                            {repo.name}
                          </a>
                          <span className="text-xs bg-[#1e2a45]/70 px-2 py-1 rounded text-gray-300">
                            {repo.visibility}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {repo.description || "No description available"}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <span className="flex items-center mr-3">
                            <i className="fas fa-star mr-1"></i> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center mr-3">
                            <i className="fas fa-code-branch mr-1"></i> {repo.forks_count}
                          </span>
                          <span className="flex items-center">
                            <i 
                              className="fas fa-circle mr-1 text-xs" 
                              style={{ color: getLanguageColor(repo.language || "None") }}
                            ></i> 
                            {formatRepoLanguage(repo.language)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No repositories available.</p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
