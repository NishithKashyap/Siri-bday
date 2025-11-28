import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
}

const BirthdayHero = () => {
    const container = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create text particles
        const createTextParticles = () => {
            const text = 'HAPPY BIRTHDAY SIRIII';
            // Better mobile responsive font sizing
            const fontSize = window.innerWidth < 640
                ? Math.min(window.innerWidth / 15, 60)  // Smaller on mobile
                : Math.min(window.innerWidth / 12, 100); // Larger on desktop
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const x = canvas.width / 2;
            const y = canvas.height / 2 - 50;

            // Add dark shadow for better visibility
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.fillText(text, x, y);

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Get pixel data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            const particles: Particle[] = [];
            // Restored original colorful palette
            const colors = ['#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#f97316'];

            // Sample pixels to create particles
            for (let y = 0; y < canvas.height; y += 4) {
                for (let x = 0; x < canvas.width; x += 4) {
                    const index = (y * canvas.width + x) * 4;
                    const alpha = pixels[index + 3];

                    if (alpha > 128) {
                        const randomX = Math.random() * canvas.width;
                        const randomY = Math.random() * canvas.height;

                        particles.push({
                            x: randomX,
                            y: randomY,
                            targetX: x,
                            targetY: y,
                            vx: 0,
                            vy: 0,
                            color: colors[Math.floor(Math.random() * colors.length)],
                            size: Math.random() * 2.5 + 1.5 // Slightly larger particles
                        });
                    }
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return particles;
        };

        particlesRef.current = createTextParticles();

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            // Use destination-out to fade existing pixels to transparent
            // This reveals the CSS background underneath instead of painting white on top
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Reset composite operation for drawing new particles
            ctx.globalCompositeOperation = 'source-over';

            particlesRef.current.forEach((particle) => {
                // Calculate force towards target
                const dx = particle.targetX - particle.x;
                const dy = particle.targetY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Apply spring force
                const force = distance * 0.05;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;

                // Apply damping
                particle.vx *= 0.9;
                particle.vy *= 0.9;

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Add some random movement
                particle.x += (Math.random() - 0.5) * 0.5;
                particle.y += (Math.random() - 0.5) * 0.5;

                // Draw particle
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start animation after a delay
        setTimeout(() => {
            animate();
        }, 500);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Fade in canvas
        tl.from(canvasRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50"
        >
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Floating Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Heart 1 */}
                <div className="absolute top-[10%] left-[15%] text-pink-400 opacity-60 animate-float-1">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 2 */}
                <div className="absolute top-[25%] right-[20%] text-red-400 opacity-50 animate-float-2">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 3 */}
                <div className="absolute top-[50%] left-[10%] text-purple-400 opacity-40 animate-float-3">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 4 */}
                <div className="absolute top-[70%] right-[15%] text-pink-500 opacity-45 animate-float-1">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 5 */}
                <div className="absolute top-[35%] left-[25%] text-red-300 opacity-35 animate-float-2">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 6 */}
                <div className="absolute top-[15%] right-[30%] text-pink-300 opacity-50 animate-float-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 7 */}
                <div className="absolute top-[60%] left-[35%] text-purple-300 opacity-40 animate-float-1">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                {/* Heart 8 */}
                <div className="absolute top-[80%] right-[25%] text-red-400 opacity-35 animate-float-2">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>

            {/* Decorative Plants - Left Side */}
            <div className="absolute bottom-0 left-0 z-20 hidden md:block">
                <img
                    src="plant-left.png"
                    alt="Decorative plant"
                    className="h-64 lg:h-80 w-auto object-contain animate-sway drop-shadow-xl"
                />
            </div>

            {/* Decorative Plants - Right Side */}
            <div className="absolute bottom-0 right-0 z-20 hidden md:block">
                <img
                    src="plant-right.png"
                    alt="Decorative plant"
                    className="h-64 lg:h-80 w-auto object-contain animate-sway-reverse drop-shadow-xl"
                />
            </div>

            {/* Mobile Plants - Smaller versions */}
            <div className="absolute bottom-0 left-0 z-20 md:hidden">
                <img
                    src="plant-left.png"
                    alt="Decorative plant"
                    className="h-40 w-auto object-contain animate-sway drop-shadow-lg"
                />
            </div>
            <div className="absolute bottom-0 right-0 z-20 md:hidden">
                <img
                    src="plant-right.png"
                    alt="Decorative plant"
                    className="h-40 w-auto object-contain animate-sway-reverse drop-shadow-lg"
                />
            </div>

            {/* Subtitle overlay - Updated for white background */}
            <div className="absolute bottom-24 md:bottom-32 left-4 right-4 md:left-0 md:right-0 z-10 text-center px-4">
                <p className="text-base sm:text-xl md:text-3xl text-gray-700 font-light bg-white/80 backdrop-blur-md rounded-full px-4 sm:px-8 py-3 sm:py-4 inline-block shadow-xl border-2 border-pink-200">
                    ✨ Celebrating the most amazing person ✨
                </p>
            </div>

            {/* Hanging Photos - Made responsive */}
            <div className="absolute top-16 md:top-20 left-0 right-0 z-10 flex justify-center gap-2 sm:gap-4 md:gap-8 px-4 md:px-8">
                {/* Photo 1 */}
                <div className="hanging-photo-container">
                    <div className="thread"></div>
                    <div className="photo-frame bg-white p-1 sm:p-2 shadow-2xl transform hover:scale-105 transition-transform">
                        <img
                            src="assets/her/her4.jpg"
                            alt="Memory 1"
                            className="w-20 h-24 sm:w-32 sm:h-40 object-cover"
                        />
                    </div>
                </div>

                {/* Photo 2 */}
                <div className="hanging-photo-container animation-delay-1000">
                    <div className="thread"></div>
                    <div className="photo-frame bg-white p-1 sm:p-2 shadow-2xl transform hover:scale-105 transition-transform">
                        <img
                            src="assets/her/her14.jpg"
                            alt="Memory 2"
                            className="w-20 h-24 sm:w-32 sm:h-40 object-cover"
                        />
                    </div>
                </div>

                {/* Photo 3 */}
                <div className="hanging-photo-container animation-delay-2000">
                    <div className="thread"></div>
                    <div className="photo-frame bg-white p-1 sm:p-2 shadow-2xl transform hover:scale-105 transition-transform">
                        <img
                            src="assets/her/her20.jpg"
                            alt="Memory 3"
                            className="w-20 h-24 sm:w-32 sm:h-40 object-cover"
                        />
                    </div>
                </div>

                {/* Photo 4 - Hidden on mobile */}
                <div className="hanging-photo-container animation-delay-3000 hidden sm:block">
                    <div className="thread"></div>
                    <div className="photo-frame bg-white p-1 sm:p-2 shadow-2xl transform hover:scale-105 transition-transform">
                        <img
                            src="assets/her/her22.jpg"
                            alt="Memory 4"
                            className="w-20 h-24 sm:w-32 sm:h-40 object-cover"
                        />
                    </div>
                </div>

                {/* Photo 5 - Hidden on mobile */}
                <div className="hanging-photo-container animation-delay-4000 hidden sm:block">
                    <div className="thread"></div>
                    <div className="photo-frame bg-white p-1 sm:p-2 shadow-2xl transform hover:scale-105 transition-transform">
                        <img
                            src="assets/her/her19.jpg"
                            alt="Memory 5"
                            className="w-20 h-24 sm:w-32 sm:h-40 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Decorative background effects - Subtle for white background */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

            {/* CSS for animations */}
            <style>{`
                @keyframes float-1 {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    50% { 
                        transform: translateY(-20px) rotate(5deg); 
                    }
                }
                
                @keyframes float-2 {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    50% { 
                        transform: translateY(-30px) rotate(-5deg); 
                    }
                }
                
                @keyframes float-3 {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    50% { 
                        transform: translateY(-25px) rotate(3deg); 
                    }
                }
                
                .animate-float-1 {
                    animation: float-1 6s ease-in-out infinite;
                }
                
                .animate-float-2 {
                    animation: float-2 7s ease-in-out infinite;
                }
                
                .animate-float-3 {
                    animation: float-3 8s ease-in-out infinite;
                }
                
                @keyframes sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2deg); }
                }
                
                @keyframes sway-reverse {
                    0%, 100% { transform: rotate(0deg) scaleX(-1); }
                    50% { transform: rotate(-2deg) scaleX(-1); }
                }
                
                .animate-sway {
                    animation: sway 4s ease-in-out infinite;
                    transform-origin: bottom center;
                }
                
                .animate-sway-reverse {
                    animation: sway-reverse 4.5s ease-in-out infinite;
                    transform-origin: bottom center;
                }
            `}</style>
        </section>
    );
};

export default BirthdayHero;
