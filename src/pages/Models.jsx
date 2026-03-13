import React, { useEffect, useRef, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Stage, useAnimations } from '@react-three/drei'
import { XRayText } from '../components/XRayText'
import { Section } from '../components/Section'
import { EndlessButton } from '../components/EndlessButton'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Importing images as fallback/posters
import receptionImg from '../assets/robots/reception-new.png'
import deliveryImg from '../assets/robots/delivery.png'
import skuImg from '../assets/robots/sku-rbx-white.png'
import cyberdogImg from '../assets/robots/cyberdog.png'

gsap.registerPlugin(ScrollTrigger)

const cyberdogModelPath = "/rbe/scene.gltf"
useGLTF.preload(cyberdogModelPath)

export default function Models() {
    return (
        <main className="relative z-[40] bg-transparent text-slate-900">
            {/* Cinematic Header with Grid Support */}
            <div className="h-[50vh] flex flex-col items-center justify-center pt-24 relative overflow-hidden bg-transparent">
                <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#f2f2f2,rgba(242,242,242,0.6))] z-0" />
                <XRayText
                    text="PORTAFOLIO<br />ROBÓTICO"
                    className="font-['Orbitron'] text-[3.5rem] md:text-[6rem] lg:text-[8rem] font-black text-center leading-[0.9] tracking-tighter z-10 text-slate-900"
                    light={true}
                />
                <p className="font-['Orbitron'] text-[0.8rem] tracking-[0.5em] text-sky-600 font-bold mt-8 uppercase z-10">
                    SAPIENS DOMINICANA • TECNOLOGÍA REAL
                </p>
            </div>

            {/* Top Showcase: Dual Impact (Reception & RBE-004) */}
            <div className="flex flex-col space-y-0">
                <ModelShowcase
                    id="reception"
                    title="SAPIENS RECEPTION"
                    subtitle="El primer contacto con la excelencia"
                    description="Equipado con IA de lenguaje natural y navegación Lidar de última generación. Ideal para front desk de bancos, hoteles, Plazas, Malls, Servicio al Cliente entre otros."
                    videoUrl="/models/no watermark.mp4"
                    posterImg={receptionImg}
                    showVideoIcon={false}
                    specs={[
                        { label: "Batería", value: "14 Horas" },
                        { label: "Carga", value: "Auto-Dock" },
                        { label: "Voz", value: "Natural AI" }
                    ]}
                    reversed={false}
                />

                <ModelShowcase
                    id="rbe-004"
                    title="RBE-004"
                    subtitle="Seguridad Industrial y Privada"
                    description="Patrullaje autónomo diseñado para la prevención de accidentes por fuga de gases, líquidos, y otros riesgos industriales en entornos críticos."
                    model3DUrl="/rbe/scene.gltf"
                    posterImg={cyberdogImg}
                    modelScale={1}
                    containerHeight="md:h-[400px]"
                    specs={[
                        { label: "Sensores", value: "Gas/Térmico" },
                        { label: "Inspección", value: "Autónoma 24/7" },
                        { label: "Rango", value: "10 KM" }
                    ]}
                    reversed={true}
                />
            </div>

            {/* Model 2: Delivery */}
            <ModelShowcase
                id="delivery"
                title="SAPIENS WAITER"
                subtitle="La mejor experiencia en su restaurante"
                description="La solución definitiva para la entrega rápida de comidas y asistencia en restaurantes. Capacidad de carga para múltiples platos y sensores de evasión 360° para un flujo de trabajo dinámico."
                videoUrl="/models/restaurant.mp4"
                posterImg={deliveryImg}
                showVideoIcon={false}
                specs={[
                    { label: "Carga", value: "45 KG" },
                    { label: "Velocidad", value: "1.2 m/s" },
                    { label: "Seguridad", value: "Evasión 360" }
                ]}
                reversed={true}
            />

            {/* Model 3: SKU-RBX-001 (Ads & Delivery) */}
            <ModelShowcase
                id="sku-rbx-001"
                title="SKU: RBX-001"
                subtitle="Publicidad y Logística Inteligente"
                description="El robot más versátil de la línea. Combina una pantalla publicitaria de gran formato con estantes abiertos para sampling, entrega de productos y marketing interactivo en retail."
                videoUrl="/models/sapiens-reception.webp"
                posterImg={skuImg}
                showVideoIcon={false}
                specs={[
                    { label: "Ads", value: "Full HD" },
                    { label: "Estantes", value: "4 Niveles" },
                    { label: "Uso", value: "Retail/Eventos" }
                ]}
                reversed={false}
            />


            {/* Final CTA */}
            <section className="py-32 flex flex-col items-center justify-center text-center px-4 bg-slate-900 text-white relative z-10">
                <XRayText
                    text="¿LISTO PARA COMENZAR?"
                    className="font-['Orbitron'] text-3xl md:text-5xl font-bold mb-12"
                />
                <EndlessButton text={<>Reservar<br />7 Días Gratis</>} link="/contacto" />
            </section>
        </main>
    )
}

function GLTFModel({ url, onLoad }) {
    const { scene, animations } = useGLTF(url)
    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        if (scene && onLoad) {
            onLoad()
        }
    }, [scene, onLoad])

    useEffect(() => {
        // Reproducir la animación principal automáticamente
        if (actions && Object.keys(actions).length > 0) {
            const firstAction = Object.keys(actions)[0]
            actions[firstAction].play()
        }
    }, [actions])

    return <primitive object={scene} />
}

