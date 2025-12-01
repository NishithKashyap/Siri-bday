import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photos = [
    "assets/her/her37.jpg",
    "assets/her/her35.jpg",
    "assets/group/parents1.jpg",
    "assets/her/her54.jpg",
    "assets/her/her48.jpg",
    "assets/her/her52.jpg",
    "assets/group/dad1.jpg",
    "assets/group/sister2.jpg",
    "assets/us/us10.jpg",
];

const Gallery = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const images = gsap.utils.toArray<HTMLDivElement>('.gallery-item');

        images.forEach((image, i) => {
            gsap.from(image, {
                scrollTrigger: {
                    trigger: image,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1,
                delay: i * 0.1,
                ease: "power3.out"
            });
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-20 px-4 bg-white">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-zinc-800">
                Memories
            </h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto space-y-8">
                {photos.map((src, index) => (
                    <div key={index} className="gallery-item break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={src}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
