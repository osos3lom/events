'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        disabled
        className={cn(
          'relative inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground bg-muted/30 border border-border/40 opacity-70 w-9 h-9',
          className
        )}
      >
        <span className="sr-only">Toggle theme</span>
        <div className="w-4 h-4 rounded-full bg-muted-foreground/30 animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Red Sea Light mode' : 'Switch to Jeddah Night mode'}
      title={isDark ? 'Switch to Red Sea Light mode' : 'Switch to Jeddah Night mode'}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 p-2 rounded-xl text-sm font-medium transition-all duration-300',
        'border border-border/60 hover:border-cyan-500/40 dark:hover:border-cyan-400/50',
        'bg-card/80 hover:bg-card dark:bg-card/60 dark:hover:bg-card/90 shadow-2xs hover:shadow-sm backdrop-blur-md',
        'text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95',
        showLabel ? 'px-3 h-9' : 'w-9 h-9',
        className
      )}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="text-cyan-400 dark:text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] flex items-center justify-center"
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="text-amber-500 flex items-center justify-center"
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-semibold capitalize tracking-tight">
          {isDark ? 'Night' : 'Day'}
        </span>
      )}
    </button>
  );
};
