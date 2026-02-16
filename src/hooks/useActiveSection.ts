import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
    const [active, setActive] = useState<string>(sectionIds[0] ?? "");

    useEffect(() => {
        const els = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                // alegem cea mai vizibilă secțiune
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

                if (visible?.target?.id) setActive(visible.target.id);
            },
            {
                root: null,
                // navbar height compensation
                rootMargin: "-30% 0px -60% 0px",
                threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
            }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [sectionIds.join("|")]);

    return active;
}