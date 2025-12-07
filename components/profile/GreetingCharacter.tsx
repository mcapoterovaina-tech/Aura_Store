import React from 'react';

export const GreetingCharacter: React.FC = () => (
    <div className="relative w-full h-full flex items-center justify-center animate-float">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            {/* Body */}
            <rect x="100" y="120" width="100" height="110" rx="35" fill="url(#body_gradient)" />
            
            {/* Face Screen */}
            <rect x="115" y="135" width="70" height="50" rx="15" fill="#111" />
            
            {/* Eyes */}
            <circle cx="135" cy="160" r="6" fill="#00C2FF" className="animate-pulse" />
            <circle cx="165" cy="160" r="6" fill="#00C2FF" className="animate-pulse" />
            
            {/* Antenna */}
            <line x1="150" y1="120" x2="150" y2="90" stroke="#E0E0E0" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="150" cy="85" r="8" fill="#FF5C8D" className="animate-pulse" />

            {/* Arms */}
            <path d="M85 160C75 160 75 190 85 190" stroke="#E0E0E0" strokeWidth="12" strokeLinecap="round" />
            
            {/* Waving Arm */}
            <g className="animate-wave origin-bottom-right" style={{ transformBox: 'fill-box', transformOrigin: '100% 100%' }}>
                <path d="M215 160C225 160 225 190 215 190" stroke="#E0E0E0" strokeWidth="12" strokeLinecap="round" />
            </g>

            {/* Speech Bubble */}
            <g className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <path d="M210 80 H280 A10 10 0 0 1 290 90 V120 A10 10 0 0 1 280 130 H240 L210 150 V90 A10 10 0 0 1 210 80 Z" fill="white" />
                <text x="230" y="115" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="#333">Hola!</text>
            </g>

            {/* Defs for gradients */}
            <defs>
                <linearGradient id="body_gradient" x1="100" y1="120" x2="200" y2="230" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0F0F0" />
                    <stop offset="1" stopColor="#C0C0C0" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);