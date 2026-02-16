import { motion } from "framer-motion";
import { content } from "../content";

export function LoveStory() {
    const { loveStory } = content;

    return (
        <div className="lux-love-story">
            {loveStory.events.map((event, index) => (
                <motion.div
                    key={index}
                    className="mb-4 mb-md-5"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                    <div
                        className="lux-container d-flex align-items-start gap-3 gap-md-4"
                        style={{
                            padding: "20px",
                            borderLeft: "2px solid rgba(200,170,106,0.5)",
                            paddingLeft: "24px",
                        }}
                    >
                        <div
                            style={{
                                minWidth: 60,
                                fontSize: "1.8rem",
                                fontWeight: "600",
                                color: "var(--lux-gold)",
                                marginTop: "-2px",
                            }}
                        >
                            {event.year}
                        </div>
                        <div className="flex-grow-1">
                            <h3
                                className="fw-semibold mb-2"
                                style={{ fontSize: "1.1rem", color: "var(--lux-text)" }}
                            >
                                {event.title}
                            </h3>
                            <p className="lux-subtle mb-0">{event.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
