import { MapPin } from "lucide-react";
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
                    <div className="lux-eyebrow">
                        Save the date
                    </div>

                    {/* Couple */}
                    <h1
                        className="lux-title fw-semibold mt-2 mb-2"
                        style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", lineHeight: 1.05 }}
                    >
                        {content.couple}
                    </h1>

                    {/* Date */}
                    <div className="lux-date-display">
                        {content.dateText}
                    </div>

                    <div className="lux-sep my-4" />

                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center gap-2 lux-subtle">
                            <MapPin size={18} />
                            <span>{content.cityText}</span>
                        </div>
                    </div>


                    {/* Countdown */}
                    <div className="mt-4">
                        <div className="lux-eyebrow text-center mb-2">Până la eveniment</div>
                        <div className="lux-sep mx-auto" style={{ maxWidth: 240 }} />
                        <Countdown targetLocalIso={content.countdownTargetLocal} />
                    </div>
                </div>
            </div>
        </header>
    );
}
