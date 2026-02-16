import { motion } from "framer-motion";
import { MapPin, Clock, ExternalLink, Navigation, Apple } from "lucide-react";
import { content } from "../content.ts";
import { ParkingSquare } from "lucide-react";

function buildAppleMapsLink(address: string, city: string) {
    const query = encodeURIComponent(`${address}, ${city}`);
    return `https://maps.apple.com/?q=${query}`;
}
type Coords = { lat: number; lng: number };

function wazeLinkByCoords(coords?: Coords) {
    if (!coords) return undefined;
    // ll=lat,lng + navigate=yes -> deschide direct navigația
    return `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`;
}

function wazeLinkFallback(name: string, city: string) {
    const q = encodeURIComponent(`${name} ${city}`);
    return `https://waze.com/ul?q=${q}&navigate=yes`;
}


export function Locations() {
    return (
        <div className="d-flex justify-content-center">
            <div className="w-100 lux-container">
                <div className="d-flex flex-column gap-4">
                    {content.locations.map((loc, idx) => (
                        <motion.div
                            key={`${loc.name}-${idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.4 }}
                            className="card lux-card lux-rounded text-center"
                        >
                            <div className="card-body py-5 px-4">
                                <div className="text-uppercase small lux-subtle" style={{ letterSpacing: 1 }}>
                                    {loc.title}
                                </div>

                                <div className="lux-sep my-3" />

                                <h4 className="lux-title fw-semibold mb-2">{loc.name}</h4>

                                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                                    <Clock size={16} />
                                    <span className="fw-semibold">{loc.time}</span>
                                </div>

                                <div className="d-flex justify-content-center align-items-center gap-2 lux-subtle small mb-4">
                                    <MapPin size={16} />
                                    <span>{loc.address}, {loc.city}</span>
                                </div>

                                <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                                    <a
                                        href={loc.mapsUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline-lux rounded-pill px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        Google Maps <ExternalLink size={16} />
                                    </a>

                                    <a
                                        href={wazeLinkByCoords(loc.coords) ?? wazeLinkFallback(loc.name, loc.city)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-lux rounded-pill px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        Waze <Navigation size={16} />
                                    </a>

                                    <a
                                        href={buildAppleMapsLink(loc.address, loc.city)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline-lux rounded-pill px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        Apple Maps <Apple size={16} />
                                    </a>
                                </div>
                                {loc.parkingNote && (
                                    <div className="d-flex align-items-start gap-2 justify-content-center lux-subtle small mt-2">
                                        <ParkingSquare size={16} className="lux-icon-gold" style={{ marginTop: 1 }} />
                                        <span>{loc.parkingNote}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
