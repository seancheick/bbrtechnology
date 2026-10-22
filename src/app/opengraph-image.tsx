import { ogImage, ogSize } from "@/lib/og";

export const alt = "B&Br Technology: software, AI and automation, built around your business";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Founder-led software studio · Boston",
    title: "Software, AI & automation, built around your business.",
    subtitle: "Published prices. Fixed quotes. Products we built and run.",
  });
}
