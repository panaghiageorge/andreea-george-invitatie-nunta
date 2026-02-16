import {
    Phone,
    MessageCircle,
    CalendarCheck2,
    ParkingSquare,
    Info,
} from "lucide-react";
import { content } from "../content";

function formatTel(phone: string) {
    const digits = phone.replace(/[^\d]/g, "");

    // If Romanian +40 format
    if (digits.startsWith("40") && digits.length === 11) {
        const local = digits.slice(2); // remove 40
        return `+40 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
    }

    // fallback
    return phone;
}

function telHref(phone: string) {
    const digits = phone.replace(/[^\d+]/g, "");
    if (digits.startsWith("+")) return `tel:${digits}`;
    if (digits.startsWith("40")) return `tel:+${digits}`;
    return `tel:${digits}`;
}


function waLink(phone: string) {
    const digits = phone.replace(/[^\d]/g, "");
    return `https://wa.me/${digits}`;
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function pickIcon(title: string) {
    const t = title.toLowerCase();
    if (t.includes("confirm")) return CalendarCheck2;
    if (t.includes("parcare")) return ParkingSquare;
    return Info;
}

export function Details() {
    return (
        <div className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: 820 }}>
                {/* ONE luxury panel (no empty columns) */}
                <div className="lux-panel lux-rounded">
                    <div className="lux-panel-header">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div>
                                <div className="lux-eyebrow">Info</div>
                                <div className="lux-title fw-semibold mt-2" style={{ fontSize: "1.25rem" }}>
                                    Detalii utile & contact
                                </div>
                            </div>

                            <div className="lux-subtle small">
                                Pentru orice întrebare, suntem la un mesaj distanță.
                            </div>
                        </div>

                        <div className="lux-divider mt-3" />
                    </div>

                    <div className="lux-panel-body">
                        {/* CONTACT STRIP */}
                        <div className="mb-4">
                            <div className="lux-eyebrow mb-2">Contact</div>

                            <div className="row g-3">
                                {content.contacts.map((c) => (
                                    <div className="col-12 col-md-6" key={c.phone}>
                                        <div className="lux-contact-card p-3 p-md-4">
                                            <div className="fw-semibold">{c.name}</div>

                                            <div className="d-flex flex-column gap-2 mt-3">
                                                <a
                                                    href={telHref(c.phone)}
                                                    className="text-decoration-none d-flex align-items-center gap-2"
                                                    style={{ color: "var(--lux-text)" }}
                                                >
                                                    <Phone size={16} className="lux-icon-gold" />
                                                    <span className="lux-muted">{formatTel(c.phone)}</span>
                                                </a>

                                                <a
                                                    href={waLink(c.phone)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-decoration-none d-flex align-items-center gap-2"
                                                    style={{ color: "var(--lux-text)" }}
                                                >
                                                    <MessageCircle size={16} className="lux-icon-gold" />
                                                    <span className="lux-muted">WhatsApp</span>
                                                </a>
                                            </div>

                                            <div className="lux-subtle small mt-3">
                                                Pe mobil, apăsarea numărului deschide apelul.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lux-divider my-4" />

                        {/* USEFUL INFO GRID */}
                        <div>
                            <div className="lux-eyebrow mb-2">Informații utile</div>

                            <div className="row g-3">
                                {content.notes.map((n, idx) => {
                                    const Icon = pickIcon(n.title);
                                    return (
                                        <div className="col-12 col-md-6" key={n.title}>
                                            <div className="lux-info-card lux-rounded p-3 p-md-4">
                                                {/* watermark */}
                                                <div className="lux-watermark">{pad2(idx + 1)}</div>

                                                {/* icon + number */}
                                                <div className="d-flex align-items-start gap-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                                                        style={{
                                                            width: 42,
                                                            height: 42,
                                                            borderRadius: 999,
                                                            border: "1px solid rgba(200,170,106,0.30)",
                                                            background: "rgba(200,170,106,0.07)",
                                                        }}
                                                    >
                                                        <Icon className="lux-icon-gold" size={18} />
                                                    </div>

                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold mt-1">{n.title}</div>
                                                    </div>
                                                </div>

                                                <div className="lux-subtle mt-2">{n.text}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="lux-subtle small mt-3">
                                Detaliile pot fi actualizate dacă apar schimbări — verifică înainte de eveniment.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
