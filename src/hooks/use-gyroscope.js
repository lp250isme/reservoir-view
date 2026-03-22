import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook that provides device tilt (beta/gamma) normalized to -1..1.
 * Falls back to mouse position on desktop.
 * Returns { x, y, active } where x/y are -1..1.
 */
export function useGyroscope() {
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })
  const rafRef = useRef(null)
  const rawRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })

  // Smooth interpolation via rAF
  useEffect(() => {
    let running = true
    const lerp = (a, b, t) => a + (b - a) * t

    function tick() {
      if (!running) return
      smoothRef.current.x = lerp(smoothRef.current.x, rawRef.current.x, 0.08)
      smoothRef.current.y = lerp(smoothRef.current.y, rawRef.current.y, 0.08)
      setTilt({
        x: smoothRef.current.x,
        y: smoothRef.current.y,
        active: true,
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Device orientation (mobile gyroscope)
  useEffect(() => {
    let hasGyro = false

    const handleOrientation = (e) => {
      hasGyro = true
      // beta: front-back tilt (-180..180), gamma: left-right tilt (-90..90)
      const x = Math.max(-1, Math.min(1, (e.gamma || 0) / 45))
      const y = Math.max(-1, Math.min(1, (e.beta || 0) / 45))
      rawRef.current = { x, y }
    }

    // Try requesting permission (iOS 13+)
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Will be triggered on user gesture later
    }

    window.addEventListener('deviceorientation', handleOrientation, true)

    // Desktop fallback: track mouse
    const handleMouse = (e) => {
      if (hasGyro) return
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      rawRef.current = { x, y }
    }

    window.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  // Request iOS permission on first tap
  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission()
        return perm === 'granted'
      } catch {
        return false
      }
    }
    return true
  }, [])

  return { ...tilt, requestPermission }
}
