import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" />
        <path d="m15 8-4 4-2-2" />
      </svg>
    ),
    title: "설치도, 접속도 필요 없어요",
    desc: "군부대 특성상 SD카드 장착이 어렵고 LTE가 느린 환경을 고려했습니다. 카카오톡 챗봇 형식이라 앱 설치 용량과 데이터 사용이 최소화되고, 짬봇-보이스는 생활관 TV(기가지니)의 유선 인터넷으로 동작합니다.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
    title: "기다림 없는 실시간 대화",
    desc: "공공데이터를 사전에 가공해 부대별로 분류한 데이터베이스를 구축했습니다. 질문하는 순간 크롤링 과정 없이 즉시 답변을 받아볼 수 있습니다.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    title: "모든 기기에서 똑같이",
    desc: "Windows·macOS·Android·iOS 구분 없이 쓰던 카카오톡에 친구추가만 하면 끝. 짬봇-보이스는 웹앱 방식으로 배포되어 기가지니 기종과 무관하게 항상 최신 버전을 사용할 수 있습니다.",
  },
];

export default function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <Reveal>
          <span className="section-tag">Why JJAMBOT</span>
          <h2 className="section-title">
            군 장병의 사용 환경을
            <br />
            먼저 생각했습니다
          </h2>
        </Reveal>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <article className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
