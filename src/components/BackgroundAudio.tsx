import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface BackgroundAudioProps {
    src: string;
    autoPlay?: boolean;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
    src,
    autoPlay = false
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showControls, setShowControls] = useState(true);
    const [showPlayPrompt, setShowPlayPrompt] = useState(autoPlay);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
        audio.loop = true;

        // Try to autoplay if enabled (may be blocked by browser)
        if (autoPlay) {
            audio.play().then(() => {
                // Autoplay succeeded
                setIsPlaying(true);
                setShowPlayPrompt(false);
            }).catch(() => {
                // Autoplay was prevented, show prompt
                setIsPlaying(false);
                setShowPlayPrompt(true);
            });
        }

        return () => {
            audio.pause();
        };
    }, [autoPlay, volume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handlePageClick = () => {
        if (showPlayPrompt && audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                setShowPlayPrompt(false);
            }).catch((error) => {
                console.error('Failed to play audio:', error);
            });
        }
    };

    return (
        <>
            <audio ref={audioRef} src={src} />

            {/* Click to Play Overlay - Appears when autoplay is blocked */}
            {showPlayPrompt && (
                <div
                    onClick={handlePageClick}
                    className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer animate-fade-in"
                >
                    <div className="text-center px-8 py-12 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-200 max-w-md mx-4 animate-bounce-gentle">
                        <div className="mb-6 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                                <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 rounded-full p-6">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="white" className="animate-pulse">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            🎵 Music Awaits
                        </h2>

                        <p className="text-gray-600 text-lg mb-6">
                            Click anywhere to start the music
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                            <span>Tap to play</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Audio Control Panel */}
            <div
                className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${showControls ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
                    }`}
            >
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-100 p-4 min-w-[280px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-zinc-700">Background Music</span>
                        </div>
                        <button
                            onClick={() => setShowControls(false)}
                            className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                        >
                            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                        </button>

                        {/* Volume Controls */}
                        <div className="flex-1 flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="text-zinc-600 hover:text-pink-500 transition-colors"
                            >
                                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            {/* Volume Slider */}
                            <div className="flex-1 relative">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #ec4899 0%, #a855f7 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
                                    }}
                                />
                            </div>

                            <span className="text-xs text-zinc-500 w-8 text-right">
                                {Math.round((isMuted ? 0 : volume) * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* Now Playing Bar */}
                    {isPlaying && (
                        <div className="mt-3 pt-3 border-t border-pink-100">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-gradient-to-t from-pink-500 to-purple-600 rounded-full animate-pulse"
                                            style={{
                                                height: `${12 + Math.random() * 8}px`,
                                                animationDelay: `${i * 0.1}s`,
                                                animationDuration: `${0.5 + Math.random() * 0.5}s`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                                <span className="text-xs text-zinc-400">Now Playing...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Minimized Toggle Button */}
            {!showControls && (
                <button
                    onClick={() => setShowControls(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                >
                    {isPlaying ? (
                        <div className="flex gap-[3px]">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-white rounded-full animate-pulse"
                                    style={{
                                        height: `${12 + i * 4}px`,
                                        animationDelay: `${i * 0.15}s`,
                                        animationDuration: '0.6s'
                                    }}
                                ></div>
                            ))}
                        </div>
                    ) : (
                        <Play size={20} fill="white" />
                    )}
                </button>
            )}

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
          transition: transform 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #a855f7);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.4);
        }
      `}</style>
        </>
    );
};

export default BackgroundAudio;
