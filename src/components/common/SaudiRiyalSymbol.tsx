'use client';

import React from 'react';

interface SaudiRiyalSymbolProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  customSize?: string | number;
  inline?: boolean;
}

/**
 * Official Saudi Riyal (SAR / ر.س) Currency Symbol Component
 * Renders the official SAMA / Saudi national currency sign seamlessly with text.
 */
export function SaudiRiyalSymbol({
  className = '',
  size = 'md',
  customSize,
  inline = true,
}: SaudiRiyalSymbolProps) {
  const sizeMap = {
    xs: 'w-3 h-3.5',
    sm: 'w-3.5 h-4',
    md: 'w-4 h-4.5',
    lg: 'w-5 h-6',
    xl: 'w-7 h-8',
    custom: '',
  };

  const selectedSizeClass = size === 'custom' ? '' : sizeMap[size];
  const customStyle = customSize ? { width: customSize, height: customSize } : undefined;

  return (
    <span
      className={`${inline ? 'inline-flex items-center align-baseline' : 'flex items-center'} select-none shrink-0 ${className}`}
      title="SAR (Saudi Riyal)"
      aria-label="SAR"
    >
      <svg
        viewBox="0 0 100 115"
        className={`${selectedSizeClass} fill-current transition-colors`}
        style={customStyle}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left vertical stem & upper/lower horizontal strokes */}
        <path
          d="M47 0 L35 8 V53 L9 57 L6 69 L35 63 V84 L3 89 L0 100 L35 94 V108 L47 99 V61 L47 0 Z"
        />
        {/* Upper horizontal crossbar bridging to right */}
        <path
          d="M35 53 L71 47 L99 42 L100 55 L71 60 L47 64 L35 66 Z"
        />
        {/* Right vertical stem and connected bottom horizontal bar */}
        <path
          d="M71 6 L59 14 V49 L71 47 V51 L71 77 L98 72 L96 84 L59 91 V51 L59 49 Z"
        />
        {/* Bottom-right separate accent bar */}
        <path
          d="M62 97 L58 109 L96 102 L100 90 L62 97 Z"
        />
      </svg>
    </span>
  );
}

export default SaudiRiyalSymbol;
