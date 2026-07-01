import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "../content";

const MOBILE_QUERY = "(max-width: 768px)";
const smoothEase = [0.16, 1, 0.3, 1] as const;
const ENVELOPE_OPEN_DURATION_SECONDS = 1.55;
const ENVELOPE_OPEN_DELAY_SECONDS = 0.46;
const LETTER_RISE_DURATION_SECONDS = 1.55;
const ENVELOPE_DROP_DURATION_SECONDS = 1.25;
const LETTER_RISE_DELAY_SECONDS = ENVELOPE_OPEN_DELAY_SECONDS + ENVELOPE_OPEN_DURATION_SECONDS * 0.72;
const ENVELOPE_DROP_DELAY_SECONDS = LETTER_RISE_DELAY_SECONDS + 0.18;
const LETTER_RISE_TOTAL_SECONDS = LETTER_RISE_DELAY_SECONDS + LETTER_RISE_DURATION_SECONDS;
const ENVELOPE_DROP_TOTAL_SECONDS = ENVELOPE_DROP_DELAY_SECONDS + ENVELOPE_DROP_DURATION_SECONDS;
const INTRO_VISIBLE_MS = 5600;

export function MobileEnvelopeIntro() {
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
            prefersReducedMotion ? 950 : INTRO_VISIBLE_MS
        );

        return () => window.clearTimeout(timeout);
    }, [isMobile, isVisible, prefersReducedMotion]);

    if (!isMobile) return null;

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.div
                    className="lux-envelope-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    aria-hidden="true"
                >
                    <motion.div
                        className="lux-envelope-stage"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.72, ease: smoothEase }}
                    >
                        <div className="lux-envelope">
                            <motion.div
                                className="lux-envelope-letter"
                                initial={prefersReducedMotion ? { y: -132, opacity: 1 } : { y: 54, opacity: 0, scale: 0.975, rotateZ: -0.35 }}
                                animate={
                                    prefersReducedMotion
                                        ? { y: -132, opacity: 1, scale: 1, rotateZ: 0 }
                                        : { y: [54, 54, -132], opacity: [0, 1, 1], scale: [0.975, 0.975, 1], rotateZ: [-0.35, -0.35, 0] }
                                }
                                transition={{ duration: LETTER_RISE_TOTAL_SECONDS, times: [0, LETTER_RISE_DELAY_SECONDS / LETTER_RISE_TOTAL_SECONDS, 1], ease: smoothEase }}
                            >
                                <div className="lux-envelope-mark">{content.monogram ?? "GA"}</div>
                                <div className="lux-envelope-couple">{content.couple}</div>
                                <div className="lux-envelope-date">{content.dateText}</div>
                            </motion.div>
                            <motion.div
                                className="lux-envelope-shell"
                                initial={prefersReducedMotion ? { y: 86, scale: 0.965 } : { y: 0, scale: 1 }}
                                animate={
                                    prefersReducedMotion
                                        ? { y: 86, scale: 0.965 }
                                        : { y: [0, 0, 86], scale: [1, 1, 0.965] }
                                }
                                transition={{ duration: ENVELOPE_DROP_TOTAL_SECONDS, times: [0, ENVELOPE_DROP_DELAY_SECONDS / ENVELOPE_DROP_TOTAL_SECONDS, 1], ease: smoothEase }}
                            >
                                <motion.div
                                    className="lux-envelope-flap"
                                    initial={prefersReducedMotion ? { rotateX: 176 } : { rotateX: 0 }}
                                    animate={prefersReducedMotion ? { rotateX: 176 } : { rotateX: 176 }}
                                    transition={{ delay: ENVELOPE_OPEN_DELAY_SECONDS, duration: ENVELOPE_OPEN_DURATION_SECONDS, ease: smoothEase }}
                                />
                                <div className="lux-envelope-back" />
                                <div className="lux-envelope-front" />
                                <motion.div
                                    className="lux-envelope-seal"
                                    initial={prefersReducedMotion ? { x: "-50%", opacity: 0, scale: 0.78 } : { x: "-50%", opacity: 1, scale: 1 }}
                                    animate={prefersReducedMotion ? { x: "-50%", opacity: 0, scale: 0.78 } : { x: "-50%", opacity: 0, scale: 0.78 }}
                                    transition={{ delay: ENVELOPE_OPEN_DELAY_SECONDS + 0.08, duration: 0.52, ease: "easeOut" }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
