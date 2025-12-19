import { useState, useEffect } from 'react';

export interface TypewriterSegment {
    text?: string;
    className?: string;
    isBr?: boolean;
}

interface TypewriterProps {
    segments: TypewriterSegment[];
    speed?: number;
    initialDelay?: number;
    loop?: boolean;
    loopDelay?: number;
}

export function Typewriter({ segments, speed = 40, initialDelay = 500, loop = true, loopDelay = 2000 }: TypewriterProps) {
    const [activeSegIndex, setActiveSegIndex] = useState(0);
    const [activeCharIndex, setActiveCharIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setHasStarted(true), initialDelay);
        return () => clearTimeout(timeout);
    }, [initialDelay]);

    useEffect(() => {
        if (!hasStarted) return;

        // Check if finished
        if (activeSegIndex >= segments.length) {
            if (loop) {
                const resetTimer = setTimeout(() => {
                    setActiveSegIndex(0);
                    setActiveCharIndex(0);
                }, loopDelay);
                return () => clearTimeout(resetTimer);
            }
            return;
        }

        const currentSeg = segments[activeSegIndex];

        if (currentSeg.isBr) {
            // Move past BR immediately
            setActiveSegIndex(prev => prev + 1);
            setActiveCharIndex(0);
            return;
        }

        const textToType = currentSeg.text || '';

        if (activeCharIndex < textToType.length) {
            const timer = setTimeout(() => {
                setActiveCharIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else {
            // Finished this segment, move to next
            setActiveSegIndex(prev => prev + 1);
            setActiveCharIndex(0);
        }
    }, [hasStarted, activeSegIndex, activeCharIndex, segments, speed, loop, loopDelay]);

    return (
        <>
            {segments.map((seg, i) => {
                if (i > activeSegIndex) return null; // Future segments hidden

                if (seg.isBr) return <br key={i} />;

                if (i < activeSegIndex) {
                    // Completed segments
                    return <span key={i} className={seg.className}>{seg.text}</span>;
                }

                // Active segment
                return (
                    <span key={i} className={seg.className}>
                        {seg.text?.slice(0, activeCharIndex)}
                        <span className="cursor animate-blink">|</span>
                    </span>
                );
            })}
            {/* Hide cursor when totally done? Or keep blinking at the end? Usually keep blinking. 
          But the logic above puts cursor on the active segment. 
          When finished (activeSegIndex == length), no cursor remains. 
          Let's add a trailing blinking cursor if finished. 
      */}
            {activeSegIndex >= segments.length && <span className="cursor animate-blink">|</span>}

            <style>{`
        .cursor { font-weight: 100; color: var(--primary); margin-left: 2px; }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
        </>
    );
}
