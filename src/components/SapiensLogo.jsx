import React from 'react';

export const SapiensLogo = ({ className = '', size = 45, light = false }) => {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {/* SVG Icon - Replicating the new Robot Head design */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Antenna Light */}
                <circle cx="50" cy="15" r="6" fill="#00A3FF" />
                <circle cx="50" cy="15" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.2" />

                {/* Main Head Body (Clipped Corners) */}
                <path
                    d="M30 35H70L85 50V70L70 85H30L15 70V50L30 35Z"
                    fill="#E5E7EB"
                />

                {/* Side Panels (Ears) */}
                <rect x="8" y="52" width="7" height="16" rx="2" fill="#D1D5DB" />
                <rect x="85" y="52" width="7" height="16" rx="2" fill="#D1D5DB" />

                {/* Face Area (Darker) */}
                <rect x="25" y="45" width="50" height="30" rx="15" fill="#1F2937" />

                {/* Eyes (Blue Pills) */}
                <rect x="35" y="55" width="12" height="6" rx="3" fill="#00A3FF" />
                <rect x="53" y="55" width="12" height="6" rx="3" fill="#00A3FF" />

                {/* Top Detail */}
                <path d="M40 35L45 40H55L60 35" stroke="#9CA3AF" strokeWidth="2" />
            </svg>

            {/* Text Branding */}
            <div className="flex flex-col items-start leading-none">
                <span className={`${light ? 'text-slate-900' : 'text-white'} text-2xl font-bold tracking-[0.25em] uppercase font-display`}>
                    Sapiens
                </span>
                <div className="flex items-center w-full gap-2 mt-1">
                    <div className={`h-[1px] flex-1 ${light ? 'bg-slate-900/20' : 'bg-white/40'}`}></div>
                    <span className={`text-[9px] ${light ? 'text-slate-900/70' : 'text-white/70'} tracking-[0.4em] uppercase font-semibold`}>
                        Robotics
                    </span>
                    <div className={`h-[1px] flex-1 ${light ? 'bg-slate-900/20' : 'bg-white/40'}`}></div>
                </div>
            </div>
        </div>
    );
};
