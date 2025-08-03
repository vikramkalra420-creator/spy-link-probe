import { LinkedInProfile } from '../types/linkedin';

export const dummyLinkedInUrls = [
  "https://linkedin.com/in/john-doe",
  "https://linkedin.com/in/mia-khalifa", 
  "https://linkedin.com/in/elon-musk",
  "https://linkedin.com/in/taylor-swift",
  "https://linkedin.com/in/michael-scott",
  "https://linkedin.com/in/walter-white",
  "https://linkedin.com/in/sherlock-holmes",
  "https://linkedin.com/in/bruce-wayne",
  "https://linkedin.com/in/tony-stark",
  "https://linkedin.com/in/daenerys-targaryen"
];

export const skillsPool = [
  "React", "TypeScript", "Node.js", "Python", "JavaScript", "GraphQL",
  "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "Redis",
  "Machine Learning", "Data Science", "Leadership", "Strategic Planning",
  "Product Management", "UI/UX Design", "Cybersecurity", "DevOps",
  "Artificial Intelligence", "Blockchain", "Cloud Computing", "Analytics"
];

export const jobTitles = [
  "Software Engineer", "Product Manager", "Data Scientist", "UX Designer",
  "DevOps Engineer", "Marketing Director", "CEO", "CTO", "VP Engineering",
  "Senior Developer", "Technical Lead", "Security Analyst", "Full Stack Developer",
  "Machine Learning Engineer", "Business Analyst", "Growth Hacker"
];

export const generateProfileData = (url: string): LinkedInProfile => {
  const name = url.split('/in/')[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
  const randomSkills = skillsPool
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    title: randomTitle,
    skills: randomSkills,
    url,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
  };
};