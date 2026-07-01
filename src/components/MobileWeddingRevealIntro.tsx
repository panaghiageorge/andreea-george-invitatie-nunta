import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "../content";

const MOBILE_QUERY = "(max-width: 768px)";
const INTRO_VISIBLE_MS = 3300;
const COVER_OPEN_DURATION_SECONDS = 1.35;
const COVER_OPEN_DELAY_SECONDS = 1.15;
const CARD_REVEAL_DELAY_SECONDS = 1.25;
const softEase = [0.16, 1, 0.3, 1] as const;

const petals = [
    { x: -88, y: -96, rotate: -28, delay: 1.15 },
    { x: 72, y: -118, rotate: 34, delay: 1.18 },
    { x: -42, y: -146, rotate: 18, delay: 1.3 },
    { x: 104, y: -72, rotate: -18, delay: 1.44 },
    { x: -106, y: -54, rotate: 38, delay: 1.58 },
];

export function MobileWeddingRevealIntro() {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const media = window.matchMedia(MOBILE_QUERY);

        function syncMobileState() {
            setIsMobile(media.matches);
            setIsVisible(media.matches);
        }

        syncMobileState();
        media.addEventListener("change", syncMobileState);

        return () => media.removeEventListener("change", syncMobileState);
    }, []);

    useEffect(() => {
        if (!isMobile || !isVisible) return;

        const timeout = window.setTimeout(
            () => setIsVisible(false),
            prefersReducedMotion ? 900 : INTRO_VISIBLE_MS
        );

        return () => window.clearTimeout(timeout);
    }, [isMobile, isVisible, prefersReducedMotion]);

    if (!isMobile) return null;

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.div
                    className="lux-reveal-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    aria-hidden="true"
                >
                    <motion.div
                        className="lux-opening-stage"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, ease: softEase }}
                    >
                        <motion.div
                            className="lux-opening-card"
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.84, y: 16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: prefersReducedMotion ? 0 : CARD_REVEAL_DELAY_SECONDS, duration: 1.05, ease: softEase }}
                        >
                            <div className="lux-opening-botanical" />
                            <div className="lux-opening-rings">
                                <span />
                                <span />
                            </div>
                            <div className="lux-opening-couple">{content.couple}</div>
                            <div className="lux-opening-line" />
                            <div className="lux-opening-date">{content.dateText}</div>
                        </motion.div>

                        <motion.div
                            className="lux-opening-cover"
                            initial={prefersReducedMotion ? { opacity: 0, y: -520 } : { opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                            animate={prefersReducedMotion ? { opacity: 0, y: -520 } : { opacity: [1, 0.62, 0], y: [0, -320, -520], scale: [1, 0.95, 0.88], rotateX: [0, 12, 18] }}
                            transition={{ delay: COVER_OPEN_DELAY_SECONDS, duration: COVER_OPEN_DURATION_SECONDS, times: [0, 0.72, 1], ease: softEase }}
                        >
                            <div className="lux-opening-cover-mark">GA</div>
                        </motion.div>

                        {!prefersReducedMotion
                            ? petals.map((petal, index) => (
                                <motion.span
                                    className={`lux-reveal-petal lux-reveal-petal-${index + 1}`}
                                    key={index}
                                    initial={{ opacity: 0, x: 0, y: 0, rotateZ: 0, scale: 0.7 }}
                                    animate={{ opacity: [0, 0.68, 0], x: petal.x, y: petal.y, rotateZ: petal.rotate, scale: [0.7, 1, 0.86] }}
                                    transition={{ delay: petal.delay, duration: 1.9, ease: "easeOut" }}
                                />
                            ))
                            : null}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