class ErrorBoundary3D extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900/50 backdrop-blur-md rounded-[2rem] border border-red-500/50">
                    <span className="text-red-400 font-bold mb-2">Error cargando modelo 3D</span>
                    <span className="text-sm text-slate-300">Faltan archivos (posiblemente el .bin o texturas).</span>
                </div>
            );
        }
        return this.props.children;
    }
}

function ModelShowcase({
    id, title, subtitle, description, videoUrl, model3DUrl, posterImg, specs, reversed,
    showVideoIcon = true, modelScale = 2, containerHeight = 'md:h-[600px]', titleImage
}) {
    const videoRef = useRef(null)
    const [isModelLoaded, setIsModelLoaded] = useState(false)

    return (
        <Section id={id} className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-24 md:py-40 bg-transparent`}>
            {/* Visual Content (Video or Image Placeholder) */}
            <div className={`w-full md:w-[65%] relative group px-4 ${model3DUrl ? 'z-0' : 'z-20'}`}>
                {/* 
                    Contenedor del 3D/Video
                    Para 3D: full height, sin overflow-hidden para que pueda sobresalir.
                    Para Video: bordes curvos con máscara.
                */}
                <div className={`relative ${model3DUrl ? `w-full aspect-[4/5] md:aspect-auto ${containerHeight} overflow-visible` : 'aspect-video md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-200/50 bg-white/40 backdrop-blur-sm shadow-xl'} flex items-center justify-center`}>

                    {/* Main Media Layer (Video, Static Image, or 3D Loader) */}
                    {(videoUrl && videoUrl !== "") ? (
                        videoUrl.endsWith('.webp') ? (
                            <img
                                src={videoUrl}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-1000"
                                alt={title}
                            />
                        ) : (
                            <video
                                ref={videoRef}
                                src={videoUrl}
                                className="w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-1000"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                            />
                        )
                    ) : (posterImg && posterImg !== "") ? (
                        <div className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden rounded-[2rem] transition-all duration-1000 z-30 ${isModelLoaded && model3DUrl ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'}`}>
                            <img
                                src={posterImg}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                alt={title}
                            />
                            {showVideoIcon && !model3DUrl && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all duration-500 cursor-pointer">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : !model3DUrl ? (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 rounded-[2rem]">
                            No media available
                        </div>
                    ) : null}

                    {/* 3D Model Layer (Always rendered if model3DUrl exists) */}
                    {model3DUrl && (
                        <div className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-20 overflow-visible">
                            <ErrorBoundary3D>
                                <Suspense fallback={null}>
                                    <Canvas 
                                        frameloop="always"
                                        resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
                                        className="pointer-events-auto" 
                                        gl={{ powerPreference: "high-performance", antialias: true, preserveDrawingBuffer: true }} 
                                        camera={{ position: [0, 1.6, 7], fov: 45 }}
                                    >
                                        <ambientLight intensity={1.5} />
                                        <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" />
                                        <directionalLight position={[-10, 10, -5]} intensity={1.0} color="#ffffff" />
                                        <Environment preset="city" />
                                        <group position={[0, -1, 0]} scale={modelScale}>
                                            <GLTFModel url={model3DUrl} onLoad={() => setIsModelLoaded(true)} />
                                        </group>
                                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                                    </Canvas>
                                </Suspense>
                            </ErrorBoundary3D>
                        </div>
                    )}

                    {/* Overlay Details con transparencia */}
                    <div className={`absolute bottom-0 left-0 w-full p-8 ${model3DUrl ? '' : 'bg-gradient-to-t from-black/60 to-transparent'} z-30 pointer-events-none`}>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex flex-col border-l border-sky-400 pl-4">
                                    <span className={`text-[0.6rem] uppercase tracking-widest ${model3DUrl ? 'text-slate-500' : 'text-white/70'} font-bold`}>{spec.label}</span>
                                    <span className={`font-['Orbitron'] text-xs md:text-sm font-black ${model3DUrl ? 'text-sky-600' : 'text-sky-400'}`}>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className={`w-full md:w-[35%] flex flex-col ${reversed ? 'items-end text-end' : 'items-start text-start'} z-10`}>
                <div className="gs-fade-up">
                    <h2 className="font-['Orbitron'] text-[0.8rem] tracking-[0.4em] text-sky-600 font-bold uppercase mb-2">{subtitle}</h2>
                    <div className={`flex items-center gap-6 mb-6 justify-start flex-row`}>
                        <XRayText
                            text={title.replace(' ', '<br />')}
                            className="font-['Orbitron'] text-4xl md:text-6xl font-black leading-tight text-slate-900 whitespace-nowrap"
                            light={true}
                        />
                        {titleImage && <img src={titleImage} alt={title} className="w-48 md:w-64 h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]" />}
                    </div>
                    <p className="text-xl text-slate-600 font-normal leading-relaxed mb-10 max-w-xl">
                        {description}
                    </p>
                    <div className={`scale-90 ${reversed ? 'origin-right' : 'origin-left'}`}>
                        <EndlessButton text={<>Especificaciones<br />Téc. PDF</>} link="/contacto" />
                    </div>
                </div>
            </div>
        </Section>
    )
}
