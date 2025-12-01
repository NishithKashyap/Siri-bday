import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
    const container = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const collageRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(textRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        })
            .from(videoContainerRef.current, {
                y: 100,
                opacity: 0,
                scale: 0.8,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.5")
            .from(collageRef.current, {
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            }, "-=0.5");

    }, { scope: container });

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <section ref={container} className="py-24 bg-zinc-50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div ref={textRef} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">Your Special Moments</h2>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                        Capturing the laughter, the love, and everything in between.
                    </p>
                </div>

                <div ref={videoContainerRef} className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-900/10 group">
                    {isPlaying ? (
                        <iframe
                            src="https://drive.google.com/file/d/17ypIuc8E7F3aWZJxR_LzhHSv3k9MLzSb/preview"
                            className="w-full h-full"
                            allow="autoplay"
                            allowFullScreen
                            title="Memory Video"
                        ></iframe>
                    ) : (
                        <>
                            {/* Poster Image */}
                            <div
                                className="absolute inset-0 z-10 cursor-pointer"
                                onClick={handlePlay}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
                                    alt="Video poster"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Play Button Overlay */}
                            <div
                                className="absolute inset-0 flex items-center justify-center z-20 group-hover:bg-black/10 transition-colors cursor-pointer"
                                onClick={handlePlay}
                            >
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-white fill-current opacity-80" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Love Collage Section with Fade-in */}
                <div ref={collageRef} className="w-full mt-16 rounded-2xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
                    <img
                        src="assets/love-collage.png"
                        alt="Love Collage"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;