import PhoneFrame from "./PhoneFrame";

const TILES = [
  {
    label: "군병원",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    label: "TMO",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="3" width="14" height="12" rx="4" />
        <path d="M5 11h14" />
        <path d="m9 19-2 3M15 19l2 3" />
        <path d="M8.5 7h.01M15.5 7h.01" />
      </svg>
    ),
  },
  {
    label: "병사 할인",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 13.5 12.5 21a2 2 0 0 1-2.8 0l-6.7-6.7a2 2 0 0 1 0-2.8L10.5 4h7A2.5 2.5 0 0 1 20 6.5v7Z" />
        <circle cx="15" cy="9" r="1.3" />
      </svg>
    ),
  },
  {
    label: "월급 정보",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7" ry="3" />
        <path d="M5 6.5v5.5c0 1.66 3.13 3 7 3s7-1.34 7-3V6.5" />
        <path d="M5 12v5.5c0 1.66 3.13 3 7 3s7-1.34 7-3V12" />
      </svg>
    ),
  },
  {
    label: "보급 기준",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 8 12 3.5 3 8l9 4.5 9-4.5Z" />
        <path d="M3 8v8l9 4.5V12.5" />
        <path d="M21 8v8l-9 4.5V12.5" />
      </svg>
    ),
  },
  {
    label: "더보기",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
];

export default function WelfareScreen() {
  return (
    <PhoneFrame subtitle="복지 정보 안내">
      <div className="app-screen welfare-app">
        <div className="welfare-feature">
          <span className="welfare-feature-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 7h11l1 13h-13z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
          </span>
          <div className="welfare-feature-body">
            <strong>PX 인기상품</strong>
            <span className="welfare-feature-desc">이번 주 매점 인기 상품 모아보기</span>
          </div>
          <span className="welfare-feature-arrow" aria-hidden="true">
            →
          </span>
        </div>

        <div className="welfare-grid">
          {TILES.map((t) => (
            <div className="welfare-tile" key={t.label}>
              <span className="welfare-tile-icon" aria-hidden="true">
                {t.icon}
              </span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
