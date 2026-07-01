import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { content } from "../content";

const INTRO_VISIBLE_MS = 3400;
const COVER_OPEN_DURATION_SECONDS = 1.35;
const COVER_OPEN_DELAY_SECONDS = 1.15;
const CARD_REVEAL_DELAY_SECONDS = 1.25;
const softEase = [0.16, 1, 0.3, 1] as const;

const stageInitial = { opacity: 0, y: 18, scale: 0.96 };
const stageAnimate = { opacity: 1, y: 0, scale: 1 };
const cardInitial = { opacity: 0.84, y: 16, scale: 0.98 };
const cardReducedInitial = { opacity: 1 };
const coverInitial = { opacity: 1, y: 0, scale: 1, rotateX: 0 };
const coverReducedState = { opacity: 0, y: -520 };
const coverAnimate = {
    opacity: [1, 0.62, 0],
    y: [0, -320, -520],
    scale: [1, 0.95, 0.88],
    rotateX: [0, 12, 18],
};
const petalInitial = { opacity: 0, x: 0, y: 0, rotateZ: 0, scale: 0.7 };

const petals = [
    { animate: { opacity: [0, 0.68, 0], x: -88, y: -96, rotateZ: -28, scale: [0.7, 1, 0.86] }, delay: 1.25 },
    { animate: { opacity: [0, 0.68, 0], x: 72, y: -118, rotateZ: 34, scale: [0.7, 1, 0.86] }, delay: 1.28 },
    { animate: { opacity: [0, 0.68, 0], x: -42, y: -146, rotateZ: 18, scale: [0.7, 1, 0.86] }, delay: 1.4 },
    { animate: { opacity: [0, 0.68, 0], x: 104, y: -72, rotateZ: -18, scale: [0.7, 1, 0.86] }, delay: 1.54 },
    { animate: { opacity: [0, 0.68, 0], x: -106, y: -54, rotateZ: 38, scale: [0.7, 1, 0.86] }, delay: 1.68 },
];

export const MobileWeddingRevealIntro = memo(function MobileWeddingRevealIntro() {
    const [isVisible, setIsVisible] = useState(true);
    const prefersReducedMotion = useReducedMotion();

    useLayoutEffect(() => {
        document.documentElement.classList.remove("intro-pending");
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const timeout = window.setTimeout(
            () => setIsVisible(false),
            prefersReducedMotion ? 900 : INTRO_VISIBLE_MS
        );

        return () => window.clearTimeout(timeout);
    }, [isVisible, prefersReducedMotion]);

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
                        initial={prefersReducedMotion ? false : stageInitial}
                        animate={stageAnimate}
                        transition={{ duration: 0.7, ease: softEase }}
                    >
                        <motion.div
                            className="lux-opening-card"
                            initial={prefersReducedMotion ? cardReducedInitial : cardInitial}
                            animate={stageAnimate}
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
                            initial={prefersReducedMotion ? coverReducedState : coverInitial}
                            animate={prefersReducedMotion ? coverReducedState : coverAnimate}
                            transition={{ delay: COVER_OPEN_DELAY_SECONDS, duration: COVER_OPEN_DURATION_SECONDS, times: [0, 0.72, 1], ease: softEase }}
                        >
                            <div className="lux-opening-cover-mark">GA</div>
                        </motion.div>

                        {!prefersReducedMotion
                            ? petals.map((petal, index) => (
                                <motion.span
                                    className={`lux-reveal-petal lux-reveal-petal-${index + 1}`}
                                    key={index}
                                    initial={petalInitial}
                                    animate={petal.animate}
                                    transition={{ delay: petal.delay, duration: 1.9, ease: "easeOut" }}
                                />
                            ))
                            : null}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
});
