import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { InputSection } from '@/components/InputSection';
import { ScrapingModal } from '@/components/ScrapingModal';
import { ResultsGrid } from '@/components/ResultsGrid';
import { LinkedInProfile, ScrapingProgress } from '@/types/linkedin';
import { generateProfileData } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedProfiles, setExtractedProfiles] = useState<LinkedInProfile[]>([]);
  const [progress, setProgress] = useState<ScrapingProgress>({
    currentProfile: '',
    profilesCompleted: 0,
    totalProfiles: 0
  });
  const { toast } = useToast();

  const simulateExtraction = useCallback(async (urls: string[]) => {
    const profiles: LinkedInProfile[] = [];
    
    setProgress({
      currentProfile: '',
      profilesCompleted: 0,
      totalProfiles: urls.length
    });

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const profileName = url.split('/in/')[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Update current profile being "extracted"
      setProgress(prev => ({
        ...prev,
        currentProfile: profileName
      }));

      // Simulate extraction time (2-3 seconds per profile)
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Generate profile data
      const profileData = generateProfileData(url);
      profiles.push(profileData);
      
      // Update progress
      setProgress(prev => ({
        ...prev,
        profilesCompleted: i + 1
      }));
    }

    return profiles;
  }, []);

  const handleStartScraping = useCallback(async (urls: string[]) => {
    setIsLoading(true);
    setIsModalOpen(true);
    setExtractedProfiles([]);
    
    try {
      toast({
        title: "🕵️ Extraction Started",
        description: `Beginning intelligence gathering on ${urls.length} targets...`,
      });

      const profiles = await simulateExtraction(urls);
      
      // Keep modal open for a brief moment to show completion
      setTimeout(() => {
        setIsModalOpen(false);
        setExtractedProfiles(profiles);
        setIsLoading(false);
        
        toast({
          title: "✅ Extraction Complete", 
          description: `Successfully extracted data from ${profiles.length} profiles.`,
        });
      }, 1500);
      
    } catch (error) {
      setIsModalOpen(false);
      setIsLoading(false);
      toast({
        title: "❌ Extraction Failed",
        description: "An error occurred during the intelligence gathering process.",
        variant: "destructive"
      });
    }
  }, [simulateExtraction, toast]);

  const handleCloseModal = useCallback(() => {
    if (!isLoading) {
      setIsModalOpen(false);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Input Section */}
          <InputSection 
            onStartScraping={handleStartScraping}
            isLoading={isLoading}
          />

          {/* Results Grid */}
          <ResultsGrid profiles={extractedProfiles} />
        </motion.div>

        {/* Scraping Modal */}
        <ScrapingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default Index;
