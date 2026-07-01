import { content } from "../content";

export function MessageSection() {
    if (!content.message?.text) return null;

    return (
        <section className="lux-message-section">
            <div className="container lux-container text-center">
                <div className="lux-sep lux-message-sep mx-auto mb-4" />

                <p className="lux-title lux-message-text">
                    {content.message.text}
                </p>

                <div className="lux-sep lux-message-sep mx-auto mt-4" />
            </div>
        </section>
    );
}
