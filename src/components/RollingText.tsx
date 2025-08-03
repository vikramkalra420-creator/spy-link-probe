import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrapingProgress } from '@/types/linkedin';

interface RollingTextProps {
  progress: ScrapingProgress;
  isActive: boolean;
}

const extractionMessages = [
  "Initializing neural networks...",
  "Bypassing security protocols...", 
  "Scanning digital footprints...",
  "Extracting professional metadata...",
  "Analyzing connection patterns...",
  "Decrypting profile information...",
  "Cross-referencing data sources...",
  "Compiling intelligence report..."
];

export const RollingText: React.FC<RollingTextProps> = ({ progress, isActive }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!isActive) return;

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % extractionMessages.length);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    // Typewriter effect
    const message = extractionMessages[currentMessage];
    let index = 0;
    setDisplayText('');

    const typeInterval = setInterval(() => {
      setDisplayText(message.substring(0, index + 1));
      index++;
      
      if (index >= message.length) {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentMessage, isActive]);

  return (
    <div className="text-center space-y-6">
      {/* Current extraction target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-saas-light-gray rounded-lg p-4 border border-saas-border"
      >
        <div className="text-saas-blue text-sm font-medium mb-1">
          Current Profile
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={progress.currentProfile}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-foreground"
          >
            {progress.currentProfile}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Rolling extraction messages */}
      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-saas-gray font-medium text-sm"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-saas-blue"
            >
              |
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Scraping Progress</span>
          <span>{Math.round((progress.profilesCompleted / progress.totalProfiles) * 100)}%</span>
        </div>
        <div className="w-full bg-saas-light-gray rounded-full h-2 overflow-hidden border border-saas-border">
          <motion.div
            className="h-full bg-saas-blue"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${(progress.profilesCompleted / progress.totalProfiles) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Status log */}
      <div className="bg-saas-light-gray rounded-lg p-3 border border-saas-border">
        <div className="space-y-1 text-xs">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: [0, 1, 0.7],
                x: [-20, 0, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-saas-gray flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-saas-green rounded-full"></div>
              Extracting profile {i + 1}...
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};