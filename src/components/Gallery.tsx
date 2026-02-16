import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { content } from "../content";

export function Gallery() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedImage = content.gallery.find(img => img.id === selectedId);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <>
            <motion.div
                className="row g-3 g-md-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {content.gallery.map((image) => (
                    <motion.div
                        key={image.id}
                        className="col-12 col-sm-6 col-md-4"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="position-relative overflow-hidden"
                            style={{ height: 300, borderRadius: 12 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedId(image.id)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-100 h-100"
                                style={{ objectFit: "cover", cursor: "pointer" }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(135deg, rgba(200,170,106,0) 0%, rgba(200,170,106,0.3) 100%)",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <motion.div
                    className="position-fixed"
                    style={{
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.85)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 16,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedId(null)}
                >
                    <motion.div
                        className="position-relative"
                        style={{ maxWidth: 800, width: "100%" }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-100"
                            style={{ borderRadius: 12 }}
                        />
                        <button
                            onClick={() => setSelectedId(null)}
                            className="btn position-absolute"
                            style={{
                                top: -40,
                                right: 0,
                                background: "none",
                                border: "none",
                                color: "#c8aa6a",
                                cursor: "pointer",
                            }}
                        >
                            <X size={32} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
