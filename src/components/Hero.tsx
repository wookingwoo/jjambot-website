import ChatDemo from "./ChatDemo";
import { KakaoIcon, WebIcon } from "./Navbar";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="pill fade-item" style={{ animationDelay: "0.05s" }}>
            <span className="pill-dot" />
            국방부 공공데이터 19종 기반 AI 챗봇
          </span>

          <h1 className="fade-item" style={{ animationDelay: "0.15s" }}>
            <span className="hero-kicker">Military life, answered.</span>
            군생활의 모든 정보,
            <br />
            <span className="grad-text">짬봇</span>에게 물어보세요
          </h1>

          <p className="hero-desc fade-item" style={{ animationDelay: "0.25s" }}>
            부대별 식단부터 군 용어 사전, 복지 정보까지 — 국방부 공공데이터를
            가공하여 다양한 군대 정보 서비스를 제공합니다. 카카오톡에서
            &ldquo;짬봇-채팅&rdquo;으로, 기가지니에서
            &ldquo;짬봇-보이스&rdquo;로 만나보세요.
          </p>

          <div className="hero-actions fade-item" style={{ animationDelay: "0.35s" }}>
            <a
              className="btn btn-primary"
              href="https://pf.kakao.com/_xlVKrxb"
              target="_blank"
              rel="noreferrer"
            >
              <KakaoIcon />
              카카오톡 채널 추가
            </a>
            <a
              className="btn btn-ghost"
              href="https://app.jjambot.ronny.dev/"
              target="_blank"
              rel="noreferrer"
            >
              <WebIcon />
              웹에서 바로 사용하기
            </a>
            <a
              className="btn btn-ghost"
              href="https://youtu.be/T5CePHuNTMQ"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v13.72L19 12 8 5.14z" />
              </svg>
              시연 영상 보기
            </a>
          </div>

          <small className="hero-note fade-item" style={{ animationDelay: "0.45s" }}>
            * 짬봇-보이스(기가지니)는 서비스가 종료되었습니다.
          </small>
        </div>

        <div className="hero-visual fade-item" style={{ animationDelay: "0.3s" }}>
          <div className="hero-orbit" aria-hidden="true" />
          <div className="chip chip-1">🍚 오늘의 식단</div>
          <div className="chip chip-2">🎖️ 군 용어 사전</div>
          <div className="chip chip-3">🏥 복지 정보</div>
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
