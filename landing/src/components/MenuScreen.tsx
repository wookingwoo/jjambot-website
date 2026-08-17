import PhoneFrame from "./PhoneFrame";

const MEALS = [
  {
    name: "아침",
    dishes: "흑미밥 · 순두부찌개 · 진미채볶음",
    allergy: "새우",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v4" />
        <path d="M5.6 7.6 7 9" />
        <path d="m18.4 7.6-1.4 1.4" />
        <path d="M2 17h20" />
        <path d="M6 17a6 6 0 0 1 12 0" />
      </svg>
    ),
  },
  {
    name: "점심",
    dishes: "잡곡밥 · 김치찌개 · 제육볶음",
    allergy: "돼지고기",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    ),
  },
  {
    name: "저녁",
    dishes: "흰밥 · 미역국 · 돈까스 · 양배추샐러드",
    allergy: null,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
      </svg>
    ),
  },
];

export default function MenuScreen() {
  return (
    <PhoneFrame subtitle="식단 정보 조회">
      <div className="app-screen menu-app">
        <div className="menu-app-head">
          <span className="pill pill-sm">5322부대</span>
          <span className="toggle toggle-on">
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            알러지 표기
          </span>
        </div>

        <div className="day-tabs">
          <span className="day-tab">어제</span>
          <span className="day-tab day-tab-active">오늘</span>
          <span className="day-tab">내일</span>
          <span className="day-tab">모레</span>
        </div>

        <span className="menu-date-lg">월요일 식단</span>

        <div className="meal-list">
          {MEALS.map((m) => (
            <div className="meal-row" key={m.name}>
              <span className="meal-row-icon">{m.icon}</span>
              <div className="meal-row-body">
                <span className="meal-name">{m.name}</span>
                <p>
                  {m.dishes}
                  {m.allergy && <span className="allergy-tag">{m.allergy}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
