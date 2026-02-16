import { CalendarCheck2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { content } from "../content";

function isValidRsvpUrl(url: string) {
    const normalized = url.trim();
    if (!normalized || normalized.includes("PASTE_YOUR_GOOGLE_FORM")) return false;
    return /^https?:\/\//i.test(normalized);
}

export function RSVP() {
    const disabled = !isValidRsvpUrl(content.rsvpUrl);

    return (
        <div className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: 820 }}>
                <div className="lux-panel lux-rounded">
                    <div className="lux-panel-header">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <CalendarCheck2 size={18} />
                                <div className="lux-eyebrow">RSVP</div>
                            </div>

                            <div className="lux-subtle small">Vă mulțumim pentru răspuns</div>
                        </div>

                        <div className="lux-divider mt-3" />
                    </div>

                    <div className="lux-panel-body">
                        <div className="row g-4 align-items-center">
                            <div className="col-12 col-md-7">
                                <h3
                                    className="lux-title fw-semibold mb-2"
                                    style={{ fontSize: "clamp(1.2rem, 3.2vw, 1.6rem)" }}
                                >
                                    Confirmare prezență
                                </h3>

                                <p className="lux-subtle mb-0">
                                    Dacă puteți, ne-ar ajuta mult să confirmați participarea din timp, pentru a
                                    organiza cât mai bine această zi.
                                </p>

                                <div className="mt-3 lux-subtle small">
                                    Formularul se deschide într-o pagină nouă.
                                </div>
                            </div>

                            <div className="col-12 col-md-5">
                                <motion.a
                                    whileHover={{ scale: disabled ? 1 : 1.02 }}
                                    whileTap={{ scale: disabled ? 1 : 0.98 }}
                                    href={disabled ? undefined : content.rsvpUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={[
                                        "btn rounded-pill w-100 py-3 d-flex align-items-center justify-content-center gap-2",
                                        disabled ? "btn-outline-lux disabled" : "btn-lux",
                                    ].join(" ")}
                                    onClick={(e) => {
                                        if (disabled) e.preventDefault();
                                    }}
                                    style={{ fontWeight: 600 }}
                                >
                                    {disabled ? "RSVP (în curând)" : "Completează RSVP"}
                                    {!disabled ? <ExternalLink size={16} /> : null}
                                </motion.a>

                                <div className="text-center mt-2 small lux-subtle">
                                    {disabled ? (
                                        <>
                                            Adaugi link-ul în <code>src/content.ts</code>.
                                        </>
                                    ) : (
                                        <>Ne ajută mult pentru organizare.</>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* small footer note */}
                <div className="text-center lux-subtle small mt-3">
                    RSVP-ul poate fi actualizat oricând — site-ul se redeployează automat după push.
                </div>
            </div>
        </div>
    );
}
