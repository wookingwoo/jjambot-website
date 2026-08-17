import Reveal from "./Reveal";
import { KakaoIcon, WebIcon } from "./Navbar";

export default function CTA() {
  return (
    <section className="cta section" id="start">
      <div className="container">
        <Reveal>
          <div className="cta-card">
            <div className="cta-glow" aria-hidden="true" />
            <span className="cta-kicker">Ready when you are —</span>
            <h2>
              지금 바로, 카카오톡에서
              <br />
              짬봇을 만나보세요
            </h2>
            <p>
              별도의 앱 설치 없이 채널 추가 한 번이면 준비 끝.
              <br />
              오늘 저녁 메뉴부터 물어보세요.
            </p>
            <div className="cta-actions">
              <a
                className="btn btn-dark"
                href="https://pf.kakao.com/_xlVKrxb"
                target="_blank"
                rel="noreferrer"
              >
                <KakaoIcon />
                카카오톡 채널 추가
              </a>
              <a
                className="btn btn-dark-ghost"
                href="https://pf.kakao.com/_xlVKrxb/chat"
                target="_blank"
                rel="noreferrer"
              >
                바로 대화하기
              </a>
              <a
                className="btn btn-dark-ghost"
                href="https://app.jjambot.ronny.dev/"
                target="_blank"
                rel="noreferrer"
              >
                <WebIcon />
                웹에서 사용하기
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
