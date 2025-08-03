import React from 'react';
import { motion } from 'framer-motion';
import { Search, Linkedin } from 'lucide-react';

export const DetectiveAnimation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center mb-8">
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-spy-gold/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* LinkedIn logo with scan effect */}
      <motion.div
        className="relative bg-spy-surface p-8 rounded-full border-2 border-spy-border"
        animate={{
          borderColor: ['hsl(var(--spy-border))', 'hsl(var(--spy-gold))', 'hsl(var(--spy-border))'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Linkedin 
            size={64} 
            className="text-spy-cyan drop-shadow-lg" 
          />
        </motion.div>

        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-spy-gold to-transparent opacity-80"
          animate={{
            y: [0, 120, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Magnifying glass */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
          x: [0, 10, -10, 0],
          y: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <Search 
            size={48} 
            className="text-spy-gold drop-shadow-lg" 
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-spy-gold/50"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
      </motion.div>

      {/* Radar sweep effect */}
      <motion.div
        className="absolute inset-0 border-2 border-spy-purple/30 rounded-full"
        animate={{
          scale: [1, 2],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </div>
  );
};