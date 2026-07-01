import { motion } from "framer-motion";
import { content } from "../content";
import { Countdown } from "./Countdown";

const heroEase = [0.22, 1, 0.36, 1] as const;

const heroCardVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.975 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.95,
            delay: 0.08,
            ease: heroEase,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: heroEase },
    },
};

const countdownVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            delay: 0.9,
            ease: heroEase,
            staggerChildren: 0.22,
            delayChildren: 0.08,
        },
    },
};

export function Hero() {
    const [firstName, secondName = ""] = content.couple.split("&").map((part) => part.trim());

    return (
        <header className="lux-hero">
            <div className="lux-hero-background" aria-hidden="true" />
            <div className="container d-flex justify-content-center px-3">
                <div className="w-100 lux-container position-relative">
                    <div className="lux-monogram">{content.monogram ?? "GA"}</div>
                    <div className="lux-monogram-2">{content.monogram ?? "GA"}</div>

                    <motion.div
                        className="lux-hero-card"
                        variants={heroCardVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <div className="lux-hero-crest">
                            {content.monogram ?? "GA"}
                        </div>

                        <h1 className="lux-title lux-hero-title">
                            <span className="lux-hero-name">{firstName}</span>
                            {secondName ? (
                                <span className="lux-hero-ampersand">&</span>
                            ) : null}
                            {secondName ? (
                                <span className="lux-hero-name">{secondName}</span>
                            ) : null}
                        </h1>

                        <div className="lux-hero-date-row">
                            <span />
                            <div className="lux-date-display">
                                {content.dateText}
                            </div>
                            <span />
                        </div>

                        <div className="lux-hero-meta">
                            <span>{content.cityText}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lux-hero-countdown"
                        variants={countdownVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div className="lux-eyebrow text-center mb-2" variants={heroItemVariants}>
                            Numărăm zilele până la eveniment
                        </motion.div>
                        <motion.div className="lux-sep lux-hero-sep mx-auto" variants={heroItemVariants} />
                        <motion.div variants={heroItemVariants}>
                            <Countdown targetLocalIso={content.countdownTargetLocal} />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
