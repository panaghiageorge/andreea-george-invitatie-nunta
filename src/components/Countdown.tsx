import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Parts = { months: number; days: number; hours: number };
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function clampNonNegative(n: number) {
    return Math.max(0, Math.floor(n));
}

function addMonths(date: Date, months: number) {
    const next = new Date(date);
    const originalDay = next.getDate();

    next.setMonth(next.getMonth() + months, 1);
    const daysInTargetMonth = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
    next.setDate(Math.min(originalDay, daysInTargetMonth));

    return next;
}

function computeParts(targetLocalIso: string): Parts {
    const now = new Date();
    const target = new Date(`${targetLocalIso}+03:00`);

    if (Number.isNaN(target.getTime()) || target <= now) {
        return { months: 0, days: 0, hours: 0 };
    }

    let months = (target.getFullYear() - now.getFullYear()) * 12 + target.getMonth() - now.getMonth();
    if (addMonths(now, months) > target) {
        months -= 1;
    }

    const afterMonths = addMonths(now, Math.max(0, months));
    const remainingMs = Math.max(0, target.getTime() - afterMonths.getTime());

    return {
        months: clampNonNegative(months),
        days: clampNonNegative(remainingMs / DAY_MS),
        hours: clampNonNegative((remainingMs % DAY_MS) / HOUR_MS),
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
        <div className="lux-countdown-card text-center">
            <Digits value={value} />
            <div className="lux-countdown-label mt-2">{label}</div>
        </div>
    );
}

export function Countdown({ targetLocalIso }: { targetLocalIso: string }) {
    const [parts, setParts] = useState<Parts>(() => computeParts(targetLocalIso));

    useEffect(() => {
        const id = setInterval(() => setParts(computeParts(targetLocalIso)), 60_000);
        return () => clearInterval(id);
    }, [targetLocalIso]);

    const items = useMemo(
        () => [
            { label: "Luni", value: String(parts.months) },
            { label: "Zile", value: String(parts.days) },
            { label: "Ore", value: String(parts.hours) },
        ],
        [parts]
    );

    return (
        <div className="d-flex justify-content-center">
            <div className="lux-countdown w-100">

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
