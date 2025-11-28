import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cake, Gift, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BookPage {
    leftContent: {
        title: string;
        text: string;
        image?: string;
        icon?: React.ReactNode;
    };
    rightContent: {
        title: string;
        text: string;
        image?: string;
        icon?: React.ReactNode;
    };
}

const bookPages: BookPage[] = [
    {
        leftContent: {
            title: "Happy Birthday!",
            text: "Today we celebrate YOU! Another year of amazing memories, laughter, and love. You make every day brighter just by being you.",
            icon: <Cake className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-pink-500 mx-auto mb-2 md:mb-4" />
        },
        rightContent: {
            title: "A Year of Joy",
            text: "This past year has been filled with incredible moments. From spontaneous adventures to quiet evenings, every moment with you is a treasure.",
            image: "assets/her/her12.jpg"
        }
    },
    {
        leftContent: {
            title: "Special Moments",
            text: "Remember all those times we laughed until we cried? Those silly jokes, random dance parties, and midnight conversations - they're all precious memories.",
            image: "assets/us/us8.jpg"
        },
        rightContent: {
            title: "Your Amazing Spirit",
            text: "Your kindness, your smile, your incredible heart - they inspire everyone around you. You have a gift for making people feel special and loved.",
            icon: <Heart className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-red-500 mx-auto mb-2 md:mb-4 fill-current" />
        }
    },
    {
        leftContent: {
            title: "Adventures Together",
            text: "From exploring new places to trying new things, every adventure with you is unforgettable. Here's to many more journeys ahead!",
            icon: <Sparkles className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-purple-500 mx-auto mb-2 md:mb-4" />
        },
        rightContent: {
            title: "Wishes for You",
            text: "May this year bring you endless happiness, exciting opportunities, and all the love you deserve. You are truly one of a kind!",
            image: "assets/group/group-friends-2.jpg"
        }
    },
    {
        leftContent: {
            title: "Grateful for You",
            text: "Thank you for being such an incredible person. Your presence in this world makes it a better place. Never forget how special you are!",
            image: "assets/us/collage.png"
        },
        rightContent: {
            title: "Here's to You! 🎉",
            text: "Cheers to another amazing year! May all your dreams come true and may you always know how deeply you are loved and appreciated.",
            icon: <Gift className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-yellow-500 mx-auto mb-2 md:mb-4" />
        }
    }
];

