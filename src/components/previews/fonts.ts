import { Bricolage_Grotesque, Figtree, Geist, Geist_Mono, Newsreader } from "next/font/google";

// Each product preview uses its own app's type, so the screens read as those products,
// not as this site. Not preloaded: the previews sit below the hero copy.

// PharmaGuide (lib/core/theme/v2/v2_typography.dart): Geist 400/500, Geist Mono for
// metadata, Newsreader as a display accent only.
const geist = Geist({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-pg-sans", preload: false });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-pg-mono", preload: false });
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400"], variable: "--font-pg-serif", preload: false });

// Keniya (src/app/layout.tsx): Bricolage Grotesque for display, Figtree for text.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-kn-display", preload: false });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-kn-sans", preload: false });

export const pharmaGuideFonts = `${geist.variable} ${geistMono.variable} ${newsreader.variable}`;
export const keniyaFonts = `${bricolage.variable} ${figtree.variable}`;
