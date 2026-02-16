import { content } from "../content";

export function MessageSection() {
    if (!content.message?.text) return null;

    return (
        <section className="py-5">
            <div className="container lux-container text-center">
                <div className="lux-sep mx-auto mb-4" style={{ maxWidth: 180 }} />

                <p
                    className="lux-title"
                    style={{
                        fontStyle: "italic",
                        fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                        lineHeight: 1.7,
                        maxWidth: 720,
                        margin: "0 auto",
                    }}
                >
                    {content.message.text}
                </p>

                <div className="lux-sep mx-auto mt-4" style={{ maxWidth: 180 }} />
            </div>
        </section>
    );
}
