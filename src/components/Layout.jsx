import React, { Suspense, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SapiensLogo } from './SapiensLogo'
import { BlueprintParticles } from './BlueprintParticles'
import { DualDNA } from './DualDNA'
import { ParticleNetwork } from './ParticleNetwork'
import { SapiensChatbot } from './SapiensChatbot'

export default function Layout({ children }) {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isModels = location.pathname === '/modelos'
    const isPricing = location.pathname === '/planes'
    const isContact = location.pathname === '/contacto'
    const useLightTheme = isModels || isPricing || isContact

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <div className="bg-[#021629] text-white font-['Inter'] selection:bg-sky-400 selection:text-black min-h-screen relative">

            {/* HEADER WITH LOGO AND NAVIGATION */}
            <header className={`fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-8 md:pt-8 flex justify-between items-center transition-colors duration-500 ${isMobileMenuOpen ? 'bg-[#021629]' : ''}`}>
                <div className="pointer-events-auto z-[110]">
                    <Link to="/">
                        <SapiensLogo className="scale-75 md:scale-100 origin-left" light={useLightTheme && !isMobileMenuOpen} />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
                    <NavLink to="/" active={isHome} light={useLightTheme}>Inicio</NavLink>
                    <NavLink to="/modelos" active={isModels} light={useLightTheme}>Modelos</NavLink>
                    <NavLink to="/sectores" active={location.pathname === '/sectores'} light={useLightTheme}>Sectores</NavLink>
                    <NavLink to="/planes" active={isPricing} light={useLightTheme}>Planes</NavLink>
                    <NavLink to="/contacto" active={isContact} light={useLightTheme}>Contacto</NavLink>
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className="md:hidden pointer-events-auto z-[110] p-2 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="w-6 flex flex-col items-end gap-1.5">
                        <span className={`block h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'w-6 bg-white rotate-45 translate-y-[8px]' : `w-6 ${useLightTheme ? 'bg-black' : 'bg-white'}`}`} />
                        <span className={`block h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : `w-4 ${useLightTheme ? 'bg-black' : 'bg-white'}`}`} />
                        <span className={`block h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'w-6 bg-white -rotate-45 -translate-y-[8px]' : `w-5 ${useLightTheme ? 'bg-black' : 'bg-white'}`}`} />
                    </div>
                </button>

                {/* Mobile Full Screen Menu Overlay */}
                <div className={`fixed inset-0 bg-[#021629] z-[105] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
                    <nav className="flex flex-col items-center gap-10 pointer-events-auto">
                        <MobileNavLink to="/" text="Inicio" active={isHome} onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/modelos" text="Modelos" active={isModels} onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/sectores" text="Sectores" active={location.pathname === '/sectores'} onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/planes" text="Planes" active={isPricing} onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink to="/contacto" text="Contacto" active={isContact} onClick={() => setIsMobileMenuOpen(false)} />
                    </nav>
                </div>
            </header>

            {/* GLOBAL FILM GRAIN */}
            <div className="film-grain-img pointer-events-none" />

            {/* FULL-SCREEN AMBIENT PARTICLES */}
            <BlueprintParticles />

            {/* 3D WEBGL ENGINE (FIXED BACKGROUND) */}
            <div className="fixed inset-0 w-screen h-screen z-0">
                <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                    <color attach="background" args={[useLightTheme ? '#f2f2f2' : '#021629']} />
                    <ambientLight intensity={useLightTheme ? 2.5 : 4.5} />
                    <directionalLight position={[0, 10, 15]} intensity={useLightTheme ? 5 : 10} color="#ffffff" />
                    <directionalLight position={[0, -5, 10]} intensity={2} color="#ffd700" />
                    <pointLight position={[0, 0, 5]} intensity={6} color="#ffffff" distance={20} />

                    <Suspense fallback={null}>
                        {/* Show DNA only on home page as it has scroll-sync logic */}
                        {isHome && <DualDNA />}

                        {/* Particle Networks scattered across the whole screen */}
                        <group position={[0, 0, -10]}>
                            {/* Central large cluster */}
                            <ParticleNetwork count={isPricing ? 180 : 120} radius={18} connectionDistance={2.5} light={useLightTheme} />
                        </group>

                        {/* More clusters for variety on Pricing page */}
                        {isPricing && (
                            <>
                                <group position={[-15, 10, -15]}>
                                    <ParticleNetwork count={60} radius={10} connectionDistance={3} light={useLightTheme} />
                                </group>
                                <group position={[15, -15, -12]}>
                                    <ParticleNetwork count={60} radius={12} connectionDistance={2.5} light={useLightTheme} />
                                </group>
                            </>
                        )}
                    </Suspense>

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
                </Canvas>
            </div>

            {/* MAIN CONTENT AREA */}
            {children}

            {/* FLOATING CHATBOT */}
            <SapiensChatbot />
        </div>
    )
}

function NavLink({ to, children, active, light }) {
    return (
        <Link
            to={to}
            className={`font-['Orbitron'] text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-300 hover:text-sky-400 
                ${active ? 'text-sky-400 border-b border-sky-400/50 pb-1' : (light ? 'text-slate-900/60' : 'text-white/60')}`}
        >
            {children}
        </Link>
    )
}

function MobileNavLink({ to, text, active, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`font-['Orbitron'] text-2xl md:text-3xl uppercase tracking-widest transition-all duration-300 hover:text-sky-400 
                ${active ? 'text-sky-400' : 'text-white'}`}
        >
            {text}
        </Link>
    )
}
