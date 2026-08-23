'use client';

import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CircularPieTinProps {
  percentage: number; // 0 to 100
  size?: number; // diameter in px (default: 40)
  strokeWidth?: number; // ring thickness in px (default: 4)
  isCritical?: boolean;
  label?: string;
  sublabel?: string;
  showPercentInside?: boolean;
  className?: string;
}

export function CircularPieTin({
  percentage,
  size = 42,
  strokeWidth = 4.5,
  isCritical = false,
  label,
  sublabel,
  showPercentInside = true,
  className = '',
}: CircularPieTinProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const clampedPercent = Math.min(Math.max(percentage, 0), 100);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  // Hydration-safe deterministic gradient ID
  const reactId = useId();
  const gradientId = `pie-tin-grad-${reactId.replace(/:/g, '')}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer metallic bevel glow */}
      <div
        className="relative flex items-center justify-center rounded-full bg-slate-950/70 p-0.5 shadow-inner"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg] transform overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {isCritical ? (
                <>
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fb7185" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="60%" stopColor="#F5D982" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Background Track Circle (Pie Tin Rim) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-white/15"
          />

          {/* Animated Foreground Pie Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={prefersReduced ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              filter: isCritical
                ? 'drop-shadow(0 0 4px rgba(244,63,94,0.5))'
                : 'drop-shadow(0 0 5px rgba(212,175,55,0.4))',
            }}
          />
        </svg>

        {/* Center Readout */}
        {showPercentInside && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className={`font-mono font-black tabular-nums leading-none ${
                size < 36 ? 'text-[9px]' : size < 50 ? 'text-[10px]' : 'text-xs'
              } ${isCritical ? 'text-rose-300' : 'text-amber-200'}`}
            >
              {clampedPercent}%
            </span>
          </div>
        )}
      </div>

      {/* Optional Side Label */}
      {(label || sublabel) && (
        <div className="ms-2.5 flex flex-col text-start">
          {label && (
            <span className="text-xs font-bold text-white tracking-tight leading-tight">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[10px] text-slate-400 font-mono leading-tight mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
