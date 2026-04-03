import React, { memo } from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const TikTokIcon = memo(({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
));
TikTokIcon.displayName = "TikTokIcon";

export const Youtube = memo(({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.6 5.9 3.5 5 4.7 4.9 7.1 4.7 12 4.7 12 4.7s4.9 0 7.3.2c1.2.1 2.1 1 2.2 2.2.2 1.6.2 4.6.2 4.6s0 3-.2 4.6c-.1 1.2-1 2.1-2.2 2.2-2.4.2-7.3.2-7.3.2s-4.9 0-7.3-.2c-1.2-.1-2.1-1-2.2-2.2C2.3 14.8 2.3 11.8 2.3 11.8s0-3 .2-4.7z"></path>
    <polygon points="9.8 15 15.5 11.8 9.8 8.5 9.8 15"></polygon>
  </svg>
));
Youtube.displayName = "Youtube";

export const Facebook = memo(({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
));
Facebook.displayName = "Facebook";

export const Instagram = memo(({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
));
Instagram.displayName = "Instagram";