import { defineSiteConfig } from "@svecodocs/kit";

export const siteConfig = defineSiteConfig({
    name: "Sensel docs",
    url: "https://localhost:5173",
    ogImage: {
        url: "https://docs.sveco.dev/og.png",
        height: "630",
        width: "1200",
    },
    description: "Documentation for the sensel library and cli.",
    author: "mielsense",
    keywords: [
        "library",
        "sveltekit",
        "documentation",
        "docs",
        "ui",
        "sensel",
        "mielsense",
        "icons",
        "svelte",
    ],
    license: {
        name: "MIT",
        url: "https://github.com/mielsense/sensel/blob/main/LICENSE",
    },
    links: {
        github: "https://github.com/mielsense/sensel",
    },
});
