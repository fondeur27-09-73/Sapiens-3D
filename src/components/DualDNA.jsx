import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

// Component for the new GALACTIC DNA model
function DNA_Model_2(props) {
    const { scene, animations } = useGLTF('/models/dna/galactic_incident/scene.gltf')
    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        if (actions) {
            Object.keys(actions).forEach((key) => {
                actions[key]?.setEffectiveTimeScale(0.0)
                actions[key]?.play()
            })
        }
    }, [scene, actions])

    return (
        <group {...props}>
            <Center>
                <primitive object={scene} scale={1.2} />
            </Center>
        </group>
    )
}

export function DualDNA() {
    const dnaGroupRef = useRef()

    // --- AJUSTES FINALES DEL ADN GUARDADOS ---
    // Valores proporcionados por el usuario
    const speed = 0.09;      // Velocidad Giro
    const pulse = 0.20;      // Intensidad Latido
    const scaleMult = 1.8;   // Tamaño (Escala)
    const posY = -106;       // Altura Y (Arriba/Abajo)
    const posZ = -161;       // Acercamiento Z (Profundidad)
    const rotX = -6;         // Inclinación X

    const autoRotate = true;

    // Sync DNA to Scroll
    useFrame((state) => {
        if (!dnaGroupRef.current) return
        const scrollY = window.scrollY
        const vh = window.innerHeight
        const progress = scrollY / vh

        // Dynamic scale based on window width
        const baseScale = window.innerWidth < 768 ? scaleMult * 0.6 : scaleMult

        if (autoRotate) {
            dnaGroupRef.current.rotation.y = state.clock.getElapsedTime() * speed;
            const zoomPulse = Math.sin(state.clock.getElapsedTime() * 0.1) * pulse;
            dnaGroupRef.current.scale.setScalar(baseScale * (1 + zoomPulse))
        } else {
            dnaGroupRef.current.rotation.y = 0
            dnaGroupRef.current.scale.setScalar(baseScale)
        }

        // Visibility range
        if (progress > 2.2) {
            dnaGroupRef.current.visible = false
        } else {
            dnaGroupRef.current.visible = true
            dnaGroupRef.current.position.y = posY; 
            dnaGroupRef.current.position.z = posZ;
        }
    })

    return (
        <group ref={dnaGroupRef} rotation={[THREE.MathUtils.degToRad(rotX), 0, 0]}>
            <DNA_Model_2 />
        </group>
    )
}
