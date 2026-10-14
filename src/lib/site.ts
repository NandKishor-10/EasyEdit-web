export const SITE_NAME = "EasyEdit";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://easyedit.app";

// TODO: replace with the real Google Play package id before launch.
export const PLAY_URL =
  process.env.NEXT_PUBLIC_PLAY_URL ??
  "https://play.google.com/store/apps/details?id=com.easyedit.app";

// TODO: replace with the real support inbox. It is shown on the contact page and used by the form.
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@easyedit.app";

export const CTA_LABEL = "Get the app";

const UNSPLASH = "https://images.unsplash.com";

// TODO: swap these for real app screenshots and results (public/screens/*.webp).
export const IMG = {
  portrait: "photo-1534528741775-53994a69daeb",
  lake: "photo-1470252649378-9c29740c9fa8",
  cabin: "photo-1470770841072-f978cf4d019e",
  waves: "photo-1518837695005-2083093ee35b",
} as const;

export function img(id: string, width = 1400) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const STYLE_NAMES = [
  "Anime film",
  "3D animated",
  "Comic ink",
  "Watercolor",
  "Pixel art",
  "Clay model",
  "Pencil sketch",
  "Cyber neon",
  "Retro anime",
  "Plush toy",
] as const;

export const FILTERS = [
  { id: "original", name: "Original", css: "none" },
  { id: "pop", name: "Pop", css: "saturate(1.6) contrast(1.15) brightness(1.05)" },
  { id: "vivid", name: "Vivid", css: "saturate(1.35) contrast(1.1)" },
  { id: "mono", name: "Mono", css: "grayscale(1) contrast(1.12)" },
  { id: "fade", name: "Fade", css: "saturate(0.7) contrast(0.85) brightness(1.1)" },
  { id: "warm", name: "Warm", css: "sepia(0.35) saturate(1.3) hue-rotate(-8deg)" },
] as const;

export const FAQS = [
  {
    q: "What is EasyEdit?",
    a: "EasyEdit is an Android photo editor that puts AI tools and everyday editing in one app. Edit with a text prompt, remove backgrounds, expand images, enhance quality and apply AI styles.",
  },
  {
    q: "Can I change part of a photo with a prompt?",
    a: "Yes. Brush over the area you want to change, describe the result in a few words, and EasyEdit regenerates only the masked area. The rest of the photo stays untouched.",
  },
  {
    q: "How does background removal work?",
    a: "One tap separates your subject from the background. Keep the cutout transparent, or place it into a new scene.",
  },
  {
    q: "What does Expand do?",
    a: "Expand extends a photo beyond its original edges and fills the new space to match the scene. It is handy for fitting a photo to any aspect ratio.",
  },
  {
    q: "Which basic editing tools are included?",
    a: "Crop, rotate, brightness, contrast and color adjustments, filters such as Pop and Vivid, text, and markup for drawing on your photo.",
  },
  {
    q: "Where can I get EasyEdit?",
    a: "EasyEdit is available for Android on Google Play.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes. Use the Delete account page at any time. The Privacy Policy explains what data the app processes.",
  },
] as const;
