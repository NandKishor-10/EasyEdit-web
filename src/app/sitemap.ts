import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/contact", priority: 0.5 },
    { path: "/policies?policy=privacy-policy", priority: 0.5 },
    { path: "/policies?policy=terms-of-service", priority: 0.4 },
    { path: "/delete-account", priority: 0.4 },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.path === "" ? "weekly" : "yearly",
    priority: r.priority,
  }));
}
