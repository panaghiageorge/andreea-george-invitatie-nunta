import { motion } from "framer-motion";
import { Apple, Clock, ExternalLink, MapPin, Navigation, ParkingSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import { content } from "../content";

function buildAppleMapsLink(address: string, city: string) {
    const query = encodeURIComponent(`${address}, ${city}`);
    return `https://maps.apple.com/?q=${query}`;
}

type Coords = { lat: number; lng: number };
type LeafletMap = {
    invalidateSize: () => void;
    fitBounds: (bounds: unknown, options?: { padding?: [number, number] }) => void;
    setView: (latLng: unknown, zoom: number) => void;
    off: () => void;
    remove: () => void;
};
type LeafletMarker = {
    bindPopup: (html: string) => LeafletMarker;
    addTo: (map: LeafletMap) => LeafletMarker;
    setZIndexOffset?: (offset: number) => void;
    on?: (event: string, cb: () => void) => void;
    getElement?: () => HTMLElement | null;
    getLatLng?: () => unknown;
};
type LeafletBounds = {
    isValid?: () => boolean;
    pad?: (value: number) => LeafletBounds;
};
type LeafletLike = {
    map: (container: HTMLElement, options: Record<string, unknown>) => LeafletMap;
    tileLayer: (url: string, options: Record<string, unknown>) => { addTo: (map: LeafletMap) => void };
    divIcon: (options: Record<string, unknown>) => unknown;
    marker: (coords: [number, number], options: Record<string, unknown>) => LeafletMarker;
    featureGroup: (markers: LeafletMarker[]) => { getBounds: () => LeafletBounds };
};

function wazeLinkByCoords(coords?: Coords) {
    if (!coords) return undefined;
    return `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`;
}

export function InteractiveMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Initialize map with Leaflet (via CDN fallback)
        const initMap = () => {
            // Check if map already exists
            if (mapInstance.current) {
                mapInstance.current.invalidateSize();
                return;
            }

            const L = (window as Window & { L?: LeafletLike }).L;
            if (!L) return;
            const container = mapContainer.current;
            if (!container) return;

            try {
                const map = L.map(container, {
                    center: [44.435405, 26.15],
                    zoom: 13,
                    scrollWheelZoom: true,
                    zoomControl: true,
                });

                mapInstance.current = map;

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; OpenStreetMap contributors",
                    maxZoom: 19,
                }).addTo(map);

                // Add custom markers for each location
                const markers: LeafletMarker[] = [];
                content.locations.forEach((location, index) => {
                    const mapsLink = location.mapsUrl;
                    const wazeLink = wazeLinkByCoords(location.coords);
                    const appleMapsLink = buildAppleMapsLink(location.address, location.city);

                    const customIcon = L.divIcon({
                        html: `
                            <div class="custom-marker-inner" style="
                                width: 44px;
                                height: 44px;
                                border-radius: 50%;
                                background: radial-gradient(circle at 30% 28%, #f8eac4 0%, #c8aa6a 44%, #92703a 100%);
                                border: 2px solid rgba(255,255,255,0.96);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 12px 28px rgba(90, 63, 34, 0.22);
                                font-weight: bold;
                                color: white;
                                font-size: 18px;
                                outline: 1px solid rgba(185,150,87,0.38);
                                outline-offset: 4px;
                            ">
                                ${index + 1}
                            </div>
                        `,
                        iconSize: [44, 44],
                        iconAnchor: [22, 44],
                        popupAnchor: [0, -44],
                        className: "custom-marker",
                    });

                    const marker = L.marker([location.coords.lat, location.coords.lng], { icon: customIcon })
                        .bindPopup(`
                            <div style="font-family: Inter, sans-serif; padding: 8px;">
                                <div style="font-weight: 600; margin-bottom: 6px; color: #1f1a14; font-size: 0.95rem;">${location.title}</div>
                                <div style="font-size: 0.85rem; color: #6f675e; margin-bottom: 4px;">${location.name}</div>
                                <div style="font-size: 0.8rem; color: #97743d; font-weight: 600; margin-bottom: 10px;">Ora ${location.time}</div>
                                <div style="display:flex; gap:6px; flex-wrap:wrap;">
                                    <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; font-size:0.75rem; font-weight:600; padding:6px 8px; border-radius:6px; background:linear-gradient(135deg,#c8aa6a 0%,#b89453 100%); color:#fff; border:1px solid rgba(184,148,83,0.45);">Maps</a>
                                    ${wazeLink ? `<a href="${wazeLink}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; font-size:0.75rem; font-weight:600; padding:6px 8px; border-radius:6px; background:rgba(200,170,106,0.14); color:#8d6f38; border:1px solid rgba(200,170,106,0.4);">Waze</a>` : ""}
                                    <a href="${appleMapsLink}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; font-size:0.75rem; font-weight:600; padding:6px 8px; border-radius:6px; background:rgba(200,170,106,0.14); color:#8d6f38; border:1px solid rgba(200,170,106,0.4);">Apple</a>
                                </div>
                            </div>
                        `);

                    // increase z-index so markers sit above other overlays
                    try {
                        marker.setZIndexOffset?.(1000);
                    } catch {
                        /* ignore */
                    }

                    marker.addTo(map);

                    // ensure marker DOM element is above others once added
                    marker.on?.("add", () => {
                        const el = marker.getElement?.();
                        if (el) el.style.zIndex = "9999";
                    });

                    markers.push(marker);
                });

                // If we added markers, fit bounds so they are visible
                if (markers.length) {
                    try {
                        const group = L.featureGroup(markers);
                        const bounds = group.getBounds();
                        if (bounds.isValid && !bounds.isValid()) {
                            // noop
                        } else {
                            map.fitBounds(bounds.pad ? bounds.pad(0.15) : bounds, { padding: [60, 60] });
                        }
                    } catch {
                        // fallback: center on first marker
                        const first = markers[0];
                        if (first && first.getLatLng) {
                            map.setView(first.getLatLng(), 14);
                        }
                    }
                }

                // Trigger map resize after a short delay
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            } catch {
                // Leave map empty if initialization fails.
            }
        };

        // Load Leaflet library if not already loaded
        if (!(window as Window & { L?: LeafletLike }).L) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
            document.head.appendChild(link);

            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
            script.onload = () => {
                setTimeout(initMap, 100);
            };
            script.onerror = () => {
                // If CDN fails, the static location cards still provide all navigation links.
            };
            document.body.appendChild(script);
        } else {
            initMap();
        }

        return () => {
            // Cleanup
            if (mapInstance.current) {
                mapInstance.current.off();
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    return (
        <div>
            <div className="row g-3 g-md-4 lux-locations-list">
                {content.locations.map((location, index) => {
                    const wazeLink = wazeLinkByCoords(location.coords);
                    const appleLink = buildAppleMapsLink(location.address, location.city);

                    return (
                        <motion.div
                            key={index}
                            className="col-12 col-md-6"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div className="lux-location-card" whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                                <div className="lux-location-heading">
                                    <div className="lux-location-badge">{index + 1}</div>

                                    <div>
                                        <div className="lux-location-time">
                                            <Clock size={14} />
                                            {location.time}
                                        </div>
                                        <h4 className="lux-location-title">{location.title}</h4>
                                    </div>
                                </div>

                                <p className="lux-location-name">{location.name}</p>
                                <p className="lux-location-address">
                                    <MapPin size={15} />
                                    <span>{location.address}, {location.city}</span>
                                </p>

                                {location.parkingNote && (
                                    <div className="lux-location-parking">
                                        <ParkingSquare size={14} className="lux-location-parking-icon" />
                                        <span>{location.parkingNote}</span>
                                    </div>
                                )}

                                <div className="lux-location-actions">
                                    <a
                                        href={location.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lux-location-btn lux-location-btn-primary"
                                        title="Deschide în Google Maps"
                                    >
                                        <ExternalLink size={13} />
                                        Google
                                    </a>

                                    {wazeLink && (
                                        <a
                                            href={wazeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="lux-location-btn lux-location-btn-secondary"
                                            title="Deschide în Waze"
                                        >
                                            <Navigation size={13} />
                                            Waze
                                        </a>
                                    )}

                                    <a
                                        href={appleLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lux-location-btn lux-location-btn-secondary"
                                        title="Deschide în Apple Maps"
                                    >
                                        <Apple size={13} />
                                        Apple
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Map Container */}
            <motion.div
                className="lux-map-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    ref={mapContainer}
                    className="lux-map-container"
                    aria-label="Hartă cu locațiile evenimentului"
                />
            </motion.div>
        </div>
    );
}
