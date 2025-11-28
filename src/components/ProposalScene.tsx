import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Flower } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProposalScene = () => {
    const container = useRef<HTMLDivElement>(null);
    const guyRef = useRef<HTMLDivElement>(null);
    const girlRef = useRef<HTMLDivElement>(null);
    const flowerRef = useRef<HTMLDivElement>(null);
    const heartRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=2000", // Long scroll distance for the animation
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // Initial state
        gsap.set(flowerRef.current, { scale: 0, opacity: 0 });
        gsap.set(heartRef.current, { scale: 0, opacity: 0, y: -50 });

        // Animation sequence
        tl.to(guyRef.current, {
            x: "15vw", // Move guy towards center
            duration: 5,
            ease: "none"
        })
            .to(girlRef.current, {
                x: "-15vw", // Move girl towards center
                duration: 5,
                ease: "none"
            }, "<") // Run at same time

            // Guy kneels (simple rotation/scale for now)
            .to(guyRef.current, {
                rotation: -10,
                y: 20,
                duration: 1,
                ease: "power1.inOut"
            })

            // Flowers appear
            .to(flowerRef.current, {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "back.out(1.7)"
            })

            // Heart pops up
            .to(heartRef.current, {
                scale: 1,
                opacity: 1,
                y: -100,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });

    }, { scope: container });

    return (
        <section ref={container} className="h-screen bg-sky-50 overflow-hidden relative flex items-end justify-center pb-32">

            {/* Background Elements */}
            <div className="absolute top-20 left-20 w-20 h-20 bg-yellow-200 rounded-full blur-xl opacity-50"></div>
            <div className="absolute top-40 right-40 w-32 h-32 bg-pink-200 rounded-full blur-xl opacity-50"></div>

            {/* The Guy - Cartoon Style */}
            <div ref={guyRef} className="absolute left-[10%] bottom-32 flex flex-col items-center z-10">
                {/* Head with face */}
                <div className="relative w-20 h-20 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full mb-1 shadow-xl border-4 border-blue-500">
                    {/* Hair */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-amber-900 rounded-t-full"></div>
                    {/* Eyes */}
                    <div className="absolute top-7 left-3 w-3 h-4 bg-white rounded-full">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <div className="absolute top-7 right-3 w-3 h-4 bg-white rounded-full">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    {/* Smile */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-3 border-b-2 border-black rounded-b-full"></div>
                </div>

                {/* Body */}
                <div className="relative w-24 h-36 bg-gradient-to-b from-blue-600 to-blue-700 rounded-2xl shadow-lg">
                    {/* Arms */}
                    <div className="absolute -left-6 top-4 w-5 h-24 bg-blue-600 rounded-full origin-top transform rotate-12 shadow-md"></div>
                    <div className="absolute -right-6 top-4 w-5 h-24 bg-blue-600 rounded-full origin-top transform -rotate-12 shadow-md"></div>
                    {/* Hands */}
                    <div className="absolute -left-7 top-24 w-4 h-4 bg-blue-300 rounded-full"></div>
                    <div className="absolute -right-7 top-24 w-4 h-4 bg-blue-300 rounded-full"></div>
                </div>

                {/* Legs */}
                <div className="flex gap-2 mt-1">
                    <div className="w-4 h-16 bg-blue-800 rounded-full"></div>
                    <div className="w-4 h-16 bg-blue-800 rounded-full"></div>
                </div>

                {/* Flowers (Hidden initially) */}
                <div ref={flowerRef} className="absolute -right-16 top-28">
                    <Flower className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-lg" />
                </div>
            </div>

            {/* The Girl - Cartoon Style */}
            <div ref={girlRef} className="absolute right-[10%] bottom-32 flex flex-col items-center z-10">
                {/* Head with face */}
                <div className="relative w-20 h-20 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full mb-1 shadow-xl border-4 border-pink-400">
                    {/* Hair */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-12 bg-amber-800 rounded-t-full"></div>
                    <div className="absolute top-4 -left-2 w-6 h-8 bg-amber-800 rounded-full"></div>
                    <div className="absolute top-4 -right-2 w-6 h-8 bg-amber-800 rounded-full"></div>
                    {/* Eyes */}
                    <div className="absolute top-7 left-3 w-3 h-4 bg-white rounded-full">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-0.5 left-1.5 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-7 right-3 w-3 h-4 bg-white rounded-full">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full">
                        </div>
                        <div className="absolute top-0.5 left-1.5 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    {/* Smile */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-3 border-b-2 border-pink-600 rounded-b-full"></div>
                    {/* Blush */}
                    <div className="absolute bottom-6 left-1 w-3 h-2 bg-pink-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-6 right-1 w-3 h-2 bg-pink-400 rounded-full opacity-60"></div>
                </div>

                {/* Dress Body */}
                <div className="relative w-28 h-40 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-full shadow-lg" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
                    {/* Arms */}
                    <div className="absolute -left-6 top-4 w-4 h-20 bg-pink-400 rounded-full shadow-md"></div>
                    <div className="absolute -right-6 top-4 w-4 h-20 bg-pink-400 rounded-full shadow-md"></div>
                    {/* Hands */}
                    <div className="absolute -left-7 top-20 w-4 h-4 bg-pink-200 rounded-full"></div>
                    <div className="absolute -right-7 top-20 w-4 h-4 bg-pink-200 rounded-full"></div>
                </div>

                {/* Heart (Hidden initially) */}
                <div ref={heartRef} className="absolute top-0">
                    <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-xl animate-pulse" />
                </div>
            </div>

            {/* Ground */}
            <div className="absolute bottom-0 w-full h-32 bg-green-200"></div>

            <div className="absolute bottom-10 w-full text-center text-green-800 font-medium opacity-50">
                Scroll down to see what happens...
            </div>
        </section>
    );
};

export default ProposalScene;
