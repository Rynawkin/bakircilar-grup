import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bakircilarambalaj.com";
const LOCALES = ["tr", "en", "de", "es"] as const;
const LAST_UPDATED = new Date("2026-08-07T00:00:00+03:00");

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/kvkk", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified: LAST_UPDATED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alternateLocale) => [
            alternateLocale,
            `${SITE_URL}/${alternateLocale}${route.path}`,
          ]),
        ),
      },
    })),
  );
}
