import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export function Section({
                            id,
                            eyebrow = "Details",
                            title,
                            subtitle,
                            children,
                        }: PropsWithChildren<{ id?: string; eyebrow?: string; title: string; subtitle?: string }>) {
    return (
        <section id={id} className="py-4 py-md-5">
            <div className="container d-flex justify-content-center px-3">
                <div className="w-100 lux-container">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.5 }}
                        className="mb-3 mb-md-4"
                    >
                        <div className="lux-eyebrow">{eyebrow}</div>
                        <h2 className="lux-title fw-semibold mt-2 mb-1" style={{ fontSize: "clamp(1.35rem, 3.8vw, 2rem)" }}>
                            {title}
                        </h2>
                        {subtitle ? <p className="lux-subtle mb-0">{subtitle}</p> : null}
                        <div className="lux-sep mt-3" />
                    </motion.div>

                    {children}
                </div>
            </div>
        </section>
    );
}
