const GITHUB_USERNAME = 'heyahammad';
const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  visibility: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
  }
  
  return response.json();
}

export function formatRepoLanguage(language: string | null): string {
  return language || 'None';
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Ruby: '#701516',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    None: '#cccccc',
    Null: '#cccccc'
  };
  
  return colors[language || 'None'] || '#cccccc';
}