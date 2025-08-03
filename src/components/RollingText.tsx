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
        className="spy-glass rounded-lg p-4"
      >
        <div className="text-spy-gold text-sm uppercase tracking-wider mb-1">
          Current Target
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={progress.currentProfile}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-mono text-foreground"
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
            className="text-spy-cyan font-mono text-sm"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-spy-gold"
            >
              |
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{progress.profilesCompleted}/{progress.totalProfiles}</span>
        </div>
        <div className="w-full bg-spy-surface rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-spy-gold to-spy-cyan"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${(progress.profilesCompleted / progress.totalProfiles) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Matrix-style data stream */}
      <div className="h-24 overflow-hidden spy-glass rounded p-3">
        <div className="space-y-1 font-mono text-xs">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: [0, 1, 0.5, 0],
                x: [-50, 0, 0, 50],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-spy-cyan/70"
            >
              {Math.random().toString(36).substring(2, 15)} → ████████████
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};