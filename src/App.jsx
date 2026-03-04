// Sapiens Robotics - Premium 3D Landing Page
import React, { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, useAnimations } from '@react-three/drei'
import Spline from '@splinetool/react-spline'
import { ParticleNetwork } from './components/ParticleNetwork'
import { SapiensLogo } from './components/SapiensLogo'
import { XRayText } from './components/XRayText'
import { BlueprintParticles } from './components/BlueprintParticles'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Component for SECOND new DNA model (Chosen by user)
function DNA_Model_2(props) {
  const { scene, animations } = useGLTF('/models/dna/nuevo 2/scene.gltf')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((key) => {
        // CONGELADO TOTALMENTE: 0.0 internal moving
        actions[key]?.setEffectiveTimeScale(0.0)
        actions[key]?.play()
      })
    }
  }, [scene, actions])

  return (
    <group {...props}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

function DualDNA() {
  const dnaGroupRef = useRef()

  // HARDCODED USER PREFERENCES
  const rotX = 0;
  const rotY = 0;
  const rotZ = 0;
  // Dynamic scale: 2.0 for desktop, 1.2 for mobile
  const [dnaScale, setDnaScale] = useState(2.0);
  const autoRotate = true;

  useEffect(() => {
    const updateScale = () => setDnaScale(window.innerWidth < 768 ? 1.2 : 2.0)
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Sync DNA to Scroll: Only show in Section 2, make it perfectly vertical
  useFrame((state) => {
    if (!dnaGroupRef.current) return
    const scrollY = window.scrollY
    const vh = window.innerHeight
    const progress = (scrollY - vh) / vh

    if (autoRotate) {
      // Rotación global ultra lenta, casi estática (aún más lenta)
      dnaGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.015
      // Efecto de "respiración" ultra sutil y lento
      const zoomPulse = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
      dnaGroupRef.current.scale.setScalar(dnaScale * (1 + zoomPulse))
    } else {
      dnaGroupRef.current.rotation.y = 0
      dnaGroupRef.current.scale.setScalar(dnaScale)
    }

    if (progress < -0.3) {
      dnaGroupRef.current.visible = false
      dnaGroupRef.current.position.y = -40
    } else if (progress > 1.5) {
      dnaGroupRef.current.visible = false
      dnaGroupRef.current.position.y = 40
    } else {
      dnaGroupRef.current.visible = true
      dnaGroupRef.current.position.y = 0
    }
  })

  return (
    <group ref={dnaGroupRef} rotation={[THREE.MathUtils.degToRad(rotX), THREE.MathUtils.degToRad(rotY), THREE.MathUtils.degToRad(rotZ)]} scale={dnaScale}>
      {/* Elegido por el usuario: Solo Modelo Nuevo 2, centrado */}
      <DNA_Model_2 />
    </group>
  )
}

function Section({ id, children, className }) {
  return (
    <section id={id} className={`w-screen min-h-[150vh] flex flex-col justify-start px-6 md:px-32 relative z-10 ${className}`}>
      <div className="sticky top-[2vh] max-w-4xl pt-10 pb-20 w-full">
        {children}
      </div>
    </section>
  )
}

function EndlessButton({ text }) {
  // Responsive circular button: Smaller on mobile (120px vs 150px)
  return (
    <div className="relative mt-8 md:mt-12 inline-flex cursor-pointer group scale-[0.85] md:scale-100 origin-left">
      <div className="relative flex items-center justify-center w-[150px] h-[150px] rounded-full border border-white/60 bg-white/30 backdrop-blur-xl transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] z-10">

        {/* Outer Rotating Dashed Ring - Ultra High Visibility */}
        <div className="absolute inset-[-15px] rounded-full border-[2px] border-dashed border-white/80 animate-[spin_30s_linear_infinite] group-hover:border-[#38bdf8] group-hover:inset-[-20px] transition-all duration-500" />

        {/* Inner Tech Ring */}
        <div className="absolute inset-[6px] rounded-full border border-white/50 group-hover:border-white/80" />

        <span className="font-['Orbitron'] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-center leading-[1.5] w-[100px] text-white transition-colors duration-300 group-hover:text-black z-20">
          {text}
        </span>
      </div>
    </div>
  )
}

function App() {
  const mainRef = useRef()

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
    <div ref={mainRef} className="bg-[#08244a] text-white font-['Inter'] selection:bg-sky-400 selection:text-black min-h-screen">

      {/* HEADER WITH LOGO */}
      <header className="fixed top-0 left-0 w-full z-[100] px-8 pt-8 flex justify-start items-start pointer-events-none">
        <div className="pointer-events-auto">
          <SapiensLogo className="scale-100" />
        </div>
      </header>

      {/* GLOBAL FILM GRAIN (STITCH VERSION) */}
      <div className="film-grain-img" />

      {/* FULL-SCREEN AMBIENT PARTICLES */}
      <BlueprintParticles />

      {/* 3D WEBGL ENGINE (FIXED BACKGROUND) */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={['#08244a']} />
          <ambientLight intensity={4.5} />
          <directionalLight position={[0, 10, 15]} intensity={10} color="#ffffff" />
          <directionalLight position={[0, -5, 10]} intensity={5} color="#ffd700" />
          <pointLight position={[0, 0, 5]} intensity={6} color="#ffffff" distance={20} />

          <Suspense fallback={null}>
            <DualDNA />

            {/* 2. Particle Network Constellation */}
            <group position={[5, -10, -5]}>
              <ParticleNetwork count={120} radius={8} connectionDistance={2.0} />
            </group>
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>

      {/* HTML SCROLL OVERLAY */}
      <main className="relative w-full z-[40]">

        {/* SEC 1: HERO */}
        <section id="sec-1" className="h-[100vh] w-full flex flex-col items-center justify-center relative overflow-hidden pointer-events-auto">

          {/* Stitch UI Overlays (No Grid) */}
          <div className="hero-vignette" />
          <div className="hero-scanlines" />

          {/* Spline 3D Robot Background - Positioned and Scaled for mobile */}
          <div className="absolute inset-0 z-0 pointer-events-auto flex items-end justify-center overflow-hidden">
            <div className={`w-full h-full flex flex-col items-center justify-end transition-transform duration-700 ${isMobile ? 'scale-[0.6] translate-y-[-5vh]' : 'scale-[0.85] translate-y-[2vh]'}`}>
              <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
            </div>
          </div>

          <div className="text-center gs-hero-content z-20 relative -mt-[45vh] md:-mt-[50vh] pointer-events-auto px-4">
            <XRayText
              text="ROBOT<br />REVOLUTION"
              className="font-['Orbitron'] text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-black leading-[0.9] tracking-tighter mb-6 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)] pointer-events-auto"
            />

            <div className="flex flex-col items-center mt-10 pointer-events-none group">
              <div className="relative flex items-center justify-center w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border border-white/30 animate-pulse" />
                <div className="absolute inset-[-4px] rounded-full border border-dashed border-[#38bdf8]/50 animate-[spin_10s_linear_infinite]" />
                <div className="w-1 h-1 bg-[#38bdf8] rounded-full" />
              </div>
              <XRayText
                text="Explorar"
                className="text-[0.6rem] tracking-[0.4em] font-['Orbitron'] uppercase text-[#38bdf8] animate-pulse hover:text-white transition-colors"
                particles={150}
              />
            </div>
          </div>
        </section>

        {/* SEC 2: DNA */}
        <Section id="sec-2" className="items-start">
          <XRayText
            text="EL CÓDIGO TRANSMITE<br />CONFIANZA"
            className="gs-fade-up font-['Orbitron'] text-[1.8rem] md:text-[2.5rem] lg:text-[3.5rem] font-bold leading-tight mb-8 uppercase text-white"
          />
          <div className="gs-fade-up mt-[40vh] md:mt-[55vh]">
            <EndlessButton text={<>Ver<br />Modelos</>} />
          </div>
        </Section>

        {/* SEC 3: DATA CULTIVATED */}
        <Section id="sec-3" className="items-end text-right md:items-end md:text-right">
          <XRayText
            text='PAGA SOLO<br /><span className="text-[#38bdf8]">POR SERVICIO</span>'
            className="gs-fade-up font-['Orbitron'] text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold leading-tight mb-8"
          />
          <div className="gs-fade-up flex flex-col items-end">
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl font-light text-justify">
              Con el modelo RaaS (Robot as a Service), Sapiens Robotics se encarga del mantenimiento preventivo, soporte y actualizaciones. Tu única preocupación será ver cómo mejora la experiencia de tu marca con el cliente.
            </p>
            <EndlessButton text={<>Sectores<br />Clave</>} />
          </div>
        </Section>

        {/* SEC 4: REALITY */}
        <Section id="sec-4" className="items-start">
          <XRayText
            text='INTEGRATE<br /><span className="text-white">HOY MISMO</span>'
            className="gs-fade-up font-['Orbitron'] text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold leading-tight mb-8 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]"
          />
          <div className="gs-fade-up">
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl font-light text-justify">
              Agenta tu demostracion, estamos ofreciendo 7 dias gratis en cualquier PV del pais* .
            </p>
            <EndlessButton text={<>Contactar<br />Asesor</>} />
          </div>
        </Section>
      </main>
    </div >
  )
}

export default App
