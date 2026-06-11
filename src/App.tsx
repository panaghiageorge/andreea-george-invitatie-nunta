import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { TimelineEditorial } from "./components/TimelineEditorial";
import { Details } from "./components/Details";
import { MessageSection } from "./components/MessageSection.tsx";
import { InteractiveMap } from "./components/InteractiveMap";
import { content } from "./content";

export default function App() {
    return (
        <div className="min-vh-100">
            {/* <Navbar /> */}

            <Hero />

            <MessageSection />

            <Section
                id="program"
                eyebrow="Ziua nunții"
                title="Program"
                subtitle="Vă așteptăm cu drag la ceremonia religioasă și apoi la petrecere."
            >
                <TimelineEditorial />
            </Section>

            <Section
                id="locatii"
                eyebrow="Cum ajungi"
                title="Locații"
                subtitle="Am pregătit mai jos adresele și linkurile de navigație."
            >
                <InteractiveMap />
            </Section>

        
            <div className="px-3" id="detalii">
                <Details />
            </div>
            

            <footer className="py-4">
                <div className="container d-flex justify-content-center px-3">
                    <div
                        className="w-100 lux-container d-flex justify-content-center justify-content-sm-between align-items-center flex-wrap gap-2 text-center text-sm-start"
                        style={{ borderTop: "1px solid rgba(200,170,106,0.22)", paddingTop: 16 }}
                    >
                        <div className="small lux-subtle">
                            © {new Date().getFullYear()}{" "}
                            <span className="lux-title" style={{ color: "var(--lux-text)" }}>
                {content.couple}
              </span>
                        </div>

                        <div className="small lux-subtle">
                            {content.dateText} • {content.cityText}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
