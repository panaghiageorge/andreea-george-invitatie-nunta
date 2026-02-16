import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { TimelineEditorial } from "./components/TimelineEditorial";
import { RSVP } from "./components/RSVP";
import { Details } from "./components/Details";
import { MessageSection } from "./components/MessageSection.tsx";
import { Gallery } from "./components/Gallery";
import { LoveStory } from "./components/LoveStory";
import { InteractiveMap } from "./components/InteractiveMap";
import { content } from "./content";

export default function App() {
    return (
        <div className="min-vh-100">
            <Navbar />

            <Hero />

            <MessageSection />

            <Section
                id="povestea-noastra"
                eyebrow="Our Story"
                title="Povestea noastră"
                subtitle='De la întâlnire până la "da, vreau!"'
            >
                <LoveStory />
            </Section>

            <Section
                id="galerie"
                eyebrow="Memories"
                title="Galerie"
                subtitle="Momente frumoase din povestea noastră"
            >
                <Gallery />
            </Section>

            <Section
                id="program"
                eyebrow="The day"
                title="Program"
                subtitle="Orele de mai jos sunt orientative și pot suferi mici modificări."
            >
                <TimelineEditorial />
            </Section>

            <Section
                id="locatii"
                eyebrow="Navigation"
                title="Locații și Hartă"
                subtitle="Alege aplicația preferată pentru navigație."
            >
                <InteractiveMap />
            </Section>

            <Section id="rsvp" eyebrow="Attendance" title="Confirmare prezență" subtitle="Un mic răspuns ne ajută mult.">
                <RSVP />
            </Section>

            <Section id="detalii" eyebrow="Info" title="Detalii" subtitle="Contact, informații utile și orice actualizări.">
                <Details />
            </Section>

            <footer className="py-4">
                <div className="container d-flex justify-content-center px-3">
                    <div
                        className="w-100 lux-container d-flex justify-content-between align-items-center flex-wrap gap-2"
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
