import { motion } from "framer-motion";
import { content } from "../content";

const messageEase = [0.22, 1, 0.36, 1] as const;

const messageContainerVariants = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 1.5,
            staggerChildren: 0.22,
        },
    },
};

const messageItemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.82, ease: messageEase },
    },
};

const messageLineVariants = {
    hidden: { opacity: 0, scaleX: 0.32 },
    show: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: 0.7, ease: messageEase },
    },
};

export function MessageSection() {
    if (!content.message?.text) return null;

    return (
        <section className="lux-message-section">
            <motion.div
                className="container lux-container text-center"
                variants={messageContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
            >
                <motion.div
                    className="lux-sep lux-message-sep mx-auto mb-4"
                    variants={messageLineVariants}
                    style={{ transformOrigin: "center" }}
                />

                <motion.p className="lux-title lux-message-text" variants={messageItemVariants}>
                    {content.message.text}
                </motion.p>

                <motion.div
                    className="lux-sep lux-message-sep mx-auto mt-4"
                    variants={messageLineVariants}
                    style={{ transformOrigin: "center" }}
                />
            </motion.div>
        </section>
    );
}
