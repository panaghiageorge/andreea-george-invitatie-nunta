import { useEffect, useMemo, useState } from "react";
import { content } from "../content";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTIONS = [
    { id: "program", label: "Program" },
    { id: "locatii", label: "Locații" },
    { id: "detalii", label: "Detalii" },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [clickedActive, setClickedActive] = useState<string | null>(null);

    const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
    const active = useActiveSection(ids);
    const displayActive = clickedActive ?? active;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 18);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // lock scroll when drawer open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const close = () => setOpen(false);

    const handleNavClick = (id: string) => {
        setClickedActive(id);
        setOpen(false);
        window.setTimeout(() => setClickedActive(null), 900);
    };

    return (
        <>
        <nav
            className={[
                "fixed-top py-3 lux-nav",
                scrolled ? "lux-nav--scrolled" : "lux-nav--top",
            ].join(" ")}
            style={{ zIndex: 1030 }}
        >
            <div className="container d-flex justify-content-center px-3">
                <div className="w-100 lux-container d-flex align-items-center justify-content-between">
                    <a
                        href="#"
                        className="lux-title fw-semibold m-0 text-decoration-none"
                        style={{ color: "var(--lux-text)", fontSize: 18 }}
                        onClick={close}
                    >
                        {content.couple}
                    </a>

                    {/* Desktop links */}
                    <div className="d-none d-lg-flex align-items-center gap-4">
                        {SECTIONS.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className={["lux-nav-link", displayActive === s.id ? "active" : ""].join(" ")}
                                onClick={() => handleNavClick(s.id)}
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="d-lg-none btn btn-outline-lux rounded-pill px-3 py-2"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Open menu"
                        aria-expanded={open}
                    >
                        {open ? "Închide" : "Meniu"}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {open ? (
                <div className="d-lg-none lux-drawer">
                    <div className="container d-flex justify-content-center px-3">
                        <div className="w-100 lux-container py-2">
                            {SECTIONS.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="lux-drawer-link"
                                    onClick={() => handleNavClick(s.id)}
                                >
                  <span className="lux-subtle me-2" style={{ letterSpacing: 1 }}>
                    {displayActive === s.id ? "•" : " "}
                  </span>
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
        {open && <div className="lux-backdrop" onClick={close} />}
        </>
    );
}
