import { useEffect, useState } from "react";

const LINKS = [
  { href: "#features", label: "특징" },
  { href: "#preview", label: "주요 기능" },
  { href: "#services", label: "서비스" },
  { href: "#start", label: "시작하기" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            짬
          </span>
          <span className="brand-name">
            짬봇 <em>JJAMBOT</em>
          </span>
        </a>

        <nav className={`nav-links ${open ? "nav-links-open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn-primary btn-sm nav-cta"
            href="https://pf.kakao.com/_xlVKrxb/chat"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <KakaoIcon />
            카카오톡 문의
          </a>
        </nav>

        <button
          className={`nav-burger ${open ? "nav-burger-open" : ""}`}
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65-.2.75-.75 2.8-.86 3.24-.13.54.2.53.42.39.17-.11 2.75-1.87 3.87-2.63.62.09 1.26.14 1.91.14 5.52 0 10-3.54 10-7.79C22 6.54 17.52 3 12 3z" />
    </svg>
  );
}
