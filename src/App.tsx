import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Details } from "./components/Details";
import { MessageSection } from "./components/MessageSection.tsx";
import { InteractiveMap } from "./components/InteractiveMap";
import { MobileWeddingRevealIntro } from "./components/MobileWeddingRevealIntro";
import { content } from "./content";

export default function App() {
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    const handleIntroComplete = useCallback(() => {
        setIsIntroComplete(true);
    }, []);

    return (
        <div>
            {!isIntroComplete ? <MobileWeddingRevealIntro onComplete={handleIntroComplete} /> : null}

            {isIntroComplete ? (
                <>
                    <motion.main
                        className="min-vh-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Hero />

                        <MessageSection />

                        <Section
                            id="program"
                            eyebrow=""
                            title=""
                            subtitle="Vă așteptăm cu drag la ceremonia religioasă și apoi la petrecere."
                        >
                            <InteractiveMap />
                        </Section>

                        <div className="px-3" id="detalii">
                            <Details />
                        </div>
                    </motion.main>

                    <footer className="lux-footer py-4 py-md-5">
                        <div className="container d-flex justify-content-center px-3">
                            <motion.div
                                className="w-100 lux-container text-center"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 0.65 }}
                            >
                                <div className="lux-footer-mark">{content.monogram ?? "GA"}</div>
                                <div className="lux-title lux-footer-title">{content.couple}</div>
                                <div className="lux-sep lux-footer-sep mx-auto my-3" />
                                <div className="lux-footer-note">
                                    Vă mulțumim că ne sunteți aproape și abia așteptăm să sărbătorim împreună.
                                </div>
                                <div className="small lux-subtle mt-3">
                                    {content.dateText} • {content.cityText}
                                </div>
                            </motion.div>
                        </div>
                    </footer>
                </>
            ) : null}
        </div>
    );
}
