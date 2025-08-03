import React from 'react';
import { motion } from 'framer-motion';
import { LinkedInProfile } from '@/types/linkedin';
import { ProfileCard } from './ProfileCard';
import { CheckCircle, Users } from 'lucide-react';

interface ResultsGridProps {
  profiles: LinkedInProfile[];
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ profiles }) => {
  if (profiles.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center saas-card rounded-lg p-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.3, 
            type: "spring", 
            stiffness: 200 
          }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saas-green/10 border border-saas-green/20 mb-4"
        >
          <CheckCircle size={32} className="text-saas-green" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Scraping Results
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Users size={16} />
          <span>Successfully scraped {profiles.length} LinkedIn profiles</span>
        </div>
      </motion.div>

      {/* Grid of Profile Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {profiles.map((profile, index) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            index={index}
          />
        ))}
      </motion.div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-saas-light-gray border border-saas-border rounded-lg p-4 text-center"
      >
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-saas-blue font-bold text-lg">
              {profiles.length}
            </div>
            <div className="text-muted-foreground">Profiles</div>
          </div>
          <div>
            <div className="text-saas-green font-bold text-lg">
              {profiles.reduce((acc, p) => acc + p.skills.length, 0)}
            </div>
            <div className="text-muted-foreground">Skills Found</div>
          </div>
          <div>
            <div className="text-saas-blue font-bold text-lg">100%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};