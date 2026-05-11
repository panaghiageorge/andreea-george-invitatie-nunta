import { motion } from "framer-motion";
import { content } from "../content";

export function TimelineEditorial() {
    return (
        <div className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: 820 }}>
                <div className="position-relative">
                    {/* vertical line */}
                    <div className="lux-timeline-line" />

                    <div className="d-flex flex-column gap-4">
                        {content.schedule.map((item, idx) => (
                            <motion.div
                                key={`${item.time}-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                                className="lux-timeline-item"
                            >
                                {/* dot */}
                                <div className="lux-timeline-dot-wrap">
                                    <div className="lux-timeline-dot" />
                                </div>

                                {/* content card */}
                                <div className="card lux-card lux-rounded flex-grow-1 min-width-0">
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
