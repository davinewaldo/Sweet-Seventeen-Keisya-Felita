import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, ChevronDown, ChevronUp, Disc3, ExternalLink } from 'lucide-react';

interface FloatingMusicPlayerProps {
  autoStart?: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
}

export function FloatingMusicPlayer({ autoStart = false }: FloatingMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<YTPlayerInstance | null>(null);

  const videoId = 'jGflCSOWAM8'; // OMI - Cheerleader (Felix Jaehn Remix)

  // Initialize YouTube Iframe API
  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (window.YT && window.YT.Player && isMounted) {
        try {
          playerRef.current = new window.YT.Player('yt-player-box', {
            height: '180',
            width: '100%',
            videoId,
            playerVars: {
              autoplay: 0,
              controls: 1,
              loop: 1,
              playlist: videoId,
              playsinline: 1,
              modestbranding: 1,
              rel: 0,
            },
            events: {
              onReady: (event) => {
                if (isMounted) {
                  playerRef.current = event.target;
                  setIsReady(true);
                  if (autoStart) {
                    try {
                      event.target.playVideo();
                      setIsPlaying(true);
                    } catch {
                      // Autoplay blocked by browser policy until interaction
                    }
                  }
                }
              },
              onStateChange: (event) => {
                if (!isMounted) return;
                if (window.YT && event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (window.YT && (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED)) {
                  setIsPlaying(false);
                }
              },
            },
          });
        } catch (err) {
          console.error('Error creating YouTube player:', err);
        }
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
    };
  }, [autoStart]);

  // Handle autoStart trigger
  useEffect(() => {
    if (autoStart && playerRef.current && isReady) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        // Ignore
      }
    }
  }, [autoStart, isReady]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn('Playback error:', e);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {/* Floating Card UI */}
      <div className="bg-white/95 backdrop-blur-md border-2 border-pink-300/80 rounded-2xl shadow-xl shadow-pink-500/15 overflow-hidden transition-all duration-300 max-w-[310px]">
        {/* Main Bar / Header */}
        <div className="p-2.5 flex items-center gap-3">
          {/* Spinning Vinyl Disc */}
          <button
            onClick={togglePlay}
            aria-label="Putar / Jeda Musik"
            className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-0.5 flex-shrink-0 cursor-pointer shadow-md group"
          >
            <div
              className={`w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-pink-300 transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <Disc3 className="w-6 h-6 text-pink-200" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-pink-600/60 rounded-full transition-opacity">
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </div>
          </button>

          {/* Song Info */}
          <div
            className="flex-1 min-w-[130px] max-w-[160px] overflow-hidden cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-pink-600 tracking-wider flex items-center gap-1">
                <Music className="w-3 h-3 text-pink-500" />
                Lagu Ulang Tahun
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 ml-1">
                  <span className="w-0.5 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDuration: '0.6s' }}></span>
                  <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDuration: '0.4s', animationDelay: '0.1s' }}></span>
                  <span className="w-0.5 h-3.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.2s' }}></span>
                  <span className="w-0.5 h-1.5 bg-pink-300 rounded-full animate-bounce" style={{ animationDuration: '0.5s', animationDelay: '0.15s' }}></span>
                </div>
              )}
            </div>
            <p className="text-xs font-semibold text-neutral-800 truncate">
              OMI – Cheerleader
            </p>
            <p className="text-[11px] text-neutral-500 truncate">
              Felix Jaehn Remix 🎧
            </p>
          </div>

          {/* Quick Play/Pause Control */}
          <div className="flex items-center gap-1">
            <button
              onClick={togglePlay}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
              title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-neutral-400 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer"
              title={isExpanded ? 'Tutup Panel' : 'Buka Video YouTube'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Embedded YouTube Container - kept rendered so browser never throttles playback */}
        <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'h-0 overflow-hidden opacity-0 pointer-events-none'}`}>
          <div className="px-3 pb-3 pt-1 border-t border-pink-100 bg-pink-50/60">
            {/* Embedded Player */}
            <div className="rounded-xl overflow-hidden border border-pink-200 shadow-inner bg-black aspect-video">
              <div id="yt-player-box" className="w-full h-full"></div>
            </div>

            <div className="flex items-center justify-between text-neutral-600 pt-2 text-xs">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-pink-600 hover:text-pink-800 font-medium"
              >
                <span>Buka di YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={toggleMute}
                className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-pink-600 cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-pink-500" />
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