const BirthdayBook = () => {
    const container = useRef<HTMLDivElement>(null);
    const bookRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useGSAP(() => {
        gsap.from(bookRef.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            opacity: 0,
            rotationY: -30,
            duration: 1.5,
            ease: "back.out(1.7)"
        });
    }, { scope: container });

    const turnPage = (direction: 'next' | 'prev') => {
        if (isAnimating) return;

        const newPage = direction === 'next'
            ? Math.min(currentPage + 1, bookPages.length - 1)
            : Math.max(currentPage - 1, 0);

        if (newPage === currentPage) return;

        setIsAnimating(true);

        // Simple fade animation
        const contentDiv = bookRef.current?.querySelector('.book-content');

        if (!contentDiv) {
            setIsAnimating(false);
            return;
        }

        gsap.to(contentDiv, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setCurrentPage(newPage);
                gsap.to(contentDiv, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        setIsAnimating(false);
                    }
                });
            }
        });
    };

    return (
        <section ref={container} className="py-24 bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-amber-900">
                    Your Birthday Memory Book
                </h2>
                <p className="text-center text-amber-600 mb-12 text-sm">
                    Click on the left or right page to navigate
                </p>

                <div className="flex items-center justify-center">
                    {/* Book Container */}
                    <div
                        ref={bookRef}
                        className="relative w-full max-w-2xl lg:max-w-[800px] mx-auto"
                        style={{ perspective: '2000px' }}
                    >
                        {/* Book */}
                        <div className="relative w-full aspect-square md:aspect-[4/3] bg-amber-100 rounded-lg shadow-2xl">
                            {/* Book Spine/Binder */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-8 md:w-12 -translate-x-1/2 bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 shadow-inner z-20">
                                {/* Binder rings */}
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full shadow-md"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-700 rounded-full shadow-md"></div>
                                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full shadow-md"></div>

                                {/* Spine texture */}
                                <div className="absolute inset-0 opacity-20">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="h-[5%] border-t border-amber-950"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Book Content */}
                            <div className="book-content absolute inset-0 flex">
                                {/* Left Page - Click to go back */}
                                <button
                                    onClick={() => turnPage('prev')}
                                    disabled={currentPage === 0 || isAnimating}
                                    className="group absolute left-0 top-0 bottom-0 w-[calc(50%-16px)] md:w-[calc(50%-24px)] bg-gradient-to-br from-amber-50 to-orange-50 rounded-l-lg p-4 md:p-8 lg:p-12 shadow-inner disabled:cursor-not-allowed transition-all hover:shadow-xl"
                                >
                                    {/* Page fold indicator - top left corner */}
                                    {currentPage > 0 && !isAnimating && (
                                        <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] md:border-t-[45px] lg:border-t-[60px] border-t-amber-200 border-r-[30px] md:border-r-[45px] lg:border-r-[60px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-0 left-0 w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-300 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 transform -rotate-45 origin-top-left"></div>
                                        </div>
                                    )}

                                    <div className="h-full flex flex-col justify-center pointer-events-none">
                                        {bookPages[currentPage].leftContent.icon}
                                        {bookPages[currentPage].leftContent.image && (
                                            <img
                                                src={bookPages[currentPage].leftContent.image}
                                                alt={bookPages[currentPage].leftContent.title}
                                                className="w-full h-24 md:h-36 lg:h-48 object-cover rounded-lg shadow-md mb-2 md:mb-4"
                                            />
                                        )}
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-amber-900 mb-2 md:mb-4">
                                            {bookPages[currentPage].leftContent.title}
                                        </h3>
                                        <p className="text-xs md:text-sm lg:text-base text-amber-800 leading-relaxed">
                                            {bookPages[currentPage].leftContent.text}
                                        </p>
                                    </div>
                                    {/* Page number */}
                                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 text-amber-400 font-serif text-xs md:text-sm pointer-events-none">
                                        {currentPage * 2 + 1}
                                    </div>
                                </button>

                                {/* Right Page - Click to go forward */}
                                <button
                                    onClick={() => turnPage('next')}
                                    disabled={currentPage === bookPages.length - 1 || isAnimating}
                                    className="group absolute right-0 top-0 bottom-0 w-[calc(50%-16px)] md:w-[calc(50%-24px)] bg-gradient-to-bl from-amber-50 to-orange-50 rounded-r-lg p-4 md:p-8 lg:p-12 shadow-lg disabled:cursor-not-allowed transition-all hover:shadow-2xl"
                                >
                                    {/* Page fold indicator - top right corner */}
                                    {currentPage < bookPages.length - 1 && !isAnimating && (
                                        <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] md:border-t-[45px] lg:border-t-[60px] border-t-amber-200 border-l-[30px] md:border-l-[45px] lg:border-l-[60px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-0 right-0 w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12 bg-gradient-to-bl from-amber-300 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 transform rotate-45 origin-top-right"></div>
                                        </div>
                                    )}

                                    <div className="h-full flex flex-col justify-center pointer-events-none">
                                        {bookPages[currentPage].rightContent.icon}
                                        {bookPages[currentPage].rightContent.image && (
                                            <img
                                                src={bookPages[currentPage].rightContent.image}
                                                alt={bookPages[currentPage].rightContent.title}
                                                className="w-full h-24 md:h-36 lg:h-48 object-cover rounded-lg shadow-md mb-2 md:mb-4"
                                            />
                                        )}
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-amber-900 mb-2 md:mb-4">
                                            {bookPages[currentPage].rightContent.title}
                                        </h3>
                                        <p className="text-xs md:text-sm lg:text-base text-amber-800 leading-relaxed">
                                            {bookPages[currentPage].rightContent.text}
                                        </p>
                                    </div>
                                    {/* Page number */}
                                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6 text-amber-400 font-serif text-xs md:text-sm pointer-events-none">
                                        {currentPage * 2 + 2}
                                    </div>
                                </button>
                            </div>

                            {/* Book edge shadows for depth */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-amber-900/20 to-transparent"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-amber-900/20 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Page indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {bookPages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isAnimating && index !== currentPage) {
                                    const direction = index > currentPage ? 'next' : 'prev';
                                    turnPage(direction);
                                }
                            }}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentPage
                                ? 'bg-amber-600 w-8'
                                : 'bg-amber-300 hover:bg-amber-400'
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BirthdayBook;
