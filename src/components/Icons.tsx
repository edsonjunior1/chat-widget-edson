import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

export const WarningIcon: React.FC<IconProps> = ({ 
  width = 20, 
  height = 20, 
  className,
  'aria-hidden': ariaHidden = true 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path 
      d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className,
  'aria-hidden': ariaHidden = true 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path 
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  className,
  'aria-hidden': ariaHidden = true 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path 
      d="M18 6L6 18M6 6L18 18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({ 
  width = 16, 
  height = 16, 
  className,
  'aria-hidden': ariaHidden = true 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path 
      d="M12 4L20 12L12 20M20 12H4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
