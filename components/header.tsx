"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

const links = [
  ["/about", "About"],
  ["/h-infinity", "H Infinity"],
  ["/first-chapter", "Our First Chapter"],
  ["/projects", "Projects"],
  ["/stories", "Stories"],
  ["/people", "People"]
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="主導覽">
          {links.map(([href, label]) => (
            <Link key={href} className={pathname.startsWith(href) ? "is-active" : ""} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className="nav-apply" href="/apply" onClick={() => setOpen(false)}>Apply</Link>
        </nav>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="開啟選單">
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
