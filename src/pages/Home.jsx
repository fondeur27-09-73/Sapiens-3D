import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Spline from '@splinetool/react-spline'
import { ParticleNetwork } from '../components/ParticleNetwork'
import { XRayText } from '../components/XRayText'
import { DualDNA } from '../components/DualDNA'
import { Section } from '../components/Section'
import { EndlessButton } from '../components/EndlessButton'
import gsap from 'gsap'

export default function Home() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const sections = ['.gs-fade-up']
        sections.forEach((className) => {
            const elements = document.querySelectorAll(className)
            elements.forEach((elem) => {
                gsap.fromTo(elem,
                    { opacity: 0, y: 50, filter: "blur(3px)" },
                    {
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 1
                        },
                        opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out"
                    }
                )
            })
        })

        gsap.fromTo(".gs-hero-content",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.2 }
        )
    }, [])

    return (
        <main className="relative w-full z-[40]">
            {/* SEC 1: HERO */}
            <section id="sec-1" className="h-[100vh] w-full flex flex-col items-center justify-center relative overflow-hidden pointer-events-auto">
                <div className="hero-vignette" />
                <div className="hero-scanlines" />

                <div className="absolute inset-0 z-0 pointer-events-auto flex items-end justify-center overflow-hidden">
                    <div className={`w-full h-full flex flex-col items-center justify-end transition-transform duration-700 ${isMobile ? 'scale-[0.5] translate-y-[28vh]' : 'scale-[0.85] translate-y-[15vh]'}`}>
                        <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
                    </div>
                </div>

                <div className="text-center gs-hero-content z-20 relative -mt-[45vh] md:-mt-[50vh] pointer-events-auto px-4">
                    <XRayText
                        text="ROBOT<br />REVOLUTION"
                        className="font-['Orbitron'] text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-black leading-[0.9] tracking-tighter mb-6 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)] pointer-events-auto"
                    />

                    {/* Removed Explorar button as requested */}
                </div>
            </section>

            {/* SEC 2: DNA */}
            <Section id="sec-2" className="items-start">
                <XRayText
                    text="EL CÓDIGO TRANSMITE<br />CONFIANZA"
                    className="gs-fade-up mt-[20vh] md:mt-[5vh] font-['Orbitron'] text-[1.8rem] md:text-[2.5rem] lg:text-[3.5rem] font-bold leading-tight mb-8 uppercase text-white"
                />
                <div className="gs-fade-up mt-[30vh] md:mt-[50vh]">
                    <EndlessButton text={<>Ver<br />Modelos</>} link="/modelos" />
                </div>
            </Section>

            {/* SEC 3: DATA CULTIVATED / RAAS */}
            <Section id="sec-3" className="items-end text-right md:items-end md:text-right relative overflow-hidden" contentClassName="max-w-none w-full relative z-10">
                <div className="absolute top-[10%] left-[-10%] w-[120%] md:w-[70%] h-[80vh] z-0 pointer-events-none">
                    <video 
                        src="/models/delivery sapiens.mp4" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-90 mix-blend-lighten"
                    />
                    {/* Fade to dark on the right so text is readable */}
                    <div className="absolute inset-0 bg-gradient-to-l from-[#021629] via-transparent to-transparent z-10" />
                    {/* Top/Bottom fade to blend with background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#021629] via-transparent to-[#021629] z-10 opacity-70" />
                </div>

                <div className="relative z-10 gs-fade-up flex flex-col items-end w-full">
                    <XRayText
                        text='PAGA SOLO<br /><span className="text-[#38bdf8]">POR SERVICIO</span>'
                        className="font-['Orbitron'] text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold leading-tight mb-8 pt-[20vh]"
                    />
                    <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl font-light text-justify md:text-right">
                        Con el modelo RaaS (Robot as a Service), Sapiens Robotics se encarga del mantenimiento preventivo, soporte y actualizaciones. Tu única preocupación será ver cómo mejora la experiencia de tu marca con el cliente.
                    </p>
                    <EndlessButton text={<>Sectores<br />Clave</>} link="/sectores" />
                </div>
            </Section>

            {/* SEC 4: INDUSTRIAL SECURITY */}
            <Section id="sec-4" className="items-start relative overflow-hidden" contentClassName="max-w-none w-full">
                <div className="absolute top-[35%] inset-0 z-0 pointer-events-none transition-all duration-700">
                    <img src="/src/assets/security-bg.png" alt="Industrial Security" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                    <video 
                        src="/models/seguridad industrial.mp4" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-lighten"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#021629] via-transparent to-transparent z-10" />
                    {/* Top fade to prevent sharp edge */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#021629] via-transparent to-transparent h-40 z-10" />
                </div>
                
                <div className="relative z-10 gs-fade-up mt-[-2vh] md:mt-[-5vh] w-full">
                    <XRayText
                        text='¿CONOCES A NUESTRO EXPERTO EN<br /><span className="text-[#38bdf8]">SEGURIDAD INDUSTRIAL?</span>'
                        className="font-['Orbitron'] text-[1.8rem] md:text-[3.5rem] lg:text-[4.5rem] font-black leading-[0.9] mb-8 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)] tracking-tight uppercase"
                    />
                    <div className="max-w-xl">
                        <p className="text-lg md:text-xl text-white/70 mb-8 font-light text-justify">
                            Nuestro avanzado robot de inspección detecta proactivamente fugas de gas o líquidos, monitorea altas temperaturas y previene incidentes en entornos críticos con precisión autónoma.
                        </p>
                        <ul className="space-y-4 mb-4 text-white/50 text-sm md:text-base">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full" /> Detección de fugas de gas y vapores o líquidos.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full" /> Monitoreo térmico infra-rojo.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full" /> Supervisión 24/7 en áreas peligrosas.
                            </li>
                        </ul>
                    </div>
                </div>
            </Section>
        </main>
    )
}
