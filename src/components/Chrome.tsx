import Image from "next/image";
import Link from "next/link";
import { PlayButton } from "@/components/PlayButton";
// Very small icon: the app's favicon, used as the logo mark in the header and footer.
import favicon from "@/app/favicon.ico";

export function Mark() {
  return (
    <Link
      href="/"
      aria-label="EasyEdit home"
      translate="no"
      className="group inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[-0.04em]"
    >
      <Image
        src={favicon}
        alt=""
        width={36}
        height={36}
        unoptimized
        className="size-9 rounded-xl transition-transform duration-300 group-hover:-rotate-12"
      />
      easyedit.
    </Link>
  );
}

const NAV = [
  { href: "#ai", label: "AI Editing" },
  { href: "#essentials", label: "Tools" },
  { href: "#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-350 items-center justify-between gap-6 px-5 md:px-8">
        <Mark />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <PlayButton />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-6 px-5 py-8 md:px-8">
        <Mark />
        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            ["/privacy-policy", "Privacy"],
            ["/terms", "Terms"],
            ["/delete-account", "Delete account"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted" translate="no">
          &copy; {new Date().getFullYear()} EasyEdit
        </p>
      </div>
    </footer>
  );
}
