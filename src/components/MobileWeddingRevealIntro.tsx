import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type CSSProperties, memo, useEffect, useLayoutEffect, useState } from "react";
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
const introShellStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 3000,
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: 24,
    background:
        'radial-gradient(circle at 50% 28%, rgba(255, 255, 255, 0.76), transparent 34%), linear-gradient(180deg, rgba(255, 251, 246, 0.7), rgba(243, 234, 220, 0.78)), url("/wedding-hero-texture-mobile.jpg?v=20260701-perf1") center / cover no-repeat',
    WebkitTapHighlightColor: "transparent",
};
const stageStyle: CSSProperties = {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: "min(76vw, 300px)",
    height: 440,
    isolation: "isolate",
    perspective: 900,
};
const cardStyle: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    display: "grid",
    alignContent: "center",
    justifyItems: "center",
    width: "min(100%, 286px)",
    height: 408,
    padding: "34px 18px 30px",
    overflow: "hidden",
    textAlign: "center",
    border: "1px solid rgba(185, 150, 87, 0.28)",
    borderRadius: 18,
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 242, 0.96)), radial-gradient(circle at 50% 18%, rgba(185, 150, 87, 0.12), transparent 38%)",
    boxShadow: "0 28px 70px rgba(54, 41, 24, 0.17), inset 0 0 0 1px rgba(255, 255, 255, 0.72)",
};
const botanicalStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.48,
    background:
        "radial-gradient(ellipse at 24% 18%, rgba(183, 127, 120, 0.24) 0 5%, transparent 5.8%), radial-gradient(ellipse at 31% 15%, rgba(185, 150, 87, 0.18) 0 4.5%, transparent 5.2%), radial-gradient(ellipse at 18% 28%, rgba(111, 125, 110, 0.16) 0 5%, transparent 5.8%), linear-gradient(116deg, transparent 0 24%, rgba(111, 125, 110, 0.22) 24.4%, transparent 25% 100%)",
};
const ringsStyle: CSSProperties = {
    position: "relative",
    width: 66,
    height: 44,
    marginBottom: 18,
};
const firstRingStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 5,
    width: 38,
    height: 38,
    border: "2px solid rgba(185, 150, 87, 0.68)",
    borderRadius: 999,
    boxShadow: "inset 0 0 0 1px rgba(255, 249, 223, 0.44)",
    transform: "rotate(-12deg)",
};
const secondRingStyle: CSSProperties = {
    ...firstRingStyle,
    right: 5,
    left: "auto",
    transform: "rotate(12deg)",
};
const coupleStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    marginTop: 20,
    color: "#211915",
    fontFamily: '"Playfair Display", "Cormorant Garamond", ui-serif, Georgia, "Times New Roman", Times, serif',
    fontSize: "1.3rem",
    fontWeight: 600,
    lineHeight: 1.1,
};
const lineStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    width: 122,
    height: 1,
    margin: "15px auto 12px",
    background: "linear-gradient(90deg, transparent, rgba(185, 150, 87, 0.65), transparent)",
};
const dateStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    color: "#7f612f",
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    fontSize: "0.82rem",
    fontWeight: 700,
    textTransform: "uppercase",
};
const coverStyle: CSSProperties = {
    position: "absolute",
    zIndex: 5,
    width: "min(100%, 286px)",
    height: 408,
    overflow: "hidden",
    textAlign: "center",
    border: "1px solid rgba(185, 150, 87, 0.28)",
    borderRadius: 18,
    background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(247, 238, 222, 0.24)), url("/wedding-opening-cover-bg.jpg?v=20260701-perf1") center / cover no-repeat',
    boxShadow: "0 20px 54px rgba(54, 41, 24, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.68)",
    backdropFilter: "blur(2px)",
    transformOrigin: "top center",
    willChange: "transform, opacity",
};
const coverMarkStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "rgba(255, 255, 255, 0.88)",
    fontFamily: '"Playfair Display", "Cormorant Garamond", ui-serif, Georgia, "Times New Roman", Times, serif',
    fontSize: "5.8rem",
    fontWeight: 700,
    lineHeight: 0.9,
    textShadow: "0 2px 12px rgba(84, 62, 34, 0.18), 0 12px 34px rgba(54, 41, 24, 0.18)",
    transform: "translate(-50%, -50%)",
};

const petals = [
    { animate: { opacity: [0, 0.68, 0], x: -88, y: -96, rotateZ: -28, scale: [0.7, 1, 0.86] }, delay: 1.25 },
    { animate: { opacity: [0, 0.68, 0], x: 72, y: -118, rotateZ: 34, scale: [0.7, 1, 0.86] }, delay: 1.28 },
    { animate: { opacity: [0, 0.68, 0], x: -42, y: -146, rotateZ: 18, scale: [0.7, 1, 0.86] }, delay: 1.4 },
    { animate: { opacity: [0, 0.68, 0], x: 104, y: -72, rotateZ: -18, scale: [0.7, 1, 0.86] }, delay: 1.54 },
    { animate: { opacity: [0, 0.68, 0], x: -106, y: -54, rotateZ: 38, scale: [0.7, 1, 0.86] }, delay: 1.68 },
];

type MobileWeddingRevealIntroProps = {
    onComplete?: () => void;
};

export const MobileWeddingRevealIntro = memo(function MobileWeddingRevealIntro({ onComplete }: MobileWeddingRevealIntroProps) {
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
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible ? (
                <motion.div
                    className="lux-reveal-intro"
                    style={introShellStyle}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    aria-hidden="true"
                >
                    <motion.div
                        className="lux-opening-stage"
                        style={stageStyle}
                        initial={prefersReducedMotion ? false : stageInitial}
                        animate={stageAnimate}
                        transition={{ duration: 0.7, ease: softEase }}
                    >
                        <motion.div
                            className="lux-opening-card"
                            style={cardStyle}
                            initial={prefersReducedMotion ? cardReducedInitial : cardInitial}
                            animate={stageAnimate}
                            transition={{ delay: prefersReducedMotion ? 0 : CARD_REVEAL_DELAY_SECONDS, duration: 1.05, ease: softEase }}
                        >
                            <div className="lux-opening-botanical" style={botanicalStyle} />
                            <div className="lux-opening-rings" style={ringsStyle}>
                                <span style={firstRingStyle} />
                                <span style={secondRingStyle} />
                            </div>
                            <div className="lux-opening-couple" style={coupleStyle}>{content.couple}</div>
                            <div className="lux-opening-line" style={lineStyle} />
                            <div className="lux-opening-date" style={dateStyle}>{content.dateText}</div>
                        </motion.div>

                        <motion.div
                            className="lux-opening-cover"
                            style={coverStyle}
                            initial={prefersReducedMotion ? coverReducedState : coverInitial}
                            animate={prefersReducedMotion ? coverReducedState : coverAnimate}
                            transition={{ delay: COVER_OPEN_DELAY_SECONDS, duration: COVER_OPEN_DURATION_SECONDS, times: [0, 0.72, 1], ease: softEase }}
                        >
                            <div className="lux-opening-cover-mark" style={coverMarkStyle}>GA</div>
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
