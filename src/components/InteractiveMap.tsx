import { motion } from "framer-motion";
import { Navigation, Apple, Clock, ParkingSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import { content } from "../content";

function buildAppleMapsLink(address: string, city: string) {
    const query = encodeURIComponent(`${address}, ${city}`);
    return `https://maps.apple.com/?q=${query}`;
}

type Coords = { lat: number; lng: number };

function wazeLinkByCoords(coords?: Coords) {
    if (!coords) return undefined;
    return `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`;
}

export function InteractiveMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Initialize map with Leaflet (via CDN fallback)
        const initMap = () => {
            // Check if map already exists
            if (mapInstance.current) {
                mapInstance.current.invalidateSize();
                return;
            }

            try {
                const L = (window as any).L;
                const map = L.map(mapContainer.current, {
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
                const markers: any[] = [];
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
                                background: linear-gradient(135deg, #c8aa6a 0%, #b89453 100%);
                                border: 3px solid white;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 4px 12px rgba(200, 170, 106, 0.4);
                                font-weight: bold;
                                color: white;
                                font-size: 18px;
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
                                <div style="font-size: 0.8rem; color: #c8aa6a; font-weight: 500; margin-bottom: 10px;">⏰ ${location.time}</div>
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
                    } catch (e) {
                        /* ignore */
                    }

                    marker.addTo(map);

                    // ensure marker DOM element is above others once added
                    marker.on && marker.on("add", () => {
                        const el = marker.getElement && marker.getElement();
                        if (el) el.style.zIndex = "9999";
                    });

                    markers.push(marker);
                    console.debug("Added marker", { index, coords: location.coords });
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
                    } catch (e) {
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
            } catch (error) {
                console.error("Map initialization error:", error);
            }
        };

        // Load Leaflet library if not already loaded
        if (!(window as any).L) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
            document.head.appendChild(link);

            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
            script.onload = () => {
                setTimeout(initMap, 100);
            };
            script.onerror = () => console.error("Failed to load Leaflet");
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
        <div className="lux-interactive-map">
            {/* Map Container */}
            <motion.div
                className="lux-map-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div
                    ref={mapContainer}
                    className="lux-map-container"
                    style={{
                        height: 450,
                        borderRadius: 16,
                        overflow: "hidden",
                        marginBottom: 40,
                        border: "1px solid rgba(200,170,106,0.35)",
                        boxShadow: "0 20px 60px rgba(200,170,106,0.15)",
                        background: "linear-gradient(135deg, rgba(251,247,239,0.5), rgba(246,239,226,0.5))",
                    }}
                />
            </motion.div>

            {/* Locations Summary */}
            <div className="row g-3 g-md-4">
                {content.locations.map((location, index) => {
                    const wazeLink = wazeLinkByCoords(location.coords);
                    const appleLink = buildAppleMapsLink(location.address, location.city);

                    return (
                        <motion.div
                            key={index}
                            className="col-12 col-md-6 col-lg-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.12 }}
                        >
                            <motion.div className="lux-location-card" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                                <div className="lux-location-badge">{index + 1}</div>

                                <div className="lux-location-time">
                                    <Clock size={14} />
                                    {location.time}
                                </div>

                                <h4 className="lux-location-title">{location.title}</h4>
                                <p className="lux-location-name">{location.name}</p>
                                <p className="lux-location-address">📍 {location.address}, {location.city}</p>

                                <div className="lux-location-parking">
                                    <ParkingSquare size={14} className="lux-location-parking-icon" />
                                    <span>{location.parkingNote}</span>
                                </div>

                                <div className="lux-location-actions">
                                    <a
                                        href={location.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="lux-location-btn lux-location-btn-primary"
                                        title="Deschide în Google Maps"
                                    >
                                        <Navigation size={12} />
                                        Maps
                                    </a>

                                    {wazeLink && (
                                        <a
                                            href={wazeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="lux-location-btn lux-location-btn-secondary"
                                            title="Deschide în Waze"
                                        >
                                            <Navigation size={12} />
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
                                        <Apple size={12} />
                                        Apple
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
