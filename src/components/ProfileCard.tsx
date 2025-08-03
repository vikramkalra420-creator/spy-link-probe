import React from 'react';
import { motion } from 'framer-motion';
import { LinkedInProfile } from '@/types/linkedin';
import { User, Briefcase, Wrench, ExternalLink } from 'lucide-react';

interface ProfileCardProps {
  profile: LinkedInProfile;
  index: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "var(--shadow-glow)"
      }}
      className="spy-card rounded-xl p-6 hover:border-spy-gold/50 transition-all duration-300 group"
    >
      {/* Header with avatar and basic info */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex-shrink-0"
        >
          <div className="w-16 h-16 rounded-full spy-glass flex items-center justify-center overflow-hidden">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <User className="w-8 h-8 text-spy-cyan hidden" />
          </div>
        </motion.div>

        {/* Basic Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground mb-1 truncate">
            {profile.name}
          </h3>
          <div className="flex items-center gap-2 text-spy-cyan text-sm mb-2">
            <Briefcase size={14} />
            <span className="truncate">{profile.title}</span>
          </div>
          
          {/* URL with link */}
          <motion.a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-spy-gold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={12} />
            <span className="truncate max-w-[200px]">View Profile</span>
          </motion.a>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Wrench size={14} className="text-spy-purple" />
          <span className="font-medium">Key Skills</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
              className="inline-flex items-center px-3 py-1 rounded-full spy-glass text-xs font-medium text-spy-cyan group-hover:bg-spy-cyan/10 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Extraction status indicator */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: (index * 0.1) + 0.3, duration: 0.8 }}
        className="mt-4 pt-3 border-t border-spy-border"
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Status</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: (index * 0.1) + 1 }}
            className="text-spy-gold font-medium flex items-center gap-1"
          >
            <div className="w-2 h-2 bg-spy-gold rounded-full animate-pulse" />
            Extracted
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};