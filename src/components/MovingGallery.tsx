import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const items1 = [
    { type: 'image', src: "assets/her/her1.jpg" },
    { type: 'video', src: "assets/videos/video1.mp4" },
    { type: 'image', src: "assets/us/us1.jpg" },
    { type: 'image', src: "assets/her/her3.jpg" },
    { type: 'image', src: "assets/us/us8.jpg" },
    { type: 'image', src: "assets/her/her4.jpg" },
    { type: 'image', src: "assets/us/us10.jpg" },
    { type: 'image', src: "assets/her/her5.jpg" },
    { type: 'image', src: "assets/group/dad1.jpg" },
    { type: 'image', src: "assets/group/group-family-3.jpg" },
    { type: 'image', src: "assets/group/group-friends-4.jpg" },
    { type: 'image', src: "assets/close-up/close-up1.jpg" },
    { type: 'image', src: "assets/close-up/close-up2.jpg" },
    { type: 'image', src: "assets/group/group-cousins-1.jpg" },
    { type: 'image', src: "assets/group/group-cousins-2.jpg" },
    { type: 'image', src: "assets/group/group-friends-6.jpg" },
    { type: 'image', src: "assets/her/her2.jpg" },
    { type: 'image', src: "assets/her/her12.jpg" },
    { type: 'image', src: "assets/her/her15.jpg" },
    { type: 'image', src: "assets/her/her19.jpg" },
    { type: 'image', src: "assets/her/her20.jpg" },
    { type: 'image', src: "assets/her/her36.jpg" },
    { type: 'image', src: "assets/her/her37.jpg" },
    { type: 'image', src: "assets/her/her43.jpg" },
    { type: 'image', src: "assets/her/her44.jpg" },
    { type: 'image', src: "assets/her/her49.jpg" },
    { type: 'image', src: "assets/her/her50.jpg" },
    { type: 'image', src: "assets/her/her52.jpg" },
];

const items2 = [
    { type: 'image', src: "assets/her/her7.jpg" },
    { type: 'image', src: "assets/us/us5.jpg" },
    { type: 'image', src: "assets/her/her8.jpg" },
    { type: 'image', src: "assets/us/us6.jpg" },
    { type: 'image', src: "assets/her/her9.jpg" },
    { type: 'image', src: "assets/us/us7.jpg" },
    { type: 'image', src: "assets/her/her10.jpg" },
    { type: 'image', src: "assets/group/group-cousins-4.jpg" },
    { type: 'image', src: "assets/group/group-friends-1.jpg" },
    { type: 'image', src: "assets/group/group-friends-5.jpg" },
    { type: 'image', src: "assets/close-up/close-up3.jpg" },
    { type: 'image', src: "assets/close-up/close-up4.jpg" },
    { type: 'image', src: "assets/group/group-cousins-3.jpg" },
    { type: 'image', src: "assets/group/group-friends-2.jpg" },
    { type: 'image', src: "assets/group/group-friends-7.jpg" },
    { type: 'image', src: "assets/her/her13.jpg" },
    { type: 'image', src: "assets/her/her22.jpg" },
    { type: 'image', src: "assets/her/her32.jpg" },
    { type: 'image', src: "assets/her/her34.jpg" },
    { type: 'image', src: "assets/her/her35.jpg" },
    { type: 'image', src: "assets/her/her39.jpg" },
    { type: 'image', src: "assets/her/her41.jpg" },
    { type: 'image', src: "assets/her/her47.jpg" },
    { type: 'image', src: "assets/her/her48.jpg" },
    { type: 'image', src: "assets/her/her56.jpg" },
    { type: 'image', src: "assets/her/her57.jpg" },
    { type: 'image', src: "assets/her/her55.jpg" },
];

const MovingGallery = () => {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);

    const shuffledItems1 = useMemo(() => {
        const shuffled = [...items1];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    const shuffledItems2 = useMemo(() => {
        const shuffled = [...items2];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            if (row1Ref.current) {
                gsap.to(row1Ref.current, {
                    x: "0%",
                    duration: 60,
                    ease: "none",
                    repeat: -1,
                    startAt: { x: "-50%" }
                });
            }

            if (row2Ref.current) {
                gsap.to(row2Ref.current, {
                    x: "0%", // Move Left to Right
                    duration: 70,
                    ease: "none",
                    repeat: -1,
                    startAt: { x: "-50%" }
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const renderItem = (item: { type: string, src: string }, index: number, rowId: string) => (
        <div key={`${rowId}-${index}`} className="relative group w-64 h-40 md:w-80 md:h-56 flex-shrink-0 overflow-hidden rounded-lg border-2 border-white/10 hover:border-pink-500/50 transition-colors bg-zinc-800">
            {item.type === 'video' ? (
                <video
                    src={item.src}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <img
                    src={item.src}
                    alt={`Memory ${index}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>
    );

    return (
        <section className="py-20 bg-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

            <div className="mb-12 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Memories in Motion</h2>
                <p className="text-pink-300">Every moment with you is a work of art</p>
            </div>

            {/* Row 1 */}
            <div className="flex mb-8 -rotate-1 scale-105">
                <div ref={row1Ref} className="flex gap-4 w-max">
                    {/* Original Set */}
                    {shuffledItems1.map((item, i) => renderItem(item, i, 'r1-1'))}
                    {/* Duplicate Set for Seamless Loop */}
                    {shuffledItems1.map((item, i) => renderItem(item, i, 'r1-2'))}
                    {/* Triplicate Set to ensure coverage on large screens */}
                    {shuffledItems1.map((item, i) => renderItem(item, i, 'r1-3'))}
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex rotate-1 scale-105">
                <div ref={row2Ref} className="flex gap-4 w-max">
                    {/* Original Set */}
                    {shuffledItems2.map((item, i) => renderItem(item, i, 'r2-1'))}
                    {/* Duplicate Set for Seamless Loop */}
                    {shuffledItems2.map((item, i) => renderItem(item, i, 'r2-2'))}
                    {/* Triplicate Set */}
                    {shuffledItems2.map((item, i) => renderItem(item, i, 'r2-3'))}
                </div>
            </div>
        </section>
    );
};

export default MovingGallery;
