import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        date: "The Beginning",
        title: "When We First Met",
        description: "The moment our paths crossed and everything changed forever.",
        image: "assets/her/her24.jpg",
        icon: "✨"
    },
    {
        date: "First Date",
        title: "Magic in the Air",
        description: "Butterflies, laughter, and the start of something beautiful.",
        image: "assets/her/her21.jpg",
        icon: "🌹"
    },
    {
        date: "Falling in Love",
        title: "Saying 'I Love You'",
        description: "Three words that bound our hearts together.",
        image: "assets/her/her22.jpg",
        icon: "❤️"
    },
    {
        date: "Adventures",
        title: "Traveling Together",
        description: "Exploring the world, hand in hand.",
        image: "assets/us/us7.jpg",
        icon: "✈️"
    },
    {
        date: "The Proposal",
        title: "Forever & Always",
        description: "The easiest decision of my life.",
        image: "assets/us/us10.jpg",
        icon: "💍"
    },
    {
        date: "The Future",
        title: "Our Next Chapter",
        description: "Can't wait for all the tomorrows with you.",
        image: "assets/us/collage.png",
        icon: "🏡"
    }
];

const LoveTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray('.timeline-item');

        // Animate the line
        gsap.fromTo(lineRef.current,
            { height: "0%" },
            {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                }
            }
        );

        // Animate items
        items.forEach((item: any, i) => {
            const isEven = i % 2 === 0;

            gsap.fromTo(item,
                {
                    opacity: 0,
                    x: isEven ? -50 : 50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "top 50%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-pink-200 opacity-20 animate-pulse">
                    <Heart size={100} />
                </div>
                <div className="absolute bottom-20 right-10 text-pink-200 opacity-20 animate-pulse delay-700">
                    <Heart size={150} />
                </div>
                <div className="absolute top-1/2 left-20 text-red-100 opacity-30 rotate-12">
                    <Heart size={80} />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4 font-serif">Our Journey</h2>
                    <p className="text-xl text-gray-600 italic">Every step brings me closer to you</p>
                </div>

                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-pink-100 transform md:-translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-pink-400 via-red-400 to-pink-400 origin-top"></div>
                    </div>

                    <div className="space-y-24">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}>
                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2 md:text-right group">
                                    <div className={`bg-white p-8 rounded-2xl shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                                        }`}>
                                        <span className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-3">
                                            {milestone.date}
                                        </span>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                                    </div>
                                </div>

                                {/* Center Point */}
                                <div className="relative flex items-center justify-center w-12 h-12 shrink-0 z-10">
                                    <div className="w-12 h-12 bg-white rounded-full border-4 border-pink-400 flex items-center justify-center shadow-lg text-xl">
                                        {milestone.icon}
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="flex-1 w-full md:w-1/2">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
                                        <div className="absolute inset-0 bg-pink-500/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                        <img
                                            src={milestone.image}
                                            alt={milestone.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoveTimeline;
