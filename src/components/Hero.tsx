import { motion } from "framer-motion";
import { content } from "../content";
import { Countdown } from "./Countdown";

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
                        initial={{ opacity: 0, y: 18, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="lux-hero-crest">{content.monogram ?? "GA"}</div>

                        <h1 className="lux-title lux-hero-title">
                            <span className="lux-hero-name">{firstName}</span>
                            {secondName ? <span className="lux-hero-ampersand">&</span> : null}
                            {secondName ? <span className="lux-hero-name">{secondName}</span> : null}
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
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="lux-eyebrow text-center mb-2">Numărăm zilele până la eveniment</div>
                        <div className="lux-sep lux-hero-sep mx-auto" />
                        <Countdown targetLocalIso={content.countdownTargetLocal} />
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
