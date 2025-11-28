import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const GiftBox = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const lidRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useGSAP(() => {
        // Initial floating animation
        gsap.to(boxRef.current, {
            y: -20,
            rotation: 5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        // Glow effect
        gsap.to(".glow-effect", {
            opacity: 0.8,
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);
        setShowConfetti(true);

        const tl = gsap.timeline();

        // Stop floating
        gsap.killTweensOf(boxRef.current);

        // Open animation
        tl.to(boxRef.current, {
            y: 50,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        })
            .to(lidRef.current, {
                y: -200,
                rotation: -20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.in"
            })
            .to(".gift-content", {
                y: -100,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.4");
    };

    return (
        <section ref={containerRef} className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-900 py-20">
            {/* Background Stars */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`,
                            opacity: Math.random() * 0.7,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-4">
                    A Special Surprise
                </h2>
                <p className="text-indigo-200 text-lg">Tap the box to reveal your gift!</p>
            </div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer perspective-1000" onClick={handleOpen}>
                {/* Glow Effect */}
                <div className="glow-effect absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-500/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                {/* Gift Box Container */}
                <div ref={boxRef} className="relative w-full h-full preserve-3d transition-transform duration-500 hover:scale-105">

                    {/* The Gift Content (Hidden initially) */}
                    <div className="gift-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 text-center opacity-0 scale-0 z-0 flex flex-col items-center">
                        {/* SVG Teddy Bear */}
                        <div className="w-40 h-40 relative mb-4 filter drop-shadow-lg">
                            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                                {/* Ears */}
                                <circle cx="50" cy="50" r="25" fill="#8B5A2B" />
                                <circle cx="50" cy="50" r="15" fill="#CD853F" />
                                <circle cx="150" cy="50" r="25" fill="#8B5A2B" />
                                <circle cx="150" cy="50" r="15" fill="#CD853F" />

                                {/* Head */}
                                <circle cx="100" cy="80" r="60" fill="#8B5A2B" />

                                {/* Snout */}
                                <ellipse cx="100" cy="95" rx="25" ry="20" fill="#CD853F" />
                                <ellipse cx="100" cy="85" rx="10" ry="8" fill="#3E2723" />

                                {/* Eyes */}
                                <circle cx="80" cy="70" r="5" fill="#000" />
                                <circle cx="120" cy="70" r="5" fill="#000" />
                                {/* Eye highlights */}
                                <circle cx="82" cy="68" r="2" fill="#FFF" />
                                <circle cx="122" cy="68" r="2" fill="#FFF" />

                                {/* Mouth */}
                                <path d="M 90 105 Q 100 115 110 105" stroke="#3E2723" strokeWidth="3" fill="none" />

                                {/* Body */}
                                <ellipse cx="100" cy="160" rx="55" ry="60" fill="#8B5A2B" />
                                <ellipse cx="100" cy="160" rx="30" ry="35" fill="#CD853F" />

                                {/* Arms */}
                                <g className="animate-wave origin-bottom-right">
                                    <ellipse cx="40" cy="130" rx="20" ry="35" fill="#8B5A2B" transform="rotate(-20 40 130)" />
                                </g>
                                <ellipse cx="160" cy="130" rx="20" ry="35" fill="#8B5A2B" transform="rotate(20 160 130)" />

                                {/* Legs */}
                                <ellipse cx="70" cy="200" rx="25" ry="30" fill="#8B5A2B" />
                                <circle cx="70" cy="205" r="12" fill="#CD853F" />
                                <ellipse cx="130" cy="200" rx="25" ry="30" fill="#8B5A2B" />
                                <circle cx="130" cy="205" r="12" fill="#CD853F" />
                            </svg>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl">
                            <div className="text-2xl font-extrabold text-pink-300 mb-1">Big Hugs!</div>
                            <p className="text-indigo-100 text-sm">Always here for you ❤️</p>
                        </div>
                    </div>

                    {/* Box Body */}
                    <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-br from-pink-600 to-purple-700 rounded-b-xl shadow-2xl z-10 flex items-center justify-center overflow-hidden">
                        {/* Ribbon Vertical */}
                        <div className="absolute top-0 bottom-0 w-12 bg-yellow-400 shadow-sm"></div>
                        {/* Box Shading */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    {/* Box Lid */}
                    <div ref={lidRef} className="absolute top-[15%] left-[-5%] w-[110%] h-1/4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-lg z-20 flex items-center justify-center">
                        {/* Ribbon Vertical */}
                        <div className="absolute top-0 bottom-0 w-12 bg-yellow-400 shadow-sm"></div>
                        {/* Ribbon Horizontal (Bow Base) */}
                        <div className="absolute top-1/2 left-0 right-0 h-2 bg-black/10"></div>

                        {/* The Bow */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-12">
                            <div className="absolute left-0 w-10 h-10 bg-yellow-400 rounded-full rounded-br-none transform -rotate-45 border-2 border-yellow-500"></div>
                            <div className="absolute right-0 w-10 h-10 bg-yellow-400 rounded-full rounded-bl-none transform rotate-45 border-2 border-yellow-500"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-300 rounded-full shadow-inner z-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confetti (Simple CSS/SVG implementation for performance) */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-3 h-3 rounded-sm ${['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500'][i % 5]}`}
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                                animation: `explode 1s ease-out forwards ${Math.random() * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <style>{`
                @keyframes explode {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() * 800 - 400}px, ${Math.random() * 800 - 400}px) scale(0) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
        </section>
    );
};

export default GiftBox;
