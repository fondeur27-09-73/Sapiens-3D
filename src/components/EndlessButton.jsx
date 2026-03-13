import React from 'react'
import { Link } from 'react-router-dom'

export function EndlessButton({ text, link, onClick }) {
    const content = (
        <div className="relative mt-8 md:mt-12 inline-flex cursor-pointer group scale-[0.85] md:scale-100 origin-left">
            <div className="relative flex items-center justify-center w-[150px] h-[150px] rounded-full border border-slate-700 bg-slate-900 backdrop-blur-xl transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] z-10">

                {/* Outer Rotating Dashed Ring - Ultra High Visibility */}
                <div className="absolute inset-[-15px] rounded-full border-[2px] border-dashed border-slate-600 animate-[spin_30s_linear_infinite] group-hover:border-[#38bdf8] group-hover:inset-[-20px] transition-all duration-500" />

                {/* Inner Tech Ring */}
                <div className="absolute inset-[6px] rounded-full border border-slate-700 group-hover:border-white/80" />

                <span className="font-['Orbitron'] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-center leading-[1.5] w-[100px] text-white transition-colors duration-300 group-hover:text-black z-20">
                    {text}
                </span>
            </div>
        </div>
    )

    if (link) {
        return <Link to={link}>{content}</Link>
    }

    return (
        <div onClick={onClick}>
            {content}
        </div>
    )
}
