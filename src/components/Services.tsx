import Reveal from "./Reveal";

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <Reveal>
          <span className="section-tag">Service</span>
          <h2 className="section-title">두 가지 짬봇, 하나의 경험</h2>
        </Reveal>

        <div className="services-grid">
          <Reveal delay={0}>
            <article className="service-card">
              <span className="badge badge-live">운영 중</span>
              <div className="service-icon service-icon-chat">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>짬봇-채팅</h3>
              <p className="service-sub">Kakao Chatbot</p>
              <p>
                카카오톡 채널 추가만으로 바로 시작하는 군대 정보 챗봇.
                스마트폰과 PC 어디서든 대화하듯 물어보세요.
              </p>
              <a
                className="service-link"
                href="https://pf.kakao.com/_xlVKrxb"
                target="_blank"
                rel="noreferrer"
              >
                채널 추가하기 →
              </a>
            </article>
          </Reveal>

          <Reveal delay={140}>
            <article className="service-card service-card-ended">
              <span className="badge badge-ended">서비스 종료</span>
              <div className="service-icon service-icon-voice">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <path d="M12 19v3" />
                </svg>
              </div>
              <h3>짬봇-보이스</h3>
              <p className="service-sub">GiGA Genie</p>
              <p>
                생활관 TV의 기가지니에서 음성으로 만나던 짬봇. 웹앱 방식으로
                배포되어 모든 기종에서 동일하게 동작했습니다.
              </p>
              <span className="service-link service-link-disabled">
                서비스가 종료되었습니다
              </span>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
