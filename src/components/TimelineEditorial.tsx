import { motion } from "framer-motion";
import { content } from "../content";

export function TimelineEditorial() {
    return (
        <div className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: 820 }}>
                <div className="position-relative">
                    {/* vertical line */}
                    <div
                        className="position-absolute top-0 bottom-0"
                        style={{
                            left: 18,
                            width: 1,
                            background: "linear-gradient(180deg, transparent, rgba(200,170,106,0.65), transparent)",
                        }}
                    />

                    <div className="d-flex flex-column gap-4">
                        {content.schedule.map((item, idx) => (
                            <motion.div
                                key={`${item.time}-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                                className="d-flex gap-3 align-items-start"
                            >
                                {/* dot */}
                                <div
                                    className="flex-shrink-0 mt-1"
                                    style={{
                                        width: 36,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 999,
                                            background: "var(--lux-gold)",
                                            boxShadow: "0 0 0 6px rgba(200,170,106,0.14)",
                                        }}
                                    />
                                </div>

                                {/* content card */}
                                <div className="card lux-card lux-rounded w-100">
                                    <div className="card-body py-4 px-4">
                                        <div className="lux-eyebrow">{item.time}</div>
                                        <div className="lux-title fw-semibold mt-2" style={{ fontSize: "1.25rem" }}>
                                            {item.title}
                                        </div>
                                        {item.subtitle ? (
                                            <div className="lux-subtle mt-1">{item.subtitle}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
