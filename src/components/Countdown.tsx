import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { AnimatePresence, motion } from "framer-motion";

type Parts = { months: number; days: number; hours: number; minutes: number; seconds: number };
const ZONE = "Europe/Bucharest";

function clampNonNegative(n: number) {
    return Math.max(0, Math.floor(n));
}
function pad2(n: number) {
    return String(n).padStart(2, "0");
}

function computeParts(targetLocalIso: string): Parts {
    const now = DateTime.now().setZone(ZONE);
    const target = DateTime.fromISO(targetLocalIso, { zone: ZONE });

    if (!target.isValid || target <= now) {
        return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const diff = target.diff(now, ["months", "days", "hours", "minutes", "seconds"]).toObject();

    return {
        months: clampNonNegative(diff.months ?? 0),
        days: clampNonNegative(diff.days ?? 0),
        hours: clampNonNegative(diff.hours ?? 0),
        minutes: clampNonNegative(diff.minutes ?? 0),
        seconds: clampNonNegative(diff.seconds ?? 0),
    };
}

function FlipDigit({ digit }: { digit: string }) {
    return (
        <div className="position-relative overflow-hidden" style={{ height: 36, width: 22 }}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={digit}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="position-absolute top-0 start-0 w-100 text-center lux-countdown-value"
                    style={{ fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "36px", fontVariantNumeric: "tabular-nums" }}
                >
                    {digit}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function Digits({ value }: { value: string }) {
    return (
        <div className="d-inline-flex justify-content-center gap-1">
            {value.split("").map((c, i) => (
                <FlipDigit key={`${c}-${i}`} digit={c} />
            ))}
        </div>
    );
}

function UnitCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="lux-countdown-card px-3 py-3 text-center">
            <Digits value={value} />
            <div className="lux-countdown-label mt-2">{label}</div>
        </div>
    );
}

export function Countdown({ targetLocalIso }: { targetLocalIso: string }) {
    const [parts, setParts] = useState<Parts>(() => computeParts(targetLocalIso));

    useEffect(() => {
        const id = setInterval(() => setParts(computeParts(targetLocalIso)), 1000);
        return () => clearInterval(id);
    }, [targetLocalIso]);

    const items = useMemo(
        () => [
            { label: "Luni", value: String(parts.months) },
            { label: "Zile", value: String(parts.days) },
            { label: "Ore", value: pad2(parts.hours) },
            { label: "Minute", value: pad2(parts.minutes) },
            { label: "Secunde", value: pad2(parts.seconds) },
        ],
        [parts]
    );

    return (
        <div className="d-flex justify-content-center">
            <div className="lux-countdown lux-rounded px-3 px-md-4 py-3 w-100" style={{ maxWidth: 820 }}>

                {/* Mobile: grid (no bullets) */}
                <div className="lux-countdown-grid d-md-none">
                    {items.map((it) => (
                        <UnitCard key={it.label} label={it.label} value={it.value} />
                    ))}
                </div>

                {/* Desktop: row with bullets */}
                <div className="lux-countdown-bullets d-none d-md-flex">
                    {items.map((it, idx) => (
                        <div key={it.label} className="d-flex align-items-center">
                            <UnitCard label={it.label} value={it.value} />
                            {idx !== items.length - 1 ? <div className="mx-3 lux-countdown-dot" /> : null}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
