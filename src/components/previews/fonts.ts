import { Bricolage_Grotesque, Figtree, Geist, Geist_Mono, IBM_Plex_Sans, Manrope, Newsreader, Space_Grotesk } from "next/font/google";

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

// FieldOps: the mobile app (lib/app/theme/app_theme.dart) uses Space Grotesk headings and
// IBM Plex Sans text; the supervisor web app uses Manrope for headings and KPI digits.
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-fo-display", preload: false });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fo-sans", preload: false });
const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-fo-web", preload: false });

export const pharmaGuideFonts = `${geist.variable} ${geistMono.variable} ${newsreader.variable}`;
export const keniyaFonts = `${bricolage.variable} ${figtree.variable}`;
export const fieldOpsFonts = `${spaceGrotesk.variable} ${plex.variable} ${manrope.variable} ${geist.variable}`;
