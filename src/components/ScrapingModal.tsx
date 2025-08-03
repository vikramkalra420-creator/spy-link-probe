import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrapingProgress } from '@/types/linkedin';
import { DetectiveAnimation } from './DetectiveAnimation';
import { RollingText } from './RollingText';
import { X } from 'lucide-react';

interface ScrapingModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: ScrapingProgress;
}

export const ScrapingModal: React.FC<ScrapingModalProps> = ({ isOpen, onClose, progress }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    // Show close button after 3 seconds as fallback
    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCloseButton) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, showCloseButton]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={showCloseButton ? onClose : undefined}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="relative saas-card rounded-lg p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button (only shows after delay) */}
            <AnimatePresence>
              {showCloseButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-saas-light-gray hover:bg-saas-border transition-colors"
                >
                  <X size={20} className="text-saas-gray hover:text-foreground" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Scraping Progress
              </h2>
              <p className="text-muted-foreground text-sm">
                Extracting profile data from LinkedIn URLs...
              </p>
            </motion.div>

            {/* Detective Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 200 
              }}
            >
              <DetectiveAnimation />
            </motion.div>

            {/* Rolling Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <RollingText progress={progress} isActive={isOpen} />
            </motion.div>

            {/* Warning text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6 text-xs text-muted-foreground"
            >
              This is a simulation. No actual data is being collected.
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};