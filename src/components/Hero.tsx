import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { content } from "../content";
import { Countdown } from "./Countdown";

export function Hero() {
    return (
        <header className="lux-hero">
            <div className="container d-flex justify-content-center px-3">
                <div className="w-100 lux-container position-relative">
                    {/* Monogram background */}
                    <div className="lux-monogram">{content.monogram ?? "GA"}</div>
                    <div className="lux-monogram-2">{content.monogram ?? "GA"}</div>

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lux-eyebrow"
                    >
                        Save the date
                    </motion.div>

                    {/* Couple */}
                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.05 }}
                        className="lux-title fw-semibold mt-2 mb-2"
                        style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", lineHeight: 1.05 }}
                    >
                        {content.couple}
                    </motion.h1>

                    {/* Date */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                        className="lux-date-display"
                    >
                        {content.dateText}
                    </motion.div>

                    <div className="lux-sep my-4" />

                    {/* Meta row */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.18 }}
                        className="d-flex flex-column gap-2"
                    >
                        <div className="d-flex align-items-center gap-2 lux-subtle">
                            <CalendarDays size={18} />
                            <span>{content.dateText}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 lux-subtle">
                            <MapPin size={18} />
                            <span>{content.cityText}</span>
                        </div>
                    </motion.div>


                    {/* Countdown */}
                    <div className="mt-4">
                        <div className="lux-eyebrow text-center mb-2">Time until</div>
                        <div className="lux-sep mx-auto" style={{ maxWidth: 240 }} />
                        <Countdown targetLocalIso={content.countdownTargetLocal} />
                    </div>
                </div>
            </div>
        </header>
    );
}
