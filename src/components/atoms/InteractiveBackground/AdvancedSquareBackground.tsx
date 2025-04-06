import type React from "react"
import {useEffect, useRef} from "react"

interface Particle {
    x: number
    y: number
    size: number
    angle: number
    rotationSpeed: number
    orbitRadius: number
    orbitSpeed: number
    orbitAngle: number
    color: string
    opacity: number
    pulseSpeed: number
    pulseAmount: number
    pulsePhase: number
}

interface AdvancedSquareBackgroundProps {
    particleCount?: number
    primaryColor?: string
    secondaryColor?: string
    centerOffsetX?: number
    centerOffsetY?: number
    mouseInfluence?: number
    minSize?: number
    maxSize?: number
    pulseEffect?: boolean
    multipleOrbits?: boolean
}

const AdvancedSquareBackground: React.FC<AdvancedSquareBackgroundProps> = ({
                                                                               particleCount = 80,
                                                                               primaryColor = "#5e3bee",
                                                                               secondaryColor = "#ffffff",
                                                                               centerOffsetX = 0.2,
                                                                               centerOffsetY = -0.1,
                                                                               mouseInfluence = 100,
                                                                               minSize = 5,
                                                                               maxSize = 20,
                                                                               pulseEffect = true,
                                                                               multipleOrbits = true,
                                                                           }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({x: 0, y: 0, active: false})
    const animationRef = useRef<number>(0)
    const timeRef = useRef<number>(0)
    const centersRef = useRef<{ x: number; y: number }[]>([])

    const getRandomColor = () => {
        const ratio = Math.random()
        const r1 = Number.parseInt(primaryColor.slice(1, 3), 16)
        const g1 = Number.parseInt(primaryColor.slice(3, 5), 16)
        const b1 = Number.parseInt(primaryColor.slice(5, 7), 16)

        const r2 = Number.parseInt(secondaryColor.slice(1, 3), 16)
        const g2 = Number.parseInt(secondaryColor.slice(3, 5), 16)
        const b2 = Number.parseInt(secondaryColor.slice(5, 7), 16)

        const r = Math.floor(r1 + (r2 - r1) * ratio)
        const g = Math.floor(g1 + (g2 - g1) * ratio)
        const b = Math.floor(b1 + (b2 - b1) * ratio)

        return `rgb(${r}, ${g}, ${b})`
    }

    const initParticles = (width: number, height: number) => {
        const mainCenter = {
            x: width * (0.5 + centerOffsetX),
            y: height * (0.5 + centerOffsetY),
        }

        centersRef.current = [mainCenter]

        if (multipleOrbits) {
            centersRef.current.push({
                x: width * (0.3 - centerOffsetX * 0.5),
                y: height * (0.7 + centerOffsetY * 0.5),
            })

            centersRef.current.push({
                x: width * (0.7 + centerOffsetX * 0.5),
                y: height * (0.3 - centerOffsetY * 0.5),
            })
        }

        const particles: Particle[] = []
        for (let i = 0; i < particleCount; i++) {
            const centerIndex = Math.floor(Math.random() * centersRef.current.length)
            const center = centersRef.current[centerIndex]

            const orbitRadius = 50 + Math.random() * (width * 0.3)

            const orbitAngle = Math.random() * Math.PI * 2

            const x = center.x + Math.cos(orbitAngle) * orbitRadius
            const y = center.y + Math.sin(orbitAngle) * orbitRadius

            particles.push({
                x,
                y,
                size: minSize + Math.random() * (maxSize - minSize),
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() * 0.02 - 0.01) * Math.PI,
                orbitRadius,
                orbitSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
                orbitAngle,
                color: getRandomColor(),
                opacity: 0.3 + Math.random() * 0.5,
                pulseSpeed: 0.05 + Math.random() * 0.1,
                pulseAmount: 0.2 + Math.random() * 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
            })
        }
        return particles
    }

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle, time: number) => {
        ctx.save()

        ctx.translate(particle.x, particle.y)

        ctx.rotate(particle.angle)

        ctx.fillStyle = particle.color

        let opacity = particle.opacity
        if (pulseEffect) {
            opacity =
                particle.opacity * (1 + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * particle.pulseAmount)
        }
        ctx.globalAlpha = opacity

        const halfSize = particle.size / 2
        ctx.fillRect(-halfSize, -halfSize, particle.size, particle.size)

        ctx.restore()
    }

    const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[], time: number) => {
        const connectionDistance = 100

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < connectionDistance) {
                    ctx.beginPath()

                    const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
                    gradient.addColorStop(0, particles[i].color)
                    gradient.addColorStop(1, particles[j].color)

                    ctx.strokeStyle = gradient

                    let opacity = 0.2 * (1 - distance / connectionDistance)
                    if (pulseEffect) {
                        opacity *= 0.7 + 0.3 * Math.sin(time * 0.001 + (particles[i].x + particles[j].x) * 0.01)
                    }

                    ctx.globalAlpha = opacity
                    ctx.lineWidth = 1
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.stroke()
                }
            }
        }
    }

    const updateParticles = (
        particles: Particle[],
        width: number,
        height: number,
        mouseX: number,
        mouseY: number,
        mouseActive: boolean,
    ) => {
        return particles.map((particle, index) => {
            // Update rotation angle
            const newAngle = particle.angle + particle.rotationSpeed

            // Update orbit angle
            const newOrbitAngle = particle.orbitAngle + particle.orbitSpeed

            // Choose center based on particle index
            const centerIndex = multipleOrbits ? index % centersRef.current.length : 0
            const center = centersRef.current[centerIndex]

            // Calculate new position based on orbit
            let newX = center.x + Math.cos(newOrbitAngle) * particle.orbitRadius
            let newY = center.y + Math.sin(newOrbitAngle) * particle.orbitRadius

            // Mouse influence
            if (mouseActive) {
                const dx = mouseX - newX
                const dy = mouseY - newY
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseInfluence) {
                    // Repel from mouse
                    const force = (mouseInfluence - distance) / mouseInfluence
                    const repelX = -dx * force * 0.05
                    const repelY = -dy * force * 0.05

                    newX += repelX
                    newY += repelY
                }
            }

            if (newX < -particle.size) newX = width + particle.size
            if (newX > width + particle.size) newX = -particle.size
            if (newY < -particle.size) newY = height + particle.size
            if (newY > height + particle.size) newY = -particle.size

            return {
                ...particle,
                x: newX,
                y: newY,
                angle: newAngle,
                orbitAngle: newOrbitAngle,
            }
        })
    }

    const animate = (timestamp: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        timeRef.current = timestamp

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particlesRef.current = updateParticles(
            particlesRef.current,
            canvas.width,
            canvas.height,
            mouseRef.current.x,
            mouseRef.current.y,
            mouseRef.current.active,
        )

        // Draw connections
        drawConnections(ctx, particlesRef.current, timestamp)

        // Draw particles
        particlesRef.current.forEach((particle) => drawParticle(ctx, particle, timestamp))

        // Continue animation
        animationRef.current = requestAnimationFrame(animate)
    }

    // Handle resize
    const handleResize = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Reinitialize particles on resize
        particlesRef.current = initParticles(canvas.width, canvas.height)
    }

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = {
            x: e.clientX,
            y: e.clientY,
            active: true,
        }
    }

    // Handle mouse leave
    const handleMouseLeave = () => {
        mouseRef.current.active = false
    }

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            mouseRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                active: true,
            }
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            mouseRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                active: true,
            }
        }
    }

    const handleTouchEnd = () => {
        mouseRef.current.active = false
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Set canvas size
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Initialize particles
        particlesRef.current = initParticles(canvas.width, canvas.height)

        // Start animation
        animationRef.current = requestAnimationFrame(animate)

        // Add event listeners
        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseleave", handleMouseLeave)

        // Touch events for mobile
        window.addEventListener("touchstart", handleTouchStart)
        window.addEventListener("touchmove", handleTouchMove)
        window.addEventListener("touchend", handleTouchEnd)

        // Cleanup
        return () => {
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("touchstart", handleTouchStart)
            window.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("touchend", handleTouchEnd)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                background: `linear-gradient(135deg, ${primaryColor} 0%, #7857f7 100%)`,
            }}
        />
    )
}

export default AdvancedSquareBackground

