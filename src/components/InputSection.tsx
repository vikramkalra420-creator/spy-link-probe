import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Search, AlertCircle } from 'lucide-react';
import { dummyLinkedInUrls } from '@/data/dummyData';

interface InputSectionProps {
  onStartScraping: (urls: string[]) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onStartScraping, isLoading }) => {
  const [urls, setUrls] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loadTemplate = () => {
    setUrls(dummyLinkedInUrls.join('\n'));
    setError('');
  };

  const validateUrls = (urlString: string): string[] => {
    const urlList = urlString
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    const invalidUrls = urlList.filter(url => !linkedInRegex.test(url));

    if (invalidUrls.length > 0) {
      throw new Error(`Invalid LinkedIn URLs detected: ${invalidUrls.slice(0, 3).join(', ')}${invalidUrls.length > 3 ? '...' : ''}`);
    }

    return urlList;
  };

  const handleStartScraping = () => {
    try {
      setError('');
      const validatedUrls = validateUrls(urls);
      
      if (validatedUrls.length === 0) {
        setError('Please enter at least one LinkedIn URL');
        return;
      }

      if (validatedUrls.length > 20) {
        setError('Maximum 20 profiles allowed per scraping session');
        return;
      }

      onStartScraping(validatedUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid URLs detected');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="spy-card rounded-xl p-8 mb-8"
    >
      <div className="text-center mb-6">
        <motion.h1 
          className="text-4xl font-bold mb-2 text-transparent bg-clip-text"
          style={{ backgroundImage: 'var(--gradient-primary)' }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🕵️ LinkedIn Intel Extractor
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          Advanced reconnaissance tool for professional intelligence gathering
        </p>
        <div className="inline-flex items-center gap-2 mt-2 text-sm text-spy-gold">
          <AlertCircle size={16} />
          <span>Simulation only – no real scraping involved</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Target LinkedIn Profiles
          </label>
          <Textarea
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Enter LinkedIn URLs (one per line)&#10;Example: https://linkedin.com/in/john-doe"
            className="min-h-[120px] bg-input border-spy-border focus:border-spy-gold focus:ring-spy-gold font-mono text-sm"
            disabled={isLoading}
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-destructive text-sm flex items-center gap-2"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={loadTemplate}
            variant="outline"
            className="flex-1 border-spy-border hover:border-spy-cyan hover:bg-spy-cyan/10"
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            Load Template (10 profiles)
          </Button>
          
          <Button
            onClick={handleStartScraping}
            className="flex-1 bg-gradient-to-r from-spy-gold to-spy-cyan hover:opacity-90 text-spy-dark font-semibold"
            disabled={isLoading || !urls.trim()}
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? 'Extracting...' : 'Start Extraction'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};