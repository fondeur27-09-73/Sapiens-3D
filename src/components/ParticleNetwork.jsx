import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleNetwork({ count = 120, radius = 6, connectionDistance = 2.0, light = false }) {
  const points = useRef()
  const lines = useRef()

  // Base brand blue: #38bdf8 -> (56, 189, 248)
  const brandBlue = {
    r: 56 / 255,
    g: 189 / 255,
    b: 248 / 255
  }

  // Generate random starting positions, velocities, and a custom "blink phase" for each sphere
  const [positions, velocities, blinkPhases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = []
    const phases = []

    for (let i = 0; i < count; i++) {
      // Spread them in a spherical volume
      pos[i * 3] = (Math.random() - 0.5) * radius * 2
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2

      // Random slow floating velocity
      vel.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      })

      // Random phase so they don't all blink at the same time
      phases.push(Math.random() * Math.PI * 2)
    }
    return [pos, vel, phases]
  }, [count, radius])

  // Create geometry for the connecting lines
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * count * 6), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * count * 8), 4))
    return geo
  }, [count])

  // Create an array to hold the colors of the SPHERES themselves so they can glow individually
  const pointColors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      colors[i * 3] = brandBlue.r
      colors[i * 3 + 1] = brandBlue.g
      colors[i * 3 + 2] = brandBlue.b
    }
    return colors
  }, [count, brandBlue])

  // Geometry for the Spheres
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3))
    return geo
  }, [positions, pointColors])


  // The rendering loop
  useFrame((state) => {
    if (!points.current || !lines.current) return

    const time = state.clock.getElapsedTime()
    const positionsArray = points.current.geometry.attributes.position.array
    const colorsArray = points.current.geometry.attributes.color.array

    const linePositions = lines.current.geometry.attributes.position.array
    const lineColors = lines.current.geometry.attributes.color.array

    let lineIdx = 0
    let colorIdx = 0

    // 1. Update Particle Positions and make some "blink" like bulbs
    for (let i = 0; i < count; i++) {
      let x = positionsArray[i * 3] + velocities[i].x
      let y = positionsArray[i * 3 + 1] + velocities[i].y
      let z = positionsArray[i * 3 + 2] + velocities[i].z

      if (Math.abs(x) > radius) velocities[i].x *= -1
      if (Math.abs(y) > radius) velocities[i].y *= -1
      if (Math.abs(z) > radius) velocities[i].z *= -1

      positionsArray[i * 3] = x
      positionsArray[i * 3 + 1] = y
      positionsArray[i * 3 + 2] = z

      // The "Bulb Blinking" effect: Pulse with the brand blue
      if (i % 5 === 0) {
        // Uses a Sine wave to pulse on and off smoothly
        const pulse = (Math.sin(time * 2.0 + blinkPhases[i]) + 1) / 2

        // Keep it blue, just make it more vibrant/saturated or brighter but Blue
        colorsArray[i * 3] = brandBlue.r * (1 + pulse * 0.5)
        colorsArray[i * 3 + 1] = brandBlue.g * (1 + pulse * 0.5)
        colorsArray[i * 3 + 2] = brandBlue.b * (1 + pulse * 0.5)
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true
    points.current.geometry.attributes.color.needsUpdate = true

    // 2. Draw Lines between close particles
    for (let i = 0; i < count; i++) {
      let connections = 0;
      for (let j = i + 1; j < count; j++) {

        // Limit connections per sphere to prevent a messy web (matches user request of "connected in 5, 3, 2, etc")
        if (connections > 4) break;

        const dx = positionsArray[i * 3] - positionsArray[j * 3]
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1]
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2]

        const distSq = dx * dx + dy * dy + dz * dz

        if (distSq < connectionDistance * connectionDistance) {
          connections++;
          const dist = Math.sqrt(distSq)
          const alpha = 1.0 - (dist / connectionDistance)

          // Start vertex
          linePositions[lineIdx++] = positionsArray[i * 3]
          linePositions[lineIdx++] = positionsArray[i * 3 + 1]
          linePositions[lineIdx++] = positionsArray[i * 3 + 2]

          // Use Brand Blue for lines
          lineColors[colorIdx++] = brandBlue.r
          lineColors[colorIdx++] = brandBlue.g
          lineColors[colorIdx++] = brandBlue.b
          lineColors[colorIdx++] = alpha * (light ? 0.9 : 0.6)

          linePositions[lineIdx++] = positionsArray[j * 3]
          linePositions[lineIdx++] = positionsArray[j * 3 + 1]
          linePositions[lineIdx++] = positionsArray[j * 3 + 2]

          lineColors[colorIdx++] = brandBlue.r
          lineColors[colorIdx++] = brandBlue.g
          lineColors[colorIdx++] = brandBlue.b
          lineColors[colorIdx++] = alpha * (light ? 0.9 : 0.6)
        }
      }
    }

    lines.current.geometry.setDrawRange(0, lineIdx / 3)
    lines.current.geometry.attributes.position.needsUpdate = true
    lines.current.geometry.attributes.color.needsUpdate = true

    points.current.rotation.y += 0.001
    lines.current.rotation.y += 0.001
  })

  /* The fix is here: By using a beautiful circle texture map (or simply vertexColors and appropriate point size), WebGL renders perfect spheres instead of raw un-aliased squares */

  // Create a procedural circular texture exactly like real WebGL engines do to turn squares into glowing spheres
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d')

    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')

    context.fillStyle = gradient
    context.beginPath()
    context.arc(32, 32, 32, 0, Math.PI * 2)
    context.fill()

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  return (
    <group>
      {/* PERFECT GLOWING SPHERES */}
      <points ref={points} geometry={pointsGeometry}>
        <pointsMaterial
          size={light ? 0.35 : 0.25}
          vertexColors={true}
          map={circleTexture}
          transparent={true}
          depthWrite={false}
          alphaTest={0.01}
          opacity={light ? 1 : 0.8}
          blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </points>

      {/* The Connecting Lines */}
      <lineSegments ref={lines} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors={true}
          transparent
          depthWrite={false}
          opacity={light ? 0.7 : 0.5}
          blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}
