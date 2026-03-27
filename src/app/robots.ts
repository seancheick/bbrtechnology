import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    host: "https://bbrtechnology.com",
    sitemap: "https://bbrtechnology.com/sitemap.xml",
  };
}
