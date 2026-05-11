import { MapPin } from "lucide-react";
import { content } from "../content";
import { Countdown } from "./Countdown";

export function Hero() {
    return (
        <header className="lux-hero">
            <div className="container d-flex justify-content-center px-3">
                <div className="w-100 lux-container position-relative">
                    <div className="lux-monogram">{content.monogram ?? "GA"}</div>
                    <div className="lux-monogram-2">{content.monogram ?? "GA"}</div>

                    <div className="lux-hero-card">
                        <h1 className="lux-title lux-hero-title fw-semibold mt-2 mb-2">
                            <span>Andreea &</span>
                            <span>George</span>
                        </h1>

                        <div className="lux-date-display">
                            {content.dateText}
                        </div>

                        <p className="lux-hero-tagline mb-0">
                            {content.tagline}
                        </p>

                        <div className="lux-hero-meta">
                            <MapPin size={17} />
                            <span>{content.cityText}</span>
                        </div>
                    </div>

                    <div className="lux-hero-countdown">
                        <div className="lux-eyebrow text-center mb-2">Până la eveniment</div>
                        <div className="lux-sep mx-auto" style={{ maxWidth: 240 }} />
                        <Countdown targetLocalIso={content.countdownTargetLocal} />
                    </div>
                </div>
            </div>
        </header>
    );
}
