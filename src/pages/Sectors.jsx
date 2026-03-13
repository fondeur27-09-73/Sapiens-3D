import React, { useRef, useEffect } from 'react'
import { XRayText } from '../components/XRayText'
import { EndlessButton } from '../components/EndlessButton'
import hotelImg from "../assets/sectors/hotel-lobby.png"
import healthImg from "../assets/sectors/clinic-interior.png"
import electricImg from "../assets/sectors/substation.png"
import monitoringImg from "../assets/sectors/substation-monitoring.png"
import constructionImg from "../assets/sectors/construction-site.png"
import agricultureImg from "../assets/sectors/agriculture.png"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Sectors() {
    const sectors = [
        {
            id: "hospitality",
            title: "HOTELERÍA",
            desc: "Optimiza el recibimiento de huéspedes y el envío de amenidades a las habitaciones con una elegancia tecnológica incomparable.",
            details: [
                "Check-in autónomo y guía de huéspedes.",
                "Entrega de room service con total privacidad.",
                "Reducción de tiempos de espera en lobby.",
                "Experiencia VIP personalizada."
            ],
            video: "/models/Hotelresume.mp4",
            image: hotelImg,
            align: "left"
        },
        {
            id: "health",
            title: "SALUD",
            desc: "Transforma la experiencia del paciente con asistencia inteligente, guiado dinámico e información clave sobre servicios y seguros médicos en tiempo real.",
            details: [
                "Guía y ubicación de consultorios y áreas médicas.",
                "Información sobre políticas y normativas de la clínica.",
                "Consulta de seguros médicos y coberturas aceptadas.",
                "Promociones y servicios especiales para pacientes."
            ],
            video: "/models/clinics HEalth.mp4",
            image: healthImg,
            align: "right"
        },
        {
            id: "electric",
            title: "SECTOR ELÉCTRICO",
            desc: "Automatiza la inspección de infraestructuras críticas y optimiza el mantenimiento preventivo en entornos de alta tensión y distribución.",
            details: [
                "Monitoreo autónomo de subestaciones y líneas.",
                "Detección temprana de anomalías térmicas.",
                "Seguridad perimetral y vigilancia en subestaciones.",
                "Soporte en la gestión de infraestructuras en carreteras."
            ],
            video: "/models/electrico.mp4",
            image: electricImg,
            align: "left"
        },
        {
            id: "monitoring",
            title: "MONITOREO DE SUBESTACIÓN",
            desc: "Vigilancia avanzada y análisis de datos en tiempo real para garantizar la continuidad operativa y seguridad de subestaciones eléctricas.",
            details: [
                "Supervisión constante de componentes críticos.",
                "Análisis de estado de subestaciones desatendidas.",
                "Detección de intrusiones y alertas de seguridad.",
                "Optimización de visitas de mantenimiento preventivo."
            ],
            video: "/models/E SUB.mp4",
            image: monitoringImg,
            align: "right"
        },
        {
            id: "construction",
            title: "CONSTRUCCIÓN",
            desc: "Revoluciona el armado de estructuras con tecnología especializada en el atado de varillas, operando con máxima precisión bajo cualquier condición climática.",
            details: [
                "Atado de varillas con precisión milimétrica.",
                "Operación continua 24/7 (día y noche).",
                "Resistencia total a lluvia y sol intenso.",
                "Reducción drástica de tiempos y costos laborales."
            ],
            video: "/models/construction bot.mp4",
            image: constructionImg,
            align: "left"
        },
        {
            id: "agriculture",
            title: "AGRICULTURA",
            desc: "Optimiza la cosecha con inteligencia artificial, utilizando visión computacional para identificar y recolectar frutos con delicadeza y eficiencia.",
            details: [
                "Recolección automatizada con visión computacional.",
                "Identificación precisa de frutos maduros.",
                "Adaptaciones para recolección en suelo y altura.",
                "Operación autónoma en grandes extensiones de cultivo."
            ],
            video: "/models/agriculturalbot. mp4.mp4",
            image: agricultureImg,
            align: "right"
        }
    ]

    useEffect(() => {
        const elements = document.querySelectorAll('.gs-fade-up')
        elements.forEach((elem) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 30, filter: "blur(5px)" },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out"
                }
            )
        })
    }, [])

    return (
        <main className="relative z-[40] bg-transparent text-white min-h-screen">
            {/* Cinematic Header */}
            <div className="h-[40vh] md:h-[50vh] flex items-center justify-center pt-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,transparent,black)] z-0" />
                <XRayText
                    text="SECTORES<br />CLAVE"
                    className="font-['Orbitron'] text-[3rem] md:text-[5rem] lg:text-[7rem] font-black text-center text-white z-10 leading-[1.1]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-40 pb-32">
                {sectors.map((sector, idx) => (
                    <div key={idx} id={sector.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className={`${sector.align === 'right' ? 'lg:order-2' : ''} gs-fade-up`}>
                            <div className="inline-block bg-sky-500/10 border border-sky-400/20 text-sky-400 font-['Orbitron'] px-4 py-1.5 text-xs font-bold rounded-full uppercase mb-6 tracking-widest">
                                Industria Sapiens
                            </div>
                            <h2 className="font-['Orbitron'] text-4xl md:text-6xl font-black mb-8 tracking-tighter text-white uppercase">{sector.title}</h2>
                            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 font-light">
                                {sector.desc}
                            </p>
                            <ul className="space-y-4">
                                {sector.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-4 text-white/50">
                                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 lg:mt-2.5 shrink-0" />
                                        <span className="text-sm md:text-base font-medium">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl shadow-sky-500/5 gs-fade-up ${sector.align === 'right' ? 'lg:order-1' : ''}`}>
                            {sector.image ? (
                                <>
                                    <img 
                                        src={sector.image} 
                                        alt={sector.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                                    {sector.video && (
                                        <video 
                                            src={sector.video}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-100 z-20"
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center backdrop-blur-3xl">
                                    <div className="text-8xl opacity-20 grayscale filter group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-110">
                                        {sector.icon}
                                    </div>
                                    <div className="absolute bottom-10 left-10">
                                        <div className="text-[10px] font-['Orbitron'] text-white/30 uppercase tracking-[0.3em] font-black">Visual coming soon</div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Decorative UI elements */}
                            <div className="absolute top-6 right-6 z-30 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </main>
    )
}
