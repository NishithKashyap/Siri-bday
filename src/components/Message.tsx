import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Message = () => {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(textRef.current, {
            scrollTrigger: {
                trigger: textRef.current,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 px-4 bg-zinc-50 flex items-center justify-center">
            <div ref={textRef} className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-serif italic text-zinc-800 mb-8">
                    "To my dearest..."
                </h2>
                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed space-y-6">
                    Another year around the sun, and you shine brighter than ever.
                    Thank you for being the amazing person you are.
                    Here's to many more adventures, laughs, and beautiful moments together.
                    <br /><br />
                    I love you!
                </p>
            </div>
        </section>
    );
};

export default Message;
