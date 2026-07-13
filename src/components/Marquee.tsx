const WORDS = [
  "오늘의 식단",
  "군 용어 사전",
  "PX 인기상품",
  "TMO 안내",
  "병사 할인혜택",
  "군병원 정보",
  "체력검정 기준",
  "월급 정보",
  "예비군 정보",
  "호국선열 정보",
  "보급 기준",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i}>
            {w}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
